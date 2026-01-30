# HMSCC - Hash Map Scripting Compiler Collection

## 🚀 Quick Start: Deploy to Render (15 minutes)

### Step 1: Push to GitHub (2 minutes)
```powershell
cd D:\Projects\HMSCC
git add .
git commit -m "Production: Fix dependencies and optimize for Render"
git push origin main
```

### Step 2: Create Render Service (3 minutes)
1. Go to https://render.com/dashboard
2. Click **+ New** → **Web Service**
3. Search and select: **HarshMrigank/HMSCC**
4. Fill in:
   - Name: `hmscc-backend`
   - Environment: **Docker** ⭐ (important)
   - Region: `Oregon`
   - Branch: `main`
5. Click **Create Web Service**

### Step 3: Wait & Verify (10 minutes)
1. Click your service in Render
2. Go to **Logs** tab
3. Wait for status to show **Live** (green)
4. Test health endpoint: `https://your-service-name.onrender.com/health`
5. Should return: `{"status":"ok","compiler":"available"}`

✅ **Your backend is now live on Render!** 🎉

---

## 📋 Complete Setup Guide

### What's Included

| Component | Status | Location |
|-----------|--------|----------|
| **Frontend** | ✅ Running | Port 5174 (React + CodeMirror) |
| **Backend** | ✅ Running | Port 5001 (Node.js/Express) |
| **Compiler** | ✅ Ready | C++11 with CMake |
| **Docker** | ✅ Optimized | Multi-stage build for Render |

### Local Setup (If Starting Fresh)

```powershell
# Frontend
cd frontend && npm install && npm run dev        # Port 5174

# Backend (new terminal)
cd backend && npm install && npm start           # Port 5001
```

### What Was Fixed

✅ **Dependencies**: Added 9 missing CodeMirror packages (@codemirror/language, lang-css, lang-html, autocomplete, language-data, axios)  
✅ **Dockerfile**: Production-optimized (port 5001, compiler path, npm ci)  
✅ **Frontend**: No errors, all imports resolve  
✅ **Backend**: Fully operational, health check working  

---

## 🛠️ Render Settings

### Automatic Detection
Render automatically detects:
- ✅ Dockerfile in repository root
- ✅ Port 5001 from EXPOSE directive
- ✅ Start command from CMD directive
- ✅ Multi-stage build process

### Deployment Flow
```
git push → GitHub → Render webhook → Docker build → 
Deploy container → Live on Render
Auto-Deploy: Every git push = auto redeploy
```

---

## 🧪 Verification Tests

### Test 1: Health Check
```powershell
curl https://your-service-name.onrender.com/health
# {"status":"ok","compiler":"available"}
```

### Test 2: API Test
```powershell
curl -X POST https://your-service-name.onrender.com/compile `
  -H "Content-Type: application/json" `
  -Body '{"code":"arena () { speak 42; }"}'
# {"success":true,"output":"42\n",...}
```

### Test 3: Browser
Open: `https://your-service-name.onrender.com/health`

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check Build Logs, fix error, git push |
| Service won't start | Check Logs, verify environment |
| API doesn't respond | Wait 30 sec, check /health |
| Port errors | Render manages ports automatically |
| Git push fails | Verify credentials |

---

## 📁 Project Structure

```
HMSCC/
├── dockerfile              ← Main deployment file
├── frontend/               ← React (port 5174)
│   ├── package.json
│   └── src/
├── backend/                ← Node.js API (port 5001)
│   ├── package.json
│   └── server.js
├── compiler/               ← C++ compiler
│   └── CMakeLists.txt
├── README.md               ← This file
└── HMSCC_TEST_CASES.md     ← Example programs
```

---

## 🔄 Deployment Workflow

**Initial**: git push → Render builds → Deploy (5-10 min)  
**Future**: git push → Render auto-redeploys (2-5 min)  
**No manual steps needed after first deployment!**

---

## 📈 Plans

| Plan | Cost | Auto-on | Use Case |
|------|------|---------|----------|
| Free | $0/month | No (spins down) | Development |
| Starter | $7/month | Yes | Production |

---

## 📝 API

### Health
```
GET /health → {"status":"ok","compiler":"available"}
```

### Compile
```
POST /compile → {"code":"...hmscc code..."} → 
{"success":true,"output":"...","errors":[]}
```

---

## 🧩 Language

### Keywords
`arena` (main), `speak` (print), `listen` (input), `let` (var), `loop`, `check` (if)

### Example
```hmscc
arena () {
  speak 42;
}
```

See HMSCC_TEST_CASES.md for more examples.

---

## ⚡ Commands

```powershell
# Push to GitHub
git add . && git commit -m "msg" && git push origin main

# Frontend dev
cd frontend && npm run dev

# Backend
cd backend && npm start

# Docker test
docker build -t hmscc . && docker run -p 5001:5001 hmscc
```

---

## 🔗 Links

| Link | Purpose |
|------|---------|
| https://github.com/HarshMrigank/HMSCC | Repository |
| https://render.com/dashboard | Deploy here |
| http://localhost:5174 | Frontend local |
| http://localhost:5001 | Backend local |

---

## ✅ Ready to Deploy?

- [ ] Frontend works on localhost:5174
- [ ] Backend works on localhost:5001
- [ ] Health endpoint responds
- [ ] All code committed
- [ ] Ready to git push

👉 **Follow the Quick Start at the top!** 🚀

---

**Status**: ✅ Production Ready | **Deploy Time**: ~15 minutes | **Updated**: Jan 30, 2026
