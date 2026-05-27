import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CATEGORIES = ['All', 'Meals', 'Sides', 'Catering'];

const menuItems = [
  { name: 'Pork Barbeque Meal',   price: '$9.99',  category: 'Meals',    desc: 'Pork barbeque, choice of white or fried rice, pancit noodles, vegetables, and 5 lumpia.',    img: '/menu-photos/Pork Barbeque Meal.jpg' },
  { name: 'Chicken Barbeque Meal',price: '$9.99',  category: 'Meals',    desc: 'Chicken barbeque, choice of white or fried rice, pancit noodles, vegetables, and 5 lumpia.',  img: '/menu-photos/Chicken Barbeque Meal.jpg' },
  { name: 'Chicken Adobo Meal',   price: '$9.99',  category: 'Meals',    desc: 'Chicken adobo, choice of white or fried rice, pancit noodles, vegetables, and 5 lumpia.',    img: '/menu-photos/Chicken Adobo Meal.jpg' },
  { name: 'Pork Adobo Meal',      price: '$9.99',  category: 'Meals',    desc: 'Pork adobo, choice of white or fried rice, pancit noodles, vegetables, and 5 lumpia.',       img: '/menu-photos/Pork Adobo Meal.jpg' },
  { name: 'Chicken Cutlet Meal',  price: '$9.99',  category: 'Meals',    desc: 'Breaded chicken cutlet, choice of white or fried rice, pancit noodles, and 5 lumpia.',       img: '/menu-photos/Chicken Cutlet Meal.jpg' },
  { name: 'Mini-Meal',            price: '$8.75',  category: 'Meals',    desc: 'Mini-size meat option with white or fried rice, pancit noodles, vegetables, and 5 lumpia.',  img: '/menu-photos/Mini-Meal.jpg' },
  { name: 'Pork Lumpia',          price: '$8.75',  category: 'Sides',    desc: 'Crispy Filipino spring rolls filled with seasoned pork and vegetables. 17 pieces.',         img: '/menu-photos/Pork Lumpia.jpg' },
  { name: 'Chicken Lumpia',       price: '$8.75',  category: 'Sides',    desc: 'Crispy Filipino spring rolls filled with seasoned chicken and vegetables. 17 pieces.',      img: '/menu-photos/Chicken Lumpia.jpg' },
  { name: 'Fried Rice',           price: '$8.99',  category: 'Sides',    desc: 'Seasoned fried rice with peas and carrots. A classic Filipino staple.',                     img: '/menu-photos/Fried Rice.jpg' },
  { name: 'Pancit Guisado',       price: '$9.99',  category: 'Sides',    desc: 'Filipino bihon noodles stir-fried with mixed vegetables and savory seasonings.',            img: '/menu-photos/Pancit Guisado.jpg' },
  { name: 'Filipino Spaghetti',   price: '$9.99',  category: 'Sides',    desc: 'Sweet-style spaghetti with banana sauce, hot dogs, ground beef, and tomato sauce.',        img: '/menu-photos/Filipino Spaghetti.jpg' },
  { name: 'Pork BBQ Tray',        price: '$79.00', category: 'Catering', desc: 'Medium catering tray of tender pork skewers in sweet-savory barbecue sauce.',              img: '/menu-photos/Pork BBQ.jpg' },
  { name: 'Chicken BBQ Tray',     price: '$79.00', category: 'Catering', desc: 'Medium catering tray of juicy chicken skewers in sweet-savory barbecue sauce.',            img: '/menu-photos/Chicken BBQ.jpg' },
];

