# Quick Start Guide

## ⚠️ Prerequisites Check

Before proceeding, ensure Node.js is installed:

```bash
node --version
npm --version
```

If these commands don't work, **install Node.js first**:
- See [INSTALLATION.md](./INSTALLATION.md) for detailed instructions
- Download from: https://nodejs.org/

## Setup Steps

### 1. Install Dependencies

```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

Or manually:
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 2. Configure Environment

Create `server/.env`:
```env
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Run the Application

**Easy Way (Recommended):**

**Windows:**
- Double-click `start.bat` or run `.\start.ps1` in PowerShell

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

**Manual Way:**
```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

**To Stop:**
- Windows: Double-click `stop.bat` or run `.\stop.ps1`
- Linux/Mac: `./stop.sh`

### 4. Test the Setup

- Open http://localhost:3000 in your browser
- Check backend health: http://localhost:3001/api/health

## Next Steps

Once the application is running, proceed with Phase 2 implementation.

