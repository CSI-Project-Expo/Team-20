
Write-Host "Starting Smart Job Market Analyzer..." -ForegroundColor Green

# Start Backend
Write-Host "Starting Backend..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor Cyan
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "Both servers started in new windows." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend: http://localhost:5000"
