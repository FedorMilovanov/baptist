import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeContext';

function MinimalCross({ isLight }: { isLight: boolean }) {
  const mainColor = isLight ? '#1a1a22' : '#d4a574';
  const glowColor = isLight ? 'rgba(100,90,70,0.12)' : 'rgba(212,165,116,0.15)';
  const shadowColor = isLight ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.6)';

  return (
    <motion.div className="relative h-20 w-16 sm:h-24 sm:w-20" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 140, damping: 12, delay: 0.15 }}>
      <div className="absolute -inset-4 rounded-full blur-3xl" style={{ background: glowColor }} />
      <svg viewBox="0 0 60 80" className="relative z-10 h-full w-full" style={{ filter: `drop-shadow(0 8px 24px ${shadowColor})` }} aria-hidden="true">
        <rect x="17" y="0" width="6" height="76" rx="2" fill={mainColor} />
        <rect x="2" y="24" width="36" height="6" rx="2" fill={mainColor} />
        <rect x="24" y="60" width="12" height="3" rx="1" fill={mainColor} transform="rotate(20 30 61)" />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const bg = isLight ? 'linear-gradient(180deg, #faf8f5 0%, #f5f0eb 50%, #faf8f5 100%)' : 'linear-gradient(180deg, #0a0a0f 0%, #0f0f15 50%, #0a0a0f 100%)';
  const textColor = isLight ? '#1a1a22' : '#f2efed';
  const subtitleColor = isLight ? '#6b6763' : '#aba7a2';
  const mutedColor = isLight ? '#aba7a2' : '#6b6763';
  const goldColor = isLight ? '#8a7050' : '#d4a574';
  const goldLight = isLight ? '#b8986a' : '#e8c4a0';

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: bg }} />
      {!isLight && (
        <>
          <motion.div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,165,116,0.09), transparent 70%)' }} animate={{ x: [0, 50, -20, 0], y: [0, -30, 35, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(196,139,90,0.07), transparent 70%)' }} animate={{ x: [0, -30, 40, 0], y: [0, 25, -40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        </>
      )}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isLight ? 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.025) 1px, transparent 0)' : 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.018) 1px, transparent 0)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-20 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.05 }} className="mb-8 flex justify-center">
          <MinimalCross isLight={isLight} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mb-10 inline-flex items-center gap-2.5 rounded-full px-5 py-2" style={{ background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(212,165,116,0.08)', border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(212,165,116,0.18)'}` }}>
          <Sparkles size={14} style={{ color: goldColor }} />
          <span style={{ color: goldColor, fontSize: '0.8125rem', letterSpacing: '0.6px', fontWeight: 600 }}>Интерактивная карта истории</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.3 }} className="mb-7 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          <span className="block" style={{ color: textColor }}>Карта</span>
          <span className="mt-1.5 block" style={{ color: goldLight }}>Русского Баптизма</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="mb-4 text-lg leading-relaxed sm:text-xl lg:text-2xl" style={{ color: subtitleColor }}>
          От истоков к современности
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }} className="mx-auto mb-16 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: mutedColor }}>
          Молокане и штундисты · Тифлис 1867 · Пашковцы · ВСЕХБ · Раскол · РС ЕХБ и МСЦ ЕХБ
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.65 }} className="mx-auto mb-16 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { value: '1867', label: 'Начало' },
            { value: '157+', label: 'Лет истории' },
            { value: '~144K', label: 'Верующих' },
            { value: '6+', label: 'Союзов' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 + i * 0.08 }}
              className="rounded-2xl p-4 sm:p-5"
              style={{
                background: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <div className="mb-1 text-2xl font-black sm:text-3xl" style={{ color: goldLight }}>{stat.value}</div>
              <div className="text-xs font-medium sm:text-sm" style={{ color: mutedColor }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex flex-col items-center gap-3">
          <a href="#origins" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-gold px-7 py-3.5 font-semibold text-[#1a1a1a] transition-all hover:scale-105 hover:shadow-lg hover:shadow-brand-gold/25">
            Начать путешествие
            <ChevronDown className="transition-transform group-hover:translate-y-0.5" size={18} />
          </a>
          <span className="text-xs font-medium" style={{ color: mutedColor }}>Прокрутите вниз для навигации</span>
        </motion.div>
      </div>
    </section>
  );
}
