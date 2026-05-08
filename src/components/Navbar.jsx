import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ── HAMBURGER BUTONU (Hem PC'de hem Mobilde çalışır) ── */}
      <button 
        className={`nav-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* ── MENÜ KAPSAYICISI ── */}
      <nav className={`navbar ${isOpen ? 'active' : ''}`}>
        <div className="nav-links">
          <Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active-link' : ''}>
            Home
          </Link>
          <Link to="/projects" onClick={closeMenu} className={location.pathname === '/projects' ? 'active-link' : ''}>
            Drawings
          </Link>
          
          {/* İNSTAGRAM SVG İKONU (Görseli bozmadan ekledik) */}
          <a href="https://www.instagram.com/mensrea_/" target="_blank" rel="noreferrer" onClick={closeMenu} className="nav-social">
            <img 
              src="/image_site/instagram-logo-facebook-2-svgrepo-com.svg" 
              alt="Instagram" 
              className="nav-svg-icon"
            />
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;