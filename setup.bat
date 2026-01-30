@echo off
REM =========================================
REM HMSCC Platform - Automated Setup Script
REM =========================================
REM This script installs all dependencies for
REM Frontend, Backend, and Compiler

setlocal enabledelayedexpansion

echo.
echo =========================================
echo   HMSCC Platform - Complete Setup
echo =========================================
echo.

REM Get current directory
set ROOT_DIR=%cd%

echo Checking prerequisites...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

where cmake >nul 2>nul
if %errorlevel% neq 0 (
    echo WARNING: cmake is not installed
    echo Compiler will not build. Install from https://cmake.org/
)

echo.
echo =========================================
echo 1. Installing Frontend Dependencies
echo =========================================
cd /d "%ROOT_DIR%\frontend"
if %errorlevel% neq 0 (
    echo ERROR: Could not enter frontend directory
    pause
    exit /b 1
)
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

echo.
echo =========================================
echo 2. Installing Backend Dependencies
echo =========================================
cd /d "%ROOT_DIR%\backend"
if %errorlevel% neq 0 (
    echo ERROR: Could not enter backend directory
    pause
    exit /b 1
)
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

echo.
echo =========================================
echo 3. Building Compiler (Optional)
echo =========================================
where cmake >nul 2>nul
if %errorlevel% equ 0 (
    cd /d "%ROOT_DIR%\compiler"
    if not exist build mkdir build
    cd /d "%ROOT_DIR%\compiler\build"
    cmake ..
    if %errorlevel% equ 0 (
        cmake --build . --config Release
        if %errorlevel% equ 0 (
            echo ✓ Compiler built successfully
        ) else (
            echo ✗ Compiler build failed (non-critical)
        )
    ) else (
        echo ✗ CMake configuration failed
    )
) else (
    echo ⊘ Skipping compiler build (cmake not found)
    echo   You can build manually later:
    echo   cd compiler ^&^& mkdir build ^&^& cd build
    echo   cmake .. ^&^& cmake --build . --config Release
)

echo.
echo =========================================
echo Setup Complete! ✓
echo =========================================
echo.
echo To start development:
echo.
echo Terminal 1 - Frontend (http://localhost:5173):
echo   cd frontend
echo   npm run dev
echo.
echo Terminal 2 - Backend (http://localhost:5001):
echo   cd backend
echo   npm start
echo.
echo Terminal 3 - Test API:
echo   curl http://localhost:5001/health
echo   curl -X POST http://localhost:5001/compile ^
echo     -H "Content-Type: application/json" ^
echo     -d "{\"code\":\"arena () { speak 42; }\"}"
echo.
echo Documentation:
echo   - FIX_SUMMARY.md - Setup and fix details
echo   - DEPLOYMENT_GUIDE.md - Deploy to Render
echo   - QUICK_REFERENCE.md - API and usage
echo.
echo =========================================
pause
