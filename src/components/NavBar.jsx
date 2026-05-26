import { useState, useEffect } from 'react';


const links = [
  { label: 'Food',      href: '#home' },
  { label: 'Catering',  href: '#catering' },
  { label: 'Menu',      href: '#menu' },
  { label: 'Reviews',   href: '#reviews' },
  { label: 'About',     href: '#story' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleLinkClick() {
    setOpen(false);
  }

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <a href="#home" className="navbar-logo" onClick={handleLinkClick}>
        Jeff's Cuisine
      </a>

      <ul className={`navbar-links${open ? ' navbar-links--open' : ''}`}>
        {links.map(({ label, href }) => (
          <li key={href}>
            <a href={href} className="navbar-link" onClick={handleLinkClick}>
              {label}
            </a>
          </li>
        ))}
        <li className="navbar-social">
          <a href="https://www.facebook.com" aria-label="Facebook" className="navbar-icon-link" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
            FB
          </a>
          <a href="https://www.instagram.com" aria-label="Instagram" className="navbar-icon-link" target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
            IG
          </a>
        </li>
        <li>
          <a href="#catering" className="btn btn-primary navbar-cta" onClick={handleLinkClick}>
            Get Catering Quote
          </a>
        </li>
      </ul>

      <button
        className="navbar-hamburger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className={`hamburger-bar${open ? ' hamburger-bar--open' : ''}`} />
        <span className={`hamburger-bar${open ? ' hamburger-bar--open' : ''}`} />
        <span className={`hamburger-bar${open ? ' hamburger-bar--open' : ''}`} />
      </button>
    </nav>
  );
}
