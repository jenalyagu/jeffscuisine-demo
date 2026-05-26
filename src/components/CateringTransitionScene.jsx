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
        end: '+=150%',
        pin: true,
        scrub: 2,
      },
    });

    gsap.set(bgRef.current, { scale: 3, transformOrigin: 'center center' });

    tl.fromTo(text1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .to(text1Ref.current, { opacity: 0, y: -30, duration: 1 }, '+=0.5')
      .to(bgRef.current, { scale: 1, duration: 4, ease: 'power2.inOut' }, '-=1')
      .fromTo(text2Ref.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, '-=1')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section" style={{ background: '#000' }}>
      <img
        ref={bgRef}
        src="/catering_spread_overhead_1777778455639.png"
        alt="Catering Spread"
        loading="lazy"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to bottom, rgba(28,10,2,0.8), rgba(28,10,2,0.4) 50%, rgba(28,10,2,0.8))' }} />

      <div className="content-container">
        {/* Phase 1: eyebrow + H2 */}
        <div ref={text1Ref} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', padding: '0 2rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-mango)', marginBottom: '0.75rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            Filipino Catering
          </p>
          <h2 className="text-sand" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
            Feeding More Than a Table
          </h2>
        </div>

        {/* Phase 2: title + body + pull quote */}
        <div ref={text2Ref} style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', padding: '0 2rem' }}>
          <h2 className="text-mango" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)', marginBottom: '1rem' }}>
            We Cater the Whole Celebration
          </h2>
          <p className="text-sand" style={{ maxWidth: '580px', margin: '0 auto', opacity: 0.88, lineHeight: '1.7', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            Jeff's Cuisine offers Filipino party trays, full-service catering, and custom menus for events across Atwater, Merced, and the Central Valley. Whether you're feeding a small family gathering or a large celebration, our kitchen helps make the food feel warm, generous, and familiar.
          </p>
          <p style={{ marginTop: '1.75rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--color-mango)', textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}>
            "Food that brings people together — made with tradition, care, and heart."
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ position: 'absolute', top: '72%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <a href="#catering" className="btn btn-primary">Get Catering Quote</a>
        </div>
      </div>
    </section>
  );
}
