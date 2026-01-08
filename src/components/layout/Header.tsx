import Link from 'next/link';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Top Bar */}
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        paddingTop: '0.5rem', 
        paddingBottom: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--text-muted)'
      }}>
        <span>{currentDate}</span>
        <div>
          <Link href="/login" style={{ marginLeft: '1rem' }}>Sign In</Link>
          <Link href="/subscribe" style={{ marginLeft: '1rem', fontWeight: 'bold' }}>Subscribe</Link>
        </div>
      </div>

      {/* Main Logo Area */}
      <div className="container" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <Link href="/" style={{ 
          fontFamily: 'var(--font-playfair)', 
          fontSize: '3rem', 
          fontWeight: 900,
          letterSpacing: '-1px'
        }}>
          Serayu News
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <ul style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            listStyle: 'none',
            padding: '1rem 0',
            fontWeight: 600
          }}>
            <li><Link href="/world">World</Link></li>
            <li><Link href="/politics">Politics</Link></li>
            <li><Link href="/technology">Technology</Link></li>
            <li><Link href="/business">Business</Link></li>
            <li><Link href="/culture">Culture</Link></li>
            <li><Link href="/sports">Sports</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
