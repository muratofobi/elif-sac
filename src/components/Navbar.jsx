import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isOpen, setIsOpen }) {
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Butonu */}
      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Çekmece Menü */}
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar__content">
          <ul className="sidebar__links">
            <li><Link to="/projects" onClick={handleLinkClick}>Projeler</Link></li>
            
            {/* BAŞLARINA '/' EKLENDİ: Önce anasayfaya git, sonra o ID'ye kay */}
            <li><Link to="/#vizyonumuz" onClick={handleLinkClick}>Vizyonumuz</Link></li>
            <li><Link to="/#hakkimizda" onClick={handleLinkClick}>Hakkımızda</Link></li>
            <li><Link to="/#iletisim" onClick={handleLinkClick}>İletişim</Link></li>
            
            {/* Dış link olduğu için <a> etiketi olarak kalıyor */}
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" onClick={handleLinkClick}>Instagram</a></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;