import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const steps = [
  { num: '01', label: 'Visit',    body: 'Stop by Jeff\'s Cuisine in Atwater for Filipino comfort food made fresh daily.' },
  { num: '02', label: 'Order',    body: 'Call ahead for lunch, dinner, takeout, or family meals.' },
  { num: '03', label: 'Share',    body: 'Bring home lumpia, pancit, BBQ, adobo, rice, and sides for the whole table.' },
  { num: '04', label: 'Celebrate', body: 'Order party trays or catering for birthdays, graduations, quinceañeras, and community events.' },
];

export default function EateryExperienceScene() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(bgRef.current,
      { yPercent: -5 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
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
          scrub: 0.8,
        },
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
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to right, rgba(28,10,2,0.92) 0%, rgba(28,10,2,0.45) 100%)' }} />

      <div ref={textRef} className="content-container" style={{ textAlign: 'left' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-mango)', marginBottom: '0.75rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          Food Your Way
        </p>
        <h2 className="text-sand" style={{ marginBottom: '2.5rem', textShadow: '0 4px 15px rgba(0,0,0,0.5)', maxWidth: '560px' }}>
          Dine In, Take Out,<br />or Feed the Whole Party
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
          {steps.map(({ num, label, body }) => (
            <div key={num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-mango)', opacity: 0.7, minWidth: '28px', paddingTop: '0.25rem' }}>
                {num}
              </span>
              <div>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-sand)', marginBottom: '0.2rem', fontSize: '1rem', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                  {label}
                </p>
                <p className="text-sand" style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.6', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <a href="#menu" className="btn btn-primary" style={{ marginTop: '2.5rem', fontSize: '0.9rem', padding: '0.75rem 1.5rem' }}>
          View Menu
        </a>
      </div>
    </section>
  );
}
