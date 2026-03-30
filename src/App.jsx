import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Customers from './pages/Customers'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { DataProvider } from './context/DataContext'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontSize: '5rem', marginBottom: '16px' }}>🔦</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '12px' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Looks like this page went dark.</p>
      <a href="/" className="btn-primary">Back to Home</a>
    </div>
  )
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </DataProvider>
  )
}
