import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onHireMeClick }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['about', 'projects', 'experience', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-xl">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0' }}>
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              textDecoration: 'none', cursor: 'pointer'
            }}
          >
            <div style={{
              width: '2rem', height: '2rem', borderRadius: '8px',
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Zap size={14} color="#0a0f1a" fill="#0a0f1a" />
            </div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: '1.1rem', color: '#f1f5f9', letterSpacing: '-0.02em'
            }}>
              AAB<span style={{ color: '#10b981' }}>.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
               className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.5rem 1rem', borderRadius: '0.375rem',
                  fontSize: '0.875rem', fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  color: activeSection === link.href.replace('#', '')
                    ? '#10b981' : '#94a3b8',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { if (activeSection !== link.href.replace('#', '')) e.target.style.color = '#f1f5f9'; }}
                onMouseLeave={e => { if (activeSection !== link.href.replace('#', '')) e.target.style.color = '#94a3b8'; }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onHireMeClick}
              className="btn-primary"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', marginLeft: '0.5rem' }}
            >
              <span>Hire Me</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', display: 'none'
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.75rem 1rem', textAlign: 'left', width: '100%',
              color: '#94a3b8', fontSize: '0.95rem', fontWeight: 500,
              fontFamily: "'Inter', sans-serif", borderRadius: '0.375rem',
              transition: 'all 0.2s ease',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
