import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  MessageSquare, 
  Briefcase, 
  Users,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Resume Analysis', path: '/resume', icon: <FileText size={20} /> },
    { name: 'Skill Gap', path: '/skills', icon: <Target size={20} /> },
    { name: 'AI Chatbot', path: '/chat', icon: <MessageSquare size={20} /> },
    { name: 'Projects', path: '/projects', icon: <Briefcase size={20} /> },
    { name: 'Interview Prep', path: '/interview', icon: <Users size={20} /> },
  ];

  return (
    <div className="glass-panel" style={{ width: '260px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', background: 'var(--accent-gradient)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>
          S
        </div>
        <h2 style={{ fontSize: '1.25rem', margin: 0 }} className="text-gradient">SkillBridge AI</h2>
      </div>

      <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                color: isActive ? 'white' : 'var(--text-muted)',
                background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(102, 126, 234, 0.2)' : '1px solid transparent',
                transition: 'all 0.2s'
              }}
            >
              {item.icon}
              <span style={{ fontWeight: isActive ? '600' : '400' }}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '24px' }}>
        <button className="btn" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
