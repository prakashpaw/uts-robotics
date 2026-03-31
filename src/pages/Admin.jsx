import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import './Admin.css';

export default function Admin() {
  const { data, updateData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('uts_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('uts_admin_auth', 'true');
    } else {
      alert('Invalid login credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('uts_admin_auth');
  };

  const handleArrayChange = (section, key, index, field, value) => {
    const newArray = [...data[section][key]];
    newArray[index] = { ...newArray[index], [field]: value };
    updateData(section, key, newArray);
  };

  const handleImageUpload = (section, key, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData(section, key, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    })).then(results => {
      const currentUploads = data.gallery?.uploads || [];
      updateData('gallery', 'uploads', [...currentUploads, ...results]);
    });
  };

  const removeGalleryImage = (index) => {
    const newUploads = [...data.gallery.uploads];
    newUploads.splice(index, 1);
    updateData('gallery', 'uploads', newUploads);
  };

  const handleForceSave = () => {
    setSaveStatus('Saving...');
    setTimeout(() => {
      setSaveStatus('✅ All changes saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 800);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Website Content Admin</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>
            ✨ Content auto-saves on edit
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {saveStatus && <span style={{ color: '#10b981', fontWeight: 'bold' }}>{saveStatus}</span>}
          <button onClick={handleForceSave} className="btn-primary" style={{ padding: '10px 20px' }}>Save Changes</button>
          <button onClick={handleLogout} className="btn-outline" style={{ padding: '10px 20px' }}>Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'global' ? 'active' : ''} onClick={() => setActiveTab('global')}>Global</button>
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</button>
        <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>About</button>
        <button className={activeTab === 'product' ? 'active' : ''} onClick={() => setActiveTab('product')}>Product</button>
        <button className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contact</button>
        <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>Gallery</button>
      </div>

      <div className="admin-content">
        {activeTab === 'global' && (
          <div className="admin-section">
            <h2>Global Settings</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Site Name</label>
              <input value={data.global.siteName} onChange={(e) => updateData('global', 'siteName', e.target.value)} />
            </div>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Logo Image Upload (Optional)</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload('global', 'logoImage', e)} />
              {data.global.logoImage && <img src={data.global.logoImage} alt="Logo Preview" style={{width: '100px', marginTop: '10px'}} />}
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="admin-section">
            <h2>Home Page - Hero Section</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Hero Title</label>
              <input value={data.home.heroTitle} onChange={(e) => updateData('home', 'heroTitle', e.target.value)} />
              <label>Hero Subtitle</label>
              <input value={data.home.heroSubtitle} onChange={(e) => updateData('home', 'heroSubtitle', e.target.value)} />
              <label>Hero Description</label>
              <textarea value={data.home.heroDesc} onChange={(e) => updateData('home', 'heroDesc', e.target.value)} rows={3}></textarea>
              <label>Hero Image Upload (Replaces default graphic)</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload('home', 'heroImage', e)} />
              {data.home.heroImage && <img src={data.home.heroImage} alt="Hero Preview" style={{width: '200px', marginTop: '10px'}} />}
            </div>

            <h2>Home Page - Stats</h2>
            {data.home.stats.map((stat, i) => (
              <div key={i} className="admin-item-row">
                <input value={stat.value} onChange={(e) => handleArrayChange('home', 'stats', i, 'value', e.target.value)} placeholder="Value" />
                <input value={stat.label} onChange={(e) => handleArrayChange('home', 'stats', i, 'label', e.target.value)} placeholder="Label" />
              </div>
            ))}

            <h2>Home Page - Features</h2>
            {data.home.features.map((feature, i) => (
              <div key={i} className="admin-item-row admin-feature-row">
                <input value={feature.icon} onChange={(e) => handleArrayChange('home', 'features', i, 'icon', e.target.value)} placeholder="Icon" style={{width: '60px'}} />
                <input value={feature.title} onChange={(e) => handleArrayChange('home', 'features', i, 'title', e.target.value)} placeholder="Title" />
                <textarea value={feature.desc} onChange={(e) => handleArrayChange('home', 'features', i, 'desc', e.target.value)} placeholder="Description" rows={3}></textarea>
              </div>
            ))}

            <h2>Home Page - Testimonials</h2>
            {data.home.testimonials.map((test, i) => (
              <div key={i} className="admin-item-row admin-testimonial-row">
                <div style={{display:'flex', gap: '10px'}}>
                  <input value={test.name} onChange={(e) => handleArrayChange('home', 'testimonials', i, 'name', e.target.value)} placeholder="Name" />
                  <input value={test.role} onChange={(e) => handleArrayChange('home', 'testimonials', i, 'role', e.target.value)} placeholder="Role" />
                  <input value={test.avatar} onChange={(e) => handleArrayChange('home', 'testimonials', i, 'avatar', e.target.value)} placeholder="Avatar" style={{width: '80px'}} />
                </div>
                <textarea value={test.quote} onChange={(e) => handleArrayChange('home', 'testimonials', i, 'quote', e.target.value)} placeholder="Quote" rows={3}></textarea>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="admin-section">
            <h2>About Page - Intro</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>About Title</label>
              <input value={data.about.aboutTitle} onChange={(e) => updateData('about', 'aboutTitle', e.target.value)} />
              <label>About Description</label>
              <textarea value={data.about.aboutDesc} onChange={(e) => updateData('about', 'aboutDesc', e.target.value)} rows={3}></textarea>
              <label>About Image Upload</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload('about', 'aboutImage', e)} />
              {data.about.aboutImage && <img src={data.about.aboutImage} alt="About Preview" style={{width: '200px', marginTop: '10px'}} />}
            </div>

            <h2>About Page - Team</h2>
            {data.about.team.map((member, i) => (
              <div key={i} className="admin-item-row admin-team-row">
                <div style={{display:'flex', gap: '10px'}}>
                  <input value={member.name} onChange={(e) => handleArrayChange('about', 'team', i, 'name', e.target.value)} placeholder="Name" />
                  <input value={member.role} onChange={(e) => handleArrayChange('about', 'team', i, 'role', e.target.value)} placeholder="Role" />
                  <input value={member.initials} onChange={(e) => handleArrayChange('about', 'team', i, 'initials', e.target.value)} placeholder="Initials" style={{width: '80px'}} />
                </div>
                <textarea value={member.bio} onChange={(e) => handleArrayChange('about', 'team', i, 'bio', e.target.value)} placeholder="Bio" rows={2}></textarea>
              </div>
            ))}

            <h2>About Page - Milestones</h2>
            {data.about.milestones.map((ms, i) => (
              <div key={i} className="admin-item-row">
                <input value={ms.year} onChange={(e) => handleArrayChange('about', 'milestones', i, 'year', e.target.value)} placeholder="Year" style={{width: '100px'}} />
                <input value={ms.event} onChange={(e) => handleArrayChange('about', 'milestones', i, 'event', e.target.value)} placeholder="Event" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'product' && (
          <div className="admin-section">
            <h2>Product Page - Hero</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Hero Title (Main)</label>
              <input value={data.product.heroTitleMain} onChange={(e) => updateData('product', 'heroTitleMain', e.target.value)} />
              <label>Hero Title (Highlight)</label>
              <input value={data.product.heroTitleHighlight} onChange={(e) => updateData('product', 'heroTitleHighlight', e.target.value)} />
              <label>Hero Description</label>
              <textarea value={data.product.heroDesc} onChange={(e) => updateData('product', 'heroDesc', e.target.value)} rows={3}></textarea>
            </div>

            <h2>Product Page - Specs</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Specs Title</label>
              <input value={data.product.specsTitle} onChange={(e) => updateData('product', 'specsTitle', e.target.value)} />
            </div>
            {data.product.specs.map((spec, i) => (
              <div key={i} className="admin-item-row">
                <input value={spec.label} onChange={(e) => handleArrayChange('product', 'specs', i, 'label', e.target.value)} placeholder="Label" />
                <input value={spec.value} onChange={(e) => handleArrayChange('product', 'specs', i, 'value', e.target.value)} placeholder="Value" />
              </div>
            ))}

            <h2>Product Page - Features</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Features Title</label>
              <input value={data.product.featuresTitle} onChange={(e) => updateData('product', 'featuresTitle', e.target.value)} />
            </div>
            {data.product.benefits.map((b, i) => (
              <div key={i} className="admin-item-row">
                <input value={b.icon} onChange={(e) => handleArrayChange('product', 'benefits', i, 'icon', e.target.value)} placeholder="Icon" style={{width: '60px'}} />
                <input value={b.title} onChange={(e) => handleArrayChange('product', 'benefits', i, 'title', e.target.value)} placeholder="Title" />
                <textarea value={b.desc} onChange={(e) => handleArrayChange('product', 'benefits', i, 'desc', e.target.value)} placeholder="Description" rows={2}></textarea>
              </div>
            ))}

            <h2>Product Page - Pricing</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Pricing Title</label>
              <input value={data.product.pricingTitle} onChange={(e) => updateData('product', 'pricingTitle', e.target.value)} />
              <label>Pricing Description</label>
              <input value={data.product.pricingDesc} onChange={(e) => updateData('product', 'pricingDesc', e.target.value)} />
            </div>
            {data.product.plans.map((plan, i) => (
              <div key={i} className="admin-item-row admin-testimonial-row">
                <div style={{display:'flex', gap: '10px'}}>
                  <input value={plan.name} onChange={(e) => handleArrayChange('product', 'plans', i, 'name', e.target.value)} placeholder="Plan Name" />
                  <input value={plan.price} onChange={(e) => handleArrayChange('product', 'plans', i, 'price', e.target.value)} placeholder="Price" />
                  <input value={plan.unit} onChange={(e) => handleArrayChange('product', 'plans', i, 'unit', e.target.value)} placeholder="Unit" />
                </div>
                <textarea value={plan.desc} onChange={(e) => handleArrayChange('product', 'plans', i, 'desc', e.target.value)} placeholder="Description" rows={2}></textarea>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="admin-section">
            <h2>Contact Page - Header</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Contact Title</label>
              <input value={data.contact.contactTitle} onChange={(e) => updateData('contact', 'contactTitle', e.target.value)} />
              <label>Contact Description</label>
              <textarea value={data.contact.contactDesc} onChange={(e) => updateData('contact', 'contactDesc', e.target.value)} rows={3}></textarea>
            </div>
            
            <h2>Contact Page - Details</h2>
            {data.contact.contactInfo.map((info, i) => (
              <div key={i} className="admin-item-row">
                <input value={info.icon} onChange={(e) => handleArrayChange('contact', 'contactInfo', i, 'icon', e.target.value)} placeholder="Icon" style={{width: '60px'}} />
                <input value={info.label} onChange={(e) => handleArrayChange('contact', 'contactInfo', i, 'label', e.target.value)} placeholder="Label" />
                <input value={info.value} onChange={(e) => handleArrayChange('contact', 'contactInfo', i, 'value', e.target.value)} placeholder="Value" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="admin-section">
            <h2>Gallery Image Uploads</h2>
            <div className="admin-item-row" style={{flexDirection: 'column'}}>
              <label>Upload New Images to Gallery (You can select multiple)</label>
              <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {(data.gallery?.uploads || []).map((img, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={img} alt={`Upload ${i}`} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                  <button 
                    onClick={() => removeGalleryImage(i)}
                    style={{ position: 'absolute', top: 5, right: 5, background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px' }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
