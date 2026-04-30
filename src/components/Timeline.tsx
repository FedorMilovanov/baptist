import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ChevronDown, Filter } from 'lucide-react';
import { categoryColors, categoryLabels, timelineEvents } from '../data/timeline';
import type { TimelineCategory } from '../data/timeline';

export default function Timeline() {
  const [activeCategory, setActiveCategory] = useState<TimelineCategory | 'all'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(3);
  const categories = Object.keys(categoryLabels) as TimelineCategory[];
  const filteredEvents = useMemo(() => (activeCategory === 'all' ? timelineEvents : timelineEvents.filter((event) => event.category === activeCategory)), [activeCategory]);

  return (
    <section id="timeline" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-brand-gold/25 bg-brand-gold/12 px-4 py-2 text-xs font-medium text-brand-gold"><CalendarDays size={14} /> Хронология</div>
          <h2 className="section-title">От Амстердама до наших дней</h2>
          <p className="section-subtitle mx-auto max-w-3xl">Фильтруйте события по типу и раскрывайте карточки хроники для краткого и развёрнутого контекста.</p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-2.5">
          <button onClick={() => setActiveCategory('all')} className={`filter-pill ${activeCategory === 'all' ? 'filter-pill-active' : ''}`}><Filter size={15} /> Все</button>
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`filter-pill ${activeCategory === category ? 'filter-pill-active' : ''}`} style={activeCategory === category ? { borderColor: categoryColors[category], color: categoryColors[category] } : undefined}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: categoryColors[category] }} /> {categoryLabels[category]}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-gold/40 to-transparent md:left-1/2" />
          <div className="space-y-6">
            {filteredEvents.map((event, index) => {
              const isOpen = openIndex === index;
              const alignRight = index % 2 === 0;
              return (
                <motion.article key={`${event.year}-${event.title}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: Math.min(index * 0.03, 0.25) }} className={`relative md:flex ${alignRight ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className="absolute left-4 top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-brand-gold bg-[var(--page-bg)] md:left-1/2" style={{ boxShadow: `0 0 0 8px ${categoryColors[event.category]}20` }} />
                  <button onClick={() => setOpenIndex(isOpen ? null : index)} className="bento-card ml-10 w-[calc(100%-2.5rem)] p-5 text-left md:ml-0 md:w-[48%]">
                    <div className="mb-3.5 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs font-semibold tracking-wide" style={{ color: categoryColors[event.category] }}>{event.year}</p>
                        <h3 className="mt-1.5 text-lg font-bold sm:text-xl">{event.title}</h3>
                      </div>
                      <ChevronDown className={`mt-0.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
                    </div>
                    <p className="text-sm leading-6 opacity-75">{event.description}</p>
                    {isOpen && event.details && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 opacity-70">{event.details}</motion.p>}
                    {isOpen && event.source && <p className="mt-3 text-xs leading-5 text-brand-gold/80">Источник: {event.source}</p>}
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
