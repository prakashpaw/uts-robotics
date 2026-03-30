import { useState } from 'react'
import { useData } from '../context/DataContext'
import './Gallery.css'

const categories = ['All', 'Installations', 'Dashboard', 'Team', 'Events']

const photos = [
  { id: 1, category: 'Installations', city: 'Pune', title: 'Baner Road Installation', desc: '320 units along Baner-Balewadi corridor', span: 'wide', color: '#1a2a4a' },
  { id: 2, category: 'Installations', city: 'Nashik', title: 'Nashik Highway Retrofit', desc: 'Night-time installation crew at work', span: 'normal', color: '#0f2030' },
  { id: 3, category: 'Dashboard', city: 'Remote', title: 'Live Control Center', desc: 'Real-time view of 500+ lights across 15 cities', span: 'normal', color: '#0a1a2e' },
  { id: 4, category: 'Team', city: 'Pune HQ', title: 'R&D Lab', desc: 'Hardware engineers testing new controller firmware', span: 'normal', color: '#1a1a2e' },
  { id: 5, category: 'Installations', city: 'Aurangabad', title: 'Aurangabad Smart Zone', desc: 'Historic city walls illuminated smartly', span: 'normal', color: '#0d2030' },
  { id: 6, category: 'Events', city: 'Pune', title: 'Smart City Expo 2024', desc: 'UTS Robotics booth at Smart City India Expo', span: 'wide', color: '#1e1a2e' },
  { id: 7, category: 'Team', city: 'Pune HQ', title: 'Engineering Team', desc: 'Celebrating the 500 lights milestone', span: 'normal', color: '#12202e' },
  { id: 8, category: 'Dashboard', city: 'Remote', title: 'Analytics Dashboard', desc: 'Energy consumption breakdown by zone', span: 'normal', color: '#0a1428' },
  { id: 9, category: 'Installations', city: 'Kolhapur', title: 'Kolhapur Ring Road', desc: 'Sunrise/sunset adaptive installation', span: 'normal', color: '#162030' },
  { id: 10, category: 'Events', city: 'Mumbai', title: 'MahaIoT Conference', desc: 'Presenting at MahaIoT 2024', span: 'normal', color: '#201428' },
  { id: 11, category: 'Team', city: 'Pune HQ', title: "Founders' Day", desc: 'Celebrating 3 years of UTS Robotics', span: 'normal', color: '#1a1430' },
  { id: 12, category: 'Installations', city: 'Solapur', title: 'Solapur Main Road', desc: '90 lights deployed in Phase 1', span: 'normal', color: '#101e2a' },
]

