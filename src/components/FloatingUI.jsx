import { Phone } from 'lucide-react';

export default function FloatingUI() {
  return (
    <div className="floating-ui">
      <a href="tel:+12093863525" className="floating-btn" aria-label="Call Us">
        <Phone size={24} />
      </a>
    </div>
  );
}
