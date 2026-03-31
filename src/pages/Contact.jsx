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

              {/* Map embedded */}
              <div className="map-placeholder" style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.76632690429689%2C18.544778170889218%2C73.80666732788087%2C18.571477747971714&amp;layer=mapnik&amp;marker=18.55812869153578%2C73.78649711608887"
                ></iframe>
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
                  <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', org: '', phone: '', type: '', message: '' }) }}>
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
                        placeholder="Name"
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
                        placeholder="Email"
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
                        placeholder="Organization"
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
                        placeholder="Phone"
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
                      placeholder="Message"
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
                          <path d="M5 12h14M12 5l7 7-7 7" />
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
