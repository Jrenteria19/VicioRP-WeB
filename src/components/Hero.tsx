import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Disc as Discord, ChevronDown, Sparkles } from 'lucide-react';
import { SERVER_CONFIG } from '../data/serverData';

interface HeroProps {
  onNavigateToNormativas: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateToNormativas }) => {
  const scrollToInformacion = () => {
    const elem = document.getElementById('informacion');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* Entrada escalonada de los elementos del hero */
  const stagger = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const }
  });

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[580px] flex flex-col justify-between items-center pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Background Image with Dark & Golden Luxury Overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.img
          src="/viciorp_hero_bg.jpg"
          alt="VicioRP City at Night"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.55] contrast-120"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 2.4, ease: 'easeOut' }}
        />
        {/* Darkening & Radial Golden Light Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/75 to-[#07070a]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,192,66,0.18)_0%,transparent_75%)]" />
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[300px] bg-amber-500/15 blur-[120px] pointer-events-none rounded-full"
          animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Spacer to balance vertical centering */}
      <div className="w-full h-2 sm:h-4 shrink-0" />

      {/* Main Center Content (Everything fits on screen) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto px-2">
        {/* Big Bold Name: VICIORP */}
        <motion.h1
          {...stagger(0.1)}
          className="font-crown font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none uppercase mb-3 sm:mb-4 drop-shadow-[0_10px_35px_rgba(245,192,66,0.45)]"
        >
          <span className="text-gold-gradient block">
            VICIORP
          </span>
        </motion.h1>

        {/* Clear Subtitle Description from FiveM Roleplay pitch */}
        <motion.p
          {...stagger(0.3)}
          className="max-w-xl sm:max-w-2xl md:max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-slate-200/90 font-light leading-relaxed mb-6 sm:mb-8 drop-shadow"
        >
          ¡Bienvenido a <span className="text-amber-300 font-semibold">Vicio RP | Five M</span>! El servidor de GTA V Roleplay en español que estabas buscando. Una ciudad optimizada desde cero, con sistemas innovadores y una comunidad activa que te hará sentir dentro de una verdadera película.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          {...stagger(0.48)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <button
            onClick={scrollToInformacion}
            className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-black bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 hover:brightness-110 shadow-[0_0_25px_rgba(245,192,66,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles size={17} />
            <span>Conocer el Servidor</span>
          </button>

          <button
            onClick={onNavigateToNormativas}
            className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <BookOpen size={17} className="text-amber-400" />
            <span>Ver Normativas</span>
          </button>

          <a
            href={SERVER_CONFIG.discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#5865F2] hover:bg-[#4752c4] shadow-[0_0_20px_rgba(88,101,242,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Discord size={18} className="text-white" />
            <span>Discord Oficial</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.button
        {...stagger(0.85)}
        onClick={scrollToInformacion}
        className="relative z-10 flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer group pb-1 shrink-0"
      >
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase opacity-75 group-hover:opacity-100">
          ¿Qué nos hace diferentes? Desliza abajo
        </span>
        <ChevronDown size={18} className="animate-bounce text-amber-400" />
      </motion.button>
    </section>
  );
};
