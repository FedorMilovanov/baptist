import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, UserRound } from 'lucide-react';
import { keyPersonCards } from '../data/history/persons';

export default function KeyFigures() {
  const [query, setQuery] = useState('');
  const [openPerson, setOpenPerson] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return keyPersonCards;
    return keyPersonCards.filter((figure) => [figure.name, figure.role, figure.region, figure.contribution, figure.highlights.join(' ')].join(' ').toLowerCase().includes(normalized));
  }, [query]);

  return (
    <section id="figures" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold"><UserRound size={13} /> Ключевые фигуры</div>
          <h2 className="section-title">Люди, через которых шла история</h2>
          <p className="section-subtitle mx-auto max-w-3xl">Пионеры, издатели, богословы, организаторы и лидеры разных этапов русского баптизма.</p>
        </motion.div>

        <div className="mx-auto mb-8 flex max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
          <Search size={18} className="text-brand-gold" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по имени, роли или региону..." className="w-full bg-transparent text-sm outline-none placeholder:opacity-45" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((figure, index) => {
            const isOpen = openPerson === figure.name;
            return (
            <motion.article key={figure.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * 0.04, 0.22) }} className="bento-card p-6">
              <div className="mb-5 flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-gold/15 text-brand-gold"><UserRound size={24} /></div>
                <div>
                  <h3 className="text-xl font-black leading-tight">{figure.name}</h3>
                  <p className="mt-1 font-mono text-xs text-brand-gold">{figure.years}</p>
                </div>
              </div>
              <p className="text-sm font-semibold opacity-90">{figure.role}</p>
              <p className="mt-4 text-sm leading-6 opacity-70">{figure.contribution}</p>
              {figure.highlights.length > 0 && (
                <div className="mt-5 space-y-2">
                  {figure.highlights.slice(0, isOpen ? figure.highlights.length : 3).map((highlight) => (
                    <p key={highlight} className="flex gap-2 text-xs leading-5 opacity-70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                      {highlight}
                    </p>
                  ))}
                </div>
              )}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs leading-5 opacity-70">
                <p><strong>Регион:</strong> {figure.region}</p>
                {figure.fate && <p className="mt-2"><strong>Судьба:</strong> {figure.fate}</p>}
                {figure.source && <p className="mt-2 text-brand-gold/80"><strong>Источник:</strong> {figure.source}</p>}
                {figure.chronology.length > 0 && (
                  <div className="mt-3">
                    <p><strong>Хронология:</strong></p>
                    <ul className="mt-2 space-y-1.5">
                      {figure.chronology.slice(0, isOpen ? figure.chronology.length : 4).map((item) => (
                        <li key={`${figure.name}-${item.year}`} className="flex gap-2">
                          <span className="font-mono text-brand-gold/80">{item.year}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {(figure.highlights.length > 3 || figure.chronology.length > 4) && (
                <button
                  onClick={() => setOpenPerson(isOpen ? null : figure.name)}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1.5 text-xs font-semibold text-brand-gold transition hover:bg-brand-gold/15"
                >
                  {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  {isOpen ? 'Свернуть досье' : 'Показать полное досье'}
                </button>
              )}
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
