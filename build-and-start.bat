@echo off
REM Check if Node.js v22 is installed
node -v | findstr /r "^v22\." >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js v22 is not installed. Please install it from https://nodejs.org/en/download/ and try again.
    exit /b 1
)

REM Check if npm v11 is installed
npm -v | findstr /r "^11\." >nul 2>&1
if %errorlevel% neq 0 (
    echo npm v11 is not installed. Please install it from https://nodejs.org/en/download/ and try again.
    exit /b 1
)

REM Change directory to the app folder
cd fet-module-5-assignment

REM Rename example.env.local to .env.local if .env.local does not exist
if not exist .env.local (
    echo Setting up environment file...
    ren example.env.local .env.local
)

echo Starting the app in a new terminal window...
start cmd /k "npm install && npm run build && npm run start"
echo App started successfully.