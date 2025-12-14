# How to Run VectorShift Pipeline Builder

Complete instructions to run both backend and frontend locally.

---

## 📋 Prerequisites

Before starting, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (3.11 or higher) - [Download](https://www.python.org/downloads/)
- **npm** (comes with Node.js)
- **pip** (comes with Python)

### Verify Installation

```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Python version
python --version

# Check pip version
pip --version
```

---

## 🚀 Quick Start Guide

### Option 1: Run Both Services (Recommended)

You need **two terminal windows** - one for backend, one for frontend.

#### Terminal 1 - Backend

```powershell
# Navigate to project root
cd C:\Users\theaa\Downloads\VectorShift

# Go to backend directory
cd backend

# Install Python dependencies (first time only)
pip install -r requirements.txt

# Start the backend server
python -m uvicorn main:app --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Application startup complete.
```

#### Terminal 2 - Frontend

```powershell
# Navigate to project root
cd C:\Users\theaa\Downloads\VectorShift

# Go to frontend directory
cd frontend

# Install Node.js dependencies (first time only)
npm install

# Start the frontend development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
```

The browser should automatically open to `http://localhost:3000`

---

## ✅ Verification Steps

### 1. Test Backend

Open your browser and visit:
- **Main endpoint**: http://localhost:8000
  - Should show: `{"Ping": "Pong"}`
- **API Documentation**: http://localhost:8000/docs
  - Should show FastAPI interactive documentation

### 2. Test Frontend

- **Frontend App**: http://localhost:3000
  - Should show the VectorShift Pipeline Builder interface
  - You can drag nodes onto the canvas
  - Try clicking "Submit to Backend" button

### 3. Test Integration

1. Open frontend: http://localhost:3000
2. Drag some nodes onto the canvas
3. Connect them with edges
4. Click "Submit to Backend" button
5. Should see an alert with pipeline information

---

## 📝 Detailed Instructions

### Backend Setup (First Time)

1. **Open PowerShell/Terminal**
2. **Navigate to backend directory:**
   ```powershell
   cd C:\Users\theaa\Downloads\VectorShift\backend
   ```

3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```
   
   This installs:
   - `fastapi` - Web framework
   - `uvicorn` - ASGI server

4. **Start the server:**
   ```powershell
   python -m uvicorn main:app --reload
   ```
   
   The `--reload` flag enables auto-reload when you change code.

### Frontend Setup (First Time)

1. **Open a NEW PowerShell/Terminal window**
2. **Navigate to frontend directory:**
   ```powershell
   cd C:\Users\theaa\Downloads\VectorShift\frontend
   ```

3. **Install dependencies:**
   ```powershell
   npm install
   ```
   
   This installs all React dependencies (may take 1-2 minutes).

4. **Start the development server:**
   ```powershell
   npm start
   ```
   
   The browser should automatically open to http://localhost:3000

---

## 🛠️ Troubleshooting

### Backend Issues

**Problem: `uvicorn` command not found**
```powershell
# Solution: Use python -m uvicorn instead
python -m uvicorn main:app --reload
```

**Problem: Port 8000 already in use**
```powershell
# Solution: Use a different port
python -m uvicorn main:app --reload --port 8001
```

**Problem: Module not found errors**
```powershell
# Solution: Reinstall dependencies
pip install -r requirements.txt
```

### Frontend Issues

**Problem: Port 3000 already in use**
- The terminal will ask: "Would you like to run the app on another port instead? (Y/n)"
- Type `Y` and press Enter

**Problem: `npm` command not found**
- Make sure Node.js is installed
- Restart your terminal after installing Node.js

**Problem: Build errors**
```powershell
# Solution: Clear cache and reinstall
cd frontend
rm -r node_modules
npm install
```

**Problem: Frontend can't connect to backend**
- Make sure backend is running on port 8000
- Check backend URL in `frontend/src/submit.js` (should be `http://localhost:8000`)

---

## 🎯 Common Commands Reference

### Backend Commands

```powershell
# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Run development server (with auto-reload)
python -m uvicorn main:app --reload

# Run production server
python -m uvicorn main:app --host 0.0.0.0 --port 8000

# Check if backend is running
# Visit http://localhost:8000 in browser
```

### Frontend Commands

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## 🔄 Stopping the Servers

To stop either server:
1. Go to the terminal window running the server
2. Press `Ctrl + C`
3. Confirm if prompted

---

## 📦 Project Structure

```
VectorShift/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
│
└── frontend/
    ├── package.json         # Node.js dependencies
    ├── public/              # Static files
    └── src/                 # React source code
        ├── App.js
        ├── nodes/           # Node components
        └── ...
```

---

## 🌐 URLs

When both servers are running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Backend Docs**: http://localhost:8000/docs

---

## 💡 Tips

1. **Keep both terminals open** - Backend and frontend need to run simultaneously
2. **Auto-reload enabled** - Both servers automatically reload when you save code changes
3. **Check terminal output** - Error messages will appear in the terminal
4. **Browser console** - Press F12 in browser to see frontend errors
5. **Backend logs** - Check terminal running backend for API requests

---

## 🆘 Still Having Issues?

1. **Check all prerequisites are installed**
2. **Verify you're in the correct directories**
3. **Check for error messages in terminal**
4. **Make sure ports 3000 and 8000 are not used by other applications**
5. **Restart your terminal/computer if needed**

---

**Happy Coding! 🚀**

