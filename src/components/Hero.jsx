import { MapPin, Briefcase, ChevronRight, ArrowDown } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '5rem',
      }}
    >
      {/* Background mesh */}
      <div className="mesh-bg" />

      {/* Decorative grid */}
      <div
        className="grid-lines"
        style={{
          position: 'absolute', inset: 0,
          opacity: 0.4, pointerEvents: 'none'
        }}
      />

      {/* Glowing orbs */}
      <div style={{
        position: 'absolute', top: '15%', left: '60%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container-xl" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Left content */}
          <div>
            {/* Status badge */}
            <div
              className="animate-fade-up delay-100"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: '9999px',
                padding: '0.4rem 1rem',
                marginBottom: '1.75rem',
              }}
            >
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }} className="animate-pulse-slow" />
              <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#10b981' }}>
                Available for Strategic Partnerships
              </span>
            </div>

            {/* Name */}
            <h1
              className="animate-fade-up delay-200"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: '#f1f5f9',
              }}
            >
              Abdul Ahad{' '}
              <span className="shimmer-text">Butt</span>
            </h1>

            {/* Title */}
            <div
              className="animate-fade-up delay-300"
              style={{ marginBottom: '1.5rem' }}
            >
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: 400,
                color: '#94a3b8',
                lineHeight: 1.5,
                maxWidth: '600px',
              }}>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Executive Sales Manager &amp; HR Recruitment</span>
                {' '}|{' '}
                <span style={{ color: '#06b6d4', fontWeight: 600 }}>Driving B2B Growth</span>
                {' '}|{' '}
                Building Innovative Tech
              </p>
            </div>

            {/* Meta info */}
            <div
              className="animate-fade-up delay-400"
              style={{
                display: 'flex', flexWrap: 'wrap', gap: '1.25rem',
                marginBottom: '2.5rem',
              }}
            >
              {[
                { icon: <MapPin size={14} />, text: 'Lahore, Punjab, Pakistan' },
                { icon: <Briefcase size={14} />, text: 'PiRails · Active' },
              ].map(({ icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  color: '#64748b', fontSize: '0.875rem'
                }}>
                  <span style={{ color: '#10b981' }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className="animate-fade-up delay-500"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}
            >
              <button
                className="btn-primary"
                onClick={() => scrollTo('projects')}
              >
                <ChevronRight size={16} />
                <span>View Projects</span>
              </button>
              <button
                className="btn-outline"
                onClick={() => scrollTo('contact')}
              >
                <span>Contact Me</span>
              </button>
            </div>

            {/* Stats row */}
            <div
              className="animate-fade-up delay-600"
              style={{
                display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              }}
            >
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '6+', label: 'Companies Served' },
                { value: '3', label: 'Active Roles' },
                { value: '2', label: 'Live Projects' },
              ].map(({ value, label }) => (
                <div key={label} style={{ textAlign: 'center', minWidth: '80px' }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.75rem', fontWeight: 800,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.25rem',
                  }}>{value}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Avatar card */}
          <div
            className="animate-fade-up delay-300"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
            }}
          >
            <div
              className="glass-card glow-ring animate-float"
              style={{
                borderRadius: '1.5rem',
                padding: '2rem 1.75rem',
                textAlign: 'center',
                width: '240px',
              }}
            >
              {/* Avatar initials */}
              <div style={{
                width: '90px', height: '90px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2rem', fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#0a0f1a',
                boxShadow: '0 0 30px rgba(16,185,129,0.4)',
              }}>
                AA
              </div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: '1rem', color: '#f1f5f9',
                marginBottom: '0.25rem',
              }}>Abdul Ahad Butt</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 500 }}>
                @ PiRails
              </div>

              {/* Divider */}
              <div style={{
                height: '1px', background: 'rgba(30,41,59,0.8)',
                margin: '1rem 0'
              }} />

              {/* Skills chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                {['Sales', 'BizDev', 'CRM', 'Logistics', 'HR'].map(s => (
                  <span key={s} className="tag-chip">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          marginTop: '4rem',
          animation: 'float 2s ease-in-out infinite',
        }}>
          <button
            onClick={() => scrollTo('about')}
            style={{
              background: 'none', border: '1px solid rgba(30,41,59,0.6)',
              borderRadius: '9999px', padding: '0.5rem 1.25rem',
              color: '#64748b', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.8rem', transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#10b981'}
            onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
          >
            <ArrowDown size={14} />
            Scroll to explore
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero > div > div > div:last-child {
            display: none !important;
          }
          #hero > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
