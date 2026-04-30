import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Landmark } from 'lucide-react';
import { organizations } from '../data/organizations';

export default function Organizations() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="organizations" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold"><Landmark size={13} /> Союзы и объединения</div>
          <h2 className="section-title">Ключевые организации</h2>
          <p className="section-subtitle mx-auto max-w-3xl">От первого Союза баптистов 1884 года до современных организаций — история объединений, расколов и возрождений.</p>
        </motion.div>

        <div className="space-y-4">
          {organizations.map((org, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={org.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="bento-card overflow-hidden">
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 p-6 text-left">
                  <div className="flex items-center gap-4">
                    <div className="h-3 w-3 shrink-0 rounded-full" style={{ background: org.color, boxShadow: `0 0 12px ${org.color}60` }} />
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-black">{org.name}</h3>
                        <span className="font-mono text-xs opacity-60">{org.years}</span>
                      </div>
                      <p className="mt-0.5 text-sm opacity-60">{org.fullName}</p>
                    </div>
                  </div>
                  <ChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={20} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="border-t border-white/10 px-6 pb-6 pt-5">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-50">Происхождение</p>
                            <p className="text-sm leading-6 opacity-80">{org.origin}</p>
                            <div className="mt-4">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-50">Численность</p>
                              <p className="font-mono text-lg font-bold" style={{ color: org.color }}>{org.members}</p>
                            </div>
                            <div className="mt-4">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-50">Позиция</p>
                              <p className="text-sm opacity-80">{org.position}</p>
                            </div>
                          </div>
                          <div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wider opacity-50">Характеристики</p>
                            <ul className="space-y-2">
                              {org.characteristics.map((char) => (
                                <li key={char} className="flex gap-2 text-sm leading-5 opacity-75">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: org.color }} />
                                  {char}
                                </li>
                              ))}
                            </ul>
                            {org.keyLeaders.length > 0 && (
                              <div className="mt-5">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-50">Ключевые лидеры</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {org.keyLeaders.map((leader) => (
                                    <span key={leader} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs">{leader}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {org.source && <p className="mt-4 text-xs opacity-50">Источник: {org.source}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
