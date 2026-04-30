import { BookOpen, ExternalLink } from 'lucide-react';
import { BUILD_INFO } from '../buildInfo';

const sources = [
  'журнал «Баптист» (1907–1929)',
  '«Братский вестник» (с 1945)',
  'baptistru.info',
  'baptist.org.ru',
  'rusbaptist.stunda.org',
  'pravenc.ru',
  'mbchurch.ru',
  'ГМИР (архив протоколов)',
  'enc.rusdeutsch.ru',
  'bigenc.ru',
  'Coleman 2007',
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3 text-brand-gold"><BookOpen size={20} /><span className="font-bold">Карта русского баптизма</span></div>
            <p className="max-w-2xl text-sm leading-7 opacity-65">Интерактивная энциклопедия истории евангельских христиан-баптистов в России: истоки, союзы, гонения, расколы и современность.</p>
            <p className="mt-4 text-xs opacity-45">Савинский С.Н. и Wikipedia не используются как финальная опора. Исторические данные сверяются с первоисточниками, архивными материалами ГМИР и замечаниями А.В. Синичкина.</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-brand-gold/55">Build {BUILD_INFO.id}</p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Источники</h3>
            <div className="flex flex-wrap gap-2">
              {sources.map((source) => <span key={source} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs opacity-70">{source} <ExternalLink size={10} /></span>)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
