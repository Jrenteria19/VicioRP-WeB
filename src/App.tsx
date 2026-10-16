import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServerAboutSection } from './components/ServerAboutSection';
import { RulesSection } from './components/RulesSection';
import { Footer } from './components/Footer';

const getPageFromHash = (): 'home' | 'normativas' =>
  window.location.hash === '#normativas' ? 'normativas' : 'home';

export function App() {
  // Se resuelve el hash en el primer render para que un enlace directo a
  // #normativas se muestre al instante, sin parpadeo de la portada.
  const [currentPage, setCurrentPage] = useState<'home' | 'normativas'>(getPageFromHash);

  // Sync con el hash si cambia (botón atrás/adelante del navegador)
  useEffect(() => {
    const handleHashChange = () => setCurrentPage(getPageFromHash());

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'normativas') => {
    setCurrentPage(page);
    window.location.hash = page === 'normativas' ? '#normativas' : '#inicio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 font-['Outfit',sans-serif] selection:bg-[#d4af37] selection:text-black">
      {/* Barra de navegación común */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      <AnimatePresence mode="wait" initial={false}>
        {currentPage === 'home' ? (
          /* Página Principal: Hero 100% pantalla + Información al scrollear */
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Hero inicial que entra al 100% en la pantalla */}
            <Hero onNavigateToNormativas={() => navigateTo('normativas')} />

            {/* Información del servidor que aparece al scrollear */}
            <ServerAboutSection onNavigateToNormativas={() => navigateTo('normativas')} />
          </motion.main>
        ) : (
          /* Página dedicada e independiente de Normativas sin barra intermedia */
          <motion.main
            key="normativas"
            className="pt-20 min-h-screen"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <RulesSection />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Pie de página común */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default App;
