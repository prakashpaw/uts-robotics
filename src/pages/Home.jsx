import { Link } from 'react-router-dom'
import { useData } from '../context/DataContext'
import './Home.css'

export default function Home() {
  const { data } = useData();
  const { stats, features, testimonials, heroTitle, heroSubtitle, heroDesc, heroImage } = data.home;

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-up">
              <span className="badge-dot" />
              {heroSubtitle}
            </div>

            <h1 className="hero-title animate-fade-up animate-delay-1">
              {heroTitle.split('. ').map((part, index, array) => (
                <span key={index} className={index === array.length - 1 ? "hero-title-accent" : ""}>
                  {part}{index < array.length - 1 ? '. ' : ''}
                </span>
              ))}
            </h1>

            <p className="hero-desc animate-fade-up animate-delay-2">
              {heroDesc}
            </p>

            <div className="hero-actions animate-fade-up animate-delay-3">
              <Link to="/contact" className="btn-primary">
                Request a Demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/product" className="btn-outline">
                See How It Works
              </Link>
            </div>
          </div>

          <div className="hero-visual animate-fade-up animate-delay-4">
            {heroImage ? (
              <img src={heroImage} alt="Hero representation" className="custom-hero-image" />
            ) : (
              <div className="professional-graphic">
                <div className="graphic-overlay" />
                <div className="graphic-dashboard">
                  <div className="dash-header" />
                  <div className="dash-chart" />
                  <div className="dash-stats">
                    <div /> <div /> <div />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="container">
          <div className="section-label">Platform Capabilities</div>
          <div className="features-header">
            <h2 className="section-title">Intelligence built<br/>into every light</h2>
            <p className="section-subtitle">
              Our enterprise-grade IoT platform gives municipalities complete control over their street lighting infrastructure — automatically, efficiently, and reliably.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card hover-lift">
                <div className="feature-icon-box">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section bg-secondary">
        <div className="container">
          <div className="section-label">Deployment</div>
          <h2 className="section-title">Up and running in 3 steps</h2>
          <div className="steps-grid">
            {[
              { num: '01', title: 'Install Device', desc: 'Our IoT controller mounts directly to existing street light infrastructure. Minimal rewiring required.' },
              { num: '02', title: 'Define Governance', desc: 'Set time-based rules, adaptive dimming, and sunrise/sunset sync from our central portal.' },
              { num: '03', title: 'Monitor Insights', desc: 'Instantly view energy consumption dropping in real-time. Automated reporting and alerts.' },
            ].map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-num">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-label">Client Success</div>
          <h2 className="section-title">Trusted by visionary cities</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-quote-icon">"</div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">Ready to modernize your infrastructure?</h2>
            <p className="cta-desc">Join progressive cities transitioning to sustainable, data-driven smart lighting.</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-primary">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
