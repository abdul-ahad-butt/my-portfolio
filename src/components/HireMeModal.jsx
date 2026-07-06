import { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle2, AlertCircle, X } from 'lucide-react';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';

export default function HireMeModal({ isOpen, onClose }) {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'api-error' | null
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_BASE}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || undefined,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error('[Contact Form] API error:', err);
        setStatus('api-error');
      } else {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch (networkErr) {
      console.error('[Contact Form] Backend unreachable:', networkErr);
      setStatus('api-error');
    } finally {
      setLoading(false);
    }
  };

  // Close when clicking overlay (background)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleOverlayClick}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(10, 15, 26, 0.85)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div 
        className="glass-card" 
        style={{ 
          padding: '2.5rem', 
          borderRadius: '1.25rem', 
          width: '100%', 
          maxWidth: '560px',
          position: 'relative',
          animation: 'fadeInUp 0.3s ease-out forwards',
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(100, 116, 139, 0.2)',
            color: '#94a3b8', borderRadius: '50%', width: '2rem', height: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)'; e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.2)'; }}
        >
          <X size={16} />
        </button>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '1.3rem', color: '#f1f5f9',
            marginBottom: '0.4rem'
          }}>
            Send a Message
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Fill in the details below and I'll get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name + Email row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
                <User size={11} style={{ display: 'inline', marginRight: '0.3rem' }} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Smith"
                className="form-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
                <Mail size={11} style={{ display: 'inline', marginRight: '0.3rem' }} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="form-input"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Strategic Partnership / Consulting Inquiry"
              className="form-input"
            />
          </div>

          {/* Message */}
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.4rem' }}>
              <MessageSquare size={11} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project, goals, and how I can help..."
              rows={5}
              className="form-input"
              style={{ resize: 'vertical', minHeight: '120px' }}
            />
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 1rem', borderRadius: '0.5rem',
              background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
              color: '#10b981', fontSize: '0.875rem', fontWeight: 500,
            }}>
              <CheckCircle2 size={16} />
              Message sent successfully! I'll respond within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.875rem 1rem', borderRadius: '0.5rem',
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              color: '#f87171', fontSize: '0.875rem', fontWeight: 500,
            }}>
              <AlertCircle size={16} />
              Please fill in all required fields (Name, Email, Message).
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: '100%', justifyContent: 'center',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  style={{ animation: 'spin 1s linear infinite' }}>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="40" />
                </svg>
                <span>Sending...</span>
              </span>
            ) : (
              <>
                <Send size={16} />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
