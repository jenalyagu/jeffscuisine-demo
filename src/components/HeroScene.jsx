import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroScene() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Text fade in
    gsap.from(textRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5
    });

    // Parallax on scroll
    gsap.to(videoRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section" style={{ height: '100vh', position: 'relative' }}>
      <video 
        ref={videoRef}
        className="hero-video"
        src="/pancitbihon.mp4"
        autoPlay 
        muted 
        loop 
        playsInline
      />
      <div className="cinematic-overlay" />
      
      <div ref={textRef} className="content-container">
        <h1 className="text-sand" style={{ marginBottom: '0.2rem', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
          Jeff's Cuisine
        </h1>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-mango)', fontSize: 'clamp(1.25rem, 3vw, 2rem)', marginBottom: '0.75rem', lineHeight: '1.3', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
          Filipino Comfort Food, Made for Sharing
        </p>
        <p className="text-sand" style={{ fontSize: '1.1rem', marginBottom: '0.75rem', lineHeight: '1.4', opacity: 0.85 }}>
          Authentic lumpia, pancit, adobo, and more — dine-in, takeout, and catering in Atwater, CA
        </p>

        <div className="btn-group">
          <a href="#contact" className="btn btn-primary">Order / Visit Us</a>
          <a href="#catering" className="btn btn-secondary">Get Catering Quote</a>
        </div>

        <p className="text-sand" style={{ marginTop: '0.5rem', opacity: 0.7, fontSize: '1.2rem', letterSpacing: '0.02em' }}>
          1135 Bellevue Road, Atwater, CA 95301 &nbsp;·&nbsp; <a href="tel:+12093863525" style={{ color: 'inherit', textDecoration: 'none' }}>(209) 386-3525</a>
        </p>
      </div>
    </section>
  );
}
