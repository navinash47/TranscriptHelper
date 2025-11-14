# Backend Server

Express.js server for the Transcript Helper application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in this directory:
```env
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "aiConfigured": true
}
```

### POST /api/query
Send a query to the AI service.

**Request Body:**
```json
{
  "message": "User's question",
  "history": [
    {
      "sender": "user",
      "text": "Previous message",
      "timestamp": "2024-01-01T00:00:00.000Z"
    },
    {
      "sender": "assistant",
      "text": "Previous response",
      "timestamp": "2024-01-01T00:00:01.000Z"
    }
  ]
}
```

**Response:**
```json
{
  "answer": "AI response text",
  "timestamp": "2024-01-01T00:00:02.000Z",
  "model": "gpt-3.5-turbo"
}
```

**Error Response:**
```json
{
  "error": "Failed to process query",
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:02.000Z"
}
```

## Environment Variables

### Required
- `PORT`: Server port (default: 3001)
- `OPENAI_API_KEY`: OpenAI API key for AI responses

### Optional
- `OPENAI_MODEL`: Model to use (default: `gpt-3.5-turbo`)
- `MAX_TOKENS`: Maximum response length (default: `500`)
- `AI_TEMPERATURE`: Creativity level 0-1 (default: `0.7`)
- `MAX_CONTEXT_MESSAGES`: Number of previous messages to include (default: `10`)
- `CAMERA_URL`: Optional camera snapshot URL

## AI Service

The AI service (`services/aiService.js`) handles:
- OpenAI API integration
- Conversation context formatting
- Error handling and retries
- Context window management

### Getting an OpenAI API Key

1. Visit https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new secret key
4. Copy it to your `.env` file

**Note:** If the API key is not configured, the server will return placeholder responses but will still function.

## Project Structure

```
server/
├── services/
│   └── aiService.js    # AI service module
├── index.js            # Express server
├── package.json
└── .env                # Environment variables (create this)
```
