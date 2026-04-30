import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, HelpCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { ALL_QUIZ_QUESTIONS } from '../data/quizData';

const TOPICS = [
  { id: 'all', label: 'Все темы' },
  { id: 'origins', label: 'Истоки' },
  { id: 'figures', label: 'Фигуры' },
  { id: 'unions', label: 'Союзы' },
  { id: 'persecution', label: 'Гонения' },
  { id: 'doctrines', label: 'Вероучение' },
  { id: 'modern', label: 'Современность' },
];

export default function QuizHub() {
  const [topic, setTopic] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = topic === 'all' ? ALL_QUIZ_QUESTIONS : ALL_QUIZ_QUESTIONS.filter((q) => q.topic === topic);
  const question = questions[currentIndex];

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTotal((t) => t + 1);
    if (index === question.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setTotal(0);
    setFinished(false);
  };

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    handleReset();
  };

  if (!question) return null;

  return (
    <section id="quiz" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold"><HelpCircle size={13} /> Викторина</div>
          <h2 className="section-title">Проверьте знания</h2>
          <p className="section-subtitle mx-auto max-w-2xl">34 вопроса по истории русского баптизма разной сложности.</p>
        </motion.div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {TOPICS.map((t) => (
            <button key={t.id} onClick={() => handleTopicChange(t.id)} className={`filter-pill ${topic === t.id ? 'filter-pill-active' : ''}`}>{t.label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bento-card p-8 text-center">
              <Trophy className="mx-auto mb-4 text-brand-gold" size={48} />
              <h3 className="mb-2 text-3xl font-black">{score} / {total}</h3>
              <p className="mb-6 opacity-60">{score === total ? 'Отлично! Вы знаете историю баптизма!' : score >= total * 0.7 ? 'Хороший результат!' : 'Есть что изучить!'}</p>
              <button onClick={handleReset} className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 font-semibold text-black transition hover:scale-105">
                <RotateCcw size={18} /> Пройти снова
              </button>
            </motion.div>
          ) : (
            <motion.div key={`q-${currentIndex}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="bento-card p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm opacity-50">{currentIndex + 1} / {questions.length}</span>
                <span className="font-mono text-sm text-brand-gold">{score} правильно</span>
              </div>
              <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-brand-gold transition-all" style={{ width: `${((currentIndex) / questions.length) * 100}%` }} />
              </div>

              <h3 className="mb-6 mt-6 text-lg font-bold leading-7 sm:text-xl">{question.question}</h3>

              <div className="space-y-3">
                {question.options.map((option, i) => {
                  const isCorrect = i === question.correctIndex;
                  const isSelected = i === selected;
                  let classes = 'w-full rounded-2xl border p-4 text-left text-sm transition-all ';
                  if (selected === null) {
                    classes += 'border-white/10 bg-white/[0.03] hover:border-brand-gold/40 hover:bg-brand-gold/8';
                  } else if (isCorrect) {
                    classes += 'border-green-500/60 bg-green-500/10 text-green-400';
                  } else if (isSelected) {
                    classes += 'border-red-500/60 bg-red-500/10 text-red-400';
                  } else {
                    classes += 'border-white/5 bg-white/[0.01] opacity-50';
                  }
                  return (
                    <button key={i} onClick={() => handleSelect(i)} className={classes}>
                      <span className="flex items-center gap-3">
                        {selected !== null && isCorrect && <CheckCircle size={16} className="shrink-0 text-green-400" />}
                        {selected !== null && isSelected && !isCorrect && <XCircle size={16} className="shrink-0 text-red-400" />}
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 opacity-80">
                  <strong>Объяснение:</strong> {question.explanation}
                  {question.source && <p className="mt-2 text-xs text-brand-gold/70">Источник: {question.source}</p>}
                </motion.div>
              )}

              {selected !== null && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={handleNext} className="mt-6 w-full rounded-full bg-brand-gold py-3.5 font-semibold text-black transition hover:scale-[1.02]">
                  {currentIndex + 1 >= questions.length ? 'Посмотреть результат' : 'Следующий вопрос →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
