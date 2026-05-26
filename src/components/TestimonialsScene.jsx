import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const reviews = [
  {
    name: 'Pedro Aguilar',
    badge: 'Local Guide',
    quote: 'Great experience. Mr Jeff was very welcoming and friendly! I got the pork bbq and the pork lumpia and they were very delicious! Will definitely go back and take family and friends!',
  },
  {
    name: 'Miracle T. Boginisoko',
    badge: 'Local Guide',
    quote: 'We\'re visiting from Anaheim, CA & found this family owned gem on Google. The food was delicious, customer service was super friendly, & I enjoyed the halo-halo! My chicken adobo was very flavorful & moist — loved that they also had chicken lumpia as we don\'t eat pork!',
  },
  {
    name: 'Mid Valley Mercenaries',
    badge: 'Google Review',
    quote: 'The kindness and hospitality was the best I\'ve seen in years at a restaurant. The lady and her daughter were so kind and welcoming. Made me feel at home. I got bbq pork, bbq chicken, chicken lumpia, fried rice, noodles, and the spaghetti. All of it was a 10 out of 10.',
  },
  {
    name: 'Aggie Freeman',
    badge: 'Google Review',
    quote: 'I ordered a banquet tray of lumpia for a potluck event. Portion size was huge. Lumpia was a huge crowd pleaser. Take out meals are delicious for lunch or dinner to go. Highly recommend.',
  },
  {
    name: 'Raquel Rodriguez',
    badge: 'Local Guide',
    quote: 'From the phone call to the transaction, the owner was very sweet and joyful. The food was prepared quickly and the flavors are amazing. The price is amazing as well. Will be recommending this place to everyone and coming back!',
  },
];

function StarRow() {
  return (
    <div className="testimonial-stars" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </div>
  );
}

export default function TestimonialsScene() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(headRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 0.8,
        },
      }
    );

    gsap.fromTo(gridRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="reviews" ref={sectionRef} style={{ background: '#130600', padding: '6rem 0' }}>
      <div className="content-container">

        <div ref={headRef} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-mango)', marginBottom: '0.75rem' }}>
            Google Reviews
          </p>
          <h2 className="text-sand">What Guests Are Saying</h2>
          <p className="text-sand" style={{ marginTop: '0.75rem', opacity: 0.55, fontSize: '0.95rem' }}>
            All 5 stars · Verified Google Reviews
          </p>
        </div>

        <div ref={gridRef} className="testimonials-grid">
          {reviews.map(({ name, badge, quote }) => (
            <div key={name} className="testimonial-card">
              <StarRow />
              <p className="testimonial-quote">"{quote}"</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{name}</span>
                <span className="testimonial-badge">{badge}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a
            href="https://g.page/r/CUNXwnVrhIUiEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            Leave a Google Review
          </a>
        </div>

      </div>
    </section>
  );
}
