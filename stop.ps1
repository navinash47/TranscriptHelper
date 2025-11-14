# Transcript Helper - Stop Script (PowerShell)
# This script stops all running Node.js processes for the application

Write-Host ""
Write-Host "🛑 Stopping Transcript Helper servers..." -ForegroundColor Yellow
Write-Host ""

# Get processes on ports 3000 and 3001
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
$port3001 = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

# Kill processes on port 3000
if ($port3000) {
    foreach ($pid in $port3000) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Write-Host "   Stopped process on port 3000 (PID: $pid)" -ForegroundColor Gray
    }
}

# Kill processes on port 3001
if ($port3001) {
    foreach ($pid in $port3001) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Write-Host "   Stopped process on port 3001 (PID: $pid)" -ForegroundColor Gray
    }
}

# Also kill any remaining node processes (be careful with this)
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Where-Object { $_.Path -like "*TranscriptHelper*" } | Stop-Process -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "✅ Servers stopped" -ForegroundColor Green
Write-Host ""

