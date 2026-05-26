import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollytellingEngine from './ScrollytellingEngine';

const panelStyle = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  zIndex: 20,
  padding: '0 2rem',
  textAlign: 'center',
};

const contentStyle = {
  maxWidth: '900px',
  width: '100%',
};

const eyebrowStyle = {
  fontFamily: 'var(--font-sans)',
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--color-mango)',
  marginBottom: '0.75rem',
  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
};

const bulletStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: '1.5rem',
  textAlign: 'left',
  maxWidth: '480px',
  margin: '1.5rem auto 0',
};

const bulletItemStyle = {
  color: 'var(--color-sand)',
  opacity: 0.85,
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.6rem',
  fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
};

export default function HeroScene() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const frameObj = useRef({ frame: 0 });
  const heroRef = useRef(null);
  const classicsRef = useRef(null);
  const signaturesRef = useRef(null);

  useGSAP(() => {
    // Entrance animation for hero text children
    gsap.from(heroRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Master timeline — pinned for 3 scroll-heights, scrubs all phases
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.5,
      },
    });

    // Drive canvas frames 0 → 95 across the full scroll
    tl.to(frameObj.current, {
      frame: 95,
      ease: 'none',
      duration: 3,
      onUpdate: () => engineRef.current?.updateFrame(Math.floor(frameObj.current.frame)),
    }, 0);

    // Phase 1 → 2: Hero fades out, Filipino Classics fades in
    tl.to(heroRef.current, { opacity: 0, y: -50, duration: 0.25, ease: 'power2.in' }, 0.85);
    tl.fromTo(classicsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.25 },
      1.0
    );

    // Phase 2 → 3: Filipino Classics fades out, Signatures fades in
    tl.to(classicsRef.current, { opacity: 0, y: -50, duration: 0.25, ease: 'power2.in' }, 1.85);
    tl.fromTo(signaturesRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.25 },
      2.0
    );
  }, { scope: containerRef });

  return (
    <section id="home" ref={containerRef} className="section" style={{ height: '100vh', position: 'relative' }}>
      <ScrollytellingEngine ref={engineRef} />
      <div className="cinematic-overlay" />

      {/* ── Phase 1: Hero ── */}
      <div ref={heroRef} style={panelStyle}>
        <div style={contentStyle}>
          <p style={eyebrowStyle}>Jeff's Cuisine</p>
          <h1 className="text-sand" style={{ marginBottom: '0.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.6)', lineHeight: '1.1' }}>
            Filipino Classics<br />Made Fresh Daily
          </h1>
          <p className="text-sand" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', marginBottom: '1.5rem', lineHeight: '1.5', opacity: 0.85, maxWidth: '640px', margin: '0 auto 1.5rem' }}>
            Authentic Filipino favorites made fresh in Atwater — from lumpia and pancit to adobo, BBQ, party trays, and full-service catering.
          </p>
          <div className="btn-group">
            <a href="#contact" className="btn btn-primary">Order / Visit Us</a>
            <a href="#catering" className="btn btn-secondary">Get Catering Quote</a>
          </div>
          <p className="text-sand" style={{ marginTop: '1rem', opacity: 0.7, fontSize: '1rem', letterSpacing: '0.02em' }}>
            1135 Bellevue Road, Atwater, CA 95301 &nbsp;·&nbsp;{' '}
            <a href="tel:+12093863525" style={{ color: 'inherit', textDecoration: 'none' }}>(209) 386-3525</a>
          </p>
          <p className="text-sand" style={{ marginTop: '0.35rem', opacity: 0.55, fontSize: '0.9rem', letterSpacing: '0.02em' }}>
            Mon–Sat 11AM–7PM &nbsp;·&nbsp; Closed Sundays
          </p>
        </div>
      </div>

      {/* ── Phase 2: Filipino Classics ── */}
      <div ref={classicsRef} style={{ ...panelStyle, opacity: 0 }}>
        <div style={contentStyle}>
          <p style={eyebrowStyle}>Atwater's Home for Filipino Food</p>
          <h2 className="text-sand" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.7)', marginBottom: '0.5rem' }}>
            Filipino Classics<br />Made Fresh Daily
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-mango)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', marginBottom: '1.25rem' }}>
            Comfort, Flavor &amp; Family on Every Plate
          </p>
          <p className="text-sand" style={{ opacity: 0.88, lineHeight: '1.7', maxWidth: '620px', margin: '0 auto', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
            Jeff's Cuisine brings crave-worthy Filipino comfort food to Atwater, Merced, and the Central Valley. From crispy Lumpia Shanghai and savory pancit to chicken adobo, pork BBQ, and Filipino spaghetti, every dish is made with care and meant to be shared.
          </p>
          <ul style={bulletStyle}>
            {[
              ['Filipino Favorites', 'Lumpia, pancit, adobo, BBQ, and more.'],
              ['Fresh Daily', 'Handmade dishes prepared with care and pride.'],
              ['Made for Sharing', 'Perfect for lunch, dinner, takeout, and gatherings.'],
            ].map(([label, desc]) => (
              <li key={label} style={bulletItemStyle}>
                <span style={{ color: 'var(--color-mango)', flexShrink: 0 }}>—</span>
                <span><strong style={{ color: 'var(--color-mango)' }}>{label}</strong> {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Phase 3: Signatures ── */}
      <div ref={signaturesRef} style={{ ...panelStyle, opacity: 0 }}>
        <div style={contentStyle}>
          <p style={eyebrowStyle}>Crave-Worthy Classics</p>
          <h2 className="text-sand" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.7)', marginBottom: '0.5rem' }}>
            The Dishes People Come Back For
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-mango)', fontSize: 'clamp(1rem, 2vw, 1.3rem)', marginBottom: '2rem' }}>
            Familiar, comforting, and full of flavor.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              ['Lumpia Shanghai', 'Crispy, golden, party-ready, and always a crowd favorite.'],
              ['Pancit Guisado', 'A Filipino classic made for celebrations, family meals, and sharing.'],
              ['Adobo & BBQ', 'Savory, tender, and deeply comforting dishes rooted in Filipino tradition.'],
            ].map(([title, body]) => (
              <div key={title} style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,152,0,0.25)',
                borderRadius: '8px',
                padding: '1.5rem',
                maxWidth: '240px',
                flex: '1 1 200px',
                textAlign: 'left',
              }}>
                <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-mango)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</p>
                <p className="text-sand" style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.5' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
