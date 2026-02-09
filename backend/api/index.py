from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from engine.intelligent_engine import EnhancedIntelligentEngine

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity in development/demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global engine instance
engine = EnhancedIntelligentEngine()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    user_input = request.message
    
    # Process the input if it's not empty
    if user_input.strip():
        engine.add_words_from_sentence(user_input)

    # Get intelligence data
    common_words = engine.get_common_words(n=3)
    
    last_word = user_input.split()[-1] if user_input.split() else ""
    
    suggestions = []
    next_word = None
    related_words = []
    
    if last_word:
        suggestions = engine.search_prefix(last_word)
        # Filter suggestions to not just be the word itself if it's complete, but here we surely want all completions
        next_word = engine.predict_next_word(last_word)
        related_words = engine.get_related_words(last_word)

    return {
        "top_words": common_words,
        "suggestions": suggestions,
        "next_word": next_word if next_word else "",
        "related_words": related_words
    }

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Intelligent Conversational Engine API is running"}