// SVG placeholders simulating real photos
function PhotoPlaceholder({ photo }) {
  const icons = {
    Installations: (
      <g>
        <rect x="60" y="110" width="6" height="80" fill="#64748b"/>
        <line x1="63" y1="110" x2="90" y2="100" stroke="#64748b" strokeWidth="3"/>
        <circle cx="92" cy="99" r="8" fill="#f5c518" opacity="0.9"/>
        <ellipse cx="92" cy="115" rx="20" ry="8" fill="rgba(245,197,24,0.15)"/>
        <rect x="140" y="120" width="6" height="70" fill="#64748b"/>
        <line x1="143" y1="120" x2="170" y2="108" stroke="#64748b" strokeWidth="3"/>
        <circle cx="172" cy="107" r="8" fill="#f5c518" opacity="0.9"/>
        <ellipse cx="172" cy="123" rx="20" ry="8" fill="rgba(245,197,24,0.15)"/>
        <rect x="220" y="115" width="6" height="75" fill="#64748b"/>
        <line x1="223" y1="115" x2="250" y2="103" stroke="#64748b" strokeWidth="3"/>
        <circle cx="252" cy="102" r="8" fill="#f5c518" opacity="0.9"/>
        <ellipse cx="252" cy="118" rx="20" ry="8" fill="rgba(245,197,24,0.15)"/>
        <rect x="0" y="185" width="320" height="15" fill="#1e293b"/>
        <line x1="40" y1="185" x2="280" y2="185" stroke="rgba(245,197,24,0.3)" strokeWidth="1" strokeDasharray="20,15"/>
      </g>
    ),
    Dashboard: (
      <g>
        <rect x="20" y="60" width="280" height="130" rx="10" fill="#0d1424" stroke="rgba(245,197,24,0.2)" strokeWidth="1"/>
        <rect x="30" y="70" width="120" height="50" rx="6" fill="#1a2640"/>
        <text x="90" y="100" textAnchor="middle" fill="#f5c518" fontSize="18" fontWeight="bold">99.8%</text>
        <text x="90" y="112" textAnchor="middle" fill="#8898b8" fontSize="8">Uptime</text>
        <rect x="160" y="70" width="130" height="50" rx="6" fill="#1a2640"/>
        <text x="225" y="100" textAnchor="middle" fill="#22c55e" fontSize="18" fontWeight="bold">500+</text>
        <text x="225" y="112" textAnchor="middle" fill="#8898b8" fontSize="8">Active Lights</text>
        <rect x="30" y="130" width="260" height="50" rx="6" fill="#1a2640"/>
        <rect x="40" y="150" width="40" height="18" rx="3" fill="#f5c518" opacity="0.8"/>
        <rect x="88" y="155" width="30" height="13" rx="3" fill="#f5c518" opacity="0.5"/>
        <rect x="126" y="142" width="50" height="26" rx="3" fill="#f5c518" opacity="0.9"/>
        <rect x="184" y="150" width="35" height="18" rx="3" fill="#f5c518" opacity="0.6"/>
        <rect x="227" y="145" width="45" height="23" rx="3" fill="#f5c518" opacity="0.75"/>
      </g>
    ),
    Team: (
      <g>
        <circle cx="100" cy="110" r="30" fill="#1a2640"/>
        <circle cx="100" cy="100" r="14" fill="#2d3f5e"/>
        <path d="M70 140 Q100 125 130 140" fill="#2d3f5e"/>
        <circle cx="180" cy="105" r="28" fill="#1a2640"/>
        <circle cx="180" cy="96" r="13" fill="#2d3f5e"/>
        <path d="M152 133 Q180 119 208 133" fill="#2d3f5e"/>
        <circle cx="255" cy="112" r="26" fill="#1a2640"/>
        <circle cx="255" cy="103" r="12" fill="#2d3f5e"/>
        <path d="M229 138 Q255 124 281 138" fill="#2d3f5e"/>
        <rect x="60" y="168" width="200" height="6" rx="3" fill="#1a2640"/>
        <circle cx="105" cy="171" r="8" fill="#f5c518" opacity="0.7"/>
        <circle cx="160" cy="171" r="8" fill="#1a9fff" opacity="0.7"/>
        <circle cx="215" cy="171" r="8" fill="#22c55e" opacity="0.7"/>
      </g>
    ),
    Events: (
      <g>
        <rect x="30" y="70" width="260" height="110" rx="8" fill="#1a2640" stroke="rgba(245,197,24,0.15)" strokeWidth="1"/>
        <rect x="40" y="80" width="80" height="90" rx="6" fill="#0d1424"/>
        <text x="80" y="132" textAnchor="middle" fill="#f5c518" fontSize="10" fontWeight="bold">UTS</text>
        <text x="80" y="145" textAnchor="middle" fill="#f5c518" fontSize="8">ROBOTICS</text>
        <rect x="135" y="90" width="140" height="8" rx="3" fill="#2d3f5e"/>
        <rect x="135" y="105" width="100" height="6" rx="3" fill="#2d3f5e"/>
        <rect x="135" y="118" width="120" height="6" rx="3" fill="#2d3f5e"/>
        <rect x="135" y="140" width="60" height="24" rx="5" fill="#f5c518"/>
        <text x="165" y="157" textAnchor="middle" fill="#04080f" fontSize="9" fontWeight="bold">VISIT US</text>
        <circle cx="56" cy="185" r="4" fill="#f5c518" opacity="0.6"/>
        <circle cx="72" cy="185" r="4" fill="#1a9fff" opacity="0.6"/>
        <circle cx="88" cy="185" r="4" fill="#22c55e" opacity="0.6"/>
      </g>
    ),
  }

  return (
    <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="320" height="200" fill={photo.color}/>
      <rect width="320" height="200" fill="url(#noise-grad)" opacity="0.3"/>
      {icons[photo.category] || icons['Installations']}
      <rect x="0" y="170" width="320" height="30" fill="linear-gradient(transparent, rgba(0,0,0,0.6))"/>
    </svg>
  )
}

export default function Gallery() {
  const { data } = useData();
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const uploads = data.gallery?.uploads || [];
  const uploadPhotos = uploads.map((img, i) => ({
    id: `upload-${i}`,
    category: 'Installations',
    city: 'Uploaded Data',
    title: 'Site Image',
    desc: 'Uploaded via Admin Dashboard',
    span: 'normal',
    color: '#0f172a',
    src: img
  }));

  const allPhotos = [...uploadPhotos, ...photos];

  const filtered = active === 'All' ? allPhotos : allPhotos.filter(p => p.category === active)

  return (
    <div className="gallery-page">
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container">
          <div className="section-label">Gallery</div>
          <h1 className="page-hero-title">Our work in the field<br />and beyond</h1>
          <p className="page-hero-desc">
            From installation sites to our R&D lab — a visual story of how UTS Robotics is lighting up cities across Maharashtra.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter Tabs */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${active === cat ? 'active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gallery-grid">
            {filtered.map(photo => (
              <div
                key={photo.id}
                className={`gallery-item ${photo.span === 'wide' ? 'wide' : ''}`}
                onClick={() => setLightbox(photo)}
              >
                <div className="gallery-img" style={{ position: 'absolute', inset: 0 }}>
                  {photo.src ? (
                    <img src={photo.src} alt="Gallery item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <PhotoPlaceholder photo={photo} />
                  )}
                </div>
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-cat-tag">{photo.category}</span>
                    <h3 className="gallery-item-title">{photo.title}</h3>
                    <p className="gallery-item-city">📍 {photo.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <div className="lightbox-img" style={{ height: '70%', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
              {lightbox.src ? (
                <img src={lightbox.src} alt="Lightbox" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <PhotoPlaceholder photo={lightbox} />
              )}
            </div>
            <div className="lightbox-info">
              <span className="gallery-cat-tag">{lightbox.category}</span>
              <h3 className="lightbox-title">{lightbox.title}</h3>
              <p className="lightbox-desc">{lightbox.desc}</p>
              <p className="lightbox-city">📍 {lightbox.city}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
