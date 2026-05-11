import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CateringTransitionScene() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%', // Pin for a while to allow dramatic pull back
        pin: true,
        scrub: 2
      }
    });

    // Start very zoomed in
    gsap.set(bgRef.current, { scale: 3, transformOrigin: 'center center' });

    // Sequence
    tl.fromTo(text1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .to(text1Ref.current, { opacity: 0, y: -30, duration: 1 }, "+=0.5")
      .to(bgRef.current, { scale: 1, duration: 4, ease: 'power2.inOut' }, "-=1")
      .fromTo(text2Ref.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, "-=1")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
      
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section" style={{ background: '#000' }}>
      <img 
        ref={bgRef}
        src="/catering_spread_overhead_1777778455639.png"
        alt="Catering Spread"
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 'var(--z-bg)'
        }}
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to bottom, rgba(28,10,2,0.8), rgba(28,10,2,0.4) 50%, rgba(28,10,2,0.8))' }} />
      
      <div className="content-container">
        <h2 ref={text1Ref} className="text-sand" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          Feeding more than <br /> a table...
        </h2>
        
        <div ref={text2Ref} style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
          <h2 className="text-mango" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            We cater the whole celebration
          </h2>
          <p className="text-sand" style={{ marginTop: '1rem', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Filipino Party Trays • Full-Service Catering • Custom Menus
          </p>
          <p className="text-sand" style={{ marginTop: '0.75rem', opacity: 0.8, textTransform: 'none', letterSpacing: 'normal', fontWeight: 400 }}>
            Serving Atwater, Merced, and the Central Valley
          </p>
        </div>
        
        <div ref={ctaRef} style={{ position: 'absolute', top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <a href="#catering" className="btn btn-primary">Get Catering Quote</a>
        </div>
      </div>
    </section>
  );
}
