import { useState } from 'react';
import { Target, Loader, ArrowRight } from 'lucide-react';

const SkillGap = () => {
  const [currentSkills, setCurrentSkills] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!currentSkills.trim()) return;
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/skills/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_skills: currentSkills.split(',').map(s => s.trim()),
          target_role: targetRole
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error analyzing skill gap:', error);
      alert('Failed to analyze skill gap. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <h1 style={{ marginBottom: '8px' }}>Skill Gap Analysis</h1>
      <p className="text-muted" style={{ marginBottom: '32px' }}>Find out what you need to learn to land your target role.</p>

      {!result ? (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
          <div className="form-group">
            <label className="form-label">Target Role</label>
            <select 
              className="form-control" 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              style={{ appearance: 'none' }}
            >
              <option value="AI Engineer">AI Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Web Developer">Web Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Mobile Developer">Mobile Developer</option>
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '32px' }}>
            <label className="form-label">Your Current Skills (comma separated)</label>
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="e.g., Python, Basic HTML, SQL"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
            ></textarea>
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }} 
            onClick={handleAnalyze}
            disabled={!currentSkills.trim() || loading}
          >
            {loading ? <><Loader className="spin" size={18} /> Generating Roadmap...</> : 'Analyze My Skills'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          {/* Left Column - Skills Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card">
              <h3 style={{ marginBottom: '20px' }}>Target: {targetRole}</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Matching Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {result.matching_skills?.map((skill, i) => (
                    <span key={i} style={{ padding: '6px 12px', background: 'rgba(0, 201, 167, 0.1)', color: 'var(--success)', borderRadius: '100px', fontSize: '0.85rem' }}>
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Missing Skills to Learn</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {result.missing_skills?.map((skill, i) => (
                    <span key={i} style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '100px', fontSize: '0.85rem' }}>
                      × {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '20px' }}>Priority Order</h3>
              <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {result.priority_ranking?.map((skill, i) => (
                  <li key={i} style={{ fontWeight: i < 3 ? 'bold' : 'normal', color: i < 3 ? 'var(--accent-color)' : 'inherit' }}>
                    {skill}
                  </li>
                ))}
              </ol>
            </div>
            
            <button className="btn btn-secondary" onClick={() => setResult(null)}>Analyze Another Role</button>
          </div>

          {/* Right Column - Roadmap */}
          <div className="glass-card">
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={24} className="text-gradient" /> Personalized Learning Roadmap
            </h3>
            
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              {/* Vertical timeline line */}
              <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '20px', width: '2px', background: 'var(--border-color)' }}></div>
              
              {result.roadmap?.map((step, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: i === result.roadmap.length - 1 ? 0 : '32px' }}>
                  {/* Timeline dot */}
                  <div style={{ position: 'absolute', left: '-22px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary-bg)', border: '2px solid var(--accent-color)', zIndex: 1 }}></div>
                  
                  <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
                    <div className="flex-between" style={{ marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>{step.title}</h4>
                      <span style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(102, 126, 234, 0.1)', color: 'var(--accent-color)', borderRadius: '100px' }}>
                        {step.estimated_duration}
                      </span>
                    </div>
                    <p className="text-muted" style={{ lineHeight: 1.5, fontSize: '0.95rem' }}>{step.description}</p>
                    <button className="btn" style={{ background: 'transparent', color: 'var(--accent-color)', padding: '0', marginTop: '12px', fontSize: '0.9rem' }}>
                      Start Learning <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default SkillGap;
