import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function EateryVibeScene() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Camera push forward on scroll
    gsap.fromTo(bgRef.current, 
      { scale: 1 },
      { 
        scale: 1.3,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8
        }
      }
    );

    // Text fade and parallax
    gsap.fromTo(textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section" style={{ minHeight: '160vh' }}>
      <img
        ref={bgRef}
        src="/4BF34EED-6190-424E-AF00-25B068EF1C03.PNG"
        alt="Overhead spread of Filipino catering dishes — lumpia, skewers, pancit, and rice on banana leaves at Jeff's Cuisine, Atwater CA"
        className="parallax-bg"
        loading="lazy"
        style={{ transformOrigin: 'center center' }}
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to bottom, rgba(28,10,2,1) 0%, rgba(28,10,2,0.55) 50%, rgba(28,10,2,1) 100%)' }} />

      <div ref={textRef} className="content-container" style={{ padding: '8rem 2rem' }}>
        <h2 className="text-sand" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          <span className="text-mango" style={{ fontStyle: 'italic' }}>Filipino Classics,</span><br />
          Made Daily.
        </h2>
        <p className="text-sand" style={{ marginTop: '1.25rem', opacity: 0.9, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          Lumpia Shanghai, pancit bihon, chicken adobo, sinigang — handmade and made fresh in Atwater every day.
        </p>

        <div style={{ maxWidth: '640px', margin: '3rem auto 0' }}>
          <p className="text-sand" style={{ opacity: 0.95, lineHeight: '1.8', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            At Jeff's Cuisine, every dish starts with passion, family, and a love for Filipino food.
          </p>
          <p className="text-sand" style={{ marginTop: '1.5rem', opacity: 0.85, lineHeight: '1.8', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            Our cooking is inspired by the flavors many of us grew up with — savory, sweet, sour, comforting, and made to be shared. From traditional favorites to modern Filipino-inspired dishes, our team prepares each plate with care, respect, and pride.
          </p>
          <p className="text-sand" style={{ marginTop: '1.5rem', opacity: 0.85, lineHeight: '1.8', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            Behind the scenes, Jeff's Cuisine is a family effort. Every recipe, ingredient, and finished dish reflects the dedication of a kitchen that cooks from the heart.
          </p>
          <p style={{ marginTop: '2.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--color-mango)', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            Experience Filipino food made with tradition, love, and a modern touch.
          </p>
        </div>
      </div>
    </section>
  );
}
