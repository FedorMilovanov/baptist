import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { askGemini } from '../services/gemini';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

function localAnswer(question: string) {
  const text = question.toLowerCase();
  if (text.includes('павлов')) return 'В.Г. Павлов (1854–1924) — один из первых десяти членов Тифлисской общины. Крещён Н.И. Ворониным в апреле 1871. В 1875 в Гамбурге его обучал Пётр Вильрат по назначению Онкена; в 1876 Павлов перевёл «Гамбургское исповедание веры». В 1909 избран председателем Союза баптистов России.';
  if (text.includes('мазаев')) return 'Д.И. Мазаев (1855–1922) — председатель Союза баптистов России около 20 лет. Крещён 11.11.1884 в реке Кавалерке В.Р. Колодиным. Основатель и редактор журнала «Баптист» (1907–1909), участник Лондонского конгресса 1905.';
  if (text.includes('каргель')) return 'И.В. Каргель (1849–1937) — богослов и связующее звено Тифлиса, Украины/Одессы, Гамбурга, Петербурга и Болгарии. Исправление v6: по pravenc.ru Каргель крещён Н.И. Ворониным в 1869, не Кальвейтом; версия Валькевича требует сверки с автобиографией Кальвейта 1913.';
  if (text.includes('пашков') || text.includes('архив')) return 'Петербургский съезд открыт 1.04.1884 и прерван властями 6.04.1884. Архив В.А. Пашкова — 7–10 тыс. документов в Бирмингемском университете; микрофильмы есть в Нэшвилле, Виннипеге, Итонском колледже и Беркли.';
  if (text.includes('сц') || text.includes('мсц') || text.includes('1965')) return 'СЦ ЕХБ (ныне МСЦ ЕХБ) оформлен в сентябре 1965. Инициативная группа появилась в 1961 г. Лидеры: Г.К. Крючков, Г.П. Винс.';
  if (text.includes('воронин') || text.includes('1867')) return 'Никита Воронин крещён 20.08.1867 в р. Кура (Тифлис) Мартином Кальвейтом. Дата принята официально с письма Воронина 15.03.1889 (baptist.org.ru). Тифлисская община — онкенская модель.';
  if (text.includes('всехб') || text.includes('1944')) return 'ВСЕХБ создан 26–29.10.1944 в Москве. Первоначальное название — ВСЕХИ, с 01.01.1946 — «Братский вестник». Первый председатель — Я.И. Жидков, редактор БВ — А.В. Карев.';
  if (text.includes('исток')) return 'Три истока ЕХБ: Тифлис (1867), Южная Украина (1864/1869), Санкт-Петербург (1874). ЕХБ сформированы из трёх независимых источников.';
  if (text.includes('веротерпимость') || text.includes('1905')) return 'Указ о веротерпимости — 17 апреля 1905 г. (не Манифест 17 октября). Первая легализация баптизма в России.';
  if (text.includes('прицкау')) return 'Исправление v6: книга И.Е. Прицкау по истории немецких баптистов юга России вышла в 1914 году, не «до 1924». Источник: предисловие ВСЕХБ 1989, с. 6.';
  if (text.includes('фризен')) return 'П.М. Фризен, «История братских меннонитов», издана в 1911 году (ВСЕХБ 1989).';
  return 'Спросите об истоках ЕХБ, Павлове, Каргеле, Мазаеве, Пашковском архиве, ВСЕХБ, СЦ ЕХБ или первоисточниках.';
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const initialMessages = useMemo<ChatMessage[]>(() => [{ role: 'assistant', text: 'Мир вам! Я помогу разобраться в карте русского баптизма. Например: «Когда создан ВСЕХБ?» или «Почему 1965 важен для МСЦ?»' }], []);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || pending) return;
    setInput('');
    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setPending(true);
    const geminiAnswer = await askGemini(trimmed);
    setMessages((current) => [...current, { role: 'assistant', text: geminiAnswer || localAnswer(trimmed) }]);
    setPending(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-[95] grid h-14 w-14 place-items-center rounded-full bg-brand-gold text-black shadow-2xl shadow-brand-gold/30" aria-label="Открыть AI-ассистента">
        <MessageCircle size={24} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }} className="fixed bottom-24 right-5 z-[96] flex h-[560px] w-[calc(100vw-2.5rem)] max-w-md flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/90 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-gold/15 text-brand-gold"><Sparkles size={18} /></div>
                <div>
                  <h3 className="font-bold text-white">AI-ассистент</h3>
                  <p className="text-xs text-white/45">Gemini API опционален</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-2 text-white/60 hover:bg-white/10"><X size={18} /></button>
            </div>

            <div className="custom-scroll flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-brand-gold text-black' : 'bg-white/10 text-white/86'}`}>{message.text}</div>
                </div>
              ))}
              {pending && <div className="text-sm text-brand-gold">Думаю...</div>}
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && send()} placeholder="Задайте вопрос об истории..." className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:opacity-40 focus:border-brand-gold/40" />
                <button onClick={send} disabled={pending} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gold text-black disabled:opacity-50"><Send size={16} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
