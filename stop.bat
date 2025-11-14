@echo off
REM Transcript Helper - Stop Script (Windows)
REM This script stops all running Node.js processes for the application

echo.
echo 🛑 Stopping Transcript Helper servers...
echo.

REM Kill Node.js processes
taskkill /F /IM node.exe /T >nul 2>&1

REM Also try to kill processes on specific ports using netstat
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo ✅ Servers stopped
echo.
pause

