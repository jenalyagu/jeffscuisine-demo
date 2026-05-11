import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function EateryExperienceScene() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Subtle parallax
    gsap.fromTo(bgRef.current,
      { yPercent: -5 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    gsap.fromTo(textRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 0.8
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section">
      <img 
        ref={bgRef}
        src="/4BF34EED-6190-424E-AF00-25B068EF1C03.PNG"
        alt="Overhead view of a Filipino catering spread — lumpia, skewers, pancit, and rice served by Jeff's Cuisine in Atwater CA"
        className="parallax-bg"
        loading="lazy"
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to right, rgba(28,10,2,0.9) 0%, rgba(28,10,2,0.4) 100%)' }} />
      
      <div ref={textRef} className="content-container" style={{ textAlign: 'left' }}>
        <h2 className="text-sand" style={{ marginBottom: '1rem', textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
          Perfect for lunch, <br />
          dinner, or <span className="text-mango">takeout</span>
        </h2>
        <p className="text-sand" style={{ marginBottom: '2rem', opacity: 0.9, maxWidth: '480px', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
          Jeff's Cuisine is Atwater's home for Filipino food. Walk in or call ahead — serving Atwater, Merced, and the Central Valley.
        </p>
        <a href="#menu" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}>
          View Menu
        </a>
      </div>
    </section>
  );
}
