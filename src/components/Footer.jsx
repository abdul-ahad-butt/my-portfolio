import { Heart, Zap } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      borderTop: '1px solid rgba(30,41,59,0.6)',
      padding: '2.5rem 0',
      background: 'rgba(10,15,26,0.8)',
      position: 'relative',
    }}>
      <div className="container-xl">
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem'
        }}>
          {/* Logo */}
          <button
            onClick={scrollTop}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'none', border: 'none', cursor: 'pointer'
            }}
          >
            <div style={{
              width: '1.75rem', height: '1.75rem', borderRadius: '6px',
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={12} color="#0a0f1a" fill="#0a0f1a" />
            </div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, color: '#f1f5f9', fontSize: '1rem',
            }}>
              Abdul Ahad Butt
            </span>
          </button>

          {/* Copyright */}
          <p style={{
            fontSize: '0.82rem', color: '#64748b',
            display: 'flex', alignItems: 'center', gap: '0.35rem'
          }}>
            &copy; {year} · Built with
            <Heart size={12} style={{ color: '#ec4899', fill: '#ec4899' }} />
            in Lahore, Pakistan
          </p>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            {['about', 'projects', 'experience', 'contact'].map(id => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.82rem', color: '#64748b', fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'capitalize', transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.target.style.color = '#10b981'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
