export interface ConfessionRecord {
  id: string;
  title: string;
  year: string;
  authorOrTranslator: string;
  significance: string;
  source: string;
}

export const confessionRecords: ConfessionRecord[] = [
  {
    id: 'hamburg-1876',
    title: 'Гамбургское исповедание веры',
    year: '1876',
    authorOrTranslator: 'Перевод В. Г. Павлова с немецкого',
    significance: '15 разделов; стало важным образцом вероучения для российских баптистов.',
    source: 'baptist.org.ru; v6 findings',
  },
  {
    id: 'kargel-1913',
    title: 'Краткое изложение вероучения евангельских христиан',
    year: '1913',
    authorOrTranslator: 'И. В. Каргель',
    significance: 'В 1966 году стало официальным вероучением ВСЕХБ.',
    source: 'pravenc.ru; baptistru.info',
  },
  {
    id: 'weiler-1870s',
    title: 'Правила вероисповедания',
    year: '1870–1873',
    authorOrTranslator: 'Вилер — Рябошапка — Ратушный',
    significance: '10 разделов; важный ранний текст украинско-штундистской ветви.',
    source: 'v6 findings; русско-украинская традиция',
  },
];