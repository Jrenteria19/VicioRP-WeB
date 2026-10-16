import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, BookOpen, Home } from 'lucide-react';

interface NavbarProps {
  currentPage: 'home' | 'normativas';
  onNavigate: (page: 'home' | 'normativas') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'normativas') => {
    setMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Gold Accent Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 z-50 shadow-[0_0_15px_rgba(245,192,66,0.6)]" />

      <header
        className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07070a]/95 backdrop-blur-md border-b border-amber-500/20 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-[#07070a]/90 via-[#07070a]/60 to-transparent py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
          {/* Logo sin marco y más grandecito (sin nombre de texto) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group cursor-pointer focus:outline-none shrink-0"
            title="VicioRP Inicio"
          >
            <img
              src="/viciorp_crown_logo.jpg"
              alt="VicioRP Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl drop-shadow-[0_0_20px_rgba(245,192,66,0.4)] group-hover:drop-shadow-[0_0_28px_rgba(245,192,66,0.7)] group-hover:scale-105 transition-all duration-300"
            />
          </button>

          {/* Hipervínculos centrados exactamente en el medio de la barra */}
          <nav className="hidden md:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => handleNavClick('home')}
              className={`relative px-5 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
                currentPage === 'home'
                  ? 'text-amber-300'
                  : 'text-slate-300 hover:text-amber-300'
              }`}
            >
              {currentPage === 'home' && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-xl bg-amber-400/15 border border-amber-400/40 shadow-[0_0_15px_rgba(245,192,66,0.25)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Home size={16} className="relative" />
              <span className="relative">Inicio</span>
            </button>

            <button
              onClick={() => handleNavClick('normativas')}
              className={`relative px-5 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 ${
                currentPage === 'normativas'
                  ? 'text-amber-300'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              {currentPage === 'normativas' && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-xl bg-amber-400/15 border border-amber-400/40 shadow-[0_0_15px_rgba(245,192,66,0.25)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <BookOpen size={16} className="relative text-amber-400" />
              <span className="relative">Normativas</span>
            </button>
          </nav>

          {/* Espacio derecho para balance en escritorio / Botón hamburguesa en móvil */}
          <div className="flex items-center">
            <div className="w-14 sm:w-16 hidden md:block" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-[#0a0b10] border-b border-amber-500/20 px-6 shadow-2xl"
            >
              <div className="py-5 space-y-3">
                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full text-center py-2.5 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    currentPage === 'home'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-200 hover:bg-amber-500/10 hover:text-amber-300'
                  }`}
                >
                  <Home size={16} />
                  <span>Inicio</span>
                </button>

                <button
                  onClick={() => handleNavClick('normativas')}
                  className={`w-full text-center py-2.5 px-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                    currentPage === 'normativas'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-200 hover:bg-amber-500/10 hover:text-amber-300'
                  }`}
                >
                  <BookOpen size={16} className="text-amber-400" />
                  <span>Normativas</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
