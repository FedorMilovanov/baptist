import { motion } from 'framer-motion';
import { AlertCircle, HelpCircle, Search } from 'lucide-react';
import { unresolvedQuestionsV6 } from '../data/history/unresolved';

export default function UnresolvedQuestions() {
  return (
    <section id="unresolved" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-400">
            <HelpCircle size={13} />
            Открытые вопросы
          </div>
          <h2 className="section-title">Нерешённые вопросы v6</h2>
          <p className="section-subtitle mx-auto max-w-3xl">
            Эти вопросы требуют дополнительной архивной работы, сверки с первичными источниками или обращения к специалистам.
          </p>
        </motion.div>

        <div className="space-y-4">
          {unresolvedQuestionsV6.map((question, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-amber-500/30 hover:bg-white/[0.04]"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-500/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-500/15 text-amber-400">
                  <AlertCircle size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-6 opacity-85">{question}</p>
                </div>
                <button className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs opacity-60 transition hover:opacity-100">
                  <Search size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Call-to-Action */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
          <p className="mb-2 text-sm font-semibold text-amber-400">Приглашаем к сотрудничеству</p>
          <p className="text-sm opacity-70">
            Если у вас есть доступ к архивам Пашкова в Бирмингеме, автобиографии Кальвейта 1913 года или другим первичным источникам — помогите нам уточнить эти вопросы.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
