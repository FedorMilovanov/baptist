import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp, Focus, MapPin, RotateCcw, Users, X } from 'lucide-react';
import { geoMercator, geoPath } from 'd3-geo';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import { feature } from 'topojson-client';
import worldAtlas from 'world-atlas/countries-110m.json';
import { getMapPlaceRecord } from '../data/history/mapPlaces';
import { personProfiles } from '../data/history/persons';
import { useTheme } from './ThemeContext';

interface NodeData {
  id: string;
  label: string;
  group: 'root' | 'origin' | 'ukraine' | 'petersburg' | 'union' | 'modern' | 'split' | 'leader';
  size: number;
  year?: string;
  desc: string;
  isCenter?: boolean;
  x?: number;
  y?: number;
  z?: number;
  geo?: { lon: number; lat: number; altitude?: number };
  stats?: { users: string; year: string; sources: string };
  stages?: { year: string; text: string }[];
}

interface LinkData {
  id: string;
  source: string | NodeData;
  target: string | NodeData;
  label: string;
  desc: string;
}

interface MapSelection {
  kind: 'country' | 'city';
  id: string;
  label: string;
  color: string;
  nodes: string[];
}

const GC: Record<NodeData['group'], string> = {
  root: '#b8860b',
  origin: '#008b8b',
  ukraine: '#d67d00',
  petersburg: '#8a2be2',
  union: '#4b0082',
  modern: '#008b8b',
  split: '#8b0000',
  leader: '#696969',
};

const GL: Record<NodeData['group'], string> = {
  root: 'Центр',
  origin: 'Закавказье',
  ukraine: 'Украина',
  petersburg: 'Петербург',
  union: 'Союзы',
  modern: 'Современность',
  split: 'Разделение',
  leader: 'Личность',
};


const NODES: NodeData[] = [
  {
    id: 'root',
    label: 'Русский баптизм',
    group: 'root',
    size: 30,
    isCenter: true,
    x: 42,
    y: 14,
    z: 18,
    geo: { lon: 37.6, lat: 55.8, altitude: 20 },
    desc: 'ЕХБ сформированы из трёх независимых истоков: Тифлис (1867), Южная Украина (1869), Петербург (1874). Новые находки v6 уточняют роль Павлова, Каргеля и Мазаева.',
    stats: { users: '~144 000 (2020-е)', year: '1867', sources: '3 истока' },
    stages: [
      { year: '1867', text: 'Крещение Воронина — рождение русского баптизма' },
      { year: '1884', text: 'Союз баптистов Южной России и Кавказа' },
      { year: '1909', text: 'ВСЕХ — Всероссийский союз евангельских христиан' },
      { year: '1944', text: 'ВСЕХБ — единый советский союз' },
      { year: '1965', text: 'Раскол: СЦ ЕХБ vs ВСЕХБ' },
      { year: '1992', text: 'РС ЕХБ и ЕАФ ЕХБ после распада СССР' },
    ],
  },
  {
    id: 'trans',
    label: 'Закавказье',
    year: '1867',
    group: 'origin',
    size: 15,
    x: 36,
    y: -32,
    z: 16,
    geo: { lon: 44.8, lat: 41.7, altitude: 18 },
    desc: 'Тифлисский исток. Мартин Кальвейт крестил Никиту Воронина в реке Кура 20.08.1867 — ночью, тайно. Молоканская среда, онкенская модель.',
    stats: { users: 'первая община', year: '1867', sources: 'baptist.org.ru' },
    stages: [
      { year: '1867', text: 'Крещение Воронина Кальвейтом в Куре' },
      { year: '1871', text: 'Крещение В. Павлова и В. Иванова' },
      { year: '1884', text: 'Вхождение в Союз баптистов Ю. России' },
    ],
  },
  {
    id: 'ukr',
    label: 'Южная Украина',
    year: '1869',
    group: 'ukraine',
    size: 15,
    x: -34,
    y: -12,
    z: 14,
    geo: { lon: 31.2, lat: 48.5, altitude: 17 },
    desc: 'Штундистский исток. Ефим Цымбал — первый штундист, принявший баптистское крещение. Украинские крестьяне у немецких колонистов.',
    stats: { users: 'тысячи к 1884', year: '1864/1869', sources: 'rusbaptist.stunda.org' },
    stages: [
      { year: '10.05.1864', text: 'Первая баптистская церковь из немцев на Украине' },
      { year: '1869', text: 'Цымбал — первый штундист, принявший крещение' },
      { year: '1884', text: 'Массовое вхождение в Союз баптистов' },
    ],
  },
  {
    id: 'spb',
    label: 'Петербург',
    year: '1874',
    group: 'petersburg',
    size: 15,
    x: -46,
    y: 30,
    z: 18,
    geo: { lon: 30.3, lat: 59.9, altitude: 20 },
    desc: 'Аристократический исток. Лорд Редсток проповедовал в петербургских салонах. В.А. Пашков организовал движение.',
    stats: { users: 'аристократические круги', year: '1874', sources: 'А.В. Синичкин' },
    stages: [
      { year: '1874', text: 'Проповеди Редстока в петербургских салонах' },
      { year: '1876', text: 'Общество поощрения духовно-нравственного чтения' },
      { year: '1884', text: 'Высылка Пашкова, разгон съезда' },
      { year: '1909', text: 'Проханов создаёт ВСЕХ' },
    ],
  },
  { id: 'vsb', label: 'Союз баптистов', year: '1884', group: 'union', size: 13, x: -10, y: -24, z: 12, geo: { lon: 34.2, lat: 47.8, altitude: 14 }, desc: 'Союз русских баптистов основан в 1884 г. Объединил тифлисский и украинский потоки. Лидер — Д.И. Мазаев.' },
  { id: 'vseh', label: 'ВСЕХ', year: '1909', group: 'union', size: 13, x: -44, y: 20, z: 12, geo: { lon: 30.3, lat: 59.9, altitude: 15 }, desc: 'Всероссийский союз евангельских христиан, сентябрь 1909. Лидер — И.С. Проханов. Параллельно с ВСБ до 1944.' },
  {
    id: 'vsehb',
    label: 'ВСЕХБ',
    year: '1944',
    group: 'union',
    size: 20,
    x: 10,
    y: 4,
    z: 18,
    geo: { lon: 37.6, lat: 55.8, altitude: 20 },
    desc: 'Всесоюзный совет ЕХБ. Создан 26–29.10.1944 в Москве. «Братский вестник» с 01.01.1946.',
    stats: { users: '~530 000 (пик)', year: '1944', sources: '«Братский вестник» №1/1945' },
    stages: [
      { year: '26.10.1944', text: 'Совещание в Москве, создание ВСЕХБ' },
      { year: '01.01.1946', text: 'Первый «Братский вестник»' },
      { year: '1960', text: '«Инструктивное письмо» → причина раскола' },
      { year: '1992', text: 'Реорганизация → РС ЕХБ + ЕАФ' },
    ],
  },
  {
    id: 'sc',
    label: 'СЦ ЕХБ',
    year: '1965',
    group: 'split',
    size: 14,
    x: -4,
    y: -20,
    z: 14,
    geo: { lon: 37.6, lat: 55.8, altitude: 17 },
    desc: 'Совет Церквей ЕХБ, сентябрь 1965. Принципиальный отказ от регистрации. Лидер — Г.К. Крючков. Ныне МСЦ ЕХБ.',
    stages: [
      { year: '1961', text: 'Инициативная группа' },
      { year: '1965', text: 'Создание СЦ ЕХБ' },
      { year: '1970', text: 'Совет родственников узников' },
      { year: '1998', text: 'МСЦ ЕХБ — международный статус' },
    ],
  },
  { id: 'rsehb', label: 'РС ЕХБ', year: '1992', group: 'modern', size: 14, x: 22, y: 2, z: 12, geo: { lon: 37.6, lat: 55.8, altitude: 16 }, desc: 'Российский союз ЕХБ. ~72 000 членов (2020). Зарегистрированный, открытый союз.' },
  { id: 'voronin', label: 'Н. Воронин', year: '1840–1905', group: 'leader', size: 8, x: 50, y: -40, z: 10, geo: { lon: 44.8, lat: 41.7, altitude: 12 }, desc: 'Никита Воронин — первый русский баптист. Молоканин, купец. Крещён Кальвейтом 20.08.1867.' },
  { id: 'pavlov', label: 'В. Павлов', year: '1854–1924', group: 'leader', size: 8, x: 64, y: -42, z: 10, geo: { lon: 44.8, lat: 41.7, altitude: 12 }, desc: 'Василий Павлов — крещён Ворониным в апреле 1871, миссионер Онкена, переводчик «Гамбургского исповедания», председатель Союза баптистов России в 1909.' },
  { id: 'mazaev', label: 'Д. Мазаев', year: '1855–1922', group: 'leader', size: 8, x: -26, y: -44, z: 10, geo: { lon: 36.2, lat: 47.1, altitude: 12 }, desc: 'Дей Мазаев — председатель Союза баптистов России около 20 лет, издатель и меценат, основатель журнала «Баптист».' },
  { id: 'pashkov', label: 'В. Пашков', year: '1834–1902', group: 'leader', size: 8, x: -58, y: 38, z: 10, geo: { lon: 30.3, lat: 59.9, altitude: 12 }, desc: 'Василий Пашков — организатор петербургского пробуждения. Полковник гвардии. Выслан 1884.' },
  { id: 'prokhanov', label: 'И. Проханов', year: '1869–1935', group: 'leader', size: 8, x: -34, y: 25, z: 10, geo: { lon: 30.3, lat: 59.9, altitude: 12 }, desc: 'Иван Проханов — основатель ВСЕХ (1909). Эмигрировал в 1928, умер в Берлине.' },
  { id: 'kargel', label: 'И. Каргель', year: '1849–1937', group: 'leader', size: 8, x: -50, y: 16, z: 10, geo: { lon: 30.3, lat: 59.9, altitude: 12 }, desc: 'Иван Каргель — богослов и связующее звено трёх очагов. Исправление v6: по pravenc.ru крещён Ворониным в 1869, а не Кальвейтом.' },
  { id: 'zhidkov', label: 'Я. Жидков', year: '1885–1966', group: 'leader', size: 8, x: 22, y: 14, z: 10, geo: { lon: 37.6, lat: 55.8, altitude: 12 }, desc: 'Яков Жидков — первый председатель ВСЕХБ (1944–1966).' },
  { id: 'kryuchkov', label: 'Г. Крючков', year: '1926–2007', group: 'leader', size: 8, x: -18, y: -28, z: 10, geo: { lon: 37.6, lat: 55.8, altitude: 12 }, desc: 'Геннадий Крючков — председатель СЦ ЕХБ 1965–2007. Более 12 лет в лагерях.' },
];

