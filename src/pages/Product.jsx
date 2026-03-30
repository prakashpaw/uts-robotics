import './Product.css'

const specs = [
  { label: 'Input Voltage', value: '85–265V AC' },
  { label: 'Communication', value: '4G LTE / NB-IoT / WiFi' },
  { label: 'Timer Precision', value: '±30 seconds' },
  { label: 'Operating Temp', value: '-10°C to +70°C' },
  { label: 'IP Rating', value: 'IP67 Weatherproof' },
  { label: 'Warranty', value: '3 Years Hardware' },
  { label: 'Power Consumption', value: '<2W (controller only)' },
  { label: 'Lifespan', value: '10+ Years' },
]

const plans = [
  {
    name: 'Starter',
    price: '₹2,499',
    unit: '/light/year',
    desc: 'Perfect for small municipalities and pilot deployments.',
    features: [
      'Up to 100 lights',
      'Timer scheduling',
      'Basic dashboard',
      'Email alerts',
      'Email support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'City Pro',
    price: '₹1,899',
    unit: '/light/year',
    desc: 'The complete solution for growing smart city deployments.',
    features: [
      'Unlimited lights',
      'Advanced scheduling',
      'Real-time analytics',
      'Fault prediction',
      'SMS + WhatsApp alerts',
      'Dedicated account manager',
      'API access',
    ],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    desc: 'For state-level or large-scale district deployments.',
    features: [
      'Everything in City Pro',
      'Custom integrations',
      'On-site installation',
      'SLA guarantee 99.9%',
      'White-label option',
      'Priority support 24/7',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
]

const benefits = [
  { icon: '💡', title: 'Smart Scheduling', desc: 'Auto on/off based on sunrise/sunset or custom time rules. Never over-illuminate again.' },
  { icon: '📉', title: 'Energy Savings', desc: 'Adaptive dimming during low-traffic hours cuts consumption without compromising safety.' },
  { icon: '🔔', title: 'Instant Alerts', desc: 'Get notified the moment any light fails. Resolve issues before residents notice.' },
  { icon: '📊', title: 'Usage Reports', desc: 'Monthly energy and cost reports delivered automatically to your inbox.' },
  { icon: '🌐', title: 'Remote Control', desc: 'Override any light or zone from your phone — in seconds, from anywhere.' },
  { icon: '🔋', title: 'Retrofit Ready', desc: 'Works with existing poles and fixtures. No infrastructure rebuild needed.' },
]

export default function Product() {
  return (
    <div className="product-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <div className="section-label">Our Product</div>
          <h1 className="page-hero-title">The UTSLight<br /><span style={{ color: 'var(--accent-gold)' }}>Controller Pro</span></h1>
          <p className="page-hero-desc">
            A ruggedized IoT device that retrofits onto any street light, connecting it to our cloud platform for full automation, monitoring, and control.
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
              <h2 className="section-title" style={{ fontSize: '2rem' }}>Built for India.<br/>Hardened for the field.</h2>
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
          <h2 className="section-title">What comes with every install</h2>
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
          <h2 className="section-title">Simple, scalable pricing</h2>
          <p className="section-subtitle" style={{ marginBottom: '48px' }}>
            Hardware device cost is separate. Software plans are billed annually per light unit.
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
