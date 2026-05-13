import { useState } from 'react';
import { MapPin } from 'lucide-react';

const INITIAL = { name: '', email: '', phone: '', 'event-date': '', guests: '' };

export default function ConversionScene() {
  const [fields, setFields] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  function handleChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    // NOTE: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID
    const FORMSPREE_ID = "xeenvade";

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
      });

      if (!res.ok) throw new Error('Formspree error');

      setStatus('success');
      setFields(INITIAL);
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section" style={{ padding: '4rem 0', minHeight: 'auto' }}>
      <img
        src="/8D8D42DA-4762-47B0-8996-9B2DEE72E895.PNG"
        alt="Golden lumpia party tray — Filipino spring rolls catered by Jeff's Cuisine for events in Atwater and Merced CA"
        className="parallax-bg"
        loading="lazy"
        style={{ objectPosition: 'center' }}
      />
      <div className="cinematic-overlay" style={{ background: 'linear-gradient(to bottom, rgba(28,10,2,0.85), rgba(28,10,2,0.92))' }} />
      <div className="content-container">
        <div style={{ marginBottom: '2rem' }}>
          <MapPin size={40} color="var(--color-mango)" style={{ margin: '0 auto 1rem' }} />
          <p className="text-sand" style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.4rem' }}>
            Jeff's Cuisine
          </p>
          <p className="text-sand" style={{ opacity: 0.8 }}>
            1135 Bellevue Road, Atwater, CA 95301
          </p>
          <p className="text-sand" style={{ opacity: 0.8, marginTop: '0.25rem' }}>
            <a href="tel:+12093863525" style={{ color: 'var(--color-mango)', textDecoration: 'none' }}>(209) 386-3525</a>
          </p>
          <p className="text-sand" style={{ opacity: 0.65, fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Serving Atwater, Merced, and the Central Valley
          </p>
        </div>

        <h2 className="text-sand" style={{ marginBottom: '1rem' }}>
          Ready to Eat or <br />
          <span className="text-mango">Planning an Event?</span>
        </h2>

        <p className="text-sand" style={{ maxWidth: '560px', margin: '0 auto 2.5rem', opacity: 0.85, lineHeight: '1.7' }}>
          Looking for Filipino food near Atwater? Craving lumpia or pancit trays near Merced?
          Whether you're stopping in for lunch or feeding 200 guests, Jeff's Cuisine is your local source for authentic Filipino cooking and catering.
        </p>

        <div className="btn-group" style={{ marginBottom: '4rem' }}>
          <a href="tel:+12093863525" className="btn btn-primary">Order / Visit Us</a>
          <a href="#catering" className="btn btn-secondary">Get Catering Quote</a>
        </div>

        <div id="catering" style={{ background: 'rgba(255,255,255,0.05)', padding: '3rem 2rem', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', border: '1px solid rgba(255,152,0,0.2)' }}>
          <h3 className="text-mango" style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>Request a Filipino Catering Quote</h3>
          <p className="text-sand" style={{ marginBottom: '2rem', opacity: 0.75, fontSize: '0.95rem' }}>
            Party trays, full-service catering, and custom Filipino menus for events in Atwater, Merced, and surrounding areas.
          </p>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--color-mango)', marginBottom: '0.75rem' }}>
                Salamat! We'll be in touch soon.
              </p>
              <p className="text-sand" style={{ opacity: 0.75 }}>
                Your catering request has been received. Expect a call or email from us within 1 business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="cf-name">Name</label>
                <input id="cf-name" name="name" type="text" placeholder="Your Name" required value={fields.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="cf-email">Email</label>
                <input id="cf-email" name="email" type="email" placeholder="you@example.com" required value={fields.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="cf-phone">Phone</label>
                <input id="cf-phone" name="phone" type="tel" placeholder="(555) 000-0000" value={fields.phone} onChange={handleChange} />
              </div>
              <div className="form-group form-flex">
                <div>
                  <label htmlFor="cf-date">Event Date</label>
                  <input id="cf-date" name="event-date" type="date" value={fields['event-date']} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="cf-guests">Guest Count</label>
                  <input id="cf-guests" name="guests" type="number" placeholder="Estimated guests" min="1" value={fields.guests} onChange={handleChange} />
                </div>
              </div>
              {status === 'error' && (
                <p style={{ color: '#ff6b6b', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Something went wrong. Please call us at (209) 386-3525 or try again.
                </p>
              )}
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Request Quote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