const LINKS: LinkData[] = [
  { id: 'l1', source: 'trans', target: 'root', label: 'Тифлисский исток', desc: '1867' },
  { id: 'l2', source: 'ukr', target: 'root', label: 'Украинский исток', desc: '1864/1869' },
  { id: 'l3', source: 'spb', target: 'root', label: 'Петербургский исток', desc: '1874' },
  { id: 'l4', source: 'trans', target: 'vsb', label: 'Образовали', desc: '1884' },
  { id: 'l5', source: 'ukr', target: 'vsb', label: 'Вошли в', desc: '1884' },
  { id: 'l6', source: 'spb', target: 'vseh', label: 'Образовали', desc: '1909' },
  { id: 'l7', source: 'vsb', target: 'vsehb', label: 'Слились в', desc: '1944' },
  { id: 'l8', source: 'vseh', target: 'vsehb', label: 'Слились в', desc: '1944' },
  { id: 'l9', source: 'vsehb', target: 'sc', label: 'Раскол', desc: '1961–1965' },
  { id: 'l10', source: 'vsehb', target: 'rsehb', label: 'Реорганизован', desc: '1992' },
  { id: 'l11', source: 'voronin', target: 'trans', label: 'Основал', desc: 'Тифлис' },
  { id: 'l17', source: 'pavlov', target: 'trans', label: 'Пресвитер', desc: 'Тифлис' },
  { id: 'l18', source: 'pavlov', target: 'vsb', label: 'Председатель', desc: '1909' },
  { id: 'l19', source: 'mazaev', target: 'vsb', label: 'Председатель', desc: '1887–1909' },
  { id: 'l12', source: 'pashkov', target: 'spb', label: 'Организовал', desc: 'СПб' },
  { id: 'l13', source: 'prokhanov', target: 'vseh', label: 'Основал', desc: 'ВСЕХ' },
  { id: 'l14', source: 'zhidkov', target: 'vsehb', label: 'Возглавил', desc: 'ВСЕХБ' },
  { id: 'l15', source: 'kryuchkov', target: 'sc', label: 'Возглавил', desc: 'СЦ ЕХБ' },
  { id: 'l16', source: 'kargel', target: 'spb', label: 'Богослов', desc: 'СПб' },
  { id: 'l20', source: 'kargel', target: 'trans', label: 'Крещение', desc: '1869' },
  { id: 'l21', source: 'kargel', target: 'ukr', label: 'Вилер/Молочна', desc: '1872–1873' },
];

