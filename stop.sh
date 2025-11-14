#!/bin/bash

# Transcript Helper - Stop Script (Linux/Mac)
# This script stops all running Node.js processes for the application

echo "🛑 Stopping Transcript Helper servers..."

# Find and kill Node.js processes related to the app
pkill -f "node.*server/index.js" 2>/dev/null
pkill -f "react-scripts" 2>/dev/null
pkill -f "concurrently" 2>/dev/null

# Also try to kill processes on specific ports
if command -v lsof &> /dev/null; then
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    lsof -ti:3001 | xargs kill -9 2>/dev/null
elif command -v fuser &> /dev/null; then
    fuser -k 3000/tcp 2>/dev/null
    fuser -k 3001/tcp 2>/dev/null
fi

echo "✅ Servers stopped"

