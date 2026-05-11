const meals = [
  { name: 'Pork Barbeque Meal', price: '$9.99', desc: 'Pork barbeque, choice of white rice or fried rice, pancit noodles, vegetable toppings, and 5 pieces of lumpia.' },
  { name: 'Chicken Barbeque Meal', price: '$9.99', desc: 'Chicken barbeque, choice of white rice or fried rice, pancit noodles, vegetable toppings, and 5 pieces of lumpia.' },
  { name: 'Chicken Adobo Meal', price: '$9.99', desc: 'Chicken adobo, choice of white rice or fried rice, pancit noodles, vegetable toppings, and 5 pieces of lumpia.' },
  { name: 'Pork Adobo Meal', price: '$9.99', desc: 'Pork adobo, choice of white rice or fried rice, pancit noodles, vegetable toppings, and 5 pieces of lumpia.' },
  { name: 'Chicken Cutlet Meal', price: '$9.99', desc: 'Chicken cutlet, choice of white rice or fried rice, pancit noodles, vegetable toppings, and 5 pieces of lumpia.' },
  { name: 'Mini-Meal', price: '$8.75', desc: 'Mini-size meat option, choice of white rice or fried rice, pancit noodles, vegetable toppings, and 5 pieces of lumpia.' },
];

const sides = [
  { name: 'Pork Lumpia, 17 pcs', price: '$8.75', desc: 'Filipino-style spring rolls made with pork and vegetables.' },
  { name: 'Chicken Lumpia, 17 pcs', price: '$8.75', desc: 'Filipino-style spring rolls made with chicken and vegetables.' },
  { name: 'White Rice', price: '$8.99', desc: 'Single plate serving of white rice.' },
  { name: 'Fried Rice', price: '$8.99', desc: 'Single plate of fried rice with seasoning, peas, and carrots.' },
  { name: 'Mixed Vegetables', price: '$8.99', desc: 'Single plate of cabbage, green beans, and carrots.' },
  { name: 'Pancit Guisado', price: '$9.99', desc: 'Filipino bihon noodles with mixed vegetable toppings.' },
  { name: 'Filipino Spaghetti', price: '$9.99', desc: 'Sweet-style spaghetti with tomato sauce, banana sauce, hot dog slices, and ground beef.' },
  { name: 'Chicken Cutlet', price: '$10.99', desc: 'Breaded chicken cutlet coated with batter and bread crumbs.' },
  { name: 'Pork BBQ', price: '$10.99', desc: 'Single plate of pork barbecue with sauce.' },
  { name: 'Chicken BBQ', price: '$10.99', desc: 'Single plate of chicken barbecue with sauce.' },
  { name: 'Pork Adobo', price: '$10.99', desc: 'Pork marinated with traditional soy sauce and distilled vinegar.' },
  { name: 'Chicken Adobo', price: '$10.99', desc: 'Chicken marinated with traditional soy sauce and distilled vinegar.' },
];

const cateringTrays = [
  { name: 'Pork Lumpia, 75 pcs', price: '$44.00' },
  { name: 'Chicken Lumpia, 75 pcs', price: '$44.00' },
  { name: 'Pork BBQ', price: '$79.00' },
  { name: 'Chicken BBQ', price: '$79.00' },
  { name: 'Chicken Adobo', price: '$79.00' },
  { name: 'Pork Adobo', price: '$79.00' },
  { name: 'White Rice', price: '$51.50' },
  { name: 'Fried Rice', price: '$69.00' },
  { name: 'Pancit Guisado', price: '$73.50' },
  { name: 'Filipino Spaghetti', price: '$81.50' },
  { name: 'Mixed Vegetables', price: '$59.00' },
  { name: 'Island Mixed Vegetables', price: '$71.50' },
  { name: 'Chicken Afritada', price: '$93.50' },
  { name: 'Pork Afritada', price: '$93.50' },
  { name: 'Chicken Curry', price: '$93.50' },
  { name: 'Pork Menudo', price: '$93.50' },
  { name: 'Pork Pinakbet', price: '$93.50' },
  { name: 'Pork Dinuguan', price: '$93.50' },
  { name: 'Pork Bicol Express', price: '$99.00' },
  { name: 'Pork Sisig', price: '$99.00' },
  { name: 'Beef Caldereta', price: '$112.00' },
  { name: 'Pork Kare-Kare', price: '$99.00' },
  { name: 'Beef Kare-Kare', price: '$112.00' },
  { name: 'Chicken Pasta, Alfredo', price: '$81.50' },
  { name: 'Chicken Pasta, Tomato', price: '$81.50' },
];

