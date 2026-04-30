import { motion } from 'framer-motion';
import { Gavel, ShieldAlert } from 'lucide-react';
import { legalRecords } from '../data/history/legal';

export default function LegalContext() {
  return (
    <section id="legal-context" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold">
            <Gavel size={13} />
            Правовой контекст
          </div>
          <h2 className="section-title">Законы, легализация и преследование</h2>
          <p className="section-subtitle mx-auto max-w-3xl">
            От частичного признания общин до законов, позволявших преследовать евангельских христиан как сектантов.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-gold/50 to-transparent md:left-1/2" />
          <div className="space-y-6">
            {legalRecords.map((record, index) => {
              const alignRight = index % 2 === 0;
              return (
                <motion.article
                  key={record.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative md:flex ${alignRight ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  <div className="absolute left-4 top-8 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border border-brand-gold/40 bg-[var(--page-bg)] text-brand-gold md:left-1/2">
                    <ShieldAlert size={14} />
                  </div>
                  <div className="bento-card ml-12 w-[calc(100%-3rem)] p-6 md:ml-0 md:w-[47%]">
                    <p className="font-mono text-xs font-semibold text-brand-gold">{record.year}</p>
                    <h3 className="mt-2 text-xl font-black">{record.title}</h3>
                    <p className="mt-3 text-sm leading-6 opacity-75">{record.summary}</p>
                    <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-5 opacity-65">{record.significance}</p>
                    <p className="mt-3 text-xs text-brand-gold/70">Источник: {record.source}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}