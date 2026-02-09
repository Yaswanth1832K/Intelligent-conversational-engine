# Intelligent Conversational Engine (Web Edition)

**Live Demo:** [intelligent-conversational-engine-jkym-4x6higb97.vercel.app](https://intelligent-conversational-engine-jkym-4x6higb97.vercel.app/)

A data-structure–driven conversational text engine that provides real-time auto-completion, next-word prediction, and semantic word relationship mapping, now with a modern Web Interface.

---

## 📌 Overview

The Intelligent Conversational Engine has been transformed from a terminal-based tool into a full-stack web application. It features a **FastAPI** backend for high-performance prediction and a **React (Vite)** frontend for a premium user experience.

The system analyzes text patterns using optimized data structures: **Tries** for autocomplete, **Bigram models** for next-word prediction, **Red-Black Trees** for frequency management, and **Graphs** for semantic mapping.

---

## 📂 Project Structure

```
intelligent-conversational-engine/
│
├── backend/                # FastAPI Application
│   ├── api/                # API Endpoints
│   │   └── index.py        # Main FastAPI app
│   ├── engine/             # Core Logic (Trie, Bigram, RBT, Graph)
│   │   └── intelligent_engine.py
│   └── requirements.txt    # Python dependencies
│
├── frontend/               # React (Vite) Application
│   ├── src/                # UI Components & Logic
│   │   ├── App.jsx         # Main Chat UI
│   │   └── App.css         # Premium Styles
│   └── .env                # Environment configuration
│
├── README.md               # You are here
└── intelligent_engine.py   # Original terminal-based logic (legacy)
```

---

## 🚀 Rapid Setup

### 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn api.index:app --host 0.0.0.0 --port 10000
```
- API will be live at `http://localhost:10000`
- Docs: `http://localhost:10000/docs`

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
- UI will be live at `http://localhost:5173`

---

## ✨ Web Features

- **Vibrant UI**: Sleek dark mode with glassmorphism effects.
- **Top Words**: Real-time frequency analysis.
- **Auto-complete**: Fast prefix matching via Trie.
- **Next-Word Prediction**: Probabilistic next-word suggestions.
- **Semantic Mapping**: Visual insights into word relationships.
- **Memory Persistence**: The engine maintains state as long as the backend runs.

---

## 🛠 Tech Stack

- **Backend**: Python 3.x, FastAPI, NetworkX, Uvicorn.
- **Frontend**: React 18/19, Vite, CSS3 (Vanilla).
- **Deployment**: Prepared for Render (Backend) and Vercel (Frontend).

---

## 🎯 Implementation Details

- **Trie**: Used for O(L) time complexity prefix search where L is word length.
- **Bigram Model**: Stores word couples to calculate "P(Word_B | Word_A)".
- **Red-Black Tree**: Ensures balanced word storage and fast lookup.
- **Word Graph**: Maps successors in sentences to discover semantic links.

---

## 👨‍💻 Author

**Yaswanth Jallipalli**
(Web conversion by Antigravity AI)
