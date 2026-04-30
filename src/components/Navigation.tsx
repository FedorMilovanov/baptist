import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

const navItems = [
  { id: 'hero', label: 'Главная' },
  { id: 'origins', label: 'Истоки' },
  { id: 'mindmap', label: '3D Карта' },
  { id: 'regional-notes', label: 'География' },
  { id: 'timeline', label: 'Хроника' },
  { id: 'congresses', label: 'Съезды' },
  { id: 'legal-context', label: 'Закон' },
  { id: 'parallel-timelines', label: 'Два пути' },
  { id: 'persecution', label: 'Гонения' },
  { id: 'organizations', label: 'Союзы' },
  { id: 'figures', label: 'Лидеры' },
  { id: 'research-findings', label: 'Находки' },
  { id: 'archives', label: 'Источники' },
  { id: 'glossary', label: 'Глоссарий' },
];

export default function Navigation() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 80);
      if (y < 80) setVisible(true);
      else if (y > lastScrollY + 8) setVisible(false);
      else if (y < lastScrollY - 8) setVisible(true);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          className="fixed top-4 left-1/2 z-[90] w-[95%] max-w-6xl -translate-x-1/2 pointer-events-none"
        >
          <div
            className="flex items-center justify-between rounded-full px-4 py-2.5 pointer-events-auto"
            style={{
              background: isLight ? 'rgba(255,255,255,0.78)' : 'rgba(8,8,12,0.72)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(212,165,116,0.15)'}`,
              boxShadow: atTop ? 'none' : isLight ? '0 16px 40px rgba(0,0,0,0.1)' : '0 16px 48px rgba(0,0,0,0.5)',
            }}
          >
            <button onClick={() => scrollTo('hero')} className="flex items-center gap-3 pl-1.5 pr-3.5" style={{ color: isLight ? '#1a1a1a' : '#f7f1eb' }}>
              <svg viewBox="0 0 24 32" className="h-8 w-6" fill="none" aria-hidden="true">
                <rect x="10.5" y="0" width="3" height="32" rx="1" fill="currentColor" />
                <rect x="3" y="9" width="18" height="3.5" rx="1" fill="currentColor" />
                <rect x="14" y="22" width="7" height="1.6" rx="0.8" fill="currentColor" transform="rotate(20 17.5 22.7)" />
              </svg>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[11px] font-black uppercase tracking-[0.2em]">Русский баптизм</span>
                <span className="block text-[9px] uppercase tracking-[0.22em]" style={{ color: isLight ? '#8a7050' : '#c4a67e' }}>Карта истории</span>
              </span>
            </button>

            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="rounded-full px-3.5 py-2 text-[12px] font-semibold tracking-wide transition-all nav-chip">
                  {item.label}
                </button>
              ))}
            </div>

            <button onClick={toggle} className="rounded-full p-3 transition-all hover:bg-brand-gold/12" style={{ color: isLight ? '#8a7050' : '#c4a67e' }} aria-label="Переключить тему">
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
