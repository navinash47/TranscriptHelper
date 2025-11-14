const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const aiService = require('./services/aiService');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    aiConfigured: aiService.isServiceConfigured()
  });
});

// AI query endpoint
app.post('/api/query', async (req, res) => {
  try {
    const { message, history } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Message is required and must be a non-empty string'
      });
    }

    // Validate history format
    const validHistory = Array.isArray(history) 
      ? history.filter(msg => msg && msg.sender && msg.text)
      : [];

    // Generate AI response
    const answer = await aiService.generateResponse(message.trim(), validHistory);

    res.json({
      answer: answer,
      timestamp: new Date().toISOString(),
      model: aiService.isServiceConfigured() ? process.env.OPENAI_MODEL || 'gpt-3.5-turbo' : 'placeholder'
    });
  } catch (error) {
    console.error('Error processing query:', error);
    
    // Determine appropriate status code
    let statusCode = 500;
    if (error.message.includes('API key') || error.message.includes('quota')) {
      statusCode = 503; // Service unavailable
    }

    res.status(statusCode).json({ 
      error: 'Failed to process query',
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  
  if (!aiService.isServiceConfigured()) {
    console.log('');
    console.log('⚠️  WARNING: OpenAI API not configured!');
    console.log('   The server will return placeholder responses.');
    console.log('   To enable AI responses:');
    console.log('   1. Get an API key from https://platform.openai.com/api-keys');
    console.log('   2. Create server/.env file');
    console.log('   3. Add: OPENAI_API_KEY=your_api_key_here');
    console.log('');
  }
});
