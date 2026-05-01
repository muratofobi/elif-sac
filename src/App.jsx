import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin'; 
import ProjectModal from './components/ProjectModal';
import './styles/global.css';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  
  // Navbar'ın durumunu artık tüm siteyi yönetmesi için buraya taşıdık
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Navbar'a açma/kapama yetkisini gönderiyoruz */}
      <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* TÜM SİTE İÇERİĞİ: Menü açıldığında 'pushed' class'ı eklenir */}
      <div 
        className={`main-content ${isMenuOpen ? 'pushed' : ''}`}
        onClick={() => isMenuOpen && setIsMenuOpen(false)} // Siteye tıklanınca menüyü kapatır
      >
        <Routes location={background || location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        {background && (
          <Routes>
            <Route path="/projects/:id" element={<ProjectModal />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;