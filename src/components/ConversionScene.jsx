import { MapPin } from 'lucide-react';

export default function ConversionScene() {
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
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="cf-phone">Phone</label>
              <input id="cf-phone" type="tel" placeholder="(555) 000-0000" />
            </div>
            <div className="form-group" style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="cf-date">Event Date</label>
                <input id="cf-date" type="date" />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="cf-guests">Guest Count</label>
                <input id="cf-guests" type="number" placeholder="Estimated guests" min="1" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Request Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
