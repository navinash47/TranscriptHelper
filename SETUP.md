# Setup Instructions

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern browser (Chrome/Edge recommended for Web Speech API)

## Installation

### 1. Install Root Dependencies

```bash
npm install
```

This installs the root-level dependencies (like `concurrently` for running both servers).

### 2. Install All Dependencies

```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Backend server (`server/`)
- Frontend client (`client/`)

Alternatively, install them separately:

```bash
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 3. Configure Environment Variables

#### Backend Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

**Getting an OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy it to your `.env` file

**Note:** For development, you can use OpenAI's free trial credits or consider using a local model alternative.

#### Optional: Camera Configuration

If using a remote camera, add to `server/.env`:

```env
CAMERA_URL=http://your-camera-ip/snapshot.jpg
```

## Running the Application

### Development Mode (Both Frontend and Backend)

From the root directory:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend React app on `http://localhost:3000`

### Running Separately

**Backend only:**
```bash
npm run server
# or
cd server && npm run dev
```

**Frontend only:**
```bash
npm run client
# or
cd client && npm start
```

## Building for Production

Build the React app:

```bash
npm run build
```

The production build will be in `client/build/`

## Project Structure

```
TranscriptHelper/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                # Express backend
│   ├── index.js
│   └── package.json
├── package.json          # Root package.json
├── .gitignore
└── README.md
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

- **Frontend:** Set `PORT` environment variable or edit `client/package.json` scripts
- **Backend:** Change `PORT` in `server/.env`

### Web Speech API Not Working

- Ensure you're using Chrome or Edge browser
- Make sure you're on HTTPS or localhost
- Grant microphone permissions when prompted

### API Key Issues

- Verify your OpenAI API key is correct
- Check that you have available credits
- Ensure the `.env` file is in the `server/` directory

## Next Steps

After setup, proceed with Phase 2: Basic UI Foundation implementation.

