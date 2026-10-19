import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ALL_RULES, ADMIN_DISCLAIMER, type RuleSectionItem } from '../data/serverData';
import {
  Search,
  ShieldAlert,
  Flame,
  HeartPulse,
  Skull,
  BookOpen,
  XCircle,
  AlertTriangle,
  Award,
  Shield,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CheckCheck,
  Clock,
  Target,
  Gavel,
  RefreshCcw,
  Library,
  ListChecks
} from 'lucide-react';
import { Reveal } from './Reveal';

/* ================= Metadatos visuales por categoría (capítulos) ================= */
const CATEGORY_ORDER: RuleSectionItem['category'][] = [
  'Conceptos de Rol',
  'VPD Policía',
  'VFR Bomberos',
  'VMS Médicos',
  'Ilegales'
];

const CHAPTER_INFO: Record<string, { icon: React.ElementType; desc: string }> = {
  'Conceptos de Rol': { icon: Award, desc: 'Los fundamentos que todo rolero debe dominar antes de pisar la ciudad.' },
  'VPD Policía': { icon: Shield, desc: 'Leyes, protocolos, radio y disciplina del cuerpo policial.' },
  'VFR Bomberos': { icon: Flame, desc: 'Emergencias, rescates y el código del cuerpo de bomberos.' },
  'VMS Médicos': { icon: HeartPulse, desc: 'Ética médica, triaje y supervivencia en zonas de conflicto.' },
  'Ilegales': { icon: Skull, desc: 'Atracos, límites y reglas del lado oscuro de la ciudad.' }
};

