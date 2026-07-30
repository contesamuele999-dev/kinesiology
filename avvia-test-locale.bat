@echo off
setlocal
cd /d "%~dp0"

set PORT=8000

echo ============================================
echo   Avvio server locale per il testing
echo   Cartella: %cd%
echo   Indirizzo: http://localhost:%PORT%/
echo ============================================
echo.
echo Per chiudere il server premi CTRL+C in questa finestra.
echo.

start "" http://localhost:%PORT%/index.html

where python >nul 2>nul
if %errorlevel%==0 (
    python -m http.server %PORT%
    goto :eof
)

where py >nul 2>nul
if %errorlevel%==0 (
    py -m http.server %PORT%
    goto :eof
)

where npx >nul 2>nul
if %errorlevel%==0 (
    npx --yes http-server -p %PORT%
    goto :eof
)

echo ERRORE: non ho trovato Python ne' Node/npx sul sistema.
echo Installa Python (https://www.python.org/downloads/) oppure Node.js (https://nodejs.org/)
echo e riesegui questo file.
pause
