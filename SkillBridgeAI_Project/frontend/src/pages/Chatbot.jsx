import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm SkillBridge AI, your personal career mentor. How can I help you today? You can ask me about interview prep, project ideas, or skill development." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages,
          context: { target_role: 'Software Engineer' } // Example context
        }),
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        suggested_followups: data.suggested_followups
      }]);
    } catch (error) {
      console.error('Error chatting:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Is the backend running?' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="page-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>AI Career Mentor</h1>
        <p className="text-muted">Ask anything about your career path, resume, or upcoming interviews.</p>
      </div>

      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        {/* Messages Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', gap: '16px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: msg.role === 'user' ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {msg.role === 'user' ? <User size={20} color="white" /> : <Bot size={20} className="text-gradient" />}
              </div>
              
              <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: msg.role === 'user' ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.05)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.content}
                </div>
                
                {msg.suggested_followups && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    {msg.suggested_followups.map((sug, j) => (
                      <button 
                        key={j} 
                        className="btn" 
                        style={{ fontSize: '0.8rem', padding: '6px 12px', background: 'rgba(102, 126, 234, 0.1)', color: 'var(--accent-color)', border: '1px solid rgba(102, 126, 234, 0.2)' }}
                        onClick={() => handleSend(sug)}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bot size={20} className="text-gradient" />
              </div>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader className="spin" size={16} /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'relative' }}>
            <textarea
              className="form-control"
              placeholder="Ask me anything..."
              rows="1"
              style={{ paddingRight: '60px', resize: 'none', overflow: 'hidden', minHeight: '50px' }}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onKeyDown={handleKeyPress}
            />
            <button 
              className="btn-icon" 
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: input.trim() ? 'var(--accent-gradient)' : 'transparent', color: input.trim() ? 'white' : 'var(--text-muted)' }}
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
            >
              <Send size={18} />
            </button>
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            SkillBridge AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Chatbot;