/** Clases estáticas para que Tailwind las genere */
const CAT_STYLE: Record<string, { chip: string; bar: string; dot: string; badge: string }> = {
  'Todas': { chip: 'bg-amber-400/15 text-amber-300 border-amber-400/40', bar: 'bg-amber-400', dot: 'bg-amber-400', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  'Conceptos de Rol': { chip: 'bg-violet-500/15 text-violet-300 border-violet-500/40', bar: 'bg-violet-500', dot: 'bg-violet-400', badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30' },
  'VPD Policía': { chip: 'bg-sky-500/15 text-sky-300 border-sky-500/40', bar: 'bg-sky-500', dot: 'bg-sky-400', badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  'VFR Bomberos': { chip: 'bg-orange-500/15 text-orange-300 border-orange-500/40', bar: 'bg-orange-500', dot: 'bg-orange-400', badge: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  'VMS Médicos': { chip: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40', bar: 'bg-emerald-500', dot: 'bg-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  'Ilegales': { chip: 'bg-rose-500/15 text-rose-300 border-rose-500/40', bar: 'bg-rose-500', dot: 'bg-rose-400', badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30' }
};

/** Normas estrella: acceso en un clic desde el resumen rápido */
const KEY_RULES: { id: string; label: string }[] = [
  { id: 'gen-rdm-vdm', label: 'RDM / VDM' },
  { id: 'gen-pg-mg', label: 'Powergaming / Metagaming' },
  { id: 'ilegal-zonas-seguras', label: 'Zonas Seguras' },
  { id: 'ilegal-agrupacion', label: 'Límites de Banda' },
  { id: 'vms-valorar-vida', label: 'Valorar la Vida' },
  { id: 'ilegal-secuestros', label: 'Secuestros • PKT / CK' }
];

const READ_STORAGE_KEY = 'viciorp-rules-read-v1';

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Resalta las coincidencias de la búsqueda dentro del texto */
const Highlight: React.FC<{ text: string; term: string }> = ({ text, term }) => {
  const trimmed = term.trim();
  if (trimmed.length < 2) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRegExp(trimmed)})`, 'ig'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark key={i} className="search-hit">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const countWords = (rule: RuleSectionItem): number => {
  const texts = [rule.title, rule.summary, ...rule.details, ...(rule.doList ?? []), ...(rule.dontList ?? [])];
  rule.subsections?.forEach((s) => {
    texts.push(s.title, ...s.items);
    if (s.sanction) texts.push(s.sanction);
  });
  return texts.join(' ').split(/\s+/).filter(Boolean).length;
};

export const RulesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [flashId, setFlashId] = useState<string | null>(null);

  /* ---------- Progreso de lectura persistido en el navegador ---------- */
  const [readIds, setReadIds] = useState<Set<string>>(() => {
    try {
      const raw = window.localStorage.getItem(READ_STORAGE_KEY);
      if (raw) return new Set(JSON.parse(raw) as string[]);
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
    return new Set();
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readIds]));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }, [readIds]);

  /* ---------- Datos derivados ---------- */
  const totalRules = ALL_RULES.length;
  const readCount = ALL_RULES.filter((r) => readIds.has(r.id)).length;
  const progressPct = totalRules > 0 ? Math.round((readCount / totalRules) * 100) : 0;

  const readingMinutes = useMemo(() => {
    const words = ALL_RULES.reduce((acc, rule) => acc + countWords(rule), 0);
    return Math.max(1, Math.round(words / 200));
  }, []);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = { Todas: ALL_RULES.length };
    CATEGORY_ORDER.forEach((cat) => {
      map[cat] = ALL_RULES.filter((r) => r.category === cat).length;
    });
    return map;
  }, []);

  const filteredRules = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return ALL_RULES.filter((rule) => {
      const matchesCategory = selectedCategory === 'Todas' || rule.category === selectedCategory;
      const matchesSearch =
        term.length === 0 ||
        rule.title.toLowerCase().includes(term) ||
        rule.summary.toLowerCase().includes(term) ||
        rule.details.some((d) => d.toLowerCase().includes(term)) ||
        (rule.doList ?? []).some((d) => d.toLowerCase().includes(term)) ||
        (rule.dontList ?? []).some((d) => d.toLowerCase().includes(term)) ||
        (rule.subsections &&
          rule.subsections.some(
            (s) => s.title.toLowerCase().includes(term) || s.items.some((i) => i.toLowerCase().includes(term))
          ));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  /** Reglas agrupadas por capítulo/categoría */
  const groups = useMemo(() => {
    const cats: string[] = selectedCategory === 'Todas' ? CATEGORY_ORDER : [selectedCategory];
    return cats
      .map((cat) => ({ category: cat, rules: filteredRules.filter((r) => r.category === cat) }))
      .filter((g) => g.rules.length > 0);
  }, [filteredRules, selectedCategory]);

  const allExpanded = filteredRules.length > 0 && filteredRules.every((r) => expandedCards.has(r.id));

  /* ---------- Acciones ---------- */
  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Abrir la norma cuenta como haberla revisado
        setReadIds((reads) => (reads.has(id) ? reads : new Set(reads).add(id)));
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedCards(new Set());
    } else {
      setExpandedCards(new Set(filteredRules.map((r) => r.id)));
    }
  };

  const resetProgress = () => {
    setReadIds(new Set());
    setExpandedCards(new Set());
  };

  /** Salta directamente a una norma clave, la abre y la resalta */
  const jumpToRule = (id: string) => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setExpandedCards((prev) => new Set(prev).add(id));
    setReadIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
    window.setTimeout(() => {
      document.getElementById(`rule-${id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      setFlashId(id);
      window.setTimeout(() => setFlashId(null), 2400);
    }, 90);
  };

  const stats = [
    { icon: ListChecks, value: `${totalRules}`, label: 'normativas' },
    { icon: Library, value: `${CATEGORY_ORDER.length}`, label: 'capítulos' },
    { icon: Clock, value: `~${readingMinutes} min`, label: 'de lectura' },
    { icon: Target, value: `${progressPct}%`, label: 'revisadas' }
  ];

  const adminIcons = [AlertTriangle, Gavel, RefreshCcw];

  return (
    <section id="normativas" className="pt-6 pb-24 bg-[#07070a] relative overflow-hidden">
      {/* Golden Ambient Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ==================== CABECERA ==================== */}
        <Reveal className="text-center max-w-3xl mx-auto mb-9">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 float-slow">
            <BookOpen size={15} />
            <span>Reglamento oficial de la ciudad</span>
          </div>

          <h2 className="font-crown font-black text-3xl sm:text-5xl uppercase tracking-tight mb-4">
            <span className="text-gold-gradient">Normativas</span>{' '}
            <span className="text-slate-100">VicioRP</span>
          </h2>

          <p className="text-sm sm:text-lg text-slate-300/90 font-light leading-relaxed">
            Están ordenadas por <strong className="text-amber-300 font-semibold">capítulos</strong>: elige tu facción, abre solo lo que te interesa y tu avance queda guardado.
          </p>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="glass-panel rounded-2xl px-3 py-3 border border-amber-500/15 flex flex-col items-center">
                  <Icon size={16} className="text-amber-400 mb-1" />
                  <span className="font-crown font-black text-lg text-white leading-none">{s.value}</span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-1">{s.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ==================== LO ESENCIAL EN UN CLIC ==================== */}
        <Reveal delay={0.08} className="mb-9">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/35 bg-gradient-to-br from-[#15110a] via-[#0d0e14] to-[#15110a] p-5 sm:p-6 gold-sweep">
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                  <Target size={16} />
                </span>
                <h3 className="font-crown font-bold text-sm sm:text-base text-amber-200 uppercase tracking-wide">
                  Lo esencial en 30 segundos
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Si solo vas a leer una cosa, que sean estas seis. Toca una y te lleva directo a la norma completa.
              </p>

              <div className="flex flex-wrap gap-2">
                {KEY_RULES.map((kr, i) => (
                  <motion.button
                    key={kr.id}
                    onClick={() => jumpToRule(kr.id)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-black/45 border border-amber-500/35 text-amber-200 hover:bg-amber-500/20 hover:border-amber-300 hover:text-amber-100 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 live-dot" />
                    {kr.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ==================== ⚠️ NOTA ADMINISTRATIVA ==================== */}
        <Reveal delay={0.06} className="mb-10">
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#18130d] to-amber-950/40 border-2 border-amber-500/40 shadow-[0_0_30px_rgba(245,192,66,0.15)] backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-amber-500/20 text-yellow-400">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="font-crown font-black text-lg sm:text-xl text-yellow-300 uppercase tracking-wide">
                  {ADMIN_DISCLAIMER.title}
                </h3>
                <p className="text-xs text-amber-200/70">
                  Lectura obligatoria para todos los habitantes y postulantes de VicioRP
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-200">
              {ADMIN_DISCLAIMER.points.map((pt, idx) => {
                const Icon = adminIcons[idx] ?? AlertTriangle;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-black/40 p-4 rounded-2xl border border-amber-500/20 hover:border-amber-400/45 hover:bg-black/60 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 border border-amber-200/50 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(245,192,66,0.4)]">
                      <Icon size={14} className="text-black" />
                    </span>
                    <p className="leading-relaxed font-light">{pt}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ==================== BARRA FIJA: BUSCADOR + FILTROS + PROGRESO ==================== */}
        <div className="sticky top-[92px] z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-3 mb-6 bg-[#07070a]/92 backdrop-blur-xl border-b border-amber-500/15 shadow-[0_16px_32px_-16px_rgba(0,0,0,0.9)] rounded-b-2xl">
          <div className="max-w-6xl mx-auto space-y-3">
            {/* Buscador + acciones */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/80" size={18} />
                <input
                  type="text"
                  placeholder="Buscar: VPD, Hotzones, Rehenes, Cooldown..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 bg-[#0e111a] border-2 border-amber-500/30 rounded-2xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/25 shadow-xl text-sm transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-amber-500/15 cursor-pointer transition-colors"
                  >
                    <XCircle size={17} />
                  </button>
                )}
              </div>

              <button
                onClick={toggleAll}
                className="px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider bg-slate-900/90 border border-amber-500/30 text-amber-200 hover:border-amber-400 hover:text-amber-100 hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                {allExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                <span>{allExpanded ? 'Contraer todo' : 'Expandir todo'}</span>
              </button>
            </div>

            {/* Progreso de lectura */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-slate-800/90 overflow-hidden border border-slate-700/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 progress-shine"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="text-[11px] font-bold text-amber-300 whitespace-nowrap tabular-nums">
                {readCount}/{totalRules} leídas
              </span>
              {readCount > 0 && (
                <button
                  onClick={resetProgress}
                  title="Reiniciar progreso"
                  aria-label="Reiniciar progreso de lectura"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-500/15 transition-colors cursor-pointer shrink-0"
                >
                  <RefreshCcw size={14} />
                </button>
              )}
            </div>

            {/* Categorías con Iconos y Contadores */}
            <div className="flex flex-wrap items-center gap-2 pb-1">
              {['Todas', ...CATEGORY_ORDER].map((cat) => {
                const meta = CHAPTER_INFO[cat];
                const Icon = meta ? meta.icon : BookOpen;
                const isSelected = selectedCategory === cat;
                const style = CAT_STYLE[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 border transition-colors ${
                      isSelected
                        ? style.chip
                        : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-amber-400/40 hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="category-active-glow"
                        className="absolute inset-0 rounded-xl shadow-[0_0_22px_rgba(245,192,66,0.35)] border border-amber-300/50 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <Icon size={14} className={`relative ${isSelected ? '' : 'text-amber-400'}`} />
                    <span className="relative">{cat}</span>
                    <span
                      className={`relative px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                        isSelected ? 'bg-black/25' : 'bg-slate-800 text-amber-300'
                      }`}
                    >
                      {categoryCounts[cat] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ==================== CAPÍTULOS + REGLAS ==================== */}
        <div className="space-y-10">
          {groups.map((group) => {
            const info = CHAPTER_INFO[group.category];
            const ChapterIcon = info?.icon ?? BookOpen;
            const style = CAT_STYLE[group.category] ?? CAT_STYLE['Todas'];
            const groupRead = group.rules.filter((r) => readIds.has(r.id)).length;

            return (
              <div key={group.category}>
                {/* Cabecera de capítulo */}
                <Reveal className="mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2.5 sm:p-3 rounded-2xl border ${style.badge} shadow-[0_0_18px_rgba(245,192,66,0.12)] shrink-0`}>
                      <ChapterIcon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-crown font-black text-lg sm:text-2xl text-white uppercase tracking-wide">
                          {group.category}
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-bold uppercase tracking-wider">
                          {groupRead}/{group.rules.length} leídas
                        </span>
                      </div>
                      {info?.desc && (
                        <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">{info.desc}</p>
                      )}
                    </div>
                    <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-amber-500/40 to-transparent" />
                  </div>
                </Reveal>

                {/* Tarjetas colapsables */}
                <div className="space-y-4 sm:space-y-5">
                  {group.rules.map((rule, idx) => {
                    const expanded = expandedCards.has(rule.id);
                    const isRead = readIds.has(rule.id);
                    const hasDetails =
                      rule.details.length > 0 ||
                      (rule.subsections && rule.subsections.length > 0) ||
                      (rule.doList && rule.doList.length > 0) ||
                      (rule.dontList && rule.dontList.length > 0);
                    const flashing = flashId === rule.id;

                    return (
                      <motion.div
                        key={rule.id}
                        id={`rule-${rule.id}`}
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{
                          duration: 0.5,
                          delay: Math.min(idx * 0.05, 0.25),
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border transition-colors duration-300 shadow-xl group ${
                          flashing
                            ? 'border-amber-300 bg-[#12100a] rule-flash'
                            : 'glass-panel border-amber-500/20 hover:border-amber-400/45'
                        }`}
                      >
                        {/* Barra lateral del color del capítulo */}
                        <span className={`absolute left-0 top-0 bottom-0 w-1 ${style.bar} opacity-70 group-hover:opacity-100 transition-opacity`} />

                        {/* Cabecera clickeable (siempre visible) */}
                        <button
                          onClick={() => toggleCard(rule.id)}
                          aria-expanded={expanded}
                          className="w-full text-left p-5 sm:p-6 pl-6 sm:pl-7 flex items-start justify-between gap-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-2 mb-1.5">
                              <h4 className="font-crown font-bold text-base sm:text-lg text-white group-hover:text-amber-100 transition-colors">
                                <Highlight text={rule.title} term={searchTerm} />
                              </h4>
                              {rule.badge && (
                                <span
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shrink-0 ${
                                    rule.badgeType === 'danger'
                                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                      : rule.badgeType === 'warning'
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                      : rule.badgeType === 'success'
                                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                      : rule.badgeType === 'info'
                                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                                  }`}
                                >
                                  {rule.badge}
                                </span>
                              )}
                              {isRead && (
                                <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shrink-0 bg-amber-400/15 text-amber-300 border border-amber-400/35 flex items-center gap-1">
                                  <CheckCheck size={11} />
                                  Leída
                                </span>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-amber-200/80 font-medium italic line-clamp-2">
                              <Highlight text={rule.summary} term={searchTerm} />
                            </p>
                          </div>
                          {hasDetails && (
                            <motion.span
                              animate={{ rotate: expanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-1 group-hover:bg-amber-500/20 transition-colors"
                            >
                              <ChevronDown size={18} />
                            </motion.span>
                          )}
                        </button>

                        {/* Contenido expandible con animación de altura */}
                        <AnimatePresence initial={false}>
                          {expanded && hasDetails && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              style={{ overflow: 'hidden' }}
                            >
                              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4 border-t border-amber-500/10 pt-4">

                                {/* Puntos principales */}
                                {rule.details.length > 0 && (
                                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                                    {rule.details.map((point, i) => (
                                      <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                                        className="flex items-start gap-2.5 leading-relaxed"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                                        <span><Highlight text={point} term={searchTerm} /></span>
                                      </motion.li>
                                    ))}
                                  </ul>
                                )}

                                {/* ✅ Ejemplos BUENOS (doList) */}
                                {rule.doList && rule.doList.length > 0 && (
                                  <div className="p-3.5 rounded-2xl bg-emerald-950/25 border border-emerald-500/25 space-y-2">
                                    <span className="text-[11px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                                      <CheckCircle2 size={14} />
                                      Ejemplo Correcto
                                    </span>
                                    {rule.doList.map((item, i) => (
                                      <div key={i} className="flex items-start gap-2 text-xs text-emerald-200/90">
                                        <span className="text-emerald-400 font-bold shrink-0">→</span>
                                        <span><Highlight text={item} term={searchTerm} /></span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* ❌ Prohibiciones / Ejemplos MALOS (dontList) */}
                                {rule.dontList && rule.dontList.length > 0 && (
                                  <div className="p-3.5 rounded-2xl bg-rose-950/25 border border-rose-500/25 space-y-2">
                                    <span className="text-[11px] uppercase font-bold text-rose-400 flex items-center gap-1.5">
                                      <XCircle size={14} />
                                      Acciones Prohibidas / Ejemplo Incorrecto
                                    </span>
                                    {rule.dontList.map((dont, i) => (
                                      <div key={i} className="flex items-start gap-2 text-xs text-rose-200/90">
                                        <span className="text-rose-400 font-bold shrink-0">•</span>
                                        <span><Highlight text={dont} term={searchTerm} /></span>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Subsecciones (Faltas Leves, Graves, etc.) */}
                                {rule.subsections && rule.subsections.length > 0 && (
                                  <div className="space-y-3">
                                    {rule.subsections.map((sub, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                                        className={`p-4 rounded-2xl border ${
                                          sub.level === 'muy_grave'
                                            ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                                            : sub.level === 'grave'
                                            ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                                            : sub.level === 'leve'
                                            ? 'bg-yellow-950/20 border-yellow-500/40 text-yellow-200'
                                            : 'bg-slate-900/60 border-slate-800 text-slate-300'
                                        }`}
                                      >
                                        <h5 className="font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                                          {sub.title}
                                        </h5>
                                        <ul className="space-y-1.5 text-xs">
                                          {sub.items.map((item, j) => (
                                            <li key={j} className="flex items-start gap-2">
                                              <span className="opacity-70 shrink-0">•</span>
                                              <span><Highlight text={item} term={searchTerm} /></span>
                                            </li>
                                          ))}
                                        </ul>
                                        {sub.sanction && (
                                          <div className="mt-2.5 pt-2 border-t border-current/20 font-semibold text-[11px]">
                                            {sub.sanction}
                                          </div>
                                        )}
                                      </motion.div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Si no se encuentran resultados */}
        <AnimatePresence>
          {filteredRules.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="text-center py-16 px-6 text-slate-400 bg-slate-900/40 rounded-3xl border border-slate-800 mt-6"
            >
              <AlertTriangle className="mx-auto text-amber-400 mb-3 float-slow" size={36} />
              <p className="text-base font-semibold text-slate-200">No se encontraron normativas con esa búsqueda.</p>
              <p className="text-xs text-slate-400 mt-1">Prueba con palabras como "Rehenes", "Sandy", "VPD", "Hotzones".</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-400 text-black hover:bg-yellow-300 cursor-pointer transition-transform hover:scale-105"
              >
                Restablecer Filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
