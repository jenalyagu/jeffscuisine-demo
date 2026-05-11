import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CravingScene() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Parallax with blur effect
    gsap.fromTo(bgRef.current,
      { yPercent: -10, filter: 'blur(10px) brightness(0.8)' },
      {
        yPercent: 10,
        filter: 'blur(0px) brightness(1.1)',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 1.2
        }
      }
    );

    gsap.to(bgRef.current, {
      filter: 'blur(10px) brightness(0.8)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    gsap.fromTo(textRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
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
        src="/3A42DF61-1D08-4846-8D3A-5528EF614473.PNG"
        alt="Steaming pancit bihon noodles being lifted with a fork — a Filipino classic at Jeff's Cuisine in Atwater, CA"
        className="parallax-bg"
        loading="lazy"
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to bottom, rgba(28,10,2,1) 0%, rgba(28,10,2,0.4) 50%, rgba(28,10,2,1) 100%)' }} />
      
      <div ref={textRef} className="content-container">
        <h2 className="text-sand" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Crave-worthy <br />
          <span className="text-mango" style={{ fontStyle: 'italic' }}>Filipino classics</span>
        </h2>
        <p className="text-sand" style={{ marginTop: '1.25rem', opacity: 0.9, textShadow: '0 2px 10px rgba(0,0,0,0.9)' }}>
          Lumpia Shanghai, pancit bihon, chicken adobo, sinigang — the dishes that bring the whole family back.
        </p>
      </div>
    </section>
  );
}
