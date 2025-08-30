import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield, Phone, Mail } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-[#0066CC]" />
              <div>
                <span className="text-xl font-bold text-gray-900">BHV Safety Scan</span>
                <span className="block text-xs text-gray-500">Powered by FirstCare</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="tel:0881234567" className="flex items-center text-gray-600 hover:text-[#0066CC] transition-colors">
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">088 - 123 45 67</span>
              </a>
              <a href="mailto:info@firstcare.nl" className="flex items-center text-gray-600 hover:text-[#0066CC] transition-colors">
                <Mail className="h-4 w-4 mr-1" />
                <span className="text-sm">info@firstcare.nl</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Over BHV Safety Scan</h3>
              <p className="text-sm text-gray-600">
                Een gratis online tool om de veiligheid van uw organisatie te toetsen aan de wettelijke BHV-eisen.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Certificeringen</h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">ISO 9001</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">VCA**</span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">NIBHV</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Contact</h3>
              <p className="text-sm text-gray-600">
                FirstCare BV<br />
                Postbus 1234<br />
                1000 AB Amsterdam
              </p>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-gray-500">
                © 2024 FirstCare BV. Alle rechten voorbehouden.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-xs text-gray-500 hover:text-[#0066CC]">Privacy</a>
                <a href="#" className="text-xs text-gray-500 hover:text-[#0066CC]">Voorwaarden</a>
                <a href="#" className="text-xs text-gray-500 hover:text-[#0066CC]">Cookie-instellingen</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;