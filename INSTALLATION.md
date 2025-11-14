# Installation Guide

## Prerequisites

Before running the setup commands, you need to have **Node.js** installed on your system.

### Installing Node.js

1. **Download Node.js:**
   - Visit https://nodejs.org/
   - Download the LTS (Long Term Support) version
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Install Node.js:**
   - Run the installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" option (usually checked by default)
   - Complete the installation

3. **Verify Installation:**
   Open a new terminal/PowerShell window and run:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers (e.g., v18.17.0 and 9.6.7)

### Alternative: Using Node Version Manager (nvm-windows)

If you prefer using a version manager:

1. Download nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
2. Install nvm-windows
3. Open a new terminal and run:
   ```bash
   nvm install lts
   nvm use lts
   ```

## After Node.js Installation

Once Node.js is installed, return to this project directory and run:

```bash
# Install root dependencies
npm install

# Install all dependencies (root, server, and client)
npm run install-all
```

Or install them separately:

```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install
cd ..

# Client dependencies
cd client
npm install
cd ..
```

## Quick Start

After installing dependencies:

1. **Configure Backend:**
   Create `server/.env` file:
   ```env
   PORT=3001
   OPENAI_API_KEY=your_api_key_here
   ```

2. **Start Development Servers:**
   ```bash
   npm run dev
   ```
   This starts both frontend (port 3000) and backend (port 3001)

3. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api/health

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your terminal after installing Node.js
- Verify installation with `node --version`

### Port Already in Use
- Change the port in `server/.env` (PORT=3002)
- Or kill the process using the port

### Permission Errors
- On Windows, you may need to run PowerShell as Administrator
- Or use a different terminal (Git Bash, Command Prompt)

