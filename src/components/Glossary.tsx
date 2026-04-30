import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';

const terms = [
  { term: 'Баптист', definition: 'От греч. baptizein — «погружать». Член евангельской церкви, исповедующей крещение только сознательно уверовавших людей путём полного погружения в воду.' },
  { term: 'Штундист', definition: 'От нем. Stunde — «час». Участник немецких библейских часов на Украине XIX века. Со временем — пренебрежительное название русских баптистов в Российской Империи.' },
  { term: 'Евангельский христианин (ЕХ)', definition: 'Направление, восходящее к петербургскому пробуждению 1874 г. (лорд Редсток, В.А. Пашков). Объединились с баптистами в ВСЕХБ в 1944 году.' },
  { term: 'ВСЕХБ', definition: 'Всесоюзный совет евангельских христиан-баптистов. Создан 26–29 октября 1944 г. Официальная легальная организация ЕХБ в СССР. Реорганизован в 1992 г. при распаде СССР.' },
  { term: 'СЦ ЕХБ (МСЦ ЕХБ)', definition: 'Совет Церквей евангельских христиан-баптистов. Создан в сентябре 1965 г. реформационным движением. Принципиально отказался от государственной регистрации. Ныне — МСЦ ЕХБ (Международный союз церквей).' },
  { term: 'Пресвитер', definition: 'Духовный руководитель (старейшина) баптистской общины. У баптистов — избирается общиной, не является священником в иерархическом смысле.' },
  { term: 'Дьякон', definition: 'Служитель, помогающий пресвитеру. В баптистской традиции — забота о практических нуждах общины.' },
  { term: 'Sola Scriptura', definition: 'Лат. «только Писание». Реформаторский принцип: Библия — единственный непогрешимый авторитет в вопросах веры и жизни.' },
  { term: '«Братский вестник»', definition: 'Официальный журнал ВСЕХБ, выходил с 1945 г. (с перерывом 1949–1952). Важнейший источник по истории советского баптизма. С 3000 до 5000 экземпляров.' },
  { term: 'Инициативники', definition: 'Неофициальное название реформационного движения внутри ВСЕХБ (1961), организовавшего СЦ ЕХБ. Требовали отмены ограничительного «Инструктивного письма» 1960 г.' },
  { term: 'Молокане', definition: 'Русская духовная христианская секта, отвергавшая православные обряды. Из молокан вышло немало первых русских баптистов, в том числе Никита Воронин.' },
  { term: 'Онкен', definition: 'Иоганн Герхард Онкен (1800–1884) — основатель немецкого баптизма и крупнейший миссионер. Его организационная модель («гамбургская») повлияла на Тифлисскую общину.' },
  { term: 'Союз родственников узников', definition: 'Организация при СЦ ЕХБ, документировавшая случаи преследования верующих в СССР. Издавала «Бюллетень Совета родственников» — ценнейший источник по правам человека.' },
  { term: 'Редсток', definition: 'Гренвилл Волдегрейв, 3-й барон Редсток (1833–1913) — английский евангелист-аристократ, чьи проповеди в Петербурге в 1874 г. дали толчок пашковскому движению.' },
  { term: 'Закон о веротерпимости 1905', definition: 'Указ от 17 апреля 1905 г. (не следует путать с Манифестом 17 октября). Первая легализация баптизма в России. Позволил открыто проводить богослужения.' },
];

export default function Glossary() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="glossary" className="relative py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold"><BookOpen size={13} /> Глоссарий</div>
          <h2 className="section-title">Словарь терминов</h2>
          <p className="section-subtitle mx-auto max-w-2xl">Ключевые понятия для понимания истории русского баптизма.</p>
        </motion.div>

        <div className="space-y-2">
          {terms.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={item.term} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }} className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden">
                <button onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-semibold">{item.term}</span>
                  <ChevronDown className={`shrink-0 transition-transform duration-300 text-brand-gold ${isOpen ? 'rotate-180' : ''}`} size={18} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                      <p className="border-t border-white/8 px-5 pb-4 pt-3 text-sm leading-6 opacity-75">{item.definition}</p>
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
