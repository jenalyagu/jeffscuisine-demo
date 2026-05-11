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
    <section ref={containerRef} className="section">
      <img 
        ref={bgRef}
        src="/family_gathering_dinner_1777778471488.png"
        alt="Family Gathering"
        className="parallax-bg"
        loading="lazy"
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to top, rgba(28,10,2,1), transparent)' }} />
      
      <div ref={textRef} className="content-container" style={{ position: 'absolute', bottom: '15%' }}>
        <h2 className="text-sand" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.8)' }}>
          Bring people together with food <br />
          <span className="text-mango" style={{ fontStyle: 'italic' }}>that feels like home</span>
        </h2>
        <p className="text-sand" style={{ marginTop: '1rem', opacity: 0.9 }}>
          Jeff's Cuisine has catered birthdays, quinceañeras, graduations, and community gatherings across Atwater and the Merced area. When families need Filipino food for a crowd, they call us.
        </p>
      </div>
    </section>
  );
}
