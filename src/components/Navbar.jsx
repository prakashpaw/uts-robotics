import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/product', label: 'Product' },
  { to: '/customers', label: 'Customers' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { data } = useData();
  const { siteName, logoImage } = data.global;
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  
  const [theme, setTheme] = useState(() => localStorage.getItem('site_theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('site_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner container">
        <Link to="/" className="nav-logo">
          {logoImage ? (
            <img src={logoImage} alt={siteName} className="custom-logo" />
          ) : (
            <>
              <div className="logo-icon">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18" cy="18" r="16" fill="var(--accent-blue)" opacity="0.1"/>
                  <circle cx="18" cy="18" r="8" fill="var(--accent-blue)"/>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-name">{siteName.split(' ')[0]}</span>
                <span className="logo-sub">{siteName.split(' ')[1] || ''}</span>
              </div>
            </>
          )}
        </Link>

        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link to="/contact" className="btn-primary nav-cta">
            Get a Demo
          </Link>
          <button
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="btn-primary" style={{ marginTop: '12px', justifyContent: 'center' }}>
          Get a Demo
        </Link>
      </div>
    </nav>
  )
}