// MAP_HOTSPOTS removed — replaced by real SVG geo layer + CITY_MARKERS CSS glow

const COUNTRY_FOCUS: Record<string, { label: string; color: string; nodes: string[]; labelPoint: [number, number] }> = {
  '643': { label: 'Россия', color: '#b8860b', nodes: ['root', 'vsehb', 'rsehb', 'sc', 'zhidkov', 'kryuchkov', 'spb', 'pashkov', 'prokhanov', 'kargel'], labelPoint: [82, 62] },
  '804': { label: 'Украина', color: '#d67d00', nodes: ['ukr', 'vsb', 'mazaev'], labelPoint: [31.5, 49] },
  '276': { label: 'Германия', color: '#7c3aed', nodes: ['vseh'], labelPoint: [10.5, 51.2] },
  '268': { label: 'Грузия', color: '#008b8b', nodes: ['trans', 'voronin', 'pavlov'], labelPoint: [43.5, 42] },
  '112': { label: 'Беларусь', color: '#696969', nodes: [], labelPoint: [28, 53.5] },
  '616': { label: 'Польша', color: '#696969', nodes: [], labelPoint: [19.5, 52] },
  '398': { label: 'Казахстан', color: '#696969', nodes: [], labelPoint: [68, 48] },
  '792': { label: 'Турция', color: '#696969', nodes: ['trans'], labelPoint: [35, 39.5] },
  '233': { label: 'Эстония', color: '#696969', nodes: [], labelPoint: [25.5, 59] },
  '428': { label: 'Латвия', color: '#696969', nodes: [], labelPoint: [24.5, 57] },
  '440': { label: 'Литва', color: '#696969', nodes: [], labelPoint: [24, 55.5] },
  '642': { label: 'Румыния', color: '#696969', nodes: [], labelPoint: [25, 46] },
  '100': { label: 'Болгария', color: '#696969', nodes: [], labelPoint: [25.5, 42.7] },
  '348': { label: 'Венгрия', color: '#696969', nodes: [], labelPoint: [19.5, 47.2] },
  '203': { label: 'Чехия', color: '#696969', nodes: [], labelPoint: [15.5, 49.8] },
  '752': { label: 'Швеция', color: '#696969', nodes: [], labelPoint: [16, 62] },
  '246': { label: 'Финляндия', color: '#696969', nodes: [], labelPoint: [26, 64] },
};

const CITY_MARKERS = [
  { label: 'Санкт-Петербург', lon: 30.3, lat: 59.9, color: '#8a2be2', nodes: ['spb', 'pashkov', 'prokhanov', 'kargel', 'vseh'] },
  { label: 'Москва', lon: 37.6, lat: 55.8, color: '#b8860b', nodes: ['root', 'vsehb', 'rsehb', 'sc', 'zhidkov', 'kryuchkov'] },
  { label: 'Ново-Васильевка', lon: 36.2, lat: 47.1, color: '#d67d00', nodes: ['ukr', 'vsb', 'mazaev'] },
  { label: 'Тифлис (Тбилиси)', lon: 44.8, lat: 41.7, color: '#008b8b', nodes: ['trans', 'voronin', 'pavlov'] },
  { label: 'Гамбург', lon: 10.0, lat: 53.5, color: '#7c3aed', nodes: ['vseh'] },
];

const ANCHORS: Record<string, { x: number; y: number; z: number; strength?: number }> = {
  root: { x: 0, y: 4, z: 0, strength: 0.022 },
  spb: { x: -68, y: 54, z: 6, strength: 0.018 },
  vseh: { x: 78, y: 50, z: 6, strength: 0.016 },
  trans: { x: 76, y: -22, z: 8, strength: 0.016 },
  ukr: { x: -72, y: -28, z: 8, strength: 0.016 },
  vsb: { x: -12, y: -78, z: 2, strength: 0.016 },
  vsehb: { x: 2, y: -116, z: -2, strength: 0.016 },
  sc: { x: -58, y: -128, z: -8, strength: 0.012 },
  rsehb: { x: 62, y: -126, z: -8, strength: 0.012 },
  voronin: { x: 104, y: -90, z: -14, strength: 0.01 },
  pashkov: { x: -112, y: 28, z: -12, strength: 0.01 },
  pavlov: { x: 108, y: -52, z: -12, strength: 0.01 },
  mazaev: { x: -62, y: -62, z: -12, strength: 0.01 },
  prokhanov: { x: 104, y: 28, z: -12, strength: 0.01 },
  kargel: { x: -110, y: -2, z: -16, strength: 0.01 },
  zhidkov: { x: 34, y: -148, z: -14, strength: 0.01 },
  kryuchkov: { x: -28, y: -154, z: -14, strength: 0.01 },
};

const LABEL_OFFSETS: Record<string, { x: number; y: number; z: number }> = {
  root: { x: 12, y: 2, z: 0 },
  spb: { x: 8, y: 1, z: 0 },
  vseh: { x: 8, y: 1, z: 0 },
  trans: { x: 8, y: -1, z: 0 },
  ukr: { x: 8, y: -1, z: 0 },
  vsb: { x: 8, y: -1, z: 0 },
  vsehb: { x: 9, y: -1, z: 0 },
  sc: { x: 8, y: -1, z: 0 },
  rsehb: { x: 8, y: -1, z: 0 },
  pavlov: { x: 5, y: -1, z: 0 },
  mazaev: { x: 5, y: -1, z: 0 },
};

function resolveNode(input: string | NodeData) {
  return typeof input === 'object' ? input : NODES.find((node) => node.id === input);
}

function makePlaceholderTube(radius: number) {
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 8, 0),
    new THREE.Vector3(0, 16, 0),
  );
  return new THREE.TubeGeometry(curve, 12, radius, 6, false);
}

function makeLinkCurve(start: THREE.Vector3, end: THREE.Vector3) {
  const distance = start.distanceTo(end);
  const middle = start.clone().add(end).multiplyScalar(0.5);
  const tangent = end.clone().sub(start).normalize();
  const base = Math.abs(tangent.dot(new THREE.Vector3(0, 1, 0))) > 0.82
    ? new THREE.Vector3(1, 0, 0)
    : new THREE.Vector3(0, 1, 0);
  const normal = base.sub(tangent.clone().multiplyScalar(base.dot(tangent))).normalize();
  const lift = Math.min(Math.max(distance * 0.16, 8), 32);
  return new THREE.QuadraticBezierCurve3(start, middle.add(normal.multiplyScalar(lift)), end);
}

