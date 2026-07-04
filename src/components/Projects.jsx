import { useState } from 'react';
import { Cloud, Globe, ArrowUpRight, Server, Network, Code2 } from 'lucide-react';

const PROJECTS = [
  {
    id: 'cloud-storage',
    icon: <Cloud size={28} />,
    iconBg: 'linear-gradient(135deg, #10b981, #14b8a6)',
    title: 'Cloud Storage Platform',
    subtitle: 'on Base 44',
    description:
      'A secure, high-performance cloud storage application built utilizing Base 44 architecture for optimized file handling, data consistency, and streamlined accessibility features. Designed to handle enterprise-grade data workloads with resilience and speed.',
    tags: ['Cloud Infrastructure', 'Storage Systems', 'Core Engineering'],
    tagIcons: [<Server size={11} />, <Cloud size={11} />, <Code2 size={11} />],
    features: ['Optimized file handling', 'Data consistency layer', 'Streamlined accessibility', 'Enterprise-grade security'],
    accent: '#10b981',
    accentAlt: '#14b8a6',
  },
  {
    id: 'vpn-simulator',
    icon: <Globe size={28} />,
    iconBg: 'linear-gradient(135deg, #06b6d4, #6366f1)',
    title: 'Web/App OS Simulated VPN',
    subtitle: 'on Replit',
    description:
      'An interactive web and application-operating system simulator featuring a fully functioning, logic-simulated VPN tunnel environment built directly on Replit. Showcases complex networking paths and system execution environments with real-time state management.',
    tags: ['Networking Simulation', 'Web OS', 'Replit Ecosystem'],
    tagIcons: [<Network size={11} />, <Globe size={11} />, <Code2 size={11} />],
    features: ['VPN tunnel simulation', 'Real-time networking paths', 'OS execution environment', 'Interactive web interface'],
    accent: '#06b6d4',
    accentAlt: '#6366f1',
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      style={{
        padding: '7rem 0',
        position: 'relative',
        background: 'linear-gradient(180deg, transparent 0%, rgba(13,21,38,0.6) 50%, transparent 100%)',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: '20%', left: '-200px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container-xl">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label animate-fade-up">
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
            Technical Projects
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
          </div>
          <h2 className="section-title animate-fade-up delay-100">
            Featured{' '}
            <span className="gradient-text">Engineering Work</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            High-impact technical builds showcasing architecture, networking, and cloud engineering skills.
          </p>
        </div>

        {/* Project cards grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
          gap: '2rem',
        }}>
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="glass-card"
              onMouseEnter={() => setHovered(proj.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                if (proj.id === 'cloud-storage' || proj.id === 'vpn-simulator') setSelectedProject(proj);
              }}
              style={{
                borderRadius: '1.25rem',
                padding: '2.25rem',
                cursor: (proj.id === 'cloud-storage' || proj.id === 'vpn-simulator') ? 'pointer' : 'default',
                position: 'relative',
                overflow: 'hidden',
                border: hovered === proj.id
                  ? `1px solid ${proj.accent}40`
                  : '1px solid rgba(30,41,59,0.8)',
                boxShadow: hovered === proj.id
                  ? `0 0 40px ${proj.accent}14, 0 20px 60px rgba(0,0,0,0.4)`
                  : 'none',
              }}
            >
              {/* Top glow strip */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: proj.iconBg,
                opacity: hovered === proj.id ? 1 : 0.5,
                transition: 'opacity 0.3s ease',
              }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
                    background: proj.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#0a0f1a',
                    boxShadow: `0 0 20px ${proj.accent}30`,
                    flexShrink: 0,
                  }}>
                    {proj.icon}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700, fontSize: '1.2rem',
                      color: '#f1f5f9', lineHeight: 1.2,
                    }}>{proj.title}</div>
                    <div style={{ fontSize: '0.8rem', color: proj.accent, fontWeight: 500, marginTop: '0.15rem' }}>
                      {proj.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  style={{
                    color: proj.accent, opacity: hovered === proj.id ? 1 : 0.4,
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    transform: hovered === proj.id ? 'translate(2px, -2px)' : 'none',
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* Description */}
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                {proj.description}
              </p>

              {/* Feature list */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem', marginBottom: '1.75rem'
              }}>
                {proj.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${proj.accent}, ${proj.accentAlt})`,
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {proj.tags.map((tag, i) => (
                  <span
                    key={tag}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                      fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.04em',
                      padding: '0.25rem 0.7rem', borderRadius: '9999px',
                      border: `1px solid ${proj.accent}35`,
                      color: proj.accent,
                      background: `${proj.accent}09`,
                    }}
                  >
                    {proj.tagIcons[i]}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(10, 15, 26, 0.85)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: '1rem',
            opacity: 1, transition: 'opacity 0.3s ease-out'
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="transition-all duration-300 transform scale-100"
            style={{
              background: '#0f172a', border: '1px solid #1e293b',
              borderRadius: '1.5rem', padding: '3rem 2.5rem',
              maxWidth: '500px', width: '100%',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'transparent', border: 'none', color: '#64748b',
                cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1
              }}
            >
              &times;
            </button>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '4rem', height: '4rem', borderRadius: '1rem',
                background: selectedProject.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0a0f1a', margin: '0 auto 1.5rem auto'
              }}>
                {selectedProject.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#f1f5f9', marginBottom: '0.5rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                {selectedProject.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                You are about to securely navigate to the live {selectedProject.title} environment.
              </p>
              <a 
                href={
                  selectedProject.id === 'cloud-storage' ? 'https://sky-vault-drive.base44.app' : 
                  selectedProject.id === 'vpn-simulator' ? 'https://346ed908-a4db-40fd-9b60-13042c1e6a92-00-hc0jd3d6laew.picard.replit.dev/vortex-vpn/login' : 
                  '#'
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedProject(null)}
                style={{
                  display: 'inline-block',
                  background: selectedProject.iconBg,
                  color: '#0a0f1a', fontWeight: 600,
                  padding: '0.875rem 2.5rem', borderRadius: '9999px',
                  textDecoration: 'none', transition: 'transform 0.2s ease',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Visit
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 600px) {
          #projects .container-xl > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
