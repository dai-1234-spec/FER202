import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './ChatBot.css';

// ======== Icons (inline SVG) ========
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

// ======== Simple Markdown Renderer ========
function renderMarkdown(text) {
  if (!text) return '';

  let html = text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Unordered lists
    .replace(/^[-•]\s+(.+)/gm, '<li>$1</li>')
    // Line breaks
    .replace(/\n/g, '<br/>');

  // Wrap consecutive <li> tags in <ul>
  html = html.replace(/((<li>.*?<\/li><br\/>?)+)/g, '<ul>$1</ul>');
  html = html.replace(/<br\/><\/ul>/g, '</ul>');
  html = html.replace(/<ul><br\/>/g, '<ul>');

  return html;
}

// ======== Quick Suggestion Prompts ========
const SUGGESTIONS = [
  '🏆 Top trung tâm IELTS tại Đà Nẵng?',
  '💬 Học giao tiếp ở đâu tốt?',
  '📊 So sánh DOL và IELTS Fighter',
  '🏫 Trung tâm nào phù hợp người mất gốc?',
];

// ======== Welcome Message ========
const WELCOME_MESSAGE = {
  role: 'assistant',
  content: 'Xin chào! 👋 Mình là **EduFinder AI** — trợ lý tư vấn trung tâm ngoại ngữ của bạn.\n\nMình có thể giúp bạn:\n- 🔍 Tìm trung tâm phù hợp theo khu vực, nhu cầu\n- 📊 So sánh các trung tâm với nhau\n- ⭐ Gợi ý trung tâm có đánh giá cao\n\nBạn cần tư vấn gì nào? 😊'
};

export default function ChatBot() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNewMessage, setHasNewMessage] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
      setHasNewMessage(false);
    };
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 400);
    }
  }, [isOpen]);

  // Toggle chat open/close
  const toggleChat = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 250);
    } else {
      setIsOpen(true);
      setHasNewMessage(false);
    }
  };

  // Send message
  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput('');
    setError(null);

    // Add user message
    const userMsg = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history (exclude welcome, only keep user/assistant pairs)
      const history = messages
        .filter((_, i) => i > 0) // Skip welcome message
        .map(m => ({ role: m.role, content: m.content }));

      const response = await axios.post('/api/chat', {
        message: messageText,
        history: history
      }, {
        timeout: 30000 // 30s timeout
      });

      const botMsg = {
        role: 'assistant',
        content: response.data.reply
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage = err.response?.data?.error
        || 'Không thể kết nối với AI. Vui lòng thử lại!';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Retry after error
  const handleRetry = () => {
    setError(null);
    // Get last user message and retry
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      // Remove the last user message (will be re-added by sendMessage)
      setMessages(prev => prev.slice(0, -1));
      sendMessage(lastUserMsg.content);
    }
  };

  // Hide chatbot on specific routes (MUST BE AFTER ALL HOOKS)
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <>
      {/* ---- Floating Bubble ---- */}
      <button
        className={`chatbot-bubble ${isOpen ? 'is-open' : ''}`}
        onClick={toggleChat}
        id="chatbot-toggle"
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat tư vấn'}
        style={isOpen ? { animation: 'none' } : {}}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
        {!isOpen && hasNewMessage && <span className="chatbot-badge">1</span>}
      </button>

      {/* ---- Chat Window ---- */}
      {isOpen && (
        <div className={`chatbot-window ${isClosing ? 'closing' : ''}`} id="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div className="chatbot-header-info">
              <div className="chatbot-header-title">EduFinder AI</div>
              <div className="chatbot-header-status">
                <span className="chatbot-status-dot"></span>
                Trợ lý tư vấn trực tuyến
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Đóng">
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" id="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                <div className="chatbot-msg-avatar">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div
                  className="chatbot-msg-content"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                />
              </div>
            ))}

            {/* Welcome suggestions (only show after welcome, no user messages yet) */}
            {messages.length === 1 && !isLoading && (
              <div className="chatbot-suggestions">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    className="chatbot-suggestion-btn"
                    onClick={() => sendMessage(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="chatbot-typing">
                <div className="chatbot-msg-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 10, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  🤖
                </div>
                <div className="chatbot-typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="chatbot-error">
                ⚠️ {error}
                <button onClick={handleRetry}>Thử lại</button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <textarea
              ref={inputRef}
              className="chatbot-input"
              placeholder="Hỏi về trung tâm ngoại ngữ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
              id="chatbot-input"
            />
            <button
              className="chatbot-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              aria-label="Gửi tin nhắn"
              id="chatbot-send"
            >
              <SendIcon />
            </button>
          </div>

          <div className="chatbot-powered">
            Powered by EduFinder AI ✨
          </div>
        </div>
      )}
    </>
  );
}
