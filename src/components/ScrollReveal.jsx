import { useEffect, useRef, useState } from 'react';
import '../styles/scrollReveal.css';

function ScrollReveal({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Kesişim Gözlemcisi: Element ekrana girdi mi diye kontrol eder
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animasyon sadece bir kere çalışsın diye takibi bırakır
        }
      },
      {
        threshold: 0.15, // Elementin %15'i ekranda göründüğünde animasyon başlar
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, []);

  return (
    <div ref={elementRef} className={`reveal-wrapper ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
}

export default ScrollReveal;