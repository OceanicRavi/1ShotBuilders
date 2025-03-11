import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Hammer, Phone } from 'lucide-react';
import logo from "../../src/assets/1ShotBuilders_ReversedColors_HighRes_Sharpened.png"; 
import AIWidget from './AIAgent';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="1Shot Builders Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</Link>
            {/* AI Voice Agent */}
            <AIWidget />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About</Link>
            <Link to="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Services</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Contact</Link>
            <Link to="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Dashboard</Link>
            {/* AI Voice Agent */}
            <AIWidget />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;