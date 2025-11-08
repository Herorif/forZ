import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Wishes } from './pages/Wishes';
import { Messages } from './pages/Messages';
import { Milestones } from './pages/Milestones';
import { Navbar } from './components/nav/Navbar';
import { LoveGate } from './pages/LoveGate';
import { Reasons } from './pages/Reasons';
import { Likes } from './pages/Likes';
import { Zalia } from './pages/Zalia';
import { HeartField } from './components/animations/HeartField';

function App() {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
  };

  if (!isAcknowledged) {
    return <LoveGate onAcknowledge={handleAcknowledge} />;
  }

  return (
    <Router>
      <div className="app-shell bg-background text-text">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="aurora-layer" />
          <HeartField density={26} className="opacity-70" />
          <div className="sparkle-overlay" />
        </div>
        <Navbar />
        <main className="relative z-10 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishes" element={<Wishes />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/reasons" element={<Reasons />} />
            <Route path="/likes" element={<Likes />} />
            <Route path="/zalia" element={<Zalia />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
