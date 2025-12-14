# VectorShift Pipeline Builder

A visual pipeline builder for creating and managing AI workflows with drag-and-drop nodes.

🌐 **Live Demo**: [https://vector-shift-eta.vercel.app/](https://vector-shift-eta.vercel.app/)

## Features

- 🎨 **Visual Pipeline Builder** - Drag and drop nodes to create complex workflows
- 🔗 **Node Connections** - Connect nodes to build data pipelines
- 📝 **Text Node** - Dynamic text templates with variable detection
- 🎯 **Multiple Node Types** - Input, LLM, Text, Output, Markdown, HTTP, Condition, Delay, and Embedding nodes
- 🎨 **Modern UI** - Dark theme with smooth animations

## Tech Stack

### Frontend
- React 18
- ReactFlow for node-based UI
- Zustand for state management

### Backend
- FastAPI
- Python 3.11+

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.11+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VectorShift
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

1. **Start the Backend** (Terminal 1)
   ```bash
   cd backend
   python -m uvicorn main:app --reload
   ```
   Backend runs on `http://localhost:8000`

2. **Start the Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## Project Structure

```
VectorShift/
├── frontend/          # React frontend application
│   ├── public/       # Static files
│   └── src/          # Source code
│       ├── nodes/    # Node components
│       └── ...
├── backend/          # FastAPI backend
│   └── main.py       # API server
└── README.md
```

## Features

### Text Node Improvements
- **Dynamic Resizing**: Node automatically resizes based on text content
- **Variable Detection**: Automatically detects variables in `{{variableName}}` format
- **Auto Handles**: Creates input handles for detected variables
- **Enhanced Textarea**: Auto-resizing textarea with better UX

## Deployment

### Live Deployment

- **Frontend (Vercel)**: [https://vector-shift-eta.vercel.app/](https://vector-shift-eta.vercel.app/)
- **Backend (Render)**: Deployed and connected to frontend

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   npm install -g vercel
   vercel
   ```

3. Or deploy to Netlify:
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/build`

### Backend Deployment

Deploy the FastAPI backend to services like:
- **Render** (Currently deployed)
- **Railway**
- **Heroku**
- **AWS Lambda** (with serverless framework)

## License

MIT

