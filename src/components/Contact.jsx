import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Mail } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsappIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default function Contact() {
  const [showWaMenu, setShowWaMenu] = useState(false);
  const [waCopied, setWaCopied] = useState(false);
  const waRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (waRef.current && !waRef.current.contains(event.target)) {
        setShowWaMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [waRef]);

  const handleWaCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("+923120601562");
    setWaCopied(true);
    setTimeout(() => {
      setWaCopied(false);
      setShowWaMenu(false);
    }, 2000);
  };

  return (
    <section id="contact" style={{ padding: '7rem 0', position: 'relative' }}>
      {/* BG accents */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(16,185,129,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-xl">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
            Contact
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
          </div>
          <h2 className="section-title">
            Let's{' '}
            <span className="gradient-text">Work Together</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Ready to drive growth and create measurable impact? Reach out for strategic partnerships, consulting, or executive opportunities.
          </p>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="contact-grid">
          {/* Location Card */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Lahore,+Punjab,+Pakistan"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card hover-interactive"
            style={{ 
              padding: '1.5rem', 
              borderRadius: '1rem',
              textDecoration: 'none',
              display: 'block',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: '#10b98115', border: '1px solid #10b98130',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#10b981', flexShrink: 0,
              }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '0.2rem' }}>Location</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600, wordBreak: 'break-word' }}>Lahore, Punjab, Pakistan</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Open to remote & hybrid</div>
              </div>
            </div>
          </a>

          {/* LinkedIn Profile Card */}
          <a
            href="https://www.linkedin.com/in/abdul-ahad-butt-33a586232"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card hover-interactive-cyan"
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              display: 'block',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: '#06b6d415', border: '1px solid #06b6d430',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#06b6d4', flexShrink: 0,
              }}>
                <LinkedinIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '0.2rem' }}>LinkedIn Profile</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600, wordBreak: 'break-word' }}>www.linkedin.com/in/abdul-ahad-butt-33a586232</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Visit my profile to connect with me professionally.</div>
              </div>
            </div>
          </a>

          {/* Email Card (Left Column) */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=abdulahahadbutt420@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card hover-interactive-cyan"
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              display: 'block',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: '#06b6d415', border: '1px solid #06b6d430',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#06b6d4', flexShrink: 0,
              }}>
                <Mail size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '0.2rem' }}>Email</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600, wordBreak: 'break-word' }}>abdulahahadbutt420@gmail.com</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Typically replies within 24h</div>
              </div>
            </div>
          </a>
          {/* GitHub Profile Card */}
          <a
            href="https://github.com/abdul-ahad-butt"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card hover-interactive-cyan"
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              display: 'block',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: '#06b6d415', border: '1px solid #06b6d430',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#06b6d4', flexShrink: 0,
              }}>
                <GithubIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '0.2rem' }}>GitHub Profile</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600, wordBreak: 'break-word' }}>https://github.com/abdul-ahad-butt</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Visit me on GitHub</div>
              </div>
            </div>
          </a>

          {/* Availability note (Left Column) */}
          <div style={{
            padding: '1.5rem', borderRadius: '1rem',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(6,182,212,0.06))',
            border: '1px solid rgba(16,185,129,0.18)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#10b981' }}>Available Now</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Currently accepting new strategic partnerships, consulting engagements, and executive leadership opportunities.
            </p>
          </div>
          {/* Instagram Profile Card */}
          <a
            href="https://www.instagram.com/_ahad_butt._.42"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card hover-interactive-cyan"
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              display: 'block',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: '#06b6d415', border: '1px solid #06b6d430',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#06b6d4', flexShrink: 0,
              }}>
                <InstagramIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '0.2rem' }}>Instagram Profile</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>https://www.instagram.com/_ahad_butt._.42</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Visit my Instagram page</div>
              </div>
            </div>
          </a>

          {/* Quick-info strip (Left Column) */}
          <div style={{
            padding: '1.25rem 1.5rem', borderRadius: '1rem',
            background: 'rgba(17,24,39,0.5)',
            border: '1px solid rgba(30,41,59,0.6)',
          }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '0.6rem' }}>Current Roles</div>
            {['Sales Specialist @ PiRails', 'Executive Sales Manager @ DispatchGrow', 'Human Resources Recruitment Assistant @ Wasilay'].map(r => (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', flexShrink: 0 }} />
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{r}</span>
              </div>
            ))}
          </div>
          {/* WhatsApp Profile Card */}
          <div
            ref={waRef}
            onClick={() => setShowWaMenu(!showWaMenu)}
            className="glass-card hover-interactive-cyan"
            style={{
              padding: '1.5rem',
              borderRadius: '1rem',
              display: 'block',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                background: '#06b6d415', border: '1px solid #06b6d430',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#06b6d4', flexShrink: 0,
              }}>
                <WhatsappIcon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginBottom: '0.2rem' }}>WhatsApp</div>
                <div style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 600 }}>+92 3120601562</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.15rem' }}>Contact me through WhatsApp</div>
              </div>
            </div>

            {/* Popup Menu */}
            {showWaMenu && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                background: '#0f172a',
                border: '1px solid rgba(30,41,59,0.8)',
                borderRadius: '0.75rem',
                padding: '0.5rem',
                minWidth: '160px',
                zIndex: 50,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem'
              }}>
                <button
                  onClick={handleWaCopy}
                  style={{
                    background: 'transparent', border: 'none', color: '#f1f5f9',
                    padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.85rem',
                    borderRadius: '0.5rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'inherit'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {waCopied ? 'Copied!' : 'Click to Copy'}
                  {waCopied && <span style={{ color: '#10b981' }}>✓</span>}
                </button>
                <a
                  href="https://wa.me/923120601562"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: 'transparent', border: 'none', color: '#f1f5f9',
                    padding: '0.5rem 1rem', textAlign: 'left', fontSize: '0.85rem',
                    borderRadius: '0.5rem', cursor: 'pointer', textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'inherit'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Chat
                  <span style={{ color: '#06b6d4' }}>↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          max-width: 860px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          .contact-grid > .empty-slot {
            display: none;
          }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .hover-interactive {
          transition: all 0.3s ease;
        }
        .hover-interactive:hover {
          background-color: rgba(16, 185, 129, 0.05) !important;
          border-color: rgba(16, 185, 129, 0.3) !important;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.1) !important;
          transform: scale(1.02);
        }
        .hover-interactive-cyan {
          transition: all 0.3s ease;
        }
        .hover-interactive-cyan:hover {
          background-color: rgba(6, 182, 212, 0.05) !important;
          border-color: rgba(6, 182, 212, 0.3) !important;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.1) !important;
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}
