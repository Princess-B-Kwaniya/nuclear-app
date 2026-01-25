'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Atom, ArrowRight, Clock, Shield, Link2, PlayCircle, Menu, X, 
  MapPin, FileText, Cpu, Check, ShieldCheck, Quote, Award, Lock, 
  Twitter, Linkedin, Facebook, Scan
} from 'lucide-react';
import { LoginModal } from '@/components/shared';
import { useAuth } from '@/contexts';

export default function LandingPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleLogin = () => {
    setIsLoginOpen(false);
    router.push('/dashboard');
  };

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    try {
      const result = await login('demo@nuclear.app', 'demo123456');
      if (result.success) {
        // Use window.location for demo login to ensure full page reload
        // This allows the auth context to properly initialize
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setIsDemoLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <style jsx global>{`
        :root {
          /* Color Palette */
          --color-primary: #0f172a;
          --color-primary-dark: #020617;
          --color-primary-light: #f8fafc;
          --color-accent: #c2a47c;
          --color-accent-hover: #b08d55;
          --color-text-main: #1e293b;
          --color-text-secondary: #64748b;
          --color-text-muted: #94a3b8;
          --color-bg-body: #fafafa;
          --color-bg-white: #ffffff;
          --color-bg-subtle: #f1f5f9;
          --color-border: #e2e8f0;
          --color-border-light: #f1f5f9;
          --color-success: #059669;
          --color-success-bg: #ecfdf5;
          
          /* Typography */
          --font-heading: 'Playfair Display', serif;
          --font-body: 'Plus Jakarta Sans', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          
          /* Spacing */
          --space-1: 4px;
          --space-2: 8px;
          --space-3: 12px;
          --space-4: 16px;
          --space-6: 24px;
          --space-8: 32px;
          --space-12: 48px;
          --space-16: 64px;
          --space-24: 96px;
          
          /* Effects */
          --radius-sm: 4px;
          --radius-md: 8px;
          --radius-lg: 16px;
          --radius-xl: 24px;
          --radius-full: 9999px;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
          --transition-fast: 150ms ease;
          --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          font-family: var(--font-body);
          color: var(--color-text-main);
          background-color: var(--color-bg-body);
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
        
        .navbar {
          position: sticky;
          top: 0;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--color-border-light);
          z-index: 100;
          height: 80px;
          display: flex;
          align-items: center;
        }
        
        .container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        
        .logo {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 24px;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          letter-spacing: -0.02em;
        }
        
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--color-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .nav-links {
          display: flex;
          gap: 48px;
          align-items: center;
        }
        
        .nav-link {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          position: relative;
          padding: 8px 4px;
          transition: color var(--transition-fast);
        }
        
        .nav-link:hover {
          color: var(--color-primary);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--color-primary);
          transition: width var(--transition-fast);
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          transition: all var(--transition-normal);
          gap: var(--space-2);
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        
        .btn-primary {
          background-color: var(--color-primary);
          color: white;
          box-shadow: var(--shadow-md);
        }
        
        .btn-primary:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        
        .btn-secondary {
          background-color: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-text-main);
        }
        
        .btn-secondary:hover {
          border-color: var(--color-primary);
          background-color: var(--color-bg-white);
          color: var(--color-primary);
        }
        
        .btn-ghost {
          background-color: transparent;
          color: var(--color-text-secondary);
        }
        
        .btn-ghost:hover {
          color: var(--color-primary);
          background-color: var(--color-bg-subtle);
        }
        
        .hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--color-bg-body) 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        
        .hero-content h1 {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 24px;
          color: var(--color-primary);
          font-weight: 700;
        }
        
        .hero-content p {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          margin-bottom: 32px;
          max-width: 540px;
          line-height: 1.6;
        }
        
        .hero-tag {
          color: var(--color-accent);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 12px;
          margin-bottom: 24px;
          display: block;
        }
        
        .hero-accent {
          color: var(--color-accent);
        }
        
        .hero-card-mockup {
          background: var(--color-primary);
          border-radius: var(--radius-xl);
          padding: 32px;
          box-shadow: var(--shadow-xl);
          color: white;
          position: relative;
          z-index: 10;
        }
        
        .flex {
          display: flex;
        }
        
        .flex-col {
          flex-direction: column;
        }
        
        .gap-2 { gap: var(--space-2); }
        .gap-4 { gap: var(--space-4); }
        .gap-8 { gap: var(--space-8); }
        .gap-16 { gap: 64px; }
        
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        
        .text-center { text-align: center; }
        
        .grid {
          display: grid;
        }
        
        .grid-cols-3 {
          grid-template-columns: repeat(3, 1fr);
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
          line-height: 1.2;
          font-weight: 700;
          color: var(--color-primary);
          margin-bottom: var(--space-4);
        }
        
        h1 { font-size: 3.5rem; letter-spacing: -0.02em; }
        h2 { font-size: 2.5rem; letter-spacing: -0.01em; }
        h3 { font-size: 1.5rem; }
        h4 { font-size: 1.25rem; }
        
        p {
          margin-bottom: var(--space-4);
          color: var(--color-text-secondary);
        }
        
        .card {
          background-color: var(--color-bg-white);
          border: 1px solid var(--color-border-light);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-normal);
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--color-border);
        }
        
        .icon-wrapper {
          width: 48px;
          height: 48px;
          background: var(--color-bg-subtle);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          color: var(--color-primary);
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.02em;
        }
        
        .badge-success {
          background: rgba(255,255,255,0.2);
          color: white;
          border: none;
        }
        
        .flex-1 {
          flex: 1;
        }
        
        .mb-24 {
          margin-bottom: 96px;
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--color-text-main);
          cursor: pointer;
          padding: var(--space-2);
          border-radius: var(--radius-md);
        }
        
        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%;
          width: min(320px, 85vw);
          height: 100vh;
          background: white;
          box-shadow: var(--shadow-xl);
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          padding: var(--space-6);
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          overflow-y: auto;
        }
        
        .mobile-nav.active {
          right: 0;
        }
        
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-normal);
        }
        
        .mobile-nav-overlay.active {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-nav-close {
          align-self: flex-end;
          background: none;
          border: none;
          padding: var(--space-2);
          cursor: pointer;
          border-radius: var(--radius-md);
        }
        
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        
        .mobile-nav-links .nav-link {
          padding: 16px 8px;
          font-size: 16px;
          border-bottom: 1px solid var(--color-border-light);
          min-height: 48px;
          display: flex;
          align-items: center;
        }
        
        .mobile-nav-links .btn {
          min-height: 48px;
          justify-content: center;
          font-size: 16px;
        }
        
        .hidden-mobile {
          display: block;
        }
        
        .mobile-only {
          display: none;
        }
        
        @media (min-width: 1024px) {
          .grid[style*="grid-template-columns: 1fr"][style*="margin-bottom"] {
            grid-template-columns: 1fr 1fr !important;
          }
          
          .grid[style*="grid-template-columns: 1fr"]:not([style*="margin-bottom"]) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        @media (max-width: 1024px) {
          .container {
            padding: 0 var(--space-4);
          }
          
          .hero-grid {
            gap: 60px;
          }
          
          .grid-cols-3 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: var(--space-4) !important;
          }
          
          h1 { font-size: 2.5rem; }
          h2 { font-size: 2rem; }
          
          /* Ensure zig-zag sections stack on mobile */
          .grid[style*="grid-template-columns: 1fr"] {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          
          /* Make images responsive in zig-zag sections */
          .grid[style*="grid-template-columns: 1fr"] img {
            width: 100%;
            height: auto;
          }
        }
        
        @media (max-width: 640px) {
          .container {
            padding: 0 16px;
          }
          
          .hero-content h1 {
            font-size: 1.75rem !important;
            line-height: 1.2;
          }
          
          .hero-content p {
            font-size: 1rem;
            line-height: 1.5;
          }
          
          .btn {
            width: 100%;
            min-height: 48px;
            font-size: 16px;
          }
        }
        
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          
          .mobile-only {
            display: block !important;
          }
          
          .mobile-menu-btn {
            display: block;
            min-width: 44px;
            min-height: 44px;
          }
          
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
            text-align: center;
            padding: 2rem 0;
          }
          
          .hero-content h1 {
            font-size: 2rem !important;
            margin-bottom: 1rem;
          }
          
          /* Fix feature sections for mobile */
          .grid[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            margin-bottom: 80px !important;
          }
          
          /* Ensure proper order on mobile */
          .order-1 {
            order: 1;
          }
          
          .order-2 {
            order: 2;
          }
          
          .grid-cols-3 {
            grid-template-columns: 1fr !important;
            gap: var(--space-4) !important;
          }
          
          .grid[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
          }
          
          .flex.gap-4 {
            flex-direction: column;
            gap: var(--space-3) !important;
          }
          
          .container {
            padding: 0 var(--space-4);
          }
          
          section[style*="background: var(--color-primary)"] .flex {
            flex-direction: column !important;
            gap: var(--space-6) !important;
            text-align: center;
          }
          
          footer .grid[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: var(--space-8) !important;
            text-align: center;
          }
          
          .flex.justify-center.gap-16 {
            flex-direction: column !important;
            gap: var(--space-8) !important;
            align-items: center;
          }
          
          h2 {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
      
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container nav-container">
          <a href="#" className="logo">
            <div className="logo-icon">
              <Atom size={20} />
            </div>
            NuClear
          </a>

          <div className="nav-links hidden-mobile">
            <a href="#features" className="nav-link">Features</a>
            <a href="#solutions" className="nav-link">Solutions</a>
            <a href="#compliance" className="nav-link">Compliance</a>
            <a href="#about" className="nav-link">About</a>
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={handleOpenLogin} className="btn btn-ghost hidden-mobile">Log In</button>
            <button onClick={handleOpenLogin} className="btn btn-primary hidden-mobile">Get Started</button>
            <button className="mobile-menu-btn mobile-only" onClick={toggleMobileMenu}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}></div>
      
      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <button className="mobile-nav-close" onClick={closeMobileMenu}>
          <X size={24} />
        </button>
        <div className="mobile-nav-links">
          <a href="#features" className="nav-link" onClick={closeMobileMenu}>Features</a>
          <a href="#solutions" className="nav-link" onClick={closeMobileMenu}>Solutions</a>
          <a href="#compliance" className="nav-link" onClick={closeMobileMenu}>Compliance</a>
          <a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a>
          <button onClick={() => { closeMobileMenu(); handleOpenLogin(); }} className="btn btn-ghost" style={{marginTop: '16px'}}>Log In</button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-tag">
              Safe & Efficient Logistics
            </span>
            <h1>
              Revolutionizing <br />
              <span className="hero-accent">Nuclear Medicine</span> <br />
              Logistics
            </h1>
            <p>
              Secure, blockchain-powered traceability for high-stakes medical shipments across Africa. Ensuring precision from supplier to patient with uncompromising standards.
            </p>

            <div className="flex gap-4" style={{marginBottom: '32px'}}>
              <button onClick={handleDemoLogin} disabled={isDemoLoading} className="btn btn-primary">
                {isDemoLoading ? 'Loading...' : 'Try Demo'} <ArrowRight size={16} />
              </button>
              <button className="btn btn-secondary" onClick={handleOpenLogin}>
                <PlayCircle size={16} /> Sign In
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex" style={{marginLeft: '10px'}}>
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" style={{width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', marginLeft: '-10px'}} alt="User 1" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" style={{width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', marginLeft: '-10px'}} alt="User 2" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" style={{width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white', marginLeft: '-10px'}} alt="User 3" />
              </div>
              <span style={{fontSize: '14px', color: 'var(--color-text-secondary)'}}>Trusted by <strong>500+</strong> medical facilities</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-mockup">
              {/* Window Controls */}
              <div className="flex gap-2" style={{marginBottom: '24px'}}>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)'}}></div>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)'}}></div>
                <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)'}}></div>
              </div>

              {/* Content */}
              <div className="flex justify-between items-start" style={{marginBottom: '32px'}}>
                <div>
                  <div style={{fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px', letterSpacing: '1px'}}>SHIPMENT ID</div>
                  <div style={{fontFamily: 'var(--font-mono)', fontSize: '20px', letterSpacing: '1px'}}>SHP-2894-XJ</div>
                </div>
                <span className="badge badge-success">In Transit</span>
              </div>

              {/* Decay Curve Graphic */}
              <div style={{height: '160px', width: '100%', position: 'relative', borderBottom: '1px dashed rgba(255,255,255,0.2)', marginBottom: '24px'}}>
                <svg width="100%" height="100%" viewBox="0 0 400 160" fill="none">
                  <path d="M0 140 C 100 140, 200 40, 400 20" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="200" cy="85" r="6" fill="white" />
                  <path d="M200 85 L200 160" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
                <div style={{position: 'absolute', top: '60px', left: '220px', background: 'white', color: 'var(--color-primary)', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'}}>
                  <strong>Activity: 74%</strong> <br />
                  <span style={{color: 'var(--color-text-secondary)'}}>Est. Arrival: 4h 20m</span>
                </div>
              </div>

              <div className="flex gap-8">
                <div>
                  <div style={{fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px'}}>ORIGIN</div>
                  <div style={{fontWeight: '500'}}>Necsa, South Africa</div>
                </div>
                <div>
                  <div style={{fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px'}}>DESTINATION</div>
                  <div style={{fontWeight: '500'}}>Aga Khan, Nairobi</div>
                </div>
                <div style={{marginLeft: 'auto', textAlign: 'right'}}>
                  <div style={{fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginBottom: '4px'}}>ISOTOPE</div>
                  <div style={{fontWeight: '500', color: 'var(--color-accent)'}}>Molybdenum-99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Logo Ticker */}
      <section style={{padding: '48px 0', borderBottom: '1px solid var(--color-border-light)'}}>
        <div className="container">
          <p className="text-center" style={{color: 'var(--color-text-muted)', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', marginBottom: '32px', textTransform: 'uppercase'}}>
            Trusted by 100+ Leading Teams Across Africa
          </p>
          <div className="flex justify-center gap-8" style={{flexWrap: 'wrap', opacity: '0.5', filter: 'grayscale(1)', transition: 'all 0.3s'}}>
            <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--color-text-secondary)'}}>MEDICLINIC</h3>
            <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--color-text-secondary)'}}>NETCARE</h3>
            <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--color-text-secondary)'}}>LIFE HEALTHCARE</h3>
            <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--color-text-secondary)'}}>AGAKHAN</h3>
            <h3 style={{fontSize: '18px', fontWeight: '700', color: 'var(--color-text-secondary)'}}>MEGAVOLT</h3>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{padding: '60px 0', backgroundColor: 'var(--color-bg-body)'}}>
        <div className="container">
          <div className="text-center" style={{maxWidth: '700px', margin: '0 auto 48px auto'}}>
            <h2 style={{marginBottom: '16px', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-primary)'}}>Precision Logistics for Nuclear Medicine</h2>
            <p style={{fontSize: '18px', color: 'var(--color-text-secondary)'}}>We combine advanced tracking technology with strict regulatory compliance to ensure safe, timely delivery.</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="card">
              <div className="icon-wrapper">
                <Clock size={24} />
              </div>
              <h3 style={{fontSize: '18px', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'var(--color-primary)'}}>Decay-Aware Routing</h3>
              <p style={{fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0'}}>Algorithms that calculate route efficiency based on isotope half-life to minimize potency loss.</p>
            </div>

            <div className="card">
              <div className="icon-wrapper">
                <Shield size={24} />
              </div>
              <h3 style={{fontSize: '18px', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'var(--color-primary)'}}>Multi-Jurisdiction Compliance</h3>
              <p style={{fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0'}}>Automated adherence to IAEA guidelines and local regulations across African borders.</p>
            </div>

            <div className="card">
              <div className="icon-wrapper">
                <Link2 size={24} />
              </div>
              <h3 style={{fontSize: '18px', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'var(--color-primary)'}}>Blockchain Traceability</h3>
              <p style={{fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0'}}>Immutable ledger records for every handover, ensuring complete chain-of-custody transparency.</p>
            </div>

            <div className="card">
              <div className="icon-wrapper">
                <MapPin size={24} />
              </div>
              <h3 style={{fontSize: '18px', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'var(--color-primary)'}}>Real-Time Tracking</h3>
              <p style={{fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0'}}>IoT integration for monitoring location, temperature, shock, and radiation levels 24/7.</p>
            </div>

            <div className="card">
              <div className="icon-wrapper">
                <FileText size={24} />
              </div>
              <h3 style={{fontSize: '18px', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'var(--color-primary)'}}>Auto-Generated Docs</h3>
              <p style={{fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0'}}>Instantly generate shipping manifests, customs declarations, and safety reports.</p>
            </div>

            <div className="card">
              <div className="icon-wrapper">
                <Cpu size={24} />
              </div>
              <h3 style={{fontSize: '18px', marginBottom: '8px', fontFamily: 'var(--font-heading)', fontWeight: '600', color: 'var(--color-primary)'}}>Smart Matching</h3>
              <p style={{fontSize: '14px', color: 'var(--color-text-secondary)', margin: '0'}}>AI-driven matching of specialized couriers with specific isotope transport requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{background: 'var(--color-primary)', color: 'white', padding: '80px 0'}}>
        <div className="container flex justify-between flex-wrap gap-8">
          <div className="text-center flex-1">
            <span style={{fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: '700', color: 'var(--color-accent)', display: 'block'}}>99.9%</span>
            <div style={{fontSize: '14px', opacity: '0.8', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px'}}>On-Time Delivery</div>
          </div>
          <div className="text-center flex-1">
            <span style={{fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: '700', color: 'var(--color-accent)', display: 'block'}}>12+</span>
            <div style={{fontSize: '14px', opacity: '0.8', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px'}}>Countries Covered</div>
          </div>
          <div className="text-center flex-1">
            <span style={{fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: '700', color: 'var(--color-accent)', display: 'block'}}>50k+</span>
            <div style={{fontSize: '14px', opacity: '0.8', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px'}}>Isotopes Shipped</div>
          </div>
          <div className="text-center flex-1">
            <span style={{fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: '700', color: 'var(--color-accent)', display: 'block'}}>0</span>
            <div style={{fontSize: '14px', opacity: '0.8', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '8px'}}>Compliance Breaches</div>
          </div>
        </div>
      </section>

      {/* Detailed Features (Zig-Zag) */}
      <section style={{padding: 'clamp(60px, 10vw, 120px) 0', background: 'white'}}>
        <div className="container">
          {/* Feature 1 */}
          <div className="grid" style={{gridTemplateColumns: '1fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center', marginBottom: 'clamp(60px, 10vw, 120px)'}}>
            <div className="order-2 lg:order-1" style={{gridColumn: '1'}}>
              <span style={{color: 'var(--color-accent)', fontWeight: '700', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase'}}>Automated Compliance</span>
              <h2 style={{margin: '16px 0 24px', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', color: 'var(--color-primary)'}}>Navigating Regulatory Complexity with Ease</h2>
              <p style={{fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '32px', color: 'var(--color-text-secondary)'}}>
                Nuclear medicine logistics involves a maze of international and local regulations. NuClear automates the generation of compliant documentation, ensuring every shipment meets IAEA, IATA, and local health authority standards instantly.
              </p>
              <ul className="flex flex-col gap-4" style={{listStyle: 'none', padding: 0}}>
                <li className="flex items-center gap-4">
                  <div style={{width: '24px', height: '24px', background: 'var(--color-success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0}}>
                    <Check size={14} />
                  </div>
                  <span>Automatic Form 7 generation</span>
                </li>
                <li className="flex items-center gap-4">
                  <div style={{width: '24px', height: '24px', background: 'var(--color-success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0}}>
                    <Check size={14} />
                  </div>
                  <span>Real-time customs clearance updates</span>
                </li>
                <li className="flex items-center gap-4">
                  <div style={{width: '24px', height: '24px', background: 'var(--color-success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0}}>
                    <Check size={14} />
                  </div>
                  <span>Audit-ready digital archives</span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2" style={{background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-xl)', minHeight: 'clamp(250px, 50vw, 400px)', position: 'relative', overflow: 'hidden', border: '1px solid var(--color-border)', gridColumn: '1'}}>
              <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1000&auto=format&fit=crop" alt="Compliance Dashboard" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.9'}} />
              <div className="card" style={{position: 'absolute', bottom: 'clamp(20px, 5vw, 40px)', right: 'clamp(20px, 5vw, 40px)', padding: 'clamp(12px, 3vw, 16px)', display: 'flex', gap: '12px', alignItems: 'center', width: 'auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(4px)', maxWidth: 'calc(100% - 40px)'}}>
                <div style={{width: 'clamp(24px, 4vw, 32px)', height: 'clamp(24px, 4vw, 32px)', background: 'var(--color-success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0}}>
                  <Check size={16} />
                </div>
                <div style={{minWidth: 0}}>
                  <div style={{fontWeight: '600', fontSize: 'clamp(10px, 2.5vw, 12px)'}}>Compliance Check Passed</div>
                  <div style={{color: 'var(--color-text-secondary)', fontSize: 'clamp(9px, 2vw, 10px)'}}>ID: 99283-AX verified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid" style={{gridTemplateColumns: '1fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'center'}}>
            {/* Image Left */}
            <div className="order-1 lg:order-1" style={{background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-xl)', minHeight: 'clamp(250px, 50vw, 400px)', position: 'relative', overflow: 'hidden', border: '1px solid var(--color-border)', gridColumn: '1'}}>
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop" alt="Logistics Tracking" style={{width: '100%', height: '100%', objectFit: 'cover', opacity: '0.9'}} />
              <div className="card" style={{position: 'absolute', top: 'clamp(20px, 5vw, 40px)', left: 'clamp(20px, 5vw, 40px)', padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)', width: 'auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(4px)', maxWidth: 'calc(100% - 40px)'}}>
                <div style={{fontWeight: '600', fontSize: 'clamp(10px, 2.5vw, 12px)', display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Scan size={14} style={{flexShrink: 0}} />
                  <span>Batch #A-292 Scanned</span>
                </div>
              </div>
            </div>

            {/* Content Right */}
            <div className="order-2 lg:order-2" style={{gridColumn: '1'}}>
              <span style={{color: 'var(--color-accent)', fontWeight: '700', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase'}}>Safety & Security</span>
              <h2 style={{margin: '16px 0 24px', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', color: 'var(--color-primary)'}}>Real-Time Chain of Custody</h2>
              <p style={{fontSize: 'clamp(14px, 3vw, 18px)', marginBottom: '32px', color: 'var(--color-text-secondary)'}}>
                Leveraging blockchain technology, we create an immutable record of every handler, temperature fluctuation, and location ping. Build trust with your partners through unparalleled transparency.
              </p>
              <ul className="flex flex-col gap-4" style={{listStyle: 'none', padding: 0}}>
                <li className="flex items-center gap-4">
                  <div style={{width: '24px', height: '24px', background: 'var(--color-success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0}}>
                    <ShieldCheck size={14} />
                  </div>
                  <span>Biometric handover verification</span>
                </li>
                <li className="flex items-center gap-4">
                  <div style={{width: '24px', height: '24px', background: 'var(--color-success-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', flexShrink: 0}}>
                    <ShieldCheck size={14} />
                  </div>
                  <span>Smart container integration (IoT)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{padding: '100px 0', background: 'var(--color-bg-subtle)'}}>
        <div className="container">
          <h2 className="text-center" style={{marginBottom: '64px', fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '700', color: 'var(--color-primary)'}}>Voices from the Network</h2>
          <div className="grid grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card" style={{border: 'none', boxShadow: 'var(--shadow-md)'}}>
              <Quote style={{color: 'var(--color-accent)', opacity: '0.5', marginBottom: '24px', width: '32px', height: '32px'}} />
              <p style={{fontSize: '16px', marginBottom: '32px', lineHeight: '1.8', fontStyle: 'italic', color: 'var(--color-text-secondary)'}}>"NuClear has completely transformed how we receive isotopes in Nairobi. The decay-aware routing alone has saved us roughly 15% in potency costs."</p>
              <div className="flex items-center gap-4">
                <div style={{width: '48px', height: '48px', background: '#ddd', borderRadius: '50%', overflow: 'hidden', flexShrink: 0}}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doc1" style={{width: '100%', height: '100%'}} alt="Dr. Lwazi Bamande" />
                </div>
                <div>
                  <div style={{fontWeight: '700', fontSize: '14px', color: 'var(--color-primary)'}}>Dr. Lwazi Bamande</div>
                  <div style={{fontSize: '12px', color: 'var(--color-text-secondary)'}}>Chief Radiologist, Life Healthcare</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card" style={{border: 'none', boxShadow: 'var(--shadow-md)'}}>
              <Quote style={{color: 'var(--color-accent)', opacity: '0.5', marginBottom: '24px', width: '32px', height: '32px'}} />
              <p style={{fontSize: '16px', marginBottom: '32px', lineHeight: '1.8', fontStyle: 'italic', color: 'var(--color-text-secondary)'}}>"Compliance was our biggest headache. Now, customs clearance is instant, and we have full visibility on every package."</p>
              <div className="flex items-center gap-4">
                <div style={{width: '48px', height: '48px', background: '#ddd', borderRadius: '50%', overflow: 'hidden', flexShrink: 0}}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doc2" style={{width: '100%', height: '100%'}} alt="Sarah Juma" />
                </div>
                <div>
                  <div style={{fontWeight: '700', fontSize: '14px', color: 'var(--color-primary)'}}>Sarah Juma</div>
                  <div style={{fontSize: '12px', color: 'var(--color-text-secondary)'}}>Ops Director, PharmaMove</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card" style={{border: 'none', boxShadow: 'var(--shadow-md)'}}>
              <Quote style={{color: 'var(--color-accent)', opacity: '0.5', marginBottom: '24px', width: '32px', height: '32px'}} />
              <p style={{fontSize: '16px', marginBottom: '32px', lineHeight: '1.8', fontStyle: 'italic', color: 'var(--color-text-secondary)'}}>"The dashboard gives us the information flow we've always lacked. It's the standard for medical logistics in active."</p>
              <div className="flex items-center gap-4">
                <div style={{width: '48px', height: '48px', background: '#ddd', borderRadius: '50%', overflow: 'hidden', flexShrink: 0}}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doc3" style={{width: '100%', height: '100%'}} alt="Malik Okoye" />
                </div>
                <div>
                  <div style={{fontWeight: '700', fontSize: '14px', color: 'var(--color-primary)'}}>Malik Okoye</div>
                  <div style={{fontSize: '12px', color: 'var(--color-text-secondary)'}}>CEO, HealthLink Nigeria</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges & Footer CTA */}
      <section style={{padding: '100px 0'}}>
        <div className="container">
          {/* Badges */}
          <div className="flex justify-center gap-16 mb-24 text-center flex-wrap">
            <div>
              <div style={{width: '64px', height: '64px', background: 'var(--color-bg-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto'}}>
                <Award size={32} style={{color: 'var(--color-text-secondary)'}} />
              </div>
              <h4 style={{fontWeight: '700', marginBottom: '8px', color: 'var(--color-primary)'}}>ISO 9001 Certified</h4>
              <p style={{fontSize: '12px', color: 'var(--color-text-secondary)', maxWidth: '200px', margin: '0 auto'}}>Fully compliant with highest international standards.</p>
            </div>
            <div>
              <div style={{width: '64px', height: '64px', background: 'var(--color-bg-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto'}}>
                <Lock size={32} style={{color: 'var(--color-text-secondary)'}} />
              </div>
              <h4 style={{fontWeight: '700', marginBottom: '8px', color: 'var(--color-primary)'}}>GDPR Compliant</h4>
              <p style={{fontSize: '12px', color: 'var(--color-text-secondary)', maxWidth: '200px', margin: '0 auto'}}>We protect sensitive patient and route data.</p>
            </div>
            <div>
              <div style={{width: '64px', height: '64px', background: 'var(--color-bg-subtle)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto'}}>
                <Shield size={32} style={{color: 'var(--color-text-secondary)'}} />
              </div>
              <h4 style={{fontWeight: '700', marginBottom: '8px', color: 'var(--color-primary)'}}>IAEA Aligned</h4>
              <p style={{fontSize: '12px', color: 'var(--color-text-secondary)', maxWidth: '200px', margin: '0 auto'}}>Strict adherence to atomic energy transport regulations.</p>
            </div>
          </div>

          {/* CTA Box */}
          <div style={{background: 'var(--color-primary)', borderRadius: 'var(--radius-xl)', padding: '80px 40px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
            <div style={{position: 'relative', zIndex: 10}}>
              <h2 style={{fontSize: '40px', marginBottom: '16px', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: '700'}}>Ready to modernize your logistics?</h2>
              <p style={{fontSize: '18px', marginBottom: '40px', opacity: '0.8', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>Join the network trusted by Africa's top medical institutions. Data sustain lives today.</p>
              <div className="flex justify-center gap-4">
                <button className="btn" style={{background: 'white', color: 'var(--color-primary)'}} onClick={handleOpenLogin}>Get Started Now</button>
                <button className="btn" style={{background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white'}}>Contact Sales</button>
              </div>
            </div>
            {/* Decorative circles */}
            <div style={{position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)'}}></div>
            <div style={{position: 'absolute', bottom: '-50px', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)'}}></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: 'var(--color-primary-dark)', color: 'white', padding: '80px 0 40px'}}>
        <div className="container">
          <div className="grid" style={{gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '64px', marginBottom: '64px'}}>
            <div>
              <div style={{fontWeight: '700', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', fontFamily: 'var(--font-heading)'}}>
                <div style={{width: '32px', height: '32px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'}}>
                  <Atom size={20} />
                </div>
                NuClear
              </div>
              <p style={{color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', maxWidth: '280px'}}>
                The leading logistics platform for nuclear medicine in Africa. Ensuring safety, compliance, and speed for life-saving treatments.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="#" style={{opacity: '0.6'}}><Twitter size={20} /></a>
                <a href="#" style={{opacity: '0.6'}}><Linkedin size={20} /></a>
                <a href="#" style={{opacity: '0.6'}}><Facebook size={20} /></a>
              </div>
            </div>

            <div>
              <h4 style={{fontSize: '14px', marginBottom: '24px', color: 'white'}}>Platform</h4>
              <ul className="flex flex-col gap-4" style={{color: 'var(--color-text-secondary)', fontSize: '14px', listStyle: 'none', padding: 0}}>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Features</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Solutions</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Integrations</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{fontSize: '14px', marginBottom: '24px', color: 'white'}}>Company</h4>
              <ul className="flex flex-col gap-4" style={{color: 'var(--color-text-secondary)', fontSize: '14px', listStyle: 'none', padding: 0}}>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>About Us</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Careers</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>News</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{fontSize: '14px', marginBottom: '24px', color: 'white'}}>Resources</h4>
              <ul className="flex flex-col gap-4" style={{color: 'var(--color-text-secondary)', fontSize: '14px', listStyle: 'none', padding: 0}}>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Blog</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Case Studies</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Compliance Guide</a></li>
                <li><a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Help Center</a></li>
              </ul>
            </div>
          </div>

          <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--color-text-secondary)', flexWrap: 'wrap', gap: '16px'}}>
            <div>© 2026 NuClear Markets. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Privacy Policy</a>
              <a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Terms of Service</a>
              <a href="#" style={{color: 'inherit', textDecoration: 'none'}}>Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
      
      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        onLogin={handleLogin}
      />
    </>
  );
}
