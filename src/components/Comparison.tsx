import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

const rows = [
  {
    aspect: 'Происхождение',
    rs: 'Преемник ВСЕХБ после распада СССР, официальный союз.',
    msc: 'Вырос из инициативного движения (1961), оформлен как СЦ ЕХБ в 1965.',
  },
  {
    aspect: 'Регистрация',
    rs: 'Церкви зарегистрированы и действуют в правовом поле.',
    msc: 'Принципиальный отказ от регистрации в советский период.',
  },
  {
    aspect: 'Численность',
    rs: '~72 000 верующих.',
    msc: 'Пик 155 000 (1966), позже ~68 000.',
  },
  {
    aspect: 'Издательская база',
    rs: 'Журнал «Братский вестник», семинарские материалы.',
    msc: 'Подпольные издания: «Христианин», «Вестник истины», бюллетени узников.',
  },
  {
    aspect: 'Модель взаимодействия',
    rs: 'Официальный диалог с государством и обществом.',
    msc: 'Акцент на независимость общин и церковную дисциплину.',
  },
];

export default function Comparison() {
  return (
    <section id="comparison" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold"><Scale size={13} /> Сравнение</div>
          <h2 className="section-title">РС ЕХБ и МСЦ ЕХБ</h2>
          <p className="section-subtitle mx-auto max-w-3xl">Нейтральный обзор двух ветвей, возникших после советского раскола 1960-х годов.</p>
        </motion.div>

        <div className="overflow-x-auto custom-scroll rounded-2xl border border-white/10">
          <table className="min-w-[820px] w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-5 py-4 text-left opacity-60">Параметр</th>
                <th className="px-5 py-4 text-left text-blue-400">РС ЕХБ</th>
                <th className="px-5 py-4 text-left text-red-400">МСЦ ЕХБ</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.aspect} className="border-b border-white/5 align-top">
                  <td className="px-5 py-4 font-semibold">{row.aspect}</td>
                  <td className="px-5 py-4 opacity-75 leading-6">{row.rs}</td>
                  <td className="px-5 py-4 opacity-75 leading-6">{row.msc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
