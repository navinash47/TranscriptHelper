const OpenAI = require('openai');

class AIService {
  constructor() {
    // Initialize OpenAI client
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️  OPENAI_API_KEY not found in environment variables.');
      console.warn('   The AI service will return placeholder responses.');
      this.openai = null;
      this.isConfigured = false;
    } else {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
      this.isConfigured = true;
      console.log('✅ OpenAI API configured');
    }

    // Configuration
    this.model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
    this.maxContextMessages = parseInt(process.env.MAX_CONTEXT_MESSAGES || '10', 10);
    this.maxTokens = parseInt(process.env.MAX_TOKENS || '500', 10);
    this.temperature = parseFloat(process.env.AI_TEMPERATURE || '0.7');
  }

  /**
   * Format conversation history for OpenAI API
   * @param {Array} history - Array of message objects with sender and text
   * @param {string} currentMessage - Current user message
   * @returns {Array} Formatted messages for OpenAI API
   */
  formatMessages(history, currentMessage) {
    const messages = [];

    // Add system message for context
    messages.push({
      role: 'system',
      content: 'You are a helpful assistant. Provide concise, accurate answers to questions. If asked about something you don\'t know, say so honestly.'
    });

    // Add conversation history (last N messages)
    const recentHistory = history.slice(-this.maxContextMessages);
    
    for (const msg of recentHistory) {
      if (msg.sender === 'user' || msg.sender === 'assistant') {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        });
      }
    }

    // Add current message
    messages.push({
      role: 'user',
      content: currentMessage
    });

    return messages;
  }

  /**
   * Generate AI response using OpenAI API
   * @param {string} userMessage - Current user message
   * @param {Array} history - Conversation history
   * @returns {Promise<string>} AI response text
   */
  async generateResponse(userMessage, history = []) {
    // If OpenAI is not configured, return placeholder
    if (!this.isConfigured || !this.openai) {
      return this.getPlaceholderResponse(userMessage);
    }

    try {
      // Format messages for OpenAI
      const messages = this.formatMessages(history, userMessage);

      // Call OpenAI API
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        messages: messages,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
      });

      // Extract response text
      const responseText = completion.choices[0]?.message?.content || 'No response generated.';

      return responseText.trim();
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Handle specific OpenAI errors
      if (error.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your configuration.');
      } else if (error.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      } else if (error.status === 500) {
        throw new Error('OpenAI API server error. Please try again later.');
      } else if (error.code === 'insufficient_quota') {
        throw new Error('OpenAI API quota exceeded. Please check your account.');
      } else {
        throw new Error(`AI service error: ${error.message || 'Unknown error'}`);
      }
    }
  }

  /**
   * Get placeholder response when OpenAI is not configured
   * @param {string} userMessage - User message
   * @returns {string} Placeholder response
   */
  getPlaceholderResponse(userMessage) {
    return `[Placeholder Response] I received your message: "${userMessage}". To enable AI responses, please configure your OPENAI_API_KEY in the server/.env file. See SETUP.md for instructions.`;
  }

  /**
   * Check if AI service is properly configured
   * @returns {boolean} True if configured
   */
  isServiceConfigured() {
    return this.isConfigured;
  }
}

// Export singleton instance
module.exports = new AIService();

