import { createContext, useContext, useState, useEffect } from 'react';

const defaultData = {
  global: {
    siteName: 'UTS Robotics',
    logoImage: null
  },
  home: {
    heroTitle: 'Streets That Think. Lights That Know.',
    heroSubtitle: 'Now serving 15+ cities across Maharashtra',
    heroDesc: 'UTS Robotics brings intelligent IoT-powered street lighting to your city. Automatic on/off scheduling, real-time monitoring, and up to 40% energy savings — all from one unified platform.',
    heroImage: null,
    stats: [
      { value: '500+', label: 'Lights Deployed' },
      { value: '40%', label: 'Energy Saved' },
      { value: '15+', label: 'Cities Served' },
      { value: '99.8%', label: 'Uptime' }
    ],
    features: [
      {
        icon: '⏱',
        title: 'Precision Timer Control',
        desc: 'Schedule street lights to turn on and off automatically based on local sunrise/sunset times or custom schedules.'
      },
      {
        icon: '📡',
        title: 'Real-Time IoT Monitoring',
        desc: 'Monitor every light in your network from a single dashboard. Get instant alerts for failures or anomalies.'
      },
      {
        icon: '⚡',
        title: 'Energy Optimization',
        desc: 'Adaptive dimming reduces energy consumption during low-traffic hours while maintaining safety standards.'
      },
      {
        icon: '🔧',
        title: 'Zero-Touch Maintenance',
        desc: 'Predictive fault detection alerts your team before lights fail, cutting maintenance costs by up to 60%.'
      },
      {
        icon: '☁️',
        title: 'Cloud Dashboard',
        desc: 'A beautifully designed web portal gives your operators full control from any device, anywhere.'
      },
      {
        icon: '🔒',
        title: 'Enterprise Security',
        desc: 'End-to-end encrypted communications with role-based access control and full audit logs.'
      }
    ],
    testimonials: [
      {
        name: 'Rajan Mehta',
        role: 'Municipal Engineer, Nashik',
        quote: 'UTS Robotics transformed how we manage 2,000 street lights. Energy bills dropped by 38% in the first quarter.',
        avatar: 'RM'
      },
      {
        name: 'Priya Sharma',
        role: 'Smart City Director, Aurangabad',
        quote: 'The installation was seamless and the support team is incredible. Our city looks and feels safer at night.',
        avatar: 'PS'
      },
      {
        name: 'Amit Desai',
        role: 'Infrastructure Head, Solapur',
        quote: "Real-time monitoring alone was worth the investment. We know exactly what's happening across our entire grid.",
        avatar: 'AD'
      }
    ]
  },
  about: {
    aboutTitle: 'Built in Pune. Lighting all of India.',
    aboutDesc: "We're a team of engineers and urban tech enthusiasts on a mission to eliminate wasted energy and unsafe streets — one smart light at a time.",
    aboutImage: null,
    team: [
      { name: 'Arjun Patil', role: 'Co-Founder & CEO', initials: 'AP', bio: 'Electrical engineer with 10+ years in smart infrastructure. Former R&D lead at MSEDCL.' },
      { name: 'Sneha Joshi', role: 'Co-Founder & CTO', initials: 'SJ', bio: 'IoT systems architect. Built embedded systems for smart grids across South Asia.' },
      { name: 'Kiran Kulkarni', role: 'Head of Operations', initials: 'KK', bio: 'Manages deployments and municipal partnerships across Maharashtra.' },
      { name: 'Divya Nair', role: 'Lead Hardware Engineer', initials: 'DN', bio: 'Designs ruggedized IoT controllers tested for Indian climate extremes.' },
      { name: 'Rohan Bhatt', role: 'Software Engineer', initials: 'RB', bio: 'Full-stack developer powering the cloud dashboard and analytics platform.' },
      { name: 'Meera Sawant', role: 'Customer Success', initials: 'MS', bio: 'Ensures every city partner achieves their energy and maintenance goals.' }
    ],
    values: [
      { icon: '🌍', title: 'Impact First', desc: 'Every line of code, every circuit we design has one goal: making cities safer and greener.' },
      { icon: '🔬', title: 'Engineering Excellence', desc: 'We obsess over reliability. Our devices are built to last 10+ years in the harshest conditions.' },
      { icon: '🤝', title: 'Partnership Mindset', desc: "Municipal teams aren't clients — they're co-creators. We succeed when your city succeeds." },
      { icon: '📊', title: 'Data Transparency', desc: 'Every insight, every alert, every saving is visible and verifiable. No black boxes.' }
    ],
    milestones: [
      { year: '2020', event: 'UTS Robotics founded in Pune by Arjun Patil & Sneha Joshi' },
      { year: '2021', event: 'First pilot deployment of 50 lights in Pune municipality' },
      { year: '2022', event: 'Expanded to Nashik and Aurangabad; crossed 200 active units' },
      { year: '2023', event: 'Launched cloud dashboard v2.0 with real-time analytics' },
      { year: '2024', event: 'Reached 15 cities and 500+ lights; Series A funding secured' },
      { year: '2025', event: 'Expanding to Gujarat and Rajasthan; 1000 lights milestone' }
    ]
  },
  contact: {
    contactTitle: "Let's light up your city together",
    contactDesc: "Whether you're a municipality exploring smart lighting or a partner looking to collaborate — we'd love to hear from you.",
    contactInfo: [
      { icon: '📧', label: 'Email', value: 'hello@utsrobotics.com', href: 'mailto:hello@utsrobotics.com' },
      { icon: '📞', label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
      { icon: '📍', label: 'Address', value: 'Baner, Pune, Maharashtra 411045', href: '#' },
      { icon: '🕒', label: 'Office Hours', value: 'Mon–Sat, 9:00 AM – 6:00 PM IST', href: null }
    ]
  },
  product: {
    heroTitleMain: 'The UTSLight',
    heroTitleHighlight: 'Controller Pro',
    heroDesc: 'A ruggedized IoT device that retrofits onto any street light, connecting it to our cloud platform for full automation, monitoring, and control.',
    specsTitle: 'Built for India.\\nHardened for the field.',
    specs: [
      { label: 'Input Voltage', value: '85–265V AC' },
      { label: 'Communication', value: '4G LTE / NB-IoT / WiFi' },
      { label: 'Timer Precision', value: '±30 seconds' },
      { label: 'Operating Temp', value: '-10°C to +70°C' },
      { label: 'IP Rating', value: 'IP67 Weatherproof' },
      { label: 'Warranty', value: '3 Years Hardware' },
      { label: 'Power Consumption', value: '<2W (controller only)' },
      { label: 'Lifespan', value: '10+ Years' }
    ],
    featuresTitle: 'What comes with every install',
    benefits: [
      { icon: '💡', title: 'Smart Scheduling', desc: 'Auto on/off based on sunrise/sunset or custom time rules. Never over-illuminate again.' },
      { icon: '📉', title: 'Energy Savings', desc: 'Adaptive dimming during low-traffic hours cuts consumption without compromising safety.' },
      { icon: '🔔', title: 'Instant Alerts', desc: 'Get notified the moment any light fails. Resolve issues before residents notice.' },
      { icon: '📊', title: 'Usage Reports', desc: 'Monthly energy and cost reports delivered automatically to your inbox.' },
      { icon: '🌐', title: 'Remote Control', desc: 'Override any light or zone from your phone — in seconds, from anywhere.' },
      { icon: '🔋', title: 'Retrofit Ready', desc: 'Works with existing poles and fixtures. No infrastructure rebuild needed.' }
    ],
    pricingTitle: 'Simple, scalable pricing',
    pricingDesc: 'Hardware device cost is separate. Software plans are billed annually per light unit.',
    plans: [
      { name: 'Starter', price: '₹2,499', unit: '/light/year', desc: 'Perfect for small municipalities and pilot deployments.', features: ['Up to 100 lights', 'Timer scheduling', 'Basic dashboard', 'Email alerts', 'Email support'], cta: 'Get Started', highlight: false },
      { name: 'City Pro', price: '₹1,899', unit: '/light/year', desc: 'The complete solution for growing smart city deployments.', features: ['Unlimited lights', 'Advanced scheduling', 'Real-time analytics', 'Fault prediction', 'SMS + WhatsApp alerts', 'Dedicated account manager', 'API access'], cta: 'Most Popular', highlight: true },
      { name: 'Enterprise', price: 'Custom', unit: '', desc: 'For state-level or large-scale district deployments.', features: ['Everything in City Pro', 'Custom integrations', 'On-site installation', 'SLA guarantee 99.9%', 'White-label option', 'Priority support 24/7'], cta: 'Contact Sales', highlight: false }
    ]
  },
  gallery: {
    uploads: []
  }
};

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  // Load from backend on start
  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error('No data');
        return res.json();
      })
      .then(parsed => {
        setData({
          global: { ...defaultData.global, ...parsed.global },
          home: { ...defaultData.home, ...parsed.home },
          about: { ...defaultData.about, ...parsed.about },
          contact: { ...defaultData.contact, ...parsed.contact },
          product: { ...defaultData.product, ...parsed.product },
          gallery: { ...defaultData.gallery, ...parsed.gallery }
        });
        setLoading(false);
      })
      .catch((err) => {
        setData(defaultData);
        setLoading(false);
      });
  }, []);

  // Update logic triggers PUT to backend, authenticated by sessionStorage token
  const updateData = (section, key, value) => {
    setData((prevData) => {
      const newState = {
        ...prevData,
        [section]: {
          ...prevData[section],
          [key]: value
        }
      };
      
      const token = sessionStorage.getItem('uts_admin_token');
      if (token) {
        fetch('/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newState)
        }).catch(err => console.error(err));
      }

      return newState;
    });
  };

  if (loading) return null; // or an app splash screen

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
