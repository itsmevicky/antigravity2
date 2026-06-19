import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Briefcase, MessageSquare, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
            S
          </div>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }} className="text-gradient">SkillBridge AI</h2>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/dashboard" className="btn btn-secondary">Login</Link>
          <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(102,126,234,0.15) 0%, rgba(10,14,39,0) 70%)', zIndex: -1 }}></div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(102, 126, 234, 0.1)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '100px', marginBottom: '24px', color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: '500' }}>
          <Sparkles size={16} />
          <span>Your Personal AI Career Mentor</span>
        </div>

        <h1 style={{ fontSize: '4rem', maxWidth: '800px', margin: '0 0 24px', lineHeight: 1.1 }}>
          Bridge the Gap to Your <span className="text-gradient">Dream Job</span>
        </h1>
        
        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 0 40px', lineHeight: 1.6 }}>
          AI-powered resume analysis, personalized learning roadmaps, and mock interviews to make you industry-ready.
        </p>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '14px 28px' }}>
            Start Your Journey <ArrowRight size={20} />
          </Link>
          <a href="#features" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '14px 28px' }}>
            Explore Features
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" style={{ padding: '80px 48px', background: 'var(--secondary-bg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Everything You Need to Succeed</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>A complete suite of tools to analyze your skills, recommend projects, and prepare for interviews.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { icon: <Target className="text-gradient" size={32}/>, title: "Skill Gap Analysis", desc: "Compare your current skills with industry requirements and get a personalized roadmap." },
            { icon: <CheckCircle className="text-gradient" size={32}/>, title: "ATS Resume Checker", desc: "Upload your resume to get an instant ATS score and actionable improvement suggestions." },
            { icon: <MessageSquare className="text-gradient" size={32}/>, title: "AI Interview Prep", desc: "Practice technical and behavioral questions with instant AI feedback and scoring." },
            { icon: <Briefcase className="text-gradient" size={32}/>, title: "Project Recommender", desc: "Get tailored project ideas that match your skill level and target role." },
          ].map((feature, i) => (
            <div key={i} className="glass-card" style={{ transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: 'rgba(102, 126, 234, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{feature.title}</h3>
              <p className="text-muted" style={{ lineHeight: 1.5 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        <p>© 2026 SkillBridge AI. Built for the Hackathon.</p>
      </footer>
    </div>
  );
};

export default Landing;
