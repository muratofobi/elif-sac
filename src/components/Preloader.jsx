import { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import '../styles/preloader.css';

function Preloader() {
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Lottie animasyonundaki olayları (event) dinliyoruz
  const handleEvent = (event) => {
    if (event === 'complete') {
      setIsFading(true); // Animasyon bittiği an sisli dağılmayı başlat
      
      setTimeout(() => {
        setIsHidden(true); // Sis dağıldıktan sonra DOM'dan tamamen sil
      }, 1500); // CSS'teki transition süremiz (1.5 saniye)
    }
  };

  // Tamamen gizlendiğinde siteyi yormaması için hiçbir şey döndürme
  if (isHidden) return null;

  return (
    <div className={`preloader-container ${isFading ? 'fade-out' : ''}`}>
      <Player
        src="/image_site/loading.json" // Dosyanın yolu (public klasöründe olduğu için direkt kök dizinden başlar)
        autoplay={true}
        loop={false}
        keepLastFrame={true} // Animasyon bitince son karede kalsın (aniden kaybolmasın)
        onEvent={handleEvent} // Olay dinleyicimiz
        style={{ height: '300px', width: '300px' }} // Büyüklüğü buradan ayarlayabilirsin
      />
    </div>
  );
}

export default Preloader;