export default function MindMap3D() {
  const fgRef = useRef<any>(null);
  const lightingRef = useRef<THREE.Group | null>(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [focusNode, setFocusNode] = useState<NodeData | null>(null);
  const [mapMode, setMapMode] = useState(false);
  const [mapSelection, setMapSelection] = useState<MapSelection | null>(null);
  const [mapHover, setMapHover] = useState<MapSelection | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [dims, setDims] = useState({ w: 800, h: 620 });
  const containerRef = useRef<HTMLDivElement>(null);

  const projection = useMemo(() => geoMercator().center([42, 52]).scale(580).translate([600, 340]), []);
  const geoPathGenerator = useMemo(() => geoPath(projection), [projection]);
  const countries = useMemo(() => {
    const atlas = worldAtlas as unknown as { objects: { countries: unknown } };
    return (feature(worldAtlas as any, atlas.objects.countries as any) as any).features as Array<{ id: string | number; properties?: Record<string, unknown> }>;
  }, []);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({ w: containerRef.current.clientWidth, h: Math.min(660, window.innerHeight * 0.78) });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      fgRef.current?.cameraPosition({ x: 0, y: 20, z: 190 }, { x: 0, y: 0, z: 0 }, 900);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const scene = fgRef.current?.scene?.() as THREE.Scene | undefined;
    if (!scene) return;
    if (lightingRef.current) scene.remove(lightingRef.current);

    const lights = new THREE.Group();
    lights.name = 'mindmap-cinematic-lights';
    const ambient = new THREE.AmbientLight(isLight ? 0xffffff : 0xd8d0ff, isLight ? 0.95 : 0.42);
    const key = new THREE.DirectionalLight(0xffffff, isLight ? 1.35 : 1.55);
    key.position.set(-80, 90, 120);
    const rim = new THREE.PointLight(0xd4a857, isLight ? 28 : 42, 260, 1.8);
    rim.position.set(20, 20, 80);
    const cool = new THREE.PointLight(0x4fd1c5, isLight ? 12 : 18, 220, 1.9);
    cool.position.set(90, -20, 60);
    lights.add(ambient, key, rim, cool);
    scene.add(lights);
    lightingRef.current = lights;

    return () => {
      scene.remove(lights);
    };
  }, [isLight]);

  useEffect(() => {
    if (!fgRef.current) return;
    const charge = fgRef.current.d3Force('charge');
    if (charge) charge.strength(-340);
    const link = fgRef.current.d3Force('link');
    if (link) {
      link.distance((l: any) => {
        const sid = typeof l.source === 'object' ? l.source.id : l.source;
        const tid = typeof l.target === 'object' ? l.target.id : l.target;
        if (sid === 'root' || tid === 'root') return 155;
        return 92;
      });
      link.strength(0.22);
    }
    const center = fgRef.current.d3Force('center');
    if (center) center.strength(0.04);
    fgRef.current.d3Force('composition', (alpha: number) => {
      NODES.forEach((node) => {
        const anchor = ANCHORS[node.id];
        if (!anchor) return;
        const live = node as NodeData & { vx?: number; vy?: number; vz?: number };
        const strength = (anchor.strength ?? 0.012) * alpha;
        live.vx = (live.vx ?? 0) + (anchor.x - (node.x ?? anchor.x)) * strength;
        live.vy = (live.vy ?? 0) + (anchor.y - (node.y ?? anchor.y)) * strength;
        live.vz = (live.vz ?? 0) + (anchor.z - (node.z ?? anchor.z)) * strength;
      });
    });
  }, []);

  const handleNodeClick = useCallback((node: NodeData) => {
    const closing = focusNode?.id === node.id;
    setFocusNode(closing ? null : node);
    setMapSelection(null);
    setMapHover(null);
    setExpanded(false);
    if (!fgRef.current) return;
    if (closing) {
      fgRef.current.cameraPosition({ x: 0, y: 20, z: 190 }, { x: 0, y: 0, z: 0 }, 700);
    } else {
      fgRef.current.cameraPosition({ x: (node.x ?? 0) + 55, y: (node.y ?? 0) + 25, z: (node.z ?? 0) + 95 }, node, 700);
    }
  }, [focusNode]);

  const handleMapSelect = useCallback((selection: MapSelection) => {
    setMapSelection(selection);
    setExpanded(false);
    const primaryNode = selection.nodes.map((nodeId) => NODES.find((node) => node.id === nodeId)).find(Boolean);
    setFocusNode(primaryNode ?? null);
    if (primaryNode && fgRef.current) {
      fgRef.current.cameraPosition({ x: (primaryNode.x ?? 0) + 55, y: (primaryNode.y ?? 0) + 25, z: (primaryNode.z ?? 0) + 95 }, primaryNode, 700);
    }
  }, []);

  const handleReset = () => {
    setFocusNode(null);
    setMapSelection(null);
    setMapHover(null);
    setMapMode(false);
    setExpanded(false);
    fgRef.current?.cameraPosition({ x: 0, y: 20, z: 190 }, { x: 0, y: 0, z: 0 }, 900);
  };

  const activeMapNodeIds = mapSelection?.nodes ?? [];
  const relatedLinks = focusNode || activeMapNodeIds.length > 0 ? LINKS.filter((lk) => {
    const sid = typeof lk.source === 'object' ? lk.source.id : lk.source;
    const tid = typeof lk.target === 'object' ? lk.target.id : lk.target;
    if (focusNode && (sid === focusNode.id || tid === focusNode.id)) return true;
    return activeMapNodeIds.includes(sid) || activeMapNodeIds.includes(tid);
  }) : [];

  const personProfile = focusNode ? personProfiles.find((person) => person.id === focusNode.id) : undefined;
  const mapPlaceRecord = mapSelection ? getMapPlaceRecord(`${mapSelection.kind}-${mapSelection.id}`) : undefined;
  const mapHoverRecord = mapHover ? getMapPlaceRecord(`${mapHover.kind}-${mapHover.id}`) : undefined;

  const connectedIds = new Set<string>();
  if (focusNode) {
    connectedIds.add(focusNode.id);
  }
  activeMapNodeIds.forEach((id) => connectedIds.add(id));
  relatedLinks.forEach((lk) => {
    const sid = typeof lk.source === 'object' ? lk.source.id : lk.source;
    const tid = typeof lk.target === 'object' ? lk.target.id : lk.target;
    connectedIds.add(sid);
    connectedIds.add(tid);
  });

  const nodeThreeObject = useCallback((node: NodeData) => {
    const hex = GC[node.group];
    const r = node.size * 0.52;
    const col = new THREE.Color(hex);
    const grp = new THREE.Group();

    // Dim unrelated nodes when something is selected
    const isDimmed = focusNode !== null && !connectedIds.has(node.id);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(r, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: col,
        roughness: 0.08,
        metalness: 0.65,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        transparent: isDimmed,
        opacity: isDimmed ? 0.28 : 1,
      }),
    );
    grp.add(sphere);

    // Inner glow core — like the reference photo's internal light
    if (!isDimmed) {
      const coreR = r * 0.72;
      const coreGeo = new THREE.SphereGeometry(coreR, 32, 32);
      const coreMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide
      });
      grp.add(new THREE.Mesh(coreGeo, coreMat));
    }

    if (!isDimmed) {
      const hl = new THREE.Mesh(
        new THREE.SphereGeometry(r * 0.16, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45 }),
      );
      hl.position.set(-r * 0.3, r * 0.4, r * 0.5);
      grp.add(hl);
    }

    // Orbits for selected node
    if (focusNode?.id === node.id) {
      const ringM = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.42, side: THREE.DoubleSide });
      const orbitA = new THREE.Mesh(new THREE.TorusGeometry(r * 1.25, 0.06, 8, 72), ringM);
      orbitA.rotation.x = Math.PI / 2;
      grp.add(orbitA);

      const orbitB = new THREE.Mesh(new THREE.TorusGeometry(r * 1.42, 0.035, 8, 72), ringM.clone());
      orbitB.rotation.x = Math.PI / 2.7;
      orbitB.rotation.z = Math.PI / 6;
      grp.add(orbitB);

      const orbitC = new THREE.Mesh(new THREE.TorusGeometry(r * 1.56, 0.025, 8, 72), ringM.clone());
      orbitC.rotation.x = Math.PI / 4;
      orbitC.rotation.z = -Math.PI / 4.5;
      grp.add(orbitC);
    }

    // Label
    const lbl = new SpriteText(node.label);
    lbl.color = isLight ? '#1a1a22' : '#f0eeeb';
    lbl.textHeight = node.isCenter ? 5.2 : node.group === 'leader' ? 2.8 : 3.6;
    lbl.fontWeight = node.isCenter ? '800' : '600';
    lbl.fontFace = 'Inter, sans-serif';
    lbl.backgroundColor = 'transparent';
    lbl.padding = 0;
    if (isDimmed) lbl.color = isLight ? 'rgba(26,26,34,0.3)' : 'rgba(240,238,235,0.25)';
    const offset = LABEL_OFFSETS[node.id];
    if (offset) lbl.position.set(r + offset.x, offset.y, offset.z);
    else lbl.position.set(0, -(r + 5.5), 0);
    grp.add(lbl);

    // Year
    if (node.year) {
      const yr = new SpriteText(node.year);
      yr.color = isDimmed ? (isLight ? 'rgba(26,26,34,0.2)' : 'rgba(240,238,235,0.15)') : hex;
      yr.textHeight = node.group === 'leader' ? 2.0 : 2.6;
      yr.fontWeight = '600';
      yr.fontFace = 'JetBrains Mono, monospace';
      yr.backgroundColor = 'transparent';
      yr.padding = 0;
      if (offset) yr.position.set(r + offset.x, offset.y - 4.8, offset.z);
      else yr.position.set(0, -(r + 10.5), 0);
      grp.add(yr);
    }

    return grp;
  }, [focusNode, isLight, connectedIds]);

  const linkThreeObject = useCallback((link: LinkData) => {
    const src = resolveNode(link.source);
    const tgt = resolveNode(link.target);
    const srcC = new THREE.Color(GC[src?.group ?? 'root']);
    const tgtC = new THREE.Color(GC[tgt?.group ?? 'root']);
    const blended = srcC.clone().lerp(tgtC, 0.5);
    const isMain = Boolean(src?.isCenter || tgt?.isCenter);
    const isActive = Boolean(focusNode && (focusNode.id === src?.id || focusNode.id === tgt?.id));
    const group = new THREE.Group();

    const coreRadius = isMain ? 0.16 : 0.085;
    const glowRadius = isMain ? 0.38 : 0.22;

    const core = new THREE.Mesh(
      makePlaceholderTube(coreRadius),
      new THREE.MeshBasicMaterial({
        color: blended,
        transparent: true,
        opacity: isActive ? 0.58 : isMain ? 0.34 : 0.2,
        depthWrite: false,
      }),
    );
    group.add(core);

    const glow = new THREE.Mesh(
      makePlaceholderTube(glowRadius),
      new THREE.MeshBasicMaterial({
        color: blended,
        transparent: true,
        opacity: isActive ? 0.035 : isMain ? 0.018 : 0.01,
        depthWrite: false,
        side: THREE.BackSide,
      }),
    );
    group.add(glow);

    const beadMat = new THREE.MeshBasicMaterial({ color: blended, transparent: true, opacity: isActive ? 0.55 : 0.22, depthWrite: false });
    const beadA = new THREE.Mesh(new THREE.SphereGeometry(isMain ? 0.24 : 0.16, 8, 8), beadMat);
    const beadB = new THREE.Mesh(new THREE.SphereGeometry(isMain ? 0.20 : 0.12, 8, 8), beadMat.clone());
    
    // Add "stars" along the curve
    if (isActive || isMain) group.add(beadA, beadB);

    group.userData = { core, glow, beadA, beadB, coreRadius, glowRadius, isActive, isMain };
    return group;
  }, [focusNode]);

  const linkPositionUpdate = useCallback((obj: THREE.Object3D, coords: { start: { x: number; y: number; z: number }; end: { x: number; y: number; z: number } }) => {
    const group = obj as THREE.Group;
    const data = group.userData as {
      core?: THREE.Mesh;
      glow?: THREE.Mesh;
      beadA?: THREE.Mesh;
      beadB?: THREE.Mesh;
      coreRadius?: number;
      glowRadius?: number;
      isActive?: boolean;
    };
    if (!data.core || !data.glow || !data.beadA || !data.beadB || !data.coreRadius || !data.glowRadius) return false;

    const start = new THREE.Vector3(coords.start.x, coords.start.y, coords.start.z);
    const end = new THREE.Vector3(coords.end.x, coords.end.y, coords.end.z);
    if (!Number.isFinite(start.x) || !Number.isFinite(end.x) || start.distanceTo(end) < 0.5) return true;

    const curve = makeLinkCurve(start, end);

    data.core.geometry.dispose();
    data.core.geometry = new THREE.TubeGeometry(curve, 36, data.coreRadius, 6, false);
    data.glow.geometry.dispose();
    data.glow.geometry = new THREE.TubeGeometry(curve, 24, data.glowRadius, 6, false);

    // Animate "beads" to look like moving energy/stars
    const time = Date.now() * 0.001;
    const speed = data.isActive ? 0.6 : 0.3;
    const tA = (time * speed) % 1;
    const tB = (time * speed + 0.5) % 1;
    
    data.beadA.position.copy(curve.getPoint(tA));
    data.beadB.position.copy(curve.getPoint(tB));
    
    // Subtle pulsing of energy beads
    const pulse = 0.8 + Math.sin(time * 4) * 0.2;
    data.beadA.scale.set(pulse, pulse, pulse);
    data.beadB.scale.set(pulse, pulse, pulse);

    group.position.set(0, 0, 0);
    group.rotation.set(0, 0, 0);
    group.scale.set(1, 1, 1);
    return true;
  }, []);

  const bg = isLight ? '#f5f0eb' : '#06060c';

  return (
    <section id="mindmap" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs text-brand-gold">3D Карта</div>
          <h2 className="section-title">Интерактивная 3D-карта</h2>
          <p className="section-subtitle mx-auto max-w-3xl">Нажмите на узел для подробностей. Перетащите для вращения, скролл — масштаб.</p>
        </motion.div>

        <div ref={containerRef} className="relative overflow-hidden rounded-3xl border border-white/10" style={{ background: bg, minHeight: 560 }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "url('/images/eurasia-night-map.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: isLight ? 0.16 : 0.28,
              filter: isLight ? 'saturate(0.7) contrast(0.82)' : 'saturate(0.82) contrast(0.88) brightness(0.72)',
            }}
          />
          <svg className={`${mapMode ? 'pointer-events-auto' : 'pointer-events-none'} absolute inset-0 h-full w-full`} viewBox="0 0 1200 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <filter id="countryGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="countryGlowSoft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              {countries.map((geo) => {
                const id = String(geo.id).padStart(3, '0');
                const focus = COUNTRY_FOCUS[id];
                const hasFocus = Boolean(focus);
                const exact = Boolean(focusNode && focus?.nodes.includes(focusNode.id));
                const connected = Boolean(focusNode && focus?.nodes.some((nodeId) => connectedIds.has(nodeId)));
                const relevant = Boolean(hasFocus && (!focusNode || exact || connected));
                const pathD = geoPathGenerator(geo as any) ?? undefined;
                if (!pathD) return null;

                let fillColor = 'rgba(255,255,255,0.012)';
                let strokeColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
                let strokeW = 0.35;
                let op = isLight ? 0.5 : 0.45;
                let filterAttr: string | undefined;

                if (relevant && focus) {
                  fillColor = exact ? `${focus.color}38` : connected ? `${focus.color}22` : `${focus.color}14`;
                  strokeColor = focus.color;
                  strokeW = exact ? 1.6 : connected ? 1.0 : 0.6;
                  op = exact ? 0.92 : connected ? 0.68 : 0.42;
                  filterAttr = exact ? 'url(#countryGlow)' : connected ? 'url(#countryGlowSoft)' : undefined;
                } else if (hasFocus && !focusNode) {
                  fillColor = `${focus!.color}10`;
                  strokeColor = `${focus!.color}55`;
                  strokeW = 0.55;
                  op = 0.52;
                }

                return (
                  <path
                    key={id}
                    d={pathD}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={strokeW}
                    opacity={op}
                    filter={filterAttr}
                    className="transition-all duration-500"
                    style={{ cursor: mapMode && focus?.nodes.length ? 'pointer' : 'default', pointerEvents: mapMode && focus?.nodes.length ? 'auto' : 'none' }}
                    onClick={(event) => {
                      if (!mapMode || !focus?.nodes.length) return;
                      event.stopPropagation();
                      handleMapSelect({ kind: 'country', id, label: focus.label, color: focus.color, nodes: focus.nodes });
                    }}
                    onMouseEnter={() => {
                      if (mapMode && focus?.nodes.length) setMapHover({ kind: 'country', id, label: focus.label, color: focus.color, nodes: focus.nodes });
                    }}
                    onMouseLeave={() => {
                      if (mapMode) setMapHover(null);
                    }}
                  />
                );
              })}
            </g>
            <g>
              {Object.entries(COUNTRY_FOCUS).map(([id, country]) => {
                const projected = projection(country.labelPoint);
                if (!projected) return null;
                const exact = Boolean(focusNode && country.nodes.includes(focusNode.id));
                const connected = Boolean(focusNode && country.nodes.some((nodeId) => connectedIds.has(nodeId)));
                if (focusNode && !exact && !connected) return null;
                return (
                  <text
                    key={id}
                    x={projected[0]}
                    y={projected[1]}
                    fill={country.color}
                    opacity={exact ? 0.9 : 0.48}
                    fontSize={exact ? 16 : 12}
                    fontWeight="700"
                    letterSpacing="0.04em"
                    style={{ textShadow: '0 0 12px rgba(0,0,0,0.9)' }}
                  >
                    {country.label}
                  </text>
                );
              })}
              {CITY_MARKERS.map((city) => {
                const projected = projection([city.lon, city.lat]);
                if (!projected) return null;
                const exact = Boolean(focusNode && city.nodes.includes(focusNode.id));
                const connected = Boolean(focusNode && city.nodes.some((nodeId) => connectedIds.has(nodeId)));
                const visible = !focusNode || exact || connected;
                return (
                  <g
                    key={city.label}
                    opacity={visible ? (exact ? 1 : 0.55) : 0.12}
                    style={{ cursor: mapMode ? 'pointer' : 'default', pointerEvents: mapMode ? 'auto' : 'none' }}
                    onClick={(event) => {
                      if (!mapMode) return;
                      event.stopPropagation();
                      handleMapSelect({ kind: 'city', id: city.label, label: city.label, color: city.color, nodes: city.nodes });
                    }}
                    onMouseEnter={() => {
                      if (mapMode) setMapHover({ kind: 'city', id: city.label, label: city.label, color: city.color, nodes: city.nodes });
                    }}
                    onMouseLeave={() => {
                      if (mapMode) setMapHover(null);
                    }}
                  >
                    <circle cx={projected[0]} cy={projected[1]} r={exact ? 8 : 5} fill={city.color} opacity="0.2" />
                    <circle cx={projected[0]} cy={projected[1]} r={exact ? 3.4 : 2.2} fill={city.color} />
                    {(exact || !focusNode) && (
                      <text x={projected[0] + 8} y={projected[1] - 6} fill={city.color} fontSize="11" fontWeight="700">
                        {city.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: isLight
                ? 'linear-gradient(90deg, rgba(250,248,245,0.6), rgba(250,248,245,0.2) 45%, rgba(250,248,245,0.55))'
                : 'radial-gradient(circle at 52% 46%, rgba(5,5,10,0.18), rgba(3,3,7,0.72) 72%), linear-gradient(90deg, rgba(3,3,7,0.78), rgba(3,3,7,0.22) 48%, rgba(3,3,7,0.72))',
            }}
          />
          {mapMode && (
            <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-2xl border border-brand-gold/30 bg-black/45 px-4 py-3 text-xs text-white/70 backdrop-blur-xl">
              <p className="font-semibold text-brand-gold">Режим карты</p>
              <p className="mt-1 max-w-[260px] leading-5">Кликайте по подсвеченным странам или городам. 3D-шары останутся резиновыми, но связанные узлы подсветятся.</p>
            </div>
          )}
          {/* City glow spots — CSS layer behind WebGL */}
          {CITY_MARKERS.map((city) => {
            const projected = projection([city.lon, city.lat]);
            if (!projected) return null;
            const exact = Boolean(focusNode && city.nodes.includes(focusNode.id));
            const connected = Boolean(focusNode && city.nodes.some((nid) => connectedIds.has(nid)));
            const visible = !focusNode || exact || connected;
            const size = exact ? 280 : connected ? 200 : 140;
            const pctX = (projected[0] / 1200) * 100;
            const pctY = (projected[1] / 650) * 100;
            return (
              <div key={city.label} className="pointer-events-none absolute transition-opacity duration-500" style={{ left: `${pctX}%`, top: `${pctY}%`, transform: 'translate(-50%, -50%)', opacity: visible ? (exact ? 0.62 : connected ? 0.32 : 0.16) : 0.04 }}>
                <div style={{ width: size, height: size * 0.7, borderRadius: '50%', background: `radial-gradient(ellipse at center, ${city.color}44 0%, ${city.color}18 36%, transparent 72%)`, filter: 'blur(16px)', mixBlendMode: 'screen' }} />
              </div>
            );
          })}
          {!isLight && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(196,166,126,0.03) 0%, transparent 62%)',
              }}
            />
          )}

          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap justify-center gap-2">
            {CITY_MARKERS.map((city) => (
              <button
                key={city.label}
                onClick={() => {
                  setMapMode(true);
                  handleMapSelect({ kind: 'city', id: city.label, label: city.label, color: city.color, nodes: city.nodes });
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[9px] backdrop-blur-sm transition hover:bg-black/60"
                style={{
                  borderColor: mapSelection?.id === city.label ? `${city.color}95` : `${city.color}35`,
                  color: city.color,
                  boxShadow: mapSelection?.id === city.label ? `0 0 18px ${city.color}22` : undefined,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: city.color }} />
                {city.label}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {mapMode && (mapSelection || mapHover) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="absolute bottom-16 left-5 z-30 w-[min(360px,calc(100%-2.5rem))] rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl"
                style={{
                  background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(5,5,10,0.88)',
                  borderColor: `${(mapSelection ?? mapHover)!.color}55`,
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: (mapSelection ?? mapHover)!.color }} />
                    <h4 className="text-sm font-black">{(mapSelection ?? mapHover)!.label}</h4>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wide opacity-50">
                    {mapSelection ? 'выбрано' : 'наведение'}
                  </span>
                </div>
                <p className="text-xs leading-5 opacity-70">
                  {(mapSelection ? mapPlaceRecord : mapHoverRecord)?.summary ?? 'Выберите страну или город, чтобы увидеть историческую связку с 3D-узлами.'}
                </p>
                {(mapSelection ? mapPlaceRecord : mapHoverRecord) && (
                  <div className="mt-3 space-y-1.5">
                    {(mapSelection ? mapPlaceRecord : mapHoverRecord)!.historicalNotes.slice(0, 3).map((note) => (
                      <p key={note} className="flex gap-2 text-[11px] leading-4 opacity-65">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: (mapSelection ?? mapHover)!.color }} />
                        {note}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
            <button
              onClick={() => {
                setMapMode((value) => !value);
                setMapHover(null);
              }}
              className="rounded-full border border-white/15 bg-black/45 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white/70 backdrop-blur-sm transition hover:bg-white/10"
              title="Переключить режим клика по карте"
              style={mapMode ? { color: '#c4a67e', borderColor: 'rgba(196,166,126,0.45)' } : undefined}
            >
              {mapMode ? 'Карта' : 'Граф'}
            </button>
            <button onClick={handleReset} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-sm transition hover:bg-white/10" title="Сбросить">
              <RotateCcw size={15} />
            </button>
            {focusNode && (
              <button onClick={() => fgRef.current?.zoomToFit(600, 80)} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/45 text-white/70 backdrop-blur-sm transition hover:bg-white/10" title="Центрировать">
                <Focus size={15} />
              </button>
            )}
          </div>

          <ForceGraph3D
            ref={fgRef}
            graphData={{ nodes: NODES as any[], links: LINKS as any[] }}
            width={dims.w}
            height={dims.h}
            backgroundColor="rgba(0,0,0,0)"
            nodeThreeObject={nodeThreeObject as any}
            nodeThreeObjectExtend={false}
            linkThreeObject={linkThreeObject as any}
            linkThreeObjectExtend={false}
            linkPositionUpdate={linkPositionUpdate as any}
            linkWidth={0}
            linkDirectionalParticles={0}
            linkDirectionalParticleWidth={0}
            linkDirectionalParticleSpeed={0}
            onNodeClick={handleNodeClick as any}
            nodeLabel=""
            d3AlphaDecay={0.018}
            d3VelocityDecay={0.16}
            warmupTicks={70}
            cooldownTicks={260}
            onEngineStop={() => fgRef.current?.zoomToFit(900, 24)}
          />

          <AnimatePresence>
            {focusNode && (
              <motion.div
                key={focusNode.id}
                initial={{ opacity: 0, x: -18, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -18, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                className="absolute left-5 top-5 z-50 flex w-[min(320px,calc(100%-2.5rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl"
                style={{
                  background: isLight ? 'rgba(255,255,255,0.94)' : 'rgba(7,7,12,0.94)',
                  backdropFilter: 'blur(32px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(32px) saturate(190%)',
                  borderColor: isLight ? 'rgba(0,0,0,0.08)' : `${GC[focusNode.group]}55`,
                  boxShadow: `0 24px 80px rgba(0,0,0,0.6), 0 0 0 1.5px ${GC[focusNode.group]}33`,
                }}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />
                <div className="h-[4px] w-full relative" style={{ background: `linear-gradient(90deg, ${GC[focusNode.group]}, ${GC[focusNode.group]}88)` }} />

                <div className="relative flex items-start justify-between gap-3 px-5 pt-4 pb-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-1.5">
                      <MapPin size={11} style={{ color: GC[focusNode.group], flexShrink: 0 }} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] opacity-50">{GL[focusNode.group]}</span>
                    </div>
                    <h3 className="text-[1.1rem] font-black leading-tight">{focusNode.label}</h3>
                    {focusNode.year && <p className="mt-0.5 font-mono text-xs font-semibold" style={{ color: GC[focusNode.group] }}>{focusNode.year}</p>}
                  </div>
                  <button
                    onClick={() => {
                      setFocusNode(null);
                      setExpanded(false);
                    }}
                    className="mt-0.5 shrink-0 rounded-full p-1.5 opacity-35 transition hover:opacity-70"
                    style={{ background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}
                  >
                    <X size={13} />
                  </button>
                </div>

                <div className="mx-5 h-px" style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)' }} />

                <div className="px-5 py-3">
                  <p className={`text-[0.8125rem] leading-[1.65] opacity-78 ${expanded ? '' : 'line-clamp-3'}`}>{focusNode.desc}</p>
                  {focusNode.desc.length > 110 && (
                    <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold opacity-45 transition hover:opacity-75" style={{ color: GC[focusNode.group] }}>
                      {expanded ? <><ChevronUp size={11} />Свернуть</> : <><ChevronDown size={11} />Подробнее</>}
                    </button>
                  )}
                </div>

                {mapSelection && (
                  <>
                    <div className="mx-5 h-px" style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)' }} />
                    <div className="px-5 py-3">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em] opacity-40">Выбрано на карте</p>
                      <div className="rounded-xl border p-3" style={{ borderColor: `${mapSelection.color}44`, background: `${mapSelection.color}10` }}>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full" style={{ background: mapSelection.color }} />
                          <span className="text-sm font-bold" style={{ color: mapSelection.color }}>{mapSelection.label}</span>
                        </div>
                        <p className="text-[11px] leading-5 opacity-65">
                          {mapPlaceRecord?.summary ?? `Подсвечены связанные узлы: ${mapSelection.nodes.map((nodeId) => NODES.find((node) => node.id === nodeId)?.label).filter(Boolean).join(', ')}.`}
                        </p>
                        {mapPlaceRecord && (
                          <div className="mt-2 space-y-1.5">
                            {mapPlaceRecord.historicalNotes.slice(0, expanded ? mapPlaceRecord.historicalNotes.length : 2).map((note) => (
                              <p key={note} className="flex gap-2 text-[10px] leading-4 opacity-65">
                                <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ background: mapSelection.color }} />
                                {note}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {focusNode.stats && (
                  <>
                    <div className="mx-5 h-px" style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)' }} />
                    <div className="flex gap-5 px-5 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <Users size={11} className="opacity-40" />
                        <span className="text-[11px] opacity-65">{focusNode.stats.users}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} className="opacity-40" />
                        <span className="text-[11px] opacity-65">{focusNode.stats.year}</span>
                      </div>
                    </div>
                  </>
                )}

                {personProfile && (
                  <>
                    <div className="mx-5 h-px" style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)' }} />
                    <div className="px-5 py-3">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em] opacity-40">Досье v6</p>
                      <div className="space-y-2">
                        {personProfile.highlights.slice(0, expanded ? personProfile.highlights.length : 2).map((highlight) => (
                          <p key={highlight} className="flex gap-2 text-[11px] leading-5 opacity-70">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GC[focusNode.group] }} />
                            {highlight}
                          </p>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {relatedLinks.length > 0 && (
                  <>
                    <div className="mx-5 h-px" style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)' }} />
                    <div className="px-5 py-2.5">
                      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em] opacity-40">Связи</p>
                      <div className="flex flex-wrap gap-1">
                        {relatedLinks.slice(0, expanded ? relatedLinks.length : 4).map((lk) => {
                          const sid = typeof lk.source === 'object' ? lk.source.id : lk.source;
                          const tid = typeof lk.target === 'object' ? lk.target.id : lk.target;
                          const otherId = sid === focusNode.id ? tid : sid;
                          const other = NODES.find((n) => n.id === otherId);
                          if (!other) return null;
                          return (
                            <button
                              key={lk.id}
                              onClick={() => handleNodeClick(other)}
                              className="rounded-full border px-2 py-0.5 text-[10px] font-medium transition hover:opacity-100"
                              style={{
                                borderColor: `${GC[other.group]}60`,
                                color: GC[other.group],
                                background: `${GC[other.group]}12`,
                                opacity: 0.8,
                              }}
                            >
                              {other.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {expanded && focusNode.stages && (
                  <>
                    <div className="mx-5 h-px" style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)' }} />
                    <div className="px-5 py-3">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em] opacity-40">Ключевые этапы</p>
                      <div className="space-y-1.5">
                        {focusNode.stages.map((s) => (
                          <div key={s.year} className="flex items-start gap-2.5 text-[11px]">
                            <span className="mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: GC[focusNode.group] }} />
                            <div>
                              <span className="font-mono font-semibold" style={{ color: GC[focusNode.group] }}>{s.year} </span>
                              <span className="opacity-65">{s.text}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {expanded && personProfile && (
                  <>
                    <div className="mx-5 h-px" style={{ background: isLight ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)' }} />
                    <div className="px-5 py-3">
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em] opacity-40">Биографическая хронология</p>
                      <div className="space-y-1.5">
                        {personProfile.chronology.slice(0, 6).map((item) => (
                          <div key={`${personProfile.id}-${item.year}`} className="text-[11px] leading-5">
                            <span className="font-mono font-semibold" style={{ color: GC[focusNode.group] }}>{item.year}</span>
                            <span className="opacity-65"> — {item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
