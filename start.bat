@echo off
REM Transcript Helper - Start Script (Windows)
REM This script starts both the frontend and backend servers

echo.
echo 🚀 Starting Transcript Helper...
echo.

REM Refresh PATH (in case Node.js was just installed)
call refreshenv >nul 2>&1

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH.
    echo.
    echo Please do one of the following:
    echo 1. Install Node.js from https://nodejs.org/
    echo 2. Restart your terminal/command prompt after installing
    echo 3. Or manually add Node.js to your PATH
    echo.
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing root dependencies...
    call npm install
)

if not exist "server\node_modules" (
    echo 📦 Installing server dependencies...
    cd server
    call npm install
    cd ..
)

if not exist "client\node_modules" (
    echo 📦 Installing client dependencies...
    cd client
    call npm install
    cd ..
)

echo.
echo ✅ Dependencies checked
echo.
echo 🌐 Starting servers...
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:3001
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start both servers using concurrently
call npm run dev

