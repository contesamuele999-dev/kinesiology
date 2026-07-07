@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
cd /d "%~dp0"
title Push rapido su GitHub

echo ============================================
echo   PUSH RAPIDO SU GITHUB
echo ============================================
echo.

REM --- Controllo che git sia installato ---
where git >nul 2>&1
if errorlevel 1 (
  echo [ERRORE] Git non e' installato.
  echo Scaricalo da https://git-scm.com/download/win e riprova.
  echo.
  pause
  exit /b 1
)

REM --- Rimuove eventuali lock rimasti da sessioni precedenti ---
if exist ".git\config.lock" del /f /q ".git\config.lock" >nul 2>&1
if exist ".git\index.lock" del /f /q ".git\index.lock" >nul 2>&1

REM --- Inizializza/ripara la repo (git init e' sicuro e idempotente) ---
git init >nul 2>&1
git branch -M main >nul 2>&1

REM --- Configura il remote se manca ---
git remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo.
  echo Nessun remote configurato.
  echo Incolla l'URL della repo GitHub ^(es. https://github.com/tuo-utente/nome-repo.git^)
  set /p REPOURL="URL repo: "
  if "!REPOURL!"=="" (
    echo [ERRORE] Nessun URL inserito. Operazione annullata.
    pause
    exit /b 1
  )
  git remote add origin "!REPOURL!"
)

REM --- Messaggio di commit ---
set "MSG=%*"
if "%MSG%"=="" (
  set /p MSG="Messaggio del commit (Invio per data/ora): "
)
if "%MSG%"=="" set "MSG=Aggiornamento del %date% %time%"

echo.
echo Salvo le modifiche...
git add -A
git commit -m "%MSG%" 2>nul
if errorlevel 1 (
  echo Nessuna modifica da salvare ^(o commit gia' aggiornato^).
)

echo Invio a GitHub...
git push -u origin main
if errorlevel 1 (
  echo.
  echo [ATTENZIONE] Push non riuscito. Controlla URL, credenziali o connessione.
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   FATTO! Modifiche caricate su GitHub.
echo ============================================
echo.
pause
