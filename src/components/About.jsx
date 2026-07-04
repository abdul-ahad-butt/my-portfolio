import { Target, BarChart3, Users, Search, TrendingUp, Award } from 'lucide-react';

const SKILLS = [
  { icon: <Target size={18} />, label: 'Sales Strategy' },
  { icon: <BarChart3 size={18} />, label: 'Data Analytics' },
  { icon: <Users size={18} />, label: 'Team Leadership' },
  { icon: <Search size={18} />, label: 'Market Research' },
  { icon: <TrendingUp size={18} />, label: 'Revenue Growth' },
  { icon: <Award size={18} />, label: 'CRM & Salesforce' },
];

const PARAGRAPHS = [
  `As a seasoned leader specializing in National Sales Management and enterprise-level operations, I bring a proven track record of driving business growth and organizational excellence. My career is defined by a strategic, data-driven approach to complex business challenges, blending high-level management insights with actionable research to deliver consistent, measurable results.`,
  `In the realm of sales management, I have honed the ability to lead diverse, high-performing teams, foster competitive market positioning, and execute sophisticated sales strategies that exceed targets. I understand the intricacies of navigating regional and national markets, ensuring that sales operations remain robust, scalable, and adaptable. My approach centers on building long-term, high-value client relationships, optimizing sales funnels, and implementing innovative tactics that secure sustainable revenue streams.`,
  `My expertise as an Enterprise Manager allows me to view business challenges through a holistic lens, integrating disparate functions into cohesive workflows. Whether it involves refining internal processes, managing project lifecycles, or overseeing cross-departmental coordination, I am dedicated to maximizing efficiency. I leverage powerful tools like Salesforce.com to track key performance indicators, gain actionable insights, and ensure that every strategic decision is backed by comprehensive analytics.`,
  `My background in Human Resources (HR) gives me a unique perspective on organizational success. I believe that effective management requires clear communication, empathy, and a culture that empowers every individual. I am adept at talent development, conflict resolution, and creating structures that align human capital with core business objectives. Research remains a cornerstone of my methodology. I pride myself on the ability to distill complex data into clear, actionable strategies, ensuring that I stay ahead of industry trends to provide a competitive advantage.`,
  `I am committed to continuous improvement and operational excellence. My goal is to serve as a catalyst for success, helping organizations streamline operations, expand market reach, and achieve long-term objectives with precision, integrity, and a focus on measurable impact. I look forward to bringing this diverse expertise to your team.`,
];

export default function About() {
  return (
    <section id="about" style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* BG accents */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container-xl">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label animate-fade-up">
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
            About Me
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
          </div>
          <h2 className="section-title animate-fade-up delay-100">
            Strategic Leader &amp;{' '}
            <span className="gradient-text">Enterprise Architect</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Driving measurable growth through data-informed decisions and high-impact leadership.
          </p>
        </div>

        {/* Two-column grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '3rem', alignItems: 'start',
        }}>
          {/* Left — paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {PARAGRAPHS.slice(0, 3).map((p, i) => (
              <p key={i} style={{
                color: i === 0 ? '#cbd5e1' : '#94a3b8',
                lineHeight: 1.8,
                fontSize: i === 0 ? '1rem' : '0.9rem',
                fontWeight: i === 0 ? 500 : 400,
              }}>
                {p}
              </p>
            ))}
          </div>

          {/* Right — remaining paragraphs + skills grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {PARAGRAPHS.slice(3).map((p, i) => (
              <p key={i} style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.9rem' }}>
                {p}
              </p>
            ))}

            {/* Core competencies */}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#10b981', marginBottom: '1rem'
              }}>
                Core Competencies
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
              }}>
                {SKILLS.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="glass-card"
                    style={{
                      padding: '0.875rem 1rem',
                      borderRadius: '0.75rem',
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                    }}
                  >
                    <span style={{ color: '#10b981', flexShrink: 0 }}>{icon}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#cbd5e1' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight bar */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem 2.5rem',
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(6,182,212,0.06))',
          border: '1px solid rgba(16,185,129,0.15)',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem', textAlign: 'center'
        }}>
          {[
            { label: 'National Sales Management', desc: 'Leading diverse teams across regional & national markets' },
            { label: 'Enterprise Operations', desc: 'Integrating workflows, CRM tools & cross-dept coordination' },
            { label: 'Human Resources', desc: 'Talent development, conflict resolution & organizational alignment' },
          ].map(({ label, desc }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: '0.95rem',
                color: '#10b981', marginBottom: '0.4rem'
              }}>{label}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container-xl > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #about .container-xl > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
