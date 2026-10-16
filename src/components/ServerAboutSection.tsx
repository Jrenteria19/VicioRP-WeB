import React from 'react';
import { SERVER_CONFIG, SERVER_FEATURES } from '../data/serverData';
import { Briefcase, Cpu, Tv, Scale, CheckCircle2, Disc as Discord, ArrowRight, Sparkles, Crown } from 'lucide-react';
import { Reveal } from './Reveal';

interface ServerAboutSectionProps {
  onNavigateToNormativas: () => void;
}

export const ServerAboutSection: React.FC<ServerAboutSectionProps> = ({ onNavigateToNormativas }) => {
  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'Briefcase':
        return <Briefcase size={26} className="text-amber-400" />;
      case 'Cpu':
        return <Cpu size={26} className="text-amber-400" />;
      case 'Tv':
        return <Tv size={26} className="text-amber-400" />;
      case 'Scale':
        return <Scale size={26} className="text-amber-400" />;
      default:
        return <Sparkles size={26} className="text-amber-400" />;
    }
  };

  return (
    <section id="informacion" className="py-24 bg-[#08090f] relative overflow-hidden border-t border-amber-500/15">
      {/* Golden Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro Banner */}
        <Reveal className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Crown size={15} className="fill-amber-400" />
            <span>{SERVER_CONFIG.platform} ROLEPLAY</span>
          </div>

          <h2 className="font-crown font-black text-3xl sm:text-5xl text-slate-100 uppercase tracking-tight mb-4">
            ¡BIENVENIDO A <span className="text-gold-gradient">VICIO RP</span>!
          </h2>

          <p className="text-lg sm:text-2xl text-amber-300/90 font-medium mb-6">
            El servidor de GTA V Roleplay en español que estabas buscando
          </p>

          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/25 shadow-xl text-left sm:text-center">
            <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed">
              ¿Cansado de los servidores con lag, administración ausente y rol sin sentido? En <strong className="text-amber-300 font-semibold">VICIO RP</strong> hemos creado el entorno definitivo para los amantes del buen rol. Una ciudad optimizada desde cero, con sistemas innovadores y una comunidad activa que te hará sentir dentro de una verdadera película.
            </p>
          </div>
        </Reveal>

        {/* Section: ¿QUÉ NOS HACE DIFERENTES? */}
        <Reveal className="text-center mb-12" delay={0.05}>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400/80 block mb-2">
            Nuestros Pilares
          </span>
          <h3 className="font-crown font-black text-2xl sm:text-4xl text-white uppercase">
            ¿Qué Nos Hace <span className="text-gold-gradient">Diferentes?</span>
          </h3>
        </Reveal>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20">
          {SERVER_FEATURES.map((feat, index) => (
            <Reveal key={feat.id} delay={index * 0.08}>
              <div
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 shadow-xl group flex flex-col justify-between h-full hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-15px_rgba(245,192,66,0.35)]"
              >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(245,192,66,0.2)]">
                  {getFeatureIcon(feat.iconName)}
                </div>

                <h4 className="font-crown font-black text-xl sm:text-2xl text-slate-100 mb-5 group-hover:text-amber-300 transition-colors">
                  {feat.title}
                </h4>

                <ul className="space-y-3.5 mb-2">
                  {feat.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-snug">
                      <div className="p-0.5 rounded-full bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                        <CheckCircle2 size={15} />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Story & Discord CTA Card */}
        <Reveal delay={0.1}>
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#121422] via-[#1a1829] to-[#121422] border-2 border-amber-400/40 shadow-2xl text-center max-w-4xl mx-auto relative overflow-hidden gold-sweep">
          <div className="relative z-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300 block mb-3">
              Comienza Tu Trayectoria
            </span>

            <h3 className="font-crown font-black text-2xl sm:text-4xl text-white mb-4">
              ¿Cuál será tu historia?
            </h3>

            <p className="text-base sm:text-lg text-slate-200 font-light max-w-2xl mx-auto leading-relaxed mb-6">
              ¿Un empresario de éxito, el comisario de la ciudad, un médico ejemplar o el dueño de los barrios más peligrosos? <strong className="text-amber-300 font-semibold">Tú decides.</strong>
            </p>

            <div className="inline-block py-2 px-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm uppercase tracking-wider mb-8">
              ¡El acceso ya está abierto! Entra hoy mismo, realiza tu entrevista y comienza tu nueva vida desde cero.
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SERVER_CONFIG.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider text-white bg-[#5865F2] hover:bg-[#4752c4] shadow-[0_0_25px_rgba(88,101,242,0.4)] transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Discord size={20} className="text-white" />
                <span>Enlace Oficial de Acceso (Discord)</span>
              </a>

              <button
                onClick={onNavigateToNormativas}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ver Normativas del Servidor</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
};
