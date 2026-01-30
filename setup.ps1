#!/usr/bin/env pwsh
<#
.SYNOPSIS
HMSCC Platform - Complete Setup Script

.DESCRIPTION
Installs all dependencies for Frontend, Backend, and Compiler

.EXAMPLE
.\setup.ps1
#>

$ErrorActionPreference = "Continue"

function Write-Header {
    param([string]$Title)
    Write-Host ""
    Write-Host "=========================================" -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Cyan
    Write-Host "=========================================" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⊘ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

# Get root directory
$RootDir = Get-Location

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║  HMSCC Platform - Complete Setup      ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""

# Check prerequisites
Write-Header "Checking Prerequisites"

try {
    $npmVersion = npm --version
    Write-Success "npm found: $npmVersion"
} catch {
    Write-Error "npm not found. Please install Node.js from https://nodejs.org/"
    exit 1
}

try {
    $cmakeVersion = cmake --version
    Write-Success "cmake found"
} catch {
    Write-Warning "cmake not found. Compiler build will be skipped."
    $skipCompiler = $true
}

# Frontend Setup
Write-Header "1. Installing Frontend Dependencies"
try {
    Push-Location "$RootDir\frontend"
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Frontend dependencies installed"
    } else {
        throw "npm install failed"
    }
    Pop-Location
} catch {
    Write-Error "Frontend setup failed: $_"
    exit 1
}

# Backend Setup
Write-Header "2. Installing Backend Dependencies"
try {
    Push-Location "$RootDir\backend"
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Backend dependencies installed"
    } else {
        throw "npm install failed"
    }
    Pop-Location
} catch {
    Write-Error "Backend setup failed: $_"
    exit 1
}

# Compiler Setup
Write-Header "3. Building Compiler"
if (-not $skipCompiler) {
    try {
        Push-Location "$RootDir\compiler"
        
        # Create build directory
        if (-not (Test-Path "build")) {
            New-Item -ItemType Directory -Path "build" -Force | Out-Null
        }
        
        Push-Location "build"
        cmake ..
        
        if ($LASTEXITCODE -eq 0) {
            cmake --build . --config Release
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Compiler built successfully"
            } else {
                Write-Warning "Compiler build failed (non-critical)"
            }
        } else {
            Write-Warning "CMake configuration failed"
        }
        
        Pop-Location
        Pop-Location
    } catch {
        Write-Warning "Compiler setup issue: $_"
    }
} else {
    Write-Warning "Skipping compiler build (cmake not found)"
}

# Summary
Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║     Setup Complete! ✓                 ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "To start development:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 - Frontend (http://localhost:5173):" -ForegroundColor Yellow
Write-Host "  cd frontend" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Terminal 2 - Backend (http://localhost:5001):" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor Gray
Write-Host "  npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "Terminal 3 - Test API:" -ForegroundColor Yellow
Write-Host '  curl http://localhost:5001/health' -ForegroundColor Gray
Write-Host '  curl -X POST http://localhost:5001/compile \' -ForegroundColor Gray
Write-Host '    -H "Content-Type: application/json" \' -ForegroundColor Gray
Write-Host '    -d ''{"code":"arena () { speak 42; }"}''' -ForegroundColor Gray
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  - FIX_SUMMARY.md - Setup and fix details" -ForegroundColor Gray
Write-Host "  - DEPLOYMENT_GUIDE.md - Deploy to Render" -ForegroundColor Gray
Write-Host "  - QUICK_REFERENCE.md - API and usage" -ForegroundColor Gray
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
