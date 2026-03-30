import './Product.css'
import { useData } from '../context/DataContext'

export default function Product() {
  const { data } = useData();
  const { heroTitleMain, heroTitleHighlight, heroDesc, specsTitle, specs, featuresTitle, benefits, pricingTitle, pricingDesc, plans } = data.product;

  return (
    <div className="product-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <div className="section-label">Our Product</div>
          <h1 className="page-hero-title">{heroTitleMain}<br /><span style={{ color: 'var(--accent-gold)' }}>{heroTitleHighlight}</span></h1>
          <p className="page-hero-desc">
            {heroDesc}
          </p>
        </div>
      </section>

      {/* Device visual + specs */}
      <section className="section device-section">
        <div className="container">
          <div className="device-grid">
            <div className="device-visual">
              <div className="device-mockup">
                <div className="device-body">
                  <div className="device-screen">
                    <div className="device-screen-header">
                      <span className="screen-dot green"/>
                      <span className="screen-title">UTSLight Dashboard</span>
                    </div>
                    <div className="screen-row">
                      <span>Status</span>
                      <span className="screen-val active">● Active</span>
                    </div>
                    <div className="screen-row">
                      <span>Schedule</span>
                      <span className="screen-val">06:30 PM – 06:00 AM</span>
                    </div>
                    <div className="screen-row">
                      <span>Brightness</span>
                      <span className="screen-val">80%</span>
                    </div>
                    <div className="screen-row">
                      <span>Power Draw</span>
                      <span className="screen-val">42W</span>
                    </div>
                    <div className="screen-row">
                      <span>Uptime</span>
                      <span className="screen-val">99.9%</span>
                    </div>
                    <div className="screen-bar">
                      <div className="screen-bar-fill" style={{ width: '80%' }} />
                    </div>
                    <div className="screen-caption">Energy saved this month: ₹340</div>
                  </div>
                  <div className="device-ports">
                    <div className="device-port" />
                    <div className="device-port" />
                    <div className="device-port" />
                  </div>
                  <div className="device-led" />
                </div>
                <div className="device-glow" />
              </div>
            </div>

            <div>
              <div className="section-label">Specifications</div>
              <h2 className="section-title" style={{ fontSize: '2rem', whiteSpace: 'pre-line' }}>{specsTitle}</h2>
              <div className="specs-table">
                {specs.map((s, i) => (
                  <div key={i} className="spec-row">
                    <span className="spec-label">{s.label}</span>
                    <span className="spec-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section benefits-section">
        <div className="container">
          <div className="section-label">Features</div>
          <h2 className="section-title">{featuresTitle}</h2>
          <div className="benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <div className="benefit-icon">{b.icon}</div>
                <div>
                  <h3 className="benefit-title">{b.title}</h3>
                  <p className="benefit-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing-section">
        <div className="container">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">{pricingTitle}</h2>
          <p className="section-subtitle" style={{ marginBottom: '48px' }}>
            {pricingDesc}
          </p>
          <div className="pricing-grid">
            {plans.map((plan, i) => (
              <div key={i} className={`pricing-card ${plan.highlight ? 'pricing-highlight' : ''}`}>
                {plan.highlight && <div className="pricing-badge">Most Popular</div>}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">
                  {plan.price}
                  {plan.unit && <span className="pricing-unit">{plan.unit}</span>}
                </div>
                <p className="pricing-desc">{plan.desc}</p>
                <ul className="pricing-features">
                  {plan.features.map((f, j) => (
                    <li key={j}>
                      <span className="check">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="/contact" className={plan.highlight ? 'btn-primary' : 'btn-outline'} style={{ display: 'block', textAlign: 'center', marginTop: 'auto' }}>
                  {plan.highlight ? 'Get Started' : plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
