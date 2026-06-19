import { Activity, Award, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="page-container animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome back, Demo User! 👋</h1>
          <p className="text-muted">Here's your career progress at a glance.</p>
        </div>
        <Link to="/resume" className="btn btn-primary">
          Analyze New Resume
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {[
          { title: "ATS Score", value: "72%", icon: <Activity className="text-gradient" />, color: "var(--warning)" },
          { title: "Skills Learned", value: "14", icon: <BookOpen className="text-gradient" />, color: "var(--success)" },
          { title: "Projects Built", value: "3", icon: <Star className="text-gradient" />, color: "var(--accent-color)" },
          { title: "Badges Earned", value: "5", icon: <Award className="text-gradient" />, color: "var(--accent-color)" },
        ].map((stat, i) => (
          <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{stat.title}</p>
              <h3 style={{ fontSize: '1.8rem', color: stat.color || 'white' }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Activity */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Next Steps in Roadmap</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { task: "Learn React Hooks", time: "2 hours", type: "Skill" },
              { task: "Build a Weather App", time: "1 day", type: "Project" },
              { task: "Practice Behavioral Questions", time: "30 mins", type: "Interview" },
            ].map((activity, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '4px' }}>{activity.task}</div>
                  <div className="text-muted" style={{ fontSize: '0.85rem' }}>{activity.time}</div>
                </div>
                <div style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', background: 'rgba(102, 126, 234, 0.1)', color: 'var(--accent-color)' }}>
                  {activity.type}
                </div>
              </div>
            ))}
          </div>
          <Link to="/skills" className="btn btn-secondary" style={{ width: '100%', marginTop: '20px' }}>View Full Roadmap</Link>
        </div>

        {/* Badges */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '24px', fontSize: '1.25rem' }}>Your Badges</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: '🚀', name: 'First Steps' },
              { icon: '📄', name: 'Resume Pro' },
              { icon: '💬', name: 'Curious Mind' },
              { icon: '🎯', name: 'Skill Hunter' },
            ].map((badge, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
