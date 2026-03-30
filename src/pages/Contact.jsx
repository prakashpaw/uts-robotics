import { useState } from 'react'
import './Contact.css'

import { useData } from '../context/DataContext'
const inquiryTypes = [
  'Product Demo Request',
  'Municipal Partnership',
  'Pricing & Quotation',
  'Technical Support',
  'Press & Media',
  'Other',
]

export default function Contact() {
  const { data } = useData();
  const { contactInfo, contactTitle, contactDesc } = data.contact;
  
  const [form, setForm] = useState({ name: '', email: '', org: '', phone: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <div className="section-label">Contact Us</div>
          <h1 className="page-hero-title">{contactTitle}</h1>
          <p className="page-hero-desc">{contactDesc}</p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <h2 className="contact-info-title">Get in touch</h2>
              <p className="contact-info-desc">
                Our team typically responds within 24 hours. For urgent inquiries, call us directly.
              </p>

              <div className="contact-cards">
                {contactInfo.map((c, i) => (
                  <div key={i} className="contact-card">
                    <div className="contact-card-icon">{c.icon}</div>
                    <div>
                      <div className="contact-card-label">{c.label}</div>
                      {c.href && c.href !== '#' ? (
                        <a href={c.href} className="contact-card-value link">{c.value}</a>
                      ) : (
                        <div className="contact-card-value">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="map-placeholder">
                <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                  <rect width="400" height="220" fill="#080e1a"/>
                  {/* Grid */}
                  {[0,1,2,3,4,5,6].map(i => (
                    <line key={`h${i}`} x1="0" y1={i*36} x2="400" y2={i*36} stroke="rgba(245,197,24,0.05)" strokeWidth="1"/>
                  ))}
                  {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                    <line key={`v${i}`} x1={i*40} y1="0" x2={i*40} y2="220" stroke="rgba(245,197,24,0.05)" strokeWidth="1"/>
                  ))}
                  {/* Roads */}
                  <path d="M0 110 Q100 90 200 110 Q300 130 400 110" stroke="#1e293b" strokeWidth="12" fill="none"/>
                  <path d="M180 0 Q195 60 200 110 Q205 160 210 220" stroke="#1e293b" strokeWidth="10" fill="none"/>
                  <path d="M0 155 Q120 148 400 155" stroke="#1e293b" strokeWidth="8" fill="none"/>
                  {/* Blocks */}
                  <rect x="50" y="60" width="60" height="40" rx="4" fill="#0d1424"/>
                  <rect x="120" y="50" width="50" height="50" rx="4" fill="#0d1424"/>
                  <rect x="240" y="65" width="70" height="35" rx="4" fill="#0d1424"/>
                  <rect x="50" y="165" width="80" height="30" rx="4" fill="#0d1424"/>
                  <rect x="280" y="160" width="90" height="40" rx="4" fill="#0d1424"/>
                  {/* Pin */}
                  <circle cx="200" cy="108" r="16" fill="rgba(245,197,24,0.15)"/>
                  <circle cx="200" cy="108" r="8" fill="#f5c518"/>
                  <circle cx="200" cy="108" r="4" fill="#04080f"/>
                  <text x="200" y="90" textAnchor="middle" fill="#f5c518" fontSize="9" fontFamily="sans-serif" fontWeight="bold">UTS Robotics HQ</text>
                  <text x="200" y="100" textAnchor="middle" fill="#8898b8" fontSize="7" fontFamily="sans-serif">Baner, Pune</text>
                </svg>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">✓</div>
                  <h3 className="success-title">Message received!</h3>
                  <p className="success-desc">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name:'',email:'',org:'',phone:'',type:'',message:'' }) }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3 className="form-title">Send us a message</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Ramesh Kulkarni"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="ramesh@pune.gov.in"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Organisation</label>
                      <input
                        type="text"
                        name="org"
                        className="form-input"
                        placeholder="Pune Municipal Corporation"
                        value={form.org}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Inquiry Type *</label>
                    <select
                      name="type"
                      className="form-input form-select"
                      value={form.type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a topic...</option>
                      {inquiryTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      className="form-input form-textarea"
                      placeholder="Tell us about your city's street lighting needs, approximate number of lights, area covered, etc."
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary submit-btn" disabled={loading}>
                    {loading ? (
                      <span className="loading-dots">Sending<span>.</span><span>.</span><span>.</span></span>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
