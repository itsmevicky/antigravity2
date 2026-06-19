import { useState } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ResumeAnalysis = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [targetRole, setTargetRole] = useState('Software Engineer');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_role', targetRole);

    try {
      const response = await fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('Failed to analyze resume. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <h1 style={{ marginBottom: '8px' }}>Resume Analysis</h1>
      <p className="text-muted" style={{ marginBottom: '32px' }}>Upload your resume to get an ATS compatibility score and AI-driven feedback.</p>

      {!result ? (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ textAlign: 'left', display: 'inline-block', width: '300px' }}>Target Role</label>
            <input 
              type="text" 
              className="form-control" 
              style={{ width: '300px', margin: '0 auto' }}
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Data Scientist"
            />
          </div>

          <div 
            style={{ 
              border: '2px dashed var(--accent-color)', 
              borderRadius: '12px', 
              padding: '60px 20px',
              background: 'rgba(102, 126, 234, 0.05)',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
            onClick={() => document.getElementById('resume-upload').click()}
          >
            <UploadCloud size={48} className="text-gradient" style={{ marginBottom: '16px' }} />
            <h3 style={{ marginBottom: '8px' }}>{file ? file.name : 'Click or drag PDF here'}</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>Supports PDF up to 5MB</p>
            <input 
              type="file" 
              id="resume-upload" 
              accept=".pdf" 
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '300px' }} 
            onClick={handleAnalyze}
            disabled={!file || loading}
          >
            {loading ? <><Loader className="spin" size={18} /> Analyzing with AI...</> : 'Analyze Resume'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
          {/* Left Column - Score & Skills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card" style={{ textAlign: 'center' }}>
              <h3 style={{ marginBottom: '20px' }}>ATS Match Score</h3>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', border: '8px solid var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <h2 style={{ fontSize: '3rem', margin: 0 }}>{result.ats_score}%</h2>
              </div>
              <p className="text-muted">Targeting: {targetRole}</p>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} color="var(--success)" /> Extracted Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.extracted_skills?.map((skill, i) => (
                  <span key={i} style={{ padding: '6px 12px', background: 'rgba(0, 201, 167, 0.1)', color: 'var(--success)', borderRadius: '100px', fontSize: '0.85rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={20} color="var(--danger)" /> Missing Critical Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.missing_skills?.map((skill, i) => (
                  <span key={i} style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '100px', fontSize: '0.85rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Analysis & Suggestions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card">
              <h3 style={{ marginBottom: '20px' }}>Actionable Suggestions</h3>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {result.suggestions?.map((sug, i) => (
                  <li key={i} style={{ lineHeight: 1.5 }}>{sug}</li>
                ))}
              </ul>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '20px' }}>Section Analysis</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--accent-color)', marginBottom: '8px' }}>Experience</h4>
                <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>{result.section_analysis?.experience}</p>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--accent-color)', marginBottom: '8px' }}>Projects</h4>
                <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>{result.section_analysis?.projects}</p>
              </div>

              <div>
                <button className="btn btn-secondary" onClick={() => setResult(null)}>Analyze Another Resume</button>
              </div>
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

export default ResumeAnalysis;
