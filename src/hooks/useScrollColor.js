import { useEffect } from 'react';

export const useScrollColor = () => {
  useEffect(() => {
    const handleScroll = () => {
      // Toplam kaydırılabilir yüksekliği ve anlık konumu al
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Kaydırma oranını hesapla (0 ile 1 arası bir değer)
      const scrolled = height > 0 ? winScroll / height : 0;

      // Bu oranı CSS değişkeni olarak body'e ata
      document.body.style.setProperty('--scroll-ratio', scrolled);
    };

    // Passive ayarı sayesinde tarayıcıyı kastırmaz
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Sayfa yüklendiğinde konumu hemen kontrol et

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};