import { motion } from 'framer-motion';
import { BookMarked, Gavel, Route, ScrollText } from 'lucide-react';
import { confessionRecords } from '../data/history/theology';
import { legalRecords } from '../data/history/legal';
import { baptistJournalPeriods } from '../data/history/journalBaptist';
import { personProfiles } from '../data/history/persons';
import { kargelThreeCentersRoute, molokanLeadersInEhb, openArchiveTargets } from '../data/history/movements';
import { biographyDisputes } from '../data/history/biographyDisputes';

export default function ResearchFindings() {
  const kargel = personProfiles.find((person) => person.id === 'kargel');

  return (
    <section id="research-findings" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold">
            <ScrollText size={13} />
            Новые находки v6
          </div>
          <h2 className="section-title">Уточнения, вероучение и правовой контекст</h2>
          <p className="section-subtitle mx-auto max-w-3xl">
            Сводка важных исторических находок, которые не должны потеряться в проекте.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <Route size={22} />
              <h3 className="text-lg font-bold">Каргель как связующее звено</h3>
            </div>
            <p className="mb-4 text-sm leading-6 opacity-75">
              {kargel?.contribution}
            </p>
            <div className="space-y-3">
              {kargelThreeCentersRoute.map((step, index) => (
                <div key={`${step.place}-${step.period}`} className="flex gap-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-gold/30 text-xs text-brand-gold">{index + 1}</span>
                  <span className="leading-6 opacity-75"><strong>{step.place}</strong> ({step.period}): {step.note}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <BookMarked size={22} />
              <h3 className="text-lg font-bold">Вероучительные документы</h3>
            </div>
            <div className="space-y-3">
              {confessionRecords.map((record) => (
                <div key={record.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <h4 className="text-sm font-bold">{record.title}</h4>
                    <span className="font-mono text-xs text-brand-gold">{record.year}</span>
                  </div>
                  <p className="text-xs opacity-55">{record.authorOrTranslator}</p>
                  <p className="mt-2 text-sm leading-6 opacity-75">{record.significance}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <Route size={22} />
              <h3 className="text-lg font-bold">Молоканские лидеры в ЕХБ</h3>
            </div>
            <p className="mb-4 text-sm leading-6 opacity-70">
              v6 подчёркивает, что значительная часть ранних лидеров ЕХБ вышла из молоканской среды.
            </p>
            <div className="flex flex-wrap gap-2">
              {molokanLeadersInEhb.map((leader) => (
                <span key={leader} className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
                  {leader}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <ScrollText size={22} />
              <h3 className="text-lg font-bold">Архивные цели</h3>
            </div>
            <div className="space-y-2.5">
              {openArchiveTargets.map((target) => (
                <p key={target} className="flex gap-2 text-sm leading-6 opacity-75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                  {target}
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <ScrollText size={22} />
              <h3 className="text-lg font-bold">Биографические расхождения</h3>
            </div>
            <div className="space-y-4">
              {biographyDisputes.map((dispute) => (
                <div key={`${dispute.person}-${dispute.issue}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-bold">{dispute.person}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide opacity-45">{dispute.issue}</p>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3 text-xs opacity-75">
                      <strong>Версия A:</strong> {dispute.versionA}
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/[0.02] p-3 text-xs opacity-75">
                      <strong>Версия B:</strong> {dispute.versionB}
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 opacity-60">{dispute.note}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <BookMarked size={22} />
              <h3 className="text-lg font-bold">Почему это важно</h3>
            </div>
            <div className="space-y-3 text-sm leading-6 opacity-75">
              <p>История русского баптизма долго переписывалась по вторичным и поздним обзорам. v6 возвращает нас к необходимости сверки с первичными текстами, архивами и журнальными публикациями.</p>
              <p>Это влияет не только на биографии, но и на понимание того, как формировались три очага, как происходило объединение 1884 года и как в 1944 был собран ВСЕХБ.</p>
              <p>Особенно чувствительны вопросы: крещение Каргеля, место рождения Павлова, реальные масштабы Пашковского архива и точная юридическая база легализации ЕХ/баптистов в 1879–1883 годах.</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <Gavel size={22} />
              <h3 className="text-lg font-bold">Правовой контекст</h3>
            </div>
            <div className="space-y-3">
              {legalRecords.map((record) => (
                <div key={record.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-mono text-xs text-brand-gold">{record.year}</p>
                  <h4 className="mt-1 text-sm font-bold">{record.title}</h4>
                  <p className="mt-2 text-sm leading-6 opacity-70">{record.summary}</p>
                  <p className="mt-2 text-xs leading-5 opacity-55">{record.significance}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bento-card p-6">
            <div className="mb-4 flex items-center gap-3 text-brand-gold">
              <ScrollText size={22} />
              <h3 className="text-lg font-bold">Журнал «Баптист»</h3>
            </div>
            <div className="space-y-2.5">
              {baptistJournalPeriods.map((period) => (
                <div key={`${period.period}-${period.editor}`} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <span className="w-24 shrink-0 font-mono text-xs text-brand-gold">{period.period}</span>
                  <div>
                    <p className="text-sm font-semibold">{period.editor}</p>
                    <p className="mt-1 text-xs leading-5 opacity-65">{period.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}