import React from 'react';
import { Disc as Discord, ChevronUp } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

interface FooterProps {
  onNavigate: (page: 'home' | 'normativas') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: 'home' | 'normativas') => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-amber-500/20 pt-12 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Logo & Brand Info */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3.5 text-left cursor-pointer focus:outline-none"
          >
            <img
              src="/viciorp_crown_logo.jpg"
              alt="VicioRP Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl drop-shadow-[0_0_15px_rgba(245,192,66,0.35)] shrink-0"
            />
            <div>
              <span className="font-crown font-black text-2xl tracking-wider text-gold-gradient block">
                VICIORP
              </span>
              <p className="text-xs text-slate-400">
                {SERVER_CONFIG.platform} • Servidor de GTA V Roleplay
              </p>
            </div>
          </button>

          {/* Enlaces Rápidos: Inicio, Normativas y Discord */}
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => handleNav('home')}
              className="text-slate-300 hover:text-amber-300 transition-colors font-medium cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => handleNav('normativas')}
              className="text-slate-300 hover:text-amber-300 transition-colors font-medium cursor-pointer"
            >
              Normativas
            </button>
            <a
              href={SERVER_CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
            >
              <Discord size={15} />
              <span>Discord Oficial</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} VicioRP. Todos los derechos reservados.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <span>Volver arriba</span>
            <ChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};
