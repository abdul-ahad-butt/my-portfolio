import { useState } from 'react';
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const JOBS = [
  {
    id: 'wasilay',
    title: 'Human Resources Recruitment Assistant',
    company: 'Wasilay',
    type: 'Part-time',
    period: 'Nov 2025 – Present',
    location: 'Lahore, Punjab, Pakistan · Hybrid',
    current: true,
    color: '#10b981',
    description:
      'As a Human Resources Recruitment Assistant at Wasilay, I directly support executive leadership by managing the talent acquisition pipeline and optimizing hiring logistics. My role involves utilizing human capital management to identify high-potential assets and fulfill key operational vacancies.',
    skills: ['Human Capital Management', 'Vacancy Optimization', 'Talent Acquisition Pipeline'],
  },
  {
    id: 'pirails',
    title: 'Sales Specialist',
    company: 'PiRails',
    type: 'Part-time',
    period: 'Nov 2025 – Present',
    location: 'Lahore, Punjab, Pakistan · Hybrid',
    current: true,
    color: '#10b981',
    description:
      'Drives business growth by connecting organizations with cutting-edge IT services and expert IT consulting. Identifies and engages prospective clients in need of digital transformation, custom software, and specialized IT consulting services. Analyzes existing IT infrastructure and manages end-to-end sales pipelines from outreach to contract closing.',
    skills: ['Product Management', 'Global Product Management', 'Sales Pipeline Management', 'Digital Transformation'],
  },
  {
    id: 'dispatchgrow',
    title: 'Executive Sales Manager',
    company: 'DispatchGrow',
    type: 'Part-time',
    period: 'Oct 2025 – Present',
    location: 'Albuquerque, New Mexico · Hybrid',
    current: true,
    color: '#06b6d4',
    description:
      'Leads strategic initiatives to connect businesses with comprehensive, scalable solutions. Oversees sales operations and lead generation strategies. Coordinates with technical departments to provide clients with dedicated teams, including custom software developers, 24/7 dispatch operations, and digital marketing experts. Utilizes advanced CRM workflows for pipeline tracking.',
    skills: ['Digital Marketing', 'Customer Service Training', 'Lead Generation', 'CRM Workflows'],
  },
  {
    id: 'wedispatch',
    title: 'Sales Executive',
    company: 'We Dispatch Logics',
    type: 'Full-time',
    period: 'Apr 2024 – May 2025',
    location: 'Seekonk, MA · Hybrid',
    current: false,
    color: '#8b5cf6',
    description:
      'Focused on building strategic B2B relationships and driving revenue through logistics sector sales and marketing initiatives. Used SalesPro tools to track pipeline health, analyze market trends, and deliver targeted integrated marketing campaigns across key accounts.',
    skills: ['B2B Sales', 'SalesPro', 'Market Analysis', 'Integrated Marketing'],
  },
  {
    id: 'walmart',
    title: 'Customer Service Representative',
    company: 'Walmart',
    type: 'Part-time',
    period: 'Aug 2022 – Feb 2024',
    location: 'Sacramento, California · Remote',
    current: false,
    color: '#f59e0b',
    description:
      'Handled high-volume customer queues for a major retail giant. Managed order tracking, store policies, and problem resolution while utilizing CRM software, order management systems, and live chat platforms to ensure exceptional service delivery.',
    skills: ['Remote Communication', 'Conflict Resolution', 'Time Management', 'CRM Software'],
  },
  {
    id: 'forsage',
    title: 'Marketing Executive',
    company: 'Forsage.io Official',
    type: 'Part-time',
    period: 'Feb 2022 – Jul 2022',
    location: 'Dublin, Ireland · Remote',
    current: false,
    color: '#ec4899',
    description:
      'Responsible for driving growth and increasing brand visibility. Developed and implemented digital marketing strategies, curated digital media assets, and ran data-driven direct sales efforts to convert leads into active participants.',
    skills: ['Digital Marketing', 'Content Strategy', 'Lead Conversion', 'Brand Visibility'],
  },
  {
    id: 'virtualbdc',
    title: 'Sales Executive',
    company: 'Virtual BDC',
    type: 'Full-time',
    period: 'May 2021 – Jan 2022',
    location: 'TX, United States · Hybrid',
    current: false,
    color: '#14b8a6',
    description:
      'Managed enterprise accounts and accelerated pipeline growth. Led high-impact sales strategies across regional boundaries, optimized client acquisition via SalesPro methodologies, and collaborated cross-functionally with Human Resources to align talent with client needs.',
    skills: ['Enterprise Sales', 'Pipeline Growth', 'SalesPro', 'Cross-functional Collaboration'],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState(new Set(['wasilay', 'pirails', 'dispatchgrow']));

  const toggle = (id) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="experience" style={{ padding: '7rem 0', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '30%', right: '-200px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container-xl">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
            Work Experience
            <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: '#10b981', borderRadius: '9999px' }} />
          </div>
          <h2 className="section-title">
            Professional{' '}
            <span className="gradient-text">Journey</span>
          </h2>
          <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem' }}>
            A career defined by cross-sector leadership, enterprise sales execution, and measurable results.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div className="timeline-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {JOBS.map((job, idx) => {
              const isOpen = expanded.has(job.id);
              return (
                <div
                  key={job.id}
                  style={{
                    display: 'flex', gap: '1.5rem', paddingLeft: '0.25rem',
                    animation: `fadeInUp 0.6s ${idx * 0.08}s both`,
                  }}
                >
                  {/* Dot */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${job.color}, ${job.color}88)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 16px ${job.color}40`,
                      position: 'relative', zIndex: 2,
                      border: '2px solid rgba(10,15,26,0.8)',
                    }}>
                      <Briefcase size={12} color="#0a0f1a" />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="glass-card"
                    style={{
                      flex: 1, borderRadius: '1rem', overflow: 'hidden',
                      border: `1px solid ${isOpen ? job.color + '30' : 'rgba(30,41,59,0.8)'}`,
                      transition: 'border-color 0.3s ease',
                    }}
                  >
                    {/* Card header */}
                    <button
                      onClick={() => toggle(job.id)}
                      style={{
                        width: '100%', background: 'none', border: 'none',
                        cursor: 'pointer', padding: '1.5rem',
                        display: 'flex', alignItems: 'flex-start',
                        justifyContent: 'space-between', gap: '1rem',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                          <h3 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700, fontSize: '1.05rem',
                            color: '#f1f5f9',
                          }}>
                            {job.title}
                          </h3>
                          {job.current && (
                            <span style={{
                              fontSize: '0.65rem', fontWeight: 700,
                              padding: '0.15rem 0.6rem', borderRadius: '9999px',
                              background: `${job.color}15`, color: job.color,
                              border: `1px solid ${job.color}35`,
                              letterSpacing: '0.05em',
                            }}>
                              ACTIVE
                            </span>
                          )}
                          <span style={{
                            fontSize: '0.7rem', fontWeight: 500,
                            color: '#64748b', background: 'rgba(30,41,59,0.5)',
                            padding: '0.15rem 0.55rem', borderRadius: '9999px',
                            border: '1px solid rgba(30,41,59,0.8)',
                          }}>
                            {job.type}
                          </span>
                        </div>

                        <div style={{
                          fontSize: '0.95rem', fontWeight: 600,
                          color: job.color, marginBottom: '0.5rem',
                        }}>
                          {job.company}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.8rem' }}>
                            <Calendar size={12} /> {job.period}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b', fontSize: '0.8rem' }}>
                            <MapPin size={12} /> {job.location}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        color: '#64748b', flexShrink: 0,
                        transition: 'color 0.2s ease',
                      }}>
                        {isOpen
                          ? <ChevronUp size={18} />
                          : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {/* Expandable body */}
                    <div style={{
                      maxHeight: isOpen ? '400px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                      <div style={{
                        padding: '0 1.5rem 1.5rem',
                        borderTop: `1px solid rgba(30,41,59,0.6)`,
                        paddingTop: '1.25rem',
                      }}>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                          {job.description}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {job.skills.map(s => (
                            <span
                              key={s}
                              style={{
                                fontSize: '0.7rem', fontWeight: 600,
                                padding: '0.25rem 0.7rem', borderRadius: '9999px',
                                border: `1px solid ${job.color}30`,
                                color: job.color, background: `${job.color}08`,
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
