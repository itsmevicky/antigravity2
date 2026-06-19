import { useState } from 'react';
import { Briefcase, Clock, Code, ExternalLink, Loader } from 'lucide-react';

const Projects = () => {
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleGetProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/projects/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skills: ['React', 'Python', 'SQL'], // Example from context
          target_role: 'Full Stack Developer',
          difficulty: difficulty
        }),
      });
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to get recommendations. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '32px' }}>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Project Recommender</h1>
          <p className="text-muted">Discover tailored projects to build your portfolio and learn new skills.</p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <select 
            className="form-control" 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <button className="btn btn-primary" onClick={handleGetProjects} disabled={loading}>
            {loading ? <Loader className="spin" size={18} /> : 'Get Recommendations'}
          </button>
        </div>
      </div>

      {!projects.length && !loading ? (
        <div className="glass-card flex-center" style={{ minHeight: '300px', flexDirection: 'column', gap: '16px' }}>
          <Briefcase size={48} className="text-muted" />
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Click "Get Recommendations" to generate project ideas based on your skill level.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {projects.map((project, i) => (
            <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', lineHeight: 1.4 }}>{project.title}</h3>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: '100px', 
                  fontSize: '0.8rem',
                  background: project.difficulty === 'Beginner' ? 'rgba(0, 201, 167, 0.1)' : project.difficulty === 'Intermediate' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: project.difficulty === 'Beginner' ? 'var(--success)' : project.difficulty === 'Intermediate' ? 'var(--warning)' : 'var(--danger)'
                }}>
                  {project.difficulty}
                </span>
              </div>
              
              <p className="text-muted" style={{ lineHeight: 1.5, marginBottom: '24px', flex: 1 }}>
                {project.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {project.tech_stack?.map((tech, j) => (
                  <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-light)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '4px' }}>
                    <Code size={14} /> {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex-between" style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Clock size={16} /> {project.duration}
                </div>
                <button className="btn" style={{ background: 'var(--accent-color)', color: 'white', padding: '6px 16px', fontSize: '0.9rem' }}>
                  Start Project <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Projects;
