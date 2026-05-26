import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function EateryVibeScene() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(textRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="story" ref={containerRef} className="section" style={{ minHeight: '100vh', background: '#1c0a02' }}>
      <div ref={textRef} className="content-container" style={{ padding: '6rem 2rem' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-mango)', marginBottom: '1rem' }}>
          Jeff's Cuisine
        </p>
        <h2 className="text-sand">
          Our Story
        </h2>
        <p style={{ marginTop: '0.5rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: 'var(--color-mango)' }}>
          Filipino Food Made With Passion, Family &amp; Pride
        </p>

        <div style={{ maxWidth: '640px', margin: '3rem auto 0' }}>
          <p className="text-sand" style={{ opacity: 0.95, lineHeight: '1.8' }}>
            Jeff started Jeff's Cuisine with a simple idea: bring the Filipino food he grew up loving to Atwater and the Central Valley. What began as a neighborhood spot quickly became a community staple — because when Jeff cooks, you taste the care. Regulars know to call ahead, ask questions, and expect a warm conversation at the counter.
          </p>
          <p className="text-sand" style={{ marginTop: '1.5rem', opacity: 0.85, lineHeight: '1.8' }}>
            It's a true family operation. Jeff's wife and daughter work side by side with him every day — welcoming guests, answering questions about the menu, and making sure every plate feels like it came from someone's home kitchen. Because it does.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'inline-block', border: '1px solid rgba(255,152,0,0.4)', borderRadius: '4px', padding: '0.5rem 1.25rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-mango)', margin: 0 }}>
              Atwater's Filipino Comfort Food Destination
            </p>
          </div>
          <p style={{ marginTop: '1.25rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--color-sand)', opacity: 0.8 }}>
            Made daily. Served with heart. Shared with family.
          </p>
        </div>
      </div>
    </section>
  );
}
