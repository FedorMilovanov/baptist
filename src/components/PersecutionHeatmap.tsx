import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const periods = [
  { decade: '1860-е', intensity: 2, label: 'Слабое', events: 'Первые преследования за штундизм' },
  { decade: '1870-е', intensity: 3, label: 'Умеренное', events: 'Административные ограничения' },
  { decade: '1880-е', intensity: 4, label: 'Сильное', events: 'Запреты собраний, высылки' },
  { decade: '1890-е', intensity: 5, label: 'Жёсткое', events: '«Вредная секта» — уголовное преследование' },
  { decade: '1900-е', intensity: 2, label: 'Ослабло', events: 'Закон о веротерпимости 1905' },
  { decade: '1910-е', intensity: 1, label: 'Минимальное', events: 'Временное правительство — свобода' },
  { decade: '1920-е', intensity: 2, label: 'Рост', events: 'НЭП — временная свобода, потом давление' },
  { decade: '1930-е', intensity: 10, label: 'Уничтожение', events: 'Большой террор: 90% служителей арестовано или расстреляно' },
  { decade: '1940-е', intensity: 5, label: 'Тактический мир', events: 'ВСЕХБ — ограниченная легализация в обмен на контроль' },
  { decade: '1950-е', intensity: 4, label: 'Давление', events: 'Антирелигиозная кампания Хрущёва' },
  { decade: '1960-е', intensity: 7, label: 'Максимум Хрущёва', events: 'Закрытие общин, арест лидеров СЦ ЕХБ' },
  { decade: '1970-е', intensity: 6, label: 'Брежневское', events: '158 узников, Совет родственников узников' },
  { decade: '1980-е', intensity: 4, label: 'Снижение', events: 'Горбачёв — постепенное освобождение' },
  { decade: '1990-е', intensity: 1, label: 'Свобода', events: 'Закон о свободе совести 1990' },
  { decade: '2000-е', intensity: 1, label: 'Стабильность', events: 'Регистрация, открытая деятельность' },
  { decade: '2010-е', intensity: 2, label: 'Новые угрозы', events: 'Закон Яровой 2016, ограничения миссии' },
];

function IntensityBar({ value }: { value: number }) {
  const color = value >= 8 ? '#ef4444' : value >= 5 ? '#f59e0b' : value >= 3 ? '#eab308' : '#10b981';
  return (
    <div className="flex h-10 items-end gap-0.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-2.5 rounded-sm transition-all"
          style={{
            height: `${((i + 1) / 10) * 100}%`,
            background: i < value ? color : 'rgba(255,255,255,0.08)',
            opacity: i < value ? (0.4 + (i / 10) * 0.6) : 1,
          }}
        />
      ))}
    </div>
  );
}

export default function PersecutionHeatmap() {
  return (
    <section id="persecution" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs text-red-400"><Shield size={13} /> Гонения</div>
          <h2 className="section-title">Хроника гонений</h2>
          <p className="section-subtitle mx-auto max-w-3xl">Интенсивность преследований евангельских христиан-баптистов по десятилетиям.</p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {periods.map((period, index) => (
            <motion.div
              key={period.decade}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 hover:border-white/20 transition-colors"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <span className="font-mono text-sm font-bold">{period.decade}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${period.intensity >= 8 ? 'bg-red-500/20 text-red-400' : period.intensity >= 5 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>{period.label}</span>
              </div>
              <IntensityBar value={period.intensity} />
              <p className="mt-3 text-xs leading-4 opacity-60">{period.events}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
          <h3 className="mb-3 font-bold text-red-400">Главный факт: 1937–1938</h3>
          <p className="text-sm leading-6 opacity-80">В годы Большого террора было арестовано или расстреляно более 90% пресвитеров и руководителей евангельских общин. К 1939 году в СССР практически не осталось ни одной легально действующей протестантской церкви.</p>
          <p className="mt-3 text-xs opacity-50">Источник: А.В. Синичкин; pravenc.ru; rusbaptist.stunda.org</p>
        </motion.div>
      </div>
    </section>
  );
}