const additionalItems = [
  { section: 'Side Orders', items: [
    { name: 'White Rice',       price: '$8.99' },
    { name: 'Mixed Vegetables', price: '$8.99' },
    { name: 'Chicken Cutlet',   price: '$10.99' },
    { name: 'Pork BBQ',         price: '$10.99' },
    { name: 'Chicken BBQ',      price: '$10.99' },
    { name: 'Pork Adobo',       price: '$10.99' },
    { name: 'Chicken Adobo',    price: '$10.99' },
  ]},
  { section: 'Catering Trays', items: [
    { name: 'Pork Lumpia, 75 pcs',      price: '$44.00' },
    { name: 'Chicken Lumpia, 75 pcs',   price: '$44.00' },
    { name: 'Chicken Adobo',            price: '$79.00' },
    { name: 'Pork Adobo',               price: '$79.00' },
    { name: 'White Rice',               price: '$51.50' },
    { name: 'Fried Rice',               price: '$69.00' },
    { name: 'Pancit Guisado',           price: '$73.50' },
    { name: 'Filipino Spaghetti',       price: '$81.50' },
    { name: 'Mixed Vegetables',         price: '$59.00' },
    { name: 'Island Mixed Vegetables',  price: '$71.50' },
    { name: 'Chicken Afritada',         price: '$93.50' },
    { name: 'Pork Afritada',            price: '$93.50' },
    { name: 'Chicken Curry',            price: '$93.50' },
    { name: 'Pork Menudo',              price: '$93.50' },
    { name: 'Pork Pinakbet',            price: '$93.50' },
    { name: 'Pork Dinuguan',            price: '$93.50' },
    { name: 'Pork Bicol Express',       price: '$99.00' },
    { name: 'Pork Sisig',               price: '$99.00' },
    { name: 'Beef Caldereta',           price: '$112.00' },
    { name: 'Pork Kare-Kare',           price: '$99.00' },
    { name: 'Beef Kare-Kare',           price: '$112.00' },
    { name: 'Chicken Pasta, Alfredo',   price: '$81.50' },
    { name: 'Chicken Pasta, Tomato',    price: '$81.50' },
  ]},
  { section: 'Catering Desserts', items: [
    { name: 'Biko',              price: '$56.50' },
    { name: 'Maja Blanca',       price: '$56.50' },
    { name: 'Cassava Cake',      price: '$60.50' },
    { name: 'Turon, 50 pcs',     price: '$56.50' },
  ]},
];

function MenuCard({ name, price, desc, img }) {
  return (
    <div className="menu-card">
      <div className="menu-card-image-wrap">
        <img src={img} alt={name} className="menu-card-img" loading="lazy" />
        <div className="menu-card-overlay">
          <p className="menu-card-desc">{desc}</p>
        </div>
      </div>
      <div className="menu-card-info">
        <span className="menu-card-name">{name}</span>
        <span className="menu-card-price">{price}</span>
      </div>
    </div>
  );
}

export default function MenuGridScene() {
  const [active, setActive] = useState('All');
  const gridRef = useRef(null);
  const sectionRef = useRef(null);

  const filtered = active === 'All' ? menuItems : menuItems.filter(i => i.category === active);

  useGSAP(() => {
    gsap.from('.menu-card', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.07,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    });
  }, { scope: sectionRef, dependencies: [] });

  // Re-animate on filter change
  function handleFilter(cat) {
    setActive(cat);
    requestAnimationFrame(() => {
      gsap.from(gridRef.current?.querySelectorAll('.menu-card') ?? [], {
        y: 24,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
      });
    });
  }

  return (
    <section id="menu" ref={sectionRef} style={{ background: '#160800', padding: '6rem 0' }}>

      <div className="content-container" style={{ textAlign: 'left' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="text-sand">Our Menu</h2>
          <p className="text-sand" style={{ marginTop: '0.75rem', opacity: 0.6 }}>
            Authentic Filipino food made fresh daily in Atwater, CA
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="menu-filter-bar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`menu-filter-btn${active === cat ? ' menu-filter-btn--active' : ''}`}
              onClick={() => handleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div ref={gridRef} className="menu-grid">
          {filtered.map(item => (
            <MenuCard key={item.name} {...item} />
          ))}
        </div>

        {/* Full Pricing List */}
        <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,152,0,0.15)', paddingTop: '3.5rem' }}>
          <h3 className="text-sand" style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontFamily: 'var(--font-serif)' }}>
            Full Pricing
          </h3>
          <div className="menu-full-grid">
            {additionalItems.map(({ section, items }) => (
              <div key={section} className="menu-full-section">
                <h4 className="text-mango menu-full-heading">{section}</h4>
                {items.map(({ name, price }) => (
                  <div key={name} className="menu-full-row">
                    <span>{name}</span>
                    <span className="text-mango">{price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', margin: '3.5rem 0 2rem' }}>
          <a href="#catering" className="btn btn-primary">Request a Catering Quote</a>
        </div>

        {/* Disclaimer */}
        <p style={{ color: 'var(--color-sand)', opacity: 0.4, fontSize: '0.78rem', lineHeight: '1.7', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem' }}>
          Prices may change without notice. Cash prices may differ from card prices. Tax not included. Additional card fees may apply.
          Please contact Jeff's Cuisine directly for current pricing, catering quotes, and allergy concerns.
          Food may contain milk, eggs, wheat, soybean, peanuts, tree nuts, fish, and shellfish.
        </p>

      </div>
    </section>
  );
}
