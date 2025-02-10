import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import Footer from './Footer';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Layout = ({ children, onGetCheck }: { children: React.ReactNode; onGetCheck?: (e: React.MouseEvent) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetCheck = (e: React.MouseEvent) => {
    if (onGetCheck) {
      onGetCheck(e);
    } else {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleProvinceClick = (e: React.MouseEvent) => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed w-full z-50">
        <nav className="bg-dark/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link 
                  to="/" 
                  className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
                >
                  <div className="bg-dark/80 p-2 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-primary" />
                      <div className="flex flex-col">
                        <div className="flex items-baseline">
                          <span className="text-xl font-black tracking-tight leading-none text-primary">
                            SAFE<span className="text-white">hire</span>
                          </span>
                        </div>
                        <span className="text-xs text-gray-300 tracking-widest uppercase">.ca</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="hidden md:flex md:items-center md:space-x-8">
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-white/80 hover:text-white"
                >
                  How It Works
                </button>
                <Link to="/blog" className="text-white/80 hover:text-white">
                  Blog
                </Link>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-white/80 hover:text-white"
                >
                  FAQ
                </button>
                <Link
                  to="/"
                  onClick={handleGetCheck}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Get Your Check
                </Link>
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white/80 hover:text-white"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => {
                    scrollToSection('how-it-works');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
                >
                  How It Works
                </button>
                <Link
                  to="/blog"
                  className="block px-3 py-2 text-white/80 hover:text-white"
                >
                  Blog
                </Link>
                <button
                  onClick={() => {
                    scrollToSection('faq');
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
                >
                  FAQ
                </button>
                <Link
                  to="/"
                  onClick={handleGetCheck}
                  className="block mx-2 text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Get Your Check
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content with padding for header */}
      <main className="pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout; 