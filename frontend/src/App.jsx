import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [engineData, setEngineData] = useState({
    top_words: [],
    suggestions: [],
    next_word: "",
    related_words: []
  });

  const chatEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText("");
    setMessages(prev => [...prev, { text: userMessage, type: 'user' }]);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to connect to engine");

      const data = await response.json();
      setEngineData(data);

      // Mock bot typing back or just updating state
      // The requirement doesn't explicitly ask for bot text response, but "chatbot response" implies it.
      // However, the data returned is strictly intelligence metrics.
      // I'll add a system message to acknowledge receipt.
      setMessages(prev => [...prev, { text: "Analyzed your input.", type: 'bot' }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Intelligent Conversational Engine</h1>
      </header>

      <main className="main-layout">
        <section className="chat-section">
          <div className="message-history">
            {messages.length === 0 && (
              <div className="message bot">
                Welcome! Type something to see the engine in action.
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form className="input-area" onSubmit={handleSend}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message here..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !inputText.trim()}>
              {loading ? <div className="loading-spinner"></div> : "Send"}
            </button>
          </form>
          {error && <div className="error-message">Error: {error}</div>}
        </section>

        <aside className="intelligence-sidebar">
          <div className="info-card">
            <h3>📈 Top Words</h3>
            <div className="tag-container">
              {engineData.top_words.length > 0 ? (
                engineData.top_words.map((word, i) => (
                  <span key={i} className="tag highlight">{word}</span>
                ))
              ) : (
                <span className="tag">Wait for input...</span>
              )}
            </div>
          </div>

          <div className="info-card">
            <h3>🔍 Suggestions</h3>
            <div className="tag-container">
              {engineData.suggestions.length > 0 ? (
                engineData.suggestions.map((word, i) => (
                  <span key={i} className="tag">{word}</span>
                ))
              ) : (
                <span className="tag">None</span>
              )}
            </div>
          </div>

          <div className="info-card">
            <h3>📝 Next Word Prediction</h3>
            <div className="prediction-box text-gradient">
              {engineData.next_word || "???"}
            </div>
          </div>

          <div className="info-card">
            <h3>🔗 Related Words</h3>
            <div className="tag-container">
              {engineData.related_words.length > 0 ? (
                engineData.related_words.map((word, i) => (
                  <span key={i} className="tag">{word}</span>
                ))
              ) : (
                <span className="tag">None</span>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
