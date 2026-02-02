@echo off
echo Starting Backend and Frontend Servers...

:: Start the Flask backend in a new window
echo [Backend] Starting Flask server...
start "Backend - Flask" cmd /c "cd /d "%~dp0skin-cancer-backend" && call "%~dp0.venv\Scripts\activate.bat" && python app.py"

:: Start the Vite frontend in a new window
echo [Frontend] Starting Vite server...
start "Frontend - Vite" cmd /c "cd /d skin-cancer-detection-using-CNN-AI && npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Frontend should be available at: http://localhost:5173
echo Backend should be available at: http://127.0.0.1:5000
pause
