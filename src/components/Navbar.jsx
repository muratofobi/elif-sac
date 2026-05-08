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
            <li><Link to="/#vizyonumuz" onClick={handleLinkClick}>Vizyonumuz</Link></li>
            <li><Link to="/#hakkimizda" onClick={handleLinkClick}>Hakkımızda</Link></li>
            <li><Link to="/#iletisim" onClick={handleLinkClick}>İletişim</Link></li>
            <li><a href="https://www.instagram.com/mensrea_/" target="_blank" rel="noreferrer" onClick={handleLinkClick}>
              <svg fill="currentColor" width="64" height="64" viewBox="0 0 32 32" id="Camada_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

                <g>

                  <path d="M22.3,8.4c-0.8,0-1.4,0.6-1.4,1.4c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4C23.7,9,23.1,8.4,22.3,8.4z" />

                  <path d="M16,10.2c-3.3,0-5.9,2.7-5.9,5.9s2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9S19.3,10.2,16,10.2z M16,19.9c-2.1,0-3.8-1.7-3.8-3.8   c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C19.8,18.2,18.1,19.9,16,19.9z" />

                  <path d="M20.8,4h-9.5C7.2,4,4,7.2,4,11.2v9.5c0,4,3.2,7.2,7.2,7.2h9.5c4,0,7.2-3.2,7.2-7.2v-9.5C28,7.2,24.8,4,20.8,4z M25.7,20.8   c0,2.7-2.2,5-5,5h-9.5c-2.7,0-5-2.2-5-5v-9.5c0-2.7,2.2-5,5-5h9.5c2.7,0,5,2.2,5,5V20.8z" />

                </g>

              </svg></a></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;