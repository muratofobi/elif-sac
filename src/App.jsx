import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin'; 
import ProjectModal from './components/ProjectModal';
import './styles/global.css';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. GİZLİ ADMIN ADRESİNİ BURADA BELİRLİYORSUN (İstediğin gibi değiştir)
  const SECRET_ADMIN_ROUTE = "/mensrea-24"; 

  // 2. Eğer şu anki sayfa gizli admin adresi DEĞİLSE true döner, yani animasyonu gösterir
  const showPreloader = location.pathname !== SECRET_ADMIN_ROUTE;

  return (
    <>
      {/* 3. Sadece showPreloader true ise Preloader bileşenini ekrana bas */}
      {showPreloader && <Preloader />}

      <div className="app-container">
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        <div 
          className={`main-content ${isMenuOpen ? 'pushed' : ''}`}
          onClick={() => isMenuOpen && setIsMenuOpen(false)} 
        >
          <Routes location={background || location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectModal />} />
            
            {/* 4. Admin sayfasının rotasını gizli değişkenimize bağladık */}
            <Route path={SECRET_ADMIN_ROUTE} element={<Admin />} />
          </Routes>

          {background && (
            <Routes>
              <Route path="/projects/:id" element={<ProjectModal />} />
            </Routes>
          )}
        </div>
      </div>
    </>
  );
}

export default App;