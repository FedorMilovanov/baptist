import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const VSEHB_EVENTS = [
  { year: '1944', text: 'Создание ВСЕХБ (26–29 окт.)' },
  { year: '1945', text: 'Первый «Братский вестник»' },
  { year: '1946', text: 'Присоединение пятидесятников' },
  { year: '1963', text: 'Присоединение меннонитов' },
  { year: '1966', text: 'Жидков передаёт пост Иванову' },
  { year: '1974', text: 'Клименко — председатель' },
  { year: '1982', text: '158 узников за веру' },
  { year: '1985', text: 'Логвиненко — председатель' },
  { year: '1990', text: 'Новый Устав ВСЕХБ' },
  { year: '1992', text: 'Реорганизация → РС ЕХБ + ЕАФ' },
];

const SC_EVENTS = [
  { year: '1961', text: 'Инициативная группа Крючкова–Хомякова' },
  { year: '1962', text: 'Оргкомитет, первые аресты' },
  { year: '1965', text: 'Создание СЦ ЕХБ (сент.)' },
  { year: '1970', text: 'Совет родственников узников' },
  { year: '1971', text: 'Издательство «Христианин» (подполье)' },
  { year: '1974', text: 'Арест Крючкова, 8 лет лагерей' },
  { year: '1979', text: 'Винс обменян, уехал в США' },
  { year: '1987', text: 'Частичное освобождение узников' },
  { year: '1991', text: 'Легализация, регистрация' },
  { year: '1998', text: 'МСЦ ЕХБ — международный статус' },
];

export default function ParallelTimelines() {
  return (
    <section id="parallel-timelines" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold"><GitBranch size={13} /> Два пути</div>
          <h2 className="section-title">Два пути после 1960</h2>
          <p className="section-subtitle mx-auto max-w-3xl">«Инструктивное письмо» 1960 г. расколо евангельских баптистов СССР на два потока: официальный ВСЕХБ и подпольный СЦ ЕХБ.</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* VSEHB Column */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="mb-6 rounded-2xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 p-5">
              <h3 className="text-xl font-black">ВСЕХБ</h3>
              <p className="mt-1 text-sm opacity-70">Официальный путь · 1944–1992</p>
              <p className="mt-3 text-xs leading-5 opacity-60">Зарегистрированный союз, работавший в рамках советских законов. Стремился сохранить легальность ценой ограничений.</p>
            </div>
            <div className="relative space-y-3 pl-6">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#8b5cf6]/60 to-transparent" />
              {VSEHB_EVENTS.map((event, i) => (
                <motion.div key={event.year} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative">
                  <div className="absolute -left-6 top-2.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#8b5cf6]" />
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                    <span className="font-mono text-xs text-[#8b5cf6]">{event.year}</span>
                    <p className="mt-0.5 text-sm">{event.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SC EHB Column */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="mb-6 rounded-2xl border border-[#ef4444]/30 bg-[#ef4444]/10 p-5">
              <h3 className="text-xl font-black">СЦ ЕХБ</h3>
              <p className="mt-1 text-sm opacity-70">Путь сопротивления · 1961–до сих пор</p>
              <p className="mt-3 text-xs leading-5 opacity-60">Принципиально нелегальный союз. Подпольные типографии, лагеря, борьба за свободу совести. Ныне — МСЦ ЕХБ.</p>
            </div>
            <div className="relative space-y-3 pl-6">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#ef4444]/60 to-transparent" />
              {SC_EVENTS.map((event, i) => (
                <motion.div key={event.year} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="relative">
                  <div className="absolute -left-6 top-2.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#ef4444]" />
                  <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
                    <span className="font-mono text-xs text-[#ef4444]">{event.year}</span>
                    <p className="mt-0.5 text-sm">{event.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
