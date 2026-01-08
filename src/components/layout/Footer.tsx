import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: 'var(--primary)', 
      color: 'var(--background)', 
      padding: '4rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Serayu News</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Trusted journalism for the modern world. Insightful analysis and breaking news.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Sections</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/world">World</Link></li>
              <li><Link href="/politics">Politics</Link></li>
              <li><Link href="/tech">Technology</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Subscribe</h4>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Get the latest updates directly in your inbox.</p>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--accent)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Subscribe
            </button>
          </div>
        </div>
        <div style={{ 
          marginTop: '3rem', 
          paddingTop: '2rem', 
          borderTop: '1px solid #334155', 
          textAlign: 'center', 
          fontSize: '0.875rem', 
          color: 'var(--text-muted)' 
        }}>
          &copy; {new Date().getFullYear()} Serayu News. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