const desserts = [
  { name: 'Biko', price: '$56.50' },
  { name: 'Maja Blanca', price: '$56.50' },
  { name: 'Cassava Cake', price: '$60.50' },
  { name: 'Turon, 50 pcs', price: '$56.50' },
];

const sectionHeadingStyle = {
  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '1.5rem',
  paddingBottom: '0.75rem',
  borderBottom: '1px solid rgba(255,152,0,0.25)',
};

function MealCard({ name, price, desc }) {
  return (
    <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '0.4rem' }}>
        <span style={{ color: 'var(--color-sand)', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '1rem' }}>{name}</span>
        <span style={{ color: 'var(--color-mango)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap' }}>{price}</span>
      </div>
      <p style={{ color: 'var(--color-sand)', opacity: 0.6, fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>{desc}</p>
    </div>
  );
}

function SideCard({ name, price, desc }) {
  return (
    <div style={{ padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '0.3rem' }}>
        <span style={{ color: 'var(--color-sand)', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.95rem' }}>{name}</span>
        <span style={{ color: 'var(--color-mango)', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>{price}</span>
      </div>
      <p style={{ color: 'var(--color-sand)', opacity: 0.55, fontSize: '0.825rem', lineHeight: '1.45', margin: 0 }}>{desc}</p>
    </div>
  );
}

function TrayRow({ name, price }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <span style={{ color: 'var(--color-sand)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', opacity: 0.9 }}>{name}</span>
      <span style={{ color: 'var(--color-mango)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{price}</span>
    </div>
  );
}

export default function MenuScene() {
  return (
    <section id="menu" style={{ background: '#231008', padding: '6rem 0', width: '100vw' }}>
      <div className="content-container" style={{ textAlign: 'left' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="text-sand">Our Menu</h2>
          <p className="text-sand" style={{ marginTop: '0.75rem', opacity: 0.65 }}>
            Authentic Filipino food made fresh daily in Atwater, CA
          </p>
        </div>

        {/* Meals */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 className="text-mango" style={sectionHeadingStyle}>Meals</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {meals.map(item => <MealCard key={item.name} {...item} />)}
          </div>
        </div>

        {/* Side Orders */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 className="text-mango" style={sectionHeadingStyle}>Side Orders</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {sides.map(item => <SideCard key={item.name} {...item} />)}
          </div>
        </div>

        {/* Catering */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 className="text-mango" style={sectionHeadingStyle}>Catering — Medium Trays</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0 3rem' }}>
            {cateringTrays.map(item => <TrayRow key={item.name} {...item} />)}
          </div>
        </div>

        {/* Desserts */}
        <div style={{ marginBottom: '4rem' }}>
          <h3 className="text-mango" style={sectionHeadingStyle}>Catering Desserts — Medium Trays</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0 3rem' }}>
            {desserts.map(item => <TrayRow key={item.name} {...item} />)}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', margin: '3rem 0 4rem' }}>
          <a href="#catering" className="btn btn-primary">Request a Catering Quote</a>
        </div>

        {/* Notes */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <p style={{ color: 'var(--color-sand)', opacity: 0.5, fontSize: '0.8rem', lineHeight: '1.7', fontStyle: 'italic' }}>
            Prices, rates, and fees may change without notice. Cash prices may differ from card prices. Tax is not included. Additional card fees may apply.
            Please contact Jeff's Cuisine directly for current pricing, catering quotes, ingredient questions, and allergy concerns.
          </p>
          <p style={{ color: 'var(--color-sand)', opacity: 0.5, fontSize: '0.8rem', lineHeight: '1.7', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Food prepared by Jeff's Cuisine may contain milk, eggs, wheat, soybean, peanuts, tree nuts, fish, and shellfish.
          </p>
        </div>

      </div>
    </section>
  );
}
