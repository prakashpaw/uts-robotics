import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import './Footer.css'

export default function Footer() {
  const { data } = useData();
  const contactInfo = data.contact.contactInfo;

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" width="32">
                <circle cx="18" cy="12" r="8" fill="#f5c518" opacity="0.15"/>
                <circle cx="18" cy="12" r="5" fill="#f5c518"/>
                <rect x="16" y="20" width="4" height="10" rx="2" fill="#f5c518"/>
                <line x1="18" y1="4" x2="18" y2="1" stroke="#f5c518" strokeWidth="2" strokeLinecap="round"/>
                <line x1="26" y1="7" x2="28" y2="5" stroke="#f5c518" strokeWidth="2" strokeLinecap="round"/>
                <line x1="10" y1="7" x2="8" y2="5" stroke="#f5c518" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <div className="footer-logo-name">UTS Robotics</div>
                <div className="footer-logo-tag">Smart Street Lighting</div>
              </div>
            </div>
            <p className="footer-desc">
              Pioneering IoT-powered street lighting solutions that make cities smarter, safer, and more energy-efficient.
            </p>
            <div className="footer-socials">
              {['LinkedIn', 'Twitter', 'YouTube'].map(s => (
                <a key={s} href="#" className="social-btn">{s[0]}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/product">Our Product</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/gallery">Gallery</Link>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <Link to="/contact">Get a Demo</Link>
            <a href="#">Case Studies</a>
            <a href="#">Documentation</a>
            <a href="#">Press Kit</a>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href={contactInfo.find(c => c.label === 'Email')?.href || '#'}>
              {contactInfo.find(c => c.label === 'Email')?.value}
            </a>
            <a href={contactInfo.find(c => c.label === 'Phone')?.href || '#'}>
              {contactInfo.find(c => c.label === 'Phone')?.value}
            </a>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              {contactInfo.find(c => c.label === 'Address')?.value.split(',')[1]?.trim() || 'Pune, India'}
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} {data.global.siteName}. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/admin">Admin Login</Link>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
