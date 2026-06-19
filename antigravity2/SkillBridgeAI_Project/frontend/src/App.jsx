import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ResumeAnalysis from './pages/ResumeAnalysis';
import SkillGap from './pages/SkillGap';
import Chatbot from './pages/Chatbot';
import Projects from './pages/Projects';
import Interview from './pages/Interview';


function AppLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Protected routes wrapped in AppLayout */}
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/resume" element={<AppLayout><ResumeAnalysis /></AppLayout>} />
        <Route path="/skills" element={<AppLayout><SkillGap /></AppLayout>} />
        <Route path="/chat" element={<AppLayout><Chatbot /></AppLayout>} />
        <Route path="/projects" element={<AppLayout><Projects /></AppLayout>} />
        <Route path="/interview" element={<AppLayout><Interview /></AppLayout>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
