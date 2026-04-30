export const graphNodeLabels: Record<string, string> = {
  root: 'Русский баптизм',
  trans: 'Закавказье',
  ukr: 'Южная Украина',
  spb: 'Петербург',
  vsb: 'Союз баптистов',
  vseh: 'ВСЕХ',
  vsehb: 'ВСЕХБ',
  sc: 'СЦ ЕХБ',
  rsehb: 'РС ЕХБ',
  voronin: 'Н. Воронин',
  pavlov: 'В. Павлов',
  mazaev: 'Д. Мазаев',
  pashkov: 'В. Пашков',
  prokhanov: 'И. Проханов',
  kargel: 'И. Каргель',
  zhidkov: 'Я. Жидков',
  kryuchkov: 'Г. Крючков',
};

export function getGraphNodeLabel(id: string) {
  return graphNodeLabels[id] ?? id;
}