import './Customers.css'

const currentCustomers = [
  {
    city: 'Pune',
    state: 'Maharashtra',
    lights: 320,
    since: '2021',
    status: 'Active',
    savings: '₹18.4L saved',
    contact: 'Shri Ramesh Kadam',
    role: 'Municipal Commissioner',
    initials: 'PM',
    color: '#f5c518',
  },
  {
    city: 'Nashik',
    state: 'Maharashtra',
    lights: 180,
    since: '2022',
    status: 'Active',
    savings: '₹9.2L saved',
    contact: 'Smt. Pratibha More',
    role: 'City Engineer',
    initials: 'NM',
    color: '#1a9fff',
  },
  {
    city: 'Aurangabad',
    state: 'Maharashtra',
    lights: 140,
    since: '2022',
    status: 'Active',
    savings: '₹7.1L saved',
    contact: 'Shri Ajay Borse',
    role: 'Smart City Director',
    initials: 'AM',
    color: '#22c55e',
  },
  {
    city: 'Solapur',
    state: 'Maharashtra',
    lights: 90,
    since: '2023',
    status: 'Active',
    savings: '₹4.5L saved',
    contact: 'Shri Nilesh Pawar',
    role: 'Infrastructure Head',
    initials: 'SM',
    color: '#a78bfa',
  },
  {
    city: 'Kolhapur',
    state: 'Maharashtra',
    lights: 60,
    since: '2023',
    status: 'Active',
    savings: '₹2.8L saved',
    contact: 'Smt. Rekha Jadhav',
    role: 'Municipal Engineer',
    initials: 'KM',
    color: '#f97316',
  },
  {
    city: 'Ahmednagar',
    state: 'Maharashtra',
    lights: 45,
    since: '2024',
    status: 'Active',
    savings: '₹1.2L saved',
    contact: 'Shri Prakash Shinde',
    role: 'Ward Officer',
    initials: 'AN',
    color: '#ec4899',
  },
]

const previousCustomers = [
  {
    city: 'Nanded (Pilot)',
    state: 'Maharashtra',
    lights: 30,
    period: '2021–2022',
    outcome: 'Successful pilot; full rollout pending municipal budget approval.',
    initials: 'ND',
  },
  {
    city: 'Latur (Pilot)',
    state: 'Maharashtra',
    lights: 20,
    period: '2022',
    outcome: 'Pilot completed; demonstrated 35% savings. Awaiting Phase 2 tender.',
    initials: 'LT',
  },
]

const caseStudy = {
  city: 'Pune',
  challenge: 'Pune municipality was spending ₹1.2 crore annually on electricity for street lights with no automation, resulting in lights running 18+ hours daily.',
  solution: 'UTS Robotics installed 320 UTSLight Controller Pro units across Baner, Kothrud, and Hadapsar zones, configuring adaptive schedules synced to local sunset/sunrise.',
  results: [
    { metric: '41%', label: 'Energy Reduction' },
    { metric: '₹18.4L', label: 'Annual Savings' },
    { metric: '320', label: 'Lights Automated' },
    { metric: '99.7%', label: 'System Uptime' },
  ],
  quote: 'The ROI was faster than we expected. Our maintenance team now spends 60% less time on reactive repairs.',
  quoter: 'Shri Ramesh Kadam, Municipal Commissioner, Pune',
}

export default function Customers() {
  return (
    <div className="customers-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <div className="section-label">Our Customers</div>
          <h1 className="page-hero-title">Cities that trust<br />UTS Robotics</h1>
          <p className="page-hero-desc">
            From pilot programs to full-scale deployments, our partners share one thing in common — measurable results and a brighter, safer city.
          </p>
        </div>
      </section>

      {/* Current Customers */}
      <section className="section">
        <div className="container">
          <div className="section-label">Active Deployments</div>
          <h2 className="section-title">Current customers</h2>
          <div className="customers-grid">
            {currentCustomers.map((c, i) => (
              <div key={i} className="customer-card">
                <div className="customer-card-header">
                  <div className="customer-avatar" style={{ background: `${c.color}22`, border: `1.5px solid ${c.color}55`, color: c.color }}>
                    {c.initials}
                  </div>
                  <div>
                    <div className="customer-city">{c.city}</div>
                    <div className="customer-state">{c.state}</div>
                  </div>
                  <span className="customer-badge active">● Active</span>
                </div>
                <div className="customer-stats">
                  <div className="cust-stat">
                    <div className="cust-stat-val">{c.lights}</div>
                    <div className="cust-stat-label">Lights</div>
                  </div>
                  <div className="cust-stat">
                    <div className="cust-stat-val">{c.since}</div>
                    <div className="cust-stat-label">Since</div>
                  </div>
                  <div className="cust-stat">
                    <div className="cust-stat-val" style={{ color: '#22c55e', fontSize: '0.8rem' }}>{c.savings}</div>
                    <div className="cust-stat-label">Impact</div>
                  </div>
                </div>
                <div className="customer-contact">
                  <span className="contact-name">{c.contact}</span>
                  <span className="contact-role">{c.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="section case-section">
        <div className="container">
          <div className="section-label">Case Study</div>
          <h2 className="section-title">Spotlight: {caseStudy.city}</h2>
          <div className="case-grid">
            <div className="case-content">
              <div className="case-block">
                <h4 className="case-block-label">The Challenge</h4>
                <p className="case-block-text">{caseStudy.challenge}</p>
              </div>
              <div className="case-block">
                <h4 className="case-block-label">Our Solution</h4>
                <p className="case-block-text">{caseStudy.solution}</p>
              </div>
              <blockquote className="case-quote">
                "{caseStudy.quote}"
                <cite>{caseStudy.quoter}</cite>
              </blockquote>
            </div>
            <div className="case-results">
              <h4 className="case-results-title">Results at a Glance</h4>
              {caseStudy.results.map((r, i) => (
                <div key={i} className="case-result-item">
                  <div className="case-result-metric">{r.metric}</div>
                  <div className="case-result-label">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Previous Customers */}
      <section className="section">
        <div className="container">
          <div className="section-label">Completed Pilots</div>
          <h2 className="section-title">Previous engagements</h2>
          <div className="prev-customers-grid">
            {previousCustomers.map((c, i) => (
              <div key={i} className="prev-customer-card">
                <div className="prev-header">
                  <div className="prev-avatar">{c.initials}</div>
                  <div>
                    <div className="prev-city">{c.city}</div>
                    <div className="prev-period">{c.period} · {c.lights} lights</div>
                  </div>
                </div>
                <p className="prev-outcome">{c.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
