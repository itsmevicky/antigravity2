import { useState } from 'react';
import { Users, CheckCircle, AlertCircle, Loader, ArrowRight } from 'lucide-react';

const Interview = () => {
  const [role, setRole] = useState('Frontend Developer');
  const [type, setType] = useState('Technical');
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setQuestions([]);
    setFeedback(null);
    setCurrentIndex(0);
    setAnswer('');
    
    try {
      const response = await fetch('http://localhost:5000/api/interview/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, type, count: 3 }),
      });
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!answer.trim()) return;
    setEvaluating(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question: questions[currentIndex].question,
          user_answer: answer 
        }),
      });
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      alert('Failed to evaluate answer. Make sure backend is running.');
    } finally {
      setEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setFeedback(null);
    }
  };

  return (
    <div className="page-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="flex-between" style={{ marginBottom: '32px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>AI Interview Prep</h1>
          <p className="text-muted">Practice mock interviews and get instant AI feedback on your answers.</p>
        </div>
      </div>

      {!questions.length ? (
        <div className="glass-card" style={{ maxWidth: '600px', margin: '40px auto', padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(102, 126, 234, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Users size={40} className="text-gradient" />
            </div>
            <h3>Configure Your Mock Interview</h3>
          </div>

          <div className="form-group">
            <label className="form-label">Target Role</label>
            <input 
              type="text" 
              className="form-control" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Frontend Developer"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label className="form-label">Interview Type</label>
            <select 
              className="form-control" 
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ appearance: 'none' }}
            >
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral (HR)</option>
              <option value="System Design">System Design</option>
            </select>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }} 
            onClick={handleGenerate}
            disabled={!role || loading}
          >
            {loading ? <><Loader className="spin" size={18} /> Generating Questions...</> : 'Start Interview'}
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <div className="flex-between" style={{ marginBottom: '24px' }}>
            <span className="text-muted">Question {currentIndex + 1} of {questions.length}</span>
            <span style={{ padding: '4px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', fontSize: '0.85rem' }}>
              {questions[currentIndex].category} • {questions[currentIndex].difficulty}
            </span>
          </div>

          <div className="glass-card" style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', lineHeight: 1.5, marginBottom: '24px' }}>
              {questions[currentIndex].question}
            </h2>

            <div className="form-group">
              <label className="form-label">Your Answer</label>
              <textarea 
                className="form-control" 
                rows="6"
                placeholder="Type your answer here as if you were speaking to an interviewer..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!!feedback || evaluating}
              ></textarea>
            </div>

            {!feedback ? (
              <button 
                className="btn btn-primary" 
                onClick={handleEvaluate}
                disabled={!answer.trim() || evaluating}
              >
                {evaluating ? <><Loader className="spin" size={18} /> Evaluating...</> : 'Submit Answer'}
              </button>
            ) : null}
          </div>

          {feedback && (
            <div className="glass-card animate-fade-in" style={{ border: '1px solid var(--accent-color)' }}>
              <div className="flex-between" style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle className="text-gradient" size={24} /> AI Feedback
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="text-muted">Score:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: feedback.score >= 70 ? 'var(--success)' : feedback.score >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
                    {feedback.score}/100
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ lineHeight: 1.6 }}>{feedback.feedback}</p>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--warning)' }}>
                  <AlertCircle size={18} /> How to improve:
                </h4>
                <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {feedback.improvements?.map((imp, i) => (
                    <li key={i} style={{ lineHeight: 1.5 }}>{imp}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
                {currentIndex < questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next Question <ArrowRight size={18} />
                  </button>
                ) : (
                  <button className="btn btn-secondary" onClick={() => setQuestions([])}>
                    Finish Interview
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Interview;
