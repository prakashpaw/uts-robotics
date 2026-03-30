import { useData } from '../context/DataContext'
import './About.css'

export default function About() {
  const { data } = useData();
  const { team, values, milestones, aboutTitle, aboutDesc, aboutImage } = data.about;

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-label">Our Mission</div>
          <h1 className="page-hero-title">{aboutTitle}</h1>
          <p className="page-hero-desc">{aboutDesc}</p>
        </div>
      </section>

      {/* Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div>
              <div className="section-label">Origin Story</div>
              <h2 className="section-title">A problem we saw every night</h2>
              <div className="story-text-content">
                <p>
                  It started with a drive through Pune at 3 AM. Every street light was blazing — burning energy, spending taxpayer money, illuminating empty roads. Arjun and Sneha, both engineers, couldn't unsee it.
                </p>
                <p>
                  They spent a year prototyping IoT controllers that could listen to schedules, respond to real-time data, and make every light smarter. In 2021, Pune municipality gave them their first shot — 50 lights in Baner.
                </p>
                <p>
                  Energy dropped 41%. The municipality saved ₹2.4 lakh in the first year alone. Word spread fast.
                </p>
              </div>
            </div>
            <div className="story-visual">
              {aboutImage ? (
                <img src={aboutImage} alt="About Us" className="custom-about-img" />
              ) : (
                <div className="story-stat-container">
                  <div className="story-stat-box">
                    <div className="story-big-num">₹2.4L</div>
                    <div className="story-big-label">Saved in Year 1 pilot</div>
                  </div>
                  <div className="story-stat-box">
                    <div className="story-big-num">41%</div>
                    <div className="story-big-label">Energy reduction in pilot</div>
                  </div>
                  <div className="story-stat-box story-stat-wide">
                    <div className="story-big-num">2021</div>
                    <div className="story-big-label">First deployment, Baner, Pune</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section bg-secondary">
        <div className="container">
          <div className="section-label">Core Principles</div>
          <h2 className="section-title">What drives us</h2>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section timeline-section">
        <div className="container">
          <div className="section-label">Growth</div>
          <h2 className="section-title">Our journey so far</h2>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{m.year}</div>
                  <div className="timeline-event">{m.event}</div>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section team-section bg-secondary">
        <div className="container">
          <div className="section-label">Leadership</div>
          <h2 className="section-title">People behind the platform</h2>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar">{member.initials}</div>
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
