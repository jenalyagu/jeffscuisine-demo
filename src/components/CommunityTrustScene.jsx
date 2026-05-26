import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function CommunityTrustScene() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(bgRef.current,
      { filter: 'sepia(0.5) brightness(0.6)' },
      {
        filter: 'sepia(0) brightness(1)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'center center',
          scrub: 1.5
        }
      }
    );

    gsap.fromTo(textRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.3,
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
    <section id="community" ref={containerRef} className="section">
      <img 
        ref={bgRef}
        src="/family_gathering_dinner_1777778471488.png"
        alt="Family Gathering"
        className="parallax-bg"
        loading="lazy"
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to top, rgba(28,10,2,1), transparent)' }} />
      
      <div ref={textRef} className="content-container" style={{ position: 'absolute', bottom: '15%' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-mango)', marginBottom: '0.75rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          Local Favorite
        </p>
        <h2 className="text-sand" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
          Bringing People Together With Food <br />
          <span className="text-mango" style={{ fontStyle: 'italic' }}>That Feels Like Home</span>
        </h2>
        <p className="text-sand" style={{ marginTop: '1rem', opacity: 0.9 }}>
          Jeff's Cuisine has catered birthdays, quinceañeras, graduations, and community gatherings across Atwater and the Merced area. When families need Filipino food for a crowd, they call Jeff's Cuisine.
        </p>
        <ul style={{ marginTop: '1.25rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li className="text-sand" style={{ opacity: 0.85, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--color-mango)', fontSize: '1.1rem' }}>—</span>
            Trusted for family celebrations and community gatherings.
          </li>
          <li className="text-sand" style={{ opacity: 0.85, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--color-mango)', fontSize: '1.1rem' }}>—</span>
            Known for Filipino comfort food made with care.
          </li>
          <li className="text-sand" style={{ opacity: 0.85, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: 'var(--color-mango)', fontSize: '1.1rem' }}>—</span>
            Proudly serving Atwater, Merced, and the Central Valley.
          </li>
        </ul>
      </div>
    </section>
  );
}
