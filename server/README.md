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
  "message": "Server is running"
}
```

### POST /api/query
Send a query to the AI service (to be implemented).

**Request Body:**
```json
{
  "message": "User's question",
  "history": []
}
```

**Response:**
```json
{
  "answer": "AI response",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Environment Variables

- `PORT`: Server port (default: 3001)
- `OPENAI_API_KEY`: OpenAI API key for AI responses
- `CAMERA_URL`: Optional camera snapshot URL

