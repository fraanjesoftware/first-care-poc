import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1F4F6' }}>
      {/* Top Header in margin area */}
      <header className="h-8" style={{ backgroundColor: '#F1F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-black">Wij staan voor je klaar!</span>
            <a href="tel:0881234567" className="flex items-center">
              <Phone className="h-4 w-4 mr-1" style={{ color: '#E52C95' }} />
              <span className="text-sm font-bold" style={{ color: '#E52C95' }}>088 - 123 45 67</span>
            </a>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">Leeromgeving</a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">Klantlogin</a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">Over ons</a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#0066CC] transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto bg-white min-h-screen shadow-sm">
        {/* Logo in main container */}
        <div className="px-4 sm:px-6 lg:px-8 pt-4">
          <Link to="/" className="inline-flex items-center">
            <img 
              src="/first-care-logo.svg" 
              alt="First Care" 
              className="h-10"
            />
          </Link>
        </div>

        {/* Main Content */}
        <main className="flex-grow px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto" style={{ backgroundColor: '#0D3148' }}>
          <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Over BHV Safety Scan</h3>
              <p className="text-sm text-white/80">
                Een gratis online tool om de veiligheid van uw organisatie te toetsen aan de wettelijke BHV-eisen.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Certificeringen</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">ISO 9001</span>
                <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">VCA**</span>
                <span className="text-xs bg-white/10 text-white px-2 py-1 rounded">NIBHV</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Contact</h3>
              <p className="text-sm text-white/80">
                FirstCare BV<br />
                Postbus 1234<br />
                1000 AB Amsterdam
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-white/60">
                © 2024 FirstCare BV. Alle rechten voorbehouden.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-xs text-white/60 hover:text-white">Privacy</a>
                <a href="#" className="text-xs text-white/60 hover:text-white">Voorwaarden</a>
                <a href="#" className="text-xs text-white/60 hover:text-white">Cookie-instellingen</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Layout;