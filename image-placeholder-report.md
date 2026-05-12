# Отчёт по изображениям-заглушкам

Проверено `src/data/articles.ts`. Под «заглушками» здесь считаю статьи, где `image` указывает на `images.unsplash.com` вместо локального/кастомного изображения.

## Итог

- Unsplash (временная заглушка): **104**
- local asset / src/assets: **1**
- custom local / public/images/articles: **10**
- всего статей: **115**

Важно: прямых ссылок на `/images/placeholder.svg` или `/images/articles/_unknown.webp` в статьях нет. `/images/placeholder.svg` используется только как fallback в `ImageWithFade.tsx`, а `_unknown.webp` лежит в папке, но сейчас не подключён.

## По категориям

| Категория | Всего | Unsplash-заглушки | Кастомные local | localImages |
|---|---:|---:|---:|---:|
| `cedric-grolet` | 4 | 4 | 0 | 0 |
| `chiffres-gourmands` | 5 | 5 | 0 | 0 |
| `christophe-felder` | 4 | 4 | 0 | 0 |
| `christophe-michalak` | 4 | 4 | 0 | 0 |
| `claire-heitzler` | 4 | 3 | 1 | 0 |
| `cyril-lignac` | 4 | 4 | 0 | 0 |
| `dominique-ansel` | 4 | 3 | 1 | 0 |
| `francois-perret` | 4 | 4 | 0 | 0 |
| `french-cuisine` | 6 | 6 | 0 | 0 |
| `histoire-culinaire` | 18 | 17 | 1 | 0 |
| `jacques-genin` | 4 | 3 | 1 | 0 |
| `mercotte` | 4 | 3 | 1 | 0 |
| `nicolas-paciello` | 4 | 4 | 0 | 0 |
| `nina-metayer` | 4 | 4 | 0 | 0 |
| `philippe-conticini` | 4 | 3 | 1 | 0 |
| `pierre-herme` | 4 | 3 | 1 | 0 |
| `recipes` | 16 | 13 | 2 | 1 |
| `techniques` | 14 | 13 | 1 | 0 |
| `yann-couvreur` | 4 | 4 | 0 | 0 |

## Статьи, где ещё стоят Unsplash-заглушки

| line | id | category | title | image |
|---:|---|---|---|---|
| 38 | `grolet-lemon-yuzu` | `cedric-grolet` | Рецепт знаменитого «Лимона» Седрика Гроле: Пошаговая техника иллюзорного десерта | `https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800` |
| 39 | `herme-ispahan-deep` | `pierre-herme` | Десерт Испахан от Пьера Эрме: Рецепт архитектуры вкуса (роза, личи и малина) | `https://images.unsplash.com/photo-1602351447937-745cb720612f?w=800` |
| 40 | `perret-softness-volume` | `francois-perret` | Перре: объем, мягкость, воздушность и хрупкость как язык десерта | `https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800` |
| 41 | `heitzler-ethical-pastry` | `claire-heitzler` | Клер Эйцлер: сезонность, фермеры и этичная выпечка | `https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=800` |
| 42 | `couvreur-full-course` | `yann-couvreur` | Секреты эклеров и мильфея от Янна Куврера: Разбор техник французской школы | `https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800` |
| 43 | `felder-fundamentals` | `christophe-felder` | Базовые рецепты французской выпечки от Кристофа Фельдера: Тесто и кремы без ошибок | `https://images.unsplash.com/photo-1486427944344-cd3954218dd7?w=800` |
| 44 | `herme-biography` | `pierre-herme` | Пьер Эрме: «Дерзость — вот что сделало меня успешным за 50 лет» | `https://images.unsplash.com/photo-1612203985729-70726954388c?w=800` |
| 45 | `grolet-fruits-full` | `cedric-grolet` | Гроле: фрукты, оболочка, начинка, аэрограф и правдоподобие | `https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800` |
| 46 | `michalak-chocolate-salt` | `christophe-michalak` | Мишалак: шоколад, морская соль и принцип щедрой выпечки | `https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800` |
| 47 | `conticini-praline` | `philippe-conticini` | Пралине Контисини: осмос ореха, сахара и воды | `https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800` |
| 48 | `crookie-conticini` | `french-cuisine` | Crookie: от парижской булочной до мирового тренда | `https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800` |
| 49 | `metayer-secrets` | `nina-metayer` | Нина Метайе: 3 секрета выпечки от лучшего кондитера мира | `https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800` |
| 50 | `metayer-salt-fruit` | `nina-metayer` | Нина Метайе: соль, мусс и уважение к фрукту | `https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800` |
| 51 | `tech-glossary-cap` | `techniques` | Словарь французского кондитера: термины, без которых рецепты не читаются | `https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800` |
| 52 | `grolet-raspberry-rose` | `cedric-grolet` | Raspberry Rose от Гроле: ягода, которую только что сорвали | `https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800` |
| 53 | `ansel-dka` | `dominique-ansel` | DKA: техническая карта kouign-amann от Доминика Анселя | `https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800` |
| 54 | `tech-choux` | `techniques` | Заварное тесто: научная логика и диагностика ошибок | `https://images.unsplash.com/photo-1509365390695-33aee754301f?w=800` |
| 55 | `lignac-equinoxe` | `cyril-lignac` | Сириль Линьяк и Equinoxe: ваниль, speculoos и соленая карамель | `https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800` |
| 56 | `mercotte-anglaise` | `mercotte` | Меркотт: заварной английский крем 85°C, плоский венчик и контроль желтка | `https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800` |
| 57 | `perret-madeleine-18h` | `francois-perret` | Франсуа Перре и мадлен Ritz: 18 часов ради одного укуса | `https://images.unsplash.com/photo-1601000938259-9e92002320cf?w=800` |
| 58 | `mercotte-macarons` | `mercotte` | Меркотт: макарон на итальянской меренге как система контроля | `https://images.unsplash.com/photo-1558326567-98166e232c52?w=800` |
| 59 | `tech-mirror-glaze` | `techniques` | Глазурь miroir без пузырей: температура, блендер и замороженный entremets | `https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800` |
| 60 | `cuisine-sauces` | `french-cuisine` | Материнские соусы на практике: как из пяти баз получить десятки блюд | `https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800` |
| 61 | `paciello-childhood` | `nicolas-paciello` | Николя Пачелло: детские сладости, сделанные с точностью дворца | `https://images.unsplash.com/photo-1605807646983-377bc5a76493?w=800` |
| 62 | `ansel-time` | `dominique-ansel` | Доминик Ансель: время как ингредиент | `https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800` |
| 63 | `tech-feuilletage` | `techniques` | Feuilletage без провалов: почему слоёное тесто не поднимается | `https://images.unsplash.com/photo-1600626336206-82b8371ebdb6?w=800` |
| 64 | `tech-creme-pat` | `techniques` | Заварной крем без комков: гладкий и доваренный | `https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800` |
| 65 | `cuisine-brigade` | `french-cuisine` | Бригада де кухни: иерархия французского ресторана | `https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800` |
| 66 | `michalak-religieuse` | `christophe-michalak` | Карамельная религиёз по Мишалаку: полный рецепт | `https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800` |
| 67 | `couvreur-millefeuille` | `yann-couvreur` | Янн Куврер: мильфей, который едят ложкой | `https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800` |
| 68 | `heitzler-seasonality` | `claire-heitzler` | Клер Эйцлер: почему клубника зимой — это не клубника | `https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800` |
| 69 | `lignac-patisserie-shop` | `cyril-lignac` | La Patisserie Cyril Lignac: как высокая выпечка стала соседской | `https://images.unsplash.com/photo-1620921568790-c1cf8984624c?w=800` |
| 70 | `felder-alsace` | `christophe-felder` | Эльзасская линия Фельдера: kougelhopf, linzer, streusel и школа рук | `https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800` |
| 71 | `paciello-cinqsens` | `nicolas-paciello` | CinqSens Пачелло: магазин как иммерсивная дегустация ингредиента | `https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800` |
| 72 | `ansel-cronut-origin` | `dominique-ansel` | Cronut: как 15 пончиков изменили кондитерский мир | `https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800` |
| 73 | `michalak-fantastik` | `christophe-michalak` | Мишалак и Fantastik: торт высотой 3 см, потому что рот не шире | `https://images.unsplash.com/photo-1511381939415-e44015466834?w=800` |
| 74 | `tech-madeleine` | `techniques` | Madeleine: бугорок не магия, а температурный шок | `https://images.unsplash.com/photo-1558326567-98ae2405596b?w=800` |
| 75 | `cuisine-galette` | `french-cuisine` | Классическая Galette des Rois: миндальный крем, слоёное тесто, традиция | `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800` |
| 76 | `cuisine-sauces-history` | `french-cuisine` | История французских соусов от Карема до Эскоффера | `https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800` |
| 78 | `tech-macaronage` | `techniques` | Техника макаронаж: искусство идеального теста для макарон | `https://images.unsplash.com/photo-1544025162-d76694265947?w=800` |
| 80 | `adam-eclair` | `techniques` | Кристоф Адам: эклер как холст — цвет, глянец и 200 вариаций | `https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800` |
| 82 | `herme-fetish-flavors` | `pierre-herme` | Пьер Эрме: пять вкусов, которые он называет своими | `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800` |
| 83 | `grolet-walnut` | `cedric-grolet` | Гроле: орех грецкий — как сделать жёсткий продукт нежным | `https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800` |
| 84 | `tech-ganache-types` | `techniques` | Три типа ганаша: эмульсия, монте и конфетный — в чём разница | `https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800` |
| 85 | `kayser-sourdough-pastry` | `techniques` | Эрик Кайзер: закваска в кондитерке — хлебная логика в десерте | `https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=800` |
| 86 | `tech-entremets-assembly` | `techniques` | Сборка entremets: порядок слоёв, заморозка и демолдирование без потерь | `https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800` |
| 87 | `conticini-texture-first` | `philippe-conticini` | Контисини: текстура важнее вкуса — почему он так думает | `https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800` |
| 88 | `cuisine-fond-brun` | `french-cuisine` | Фон-де-во и фон-брюн: как французский бульон стал основой всей профессиональной кухни | `https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800` |
| 89 | `metayer-world-best-2023` | `nina-metayer` | Нина Метайе — лучший шеф-кондитер мира 2023: история и работы | `https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800` |
| 90 | `tech-sugar-work` | `techniques` | Работа с сахаром: тянутый, дутый и литой — три языка кондитерского искусства | `https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800` |
| 91 | `tech-mousse-stability` | `techniques` | Мусс без желатина: как аэрация и жир удерживают форму | `https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800` |
| 93 | `genin-autodidact` | `jacques-genin` | Жак Жени: от бойни до лучшего шоколада Парижа — без единого диплома | `https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800` |
| 99 | `conticini-paris-brest-iconic` | `philippe-conticini` | Контисини: Париж-Брест, верин и почему шоколадные крокеты 1986 года изменили французскую кондитерскую | `https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800` |
| 101 | `couvreur-canal-biography` | `yann-couvreur` | Янн Куврер: лис, Канал Сен-Мартен и путь из Eden Rock в Майами | `https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=800` |
| 103 | `perret-ritz-notebook` | `francois-perret` | Перре: «правильный сахар» — мильфей, который носят в руке, и лучшая кондитерская мира | `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800` |
| 107 | `stohrer-1730` | `histoire-culinaire` | Maison Stohrer 1730: старейшая кондитерская Парижа, пережившая Наполеона, революцию и две войны | `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800` |
| 109 | `laduree-1862` | `histoire-culinaire` | Ladurée 1862: как пожар, женщина с идеей и внук с кремом создали символ Парижа | `https://images.unsplash.com/photo-1520218823717-f6e0b8a89d70?w=800` |
| 111 | `careme-first-celebrity-chef` | `histoire-culinaire` | Антонен Карем: первый звёздный шеф, который кормил Наполеона | `https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800` |
| 115 | `escoffier-biography` | `histoire-culinaire` | Огюст Эскоффье: бригада, «Le Guide Culinaire» и кухня как система | `https://images.unsplash.com/photo-1425325948733-7c0ed8ab1d3f?w=800` |
| 117 | `brillat-savarin` | `histoire-culinaire` | Бриллья-Саварен: «Скажи мне, что ты ешь» — философ, написавший гастрономию | `https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800` |
| 119 | `paris-brest-race-dessert` | `histoire-culinaire` | Paris-Brest: десерт для велогонки, который пережил её на 100 лет | `https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800` |
| 121 | `creme-brulee-dispute` | `histoire-culinaire` | Крем-брюле: Франция, Англия и Каталония — кто изобрёл и как это доказать | `https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800` |
| 123 | `patissiers-guild-medieval` | `histoire-culinaire` | Цехи кондитеров: как Средние века создали профессию — и почему их след есть в CAP Pâtissier | `https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800` |
| 125 | `french-classics-origins` | `histoire-culinaire` | Tarte Tatin, баба-о-ром, éclair: 5 французских десертов с реальной историей создания | `https://images.unsplash.com/photo-1521305916504-4a1121188589?w=800` |
| 127 | `eclair-histoire-complete` | `histoire-culinaire` | L'Éclair: от «pain à la duchesse» до L'Éclair de Génie — полная история | `https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=800` |
| 129 | `millefeuille-histoire` | `histoire-culinaire` | Мильфей: 729 слоёв, миф о Наполеоне и Seugnot 1867 | `https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=800` |
| 131 | `opera-gateau-histoire` | `histoire-culinaire` | Гато Опера: Dalloyau против Lenôtre — 30 лет войны за прямоугольник | `https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800` |
| 133 | `buche-noel-histoire` | `histoire-culinaire` | Бюш де Ноэль: от языческого бревна в очаге до ежегодного конкурса шефов | `https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800` |
| 135 | `histoire-tartes-francaises` | `histoire-culinaire` | История французских тартов: дариол XIII века, Бурдалу и тарт Татен из ошибки | `https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800` |
| 137 | `carnaval-culinaire-histoire` | `histoire-culinaire` | Carnaval culinaire: как Карем превратил кухню XIX века в политический театр | `https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=800` |
| 139 | `canele-bordeaux-histoire` | `histoire-culinaire` | Канеле: монахини, вино и медный моул — как Бордо изобрело самое загадочное пирожное Франции | `https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800` |
| 141 | `financier-histoire` | `histoire-culinaire` | Финансье: как монахини Нанси накормили парижских биржевиков — и создали форму золотого слитка | `https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800` |
| 145 | `recipe-tarte-citron-meringuee` | `recipes` | Тарт о ситрон мерингé — тарт с лимонным кремом и итальянской меренгой | `https://images.unsplash.com/photo-1501963422762-3d89bd989eb3?w=800` |
| 160 | `recipe-paris-brest-classique` | `recipes` | Paris-Brest: заварное тесто, пралиновый крем-муслин и хрустящие амандины | `https://images.unsplash.com/photo-1616299908714-e30073a84ca7?w=800` |
| 177 | `mercotte-entremets-system` | `mercotte` | Меркотт: энтреме от А до Я — бисквит, мусс, гляссаж, сборка | `https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800` |
| 180 | `genin-caramel-philosophy` | `jacques-genin` | Жак Жени: философия карамели — горечь, соль, время и терруар | `https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800` |
| 181 | `genin-ganache-craft` | `jacques-genin` | Жак Жени и ганаш: шоколад как продукт терруара, а не бренда | `https://images.unsplash.com/photo-1605811804993-b83e50d69cb2?w=800` |
| 184 | `lignac-far-breton` | `cyril-lignac` | Сириль Линьяк: фар бретон — деревенский десерт с точностью haute pâtisserie | `https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800` |
| 185 | `lignac-kouign-amann` | `cyril-lignac` | Сириль Линьяк и Kouign-Amann: карамельная корка, слоёность и соль Бретани | `https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800` |
| 188 | `heitzler-less-sugar` | `claire-heitzler` | Клер Эйцлер: меньше сахара — больше вкуса. Как убрать 30% без потери удовольствия | `https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800` |
| 192 | `felder-fraisier` | `christophe-felder` | Фрезье Фельдера: классика, которую надо понять до автоматизма | `https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800` |
| 193 | `felder-biscuit-joconde` | `christophe-felder` | Бисквит «Жоконда» по Фельдеру: структура, техника и рулет Opera | `https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800` |
| 196 | `paciello-flan-parisien` | `nicolas-paciello` | Николя Пачелло: flan parisien — философия простоты и техника без права на ошибку | `https://images.unsplash.com/photo-1454944338482-a69bb95894af?w=800` |
| 197 | `paciello-praline-art` | `nicolas-paciello` | Пачелло: пралине как художественный жест — ореховая база, текстура и точность | `https://images.unsplash.com/photo-1592459937017-48d8e50a39d8?w=800` |
| 201 | `michalak-biography` | `christophe-michalak` | Кристоф Мишалак: чемпион мира, Plaza Athénée и принцип щедрого десерта | `https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=800` |
| 205 | `perret-madeleine` | `francois-perret` | Мадлен Перре: beurre noisette, лимонная глазурь и Пруст на витрине Ritz | `https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800` |
| 207 | `metayer-biography` | `nina-metayer` | Нина Метайе: FERRANDI, Ladurée, World's Best Pastry Chef 2023 | `https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800` |
| 211 | `recipe-canele` | `recipes` | Канеле де Бордо: медные формы, пчелиный воск и двухэтапная выпечка | `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800` |
| 213 | `couvreur-biography` | `yann-couvreur` | Янн Куврер: Реймс, Ferrandi, мильфей à la minute и улица Мартир | `https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800` |
| 218 | `recipe-tarte-tatin` | `recipes` | Классический Тарт Татен (Tarte Tatin): Аутентичный французский рецепт с карамелью | `https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800` |
| 220 | `recipe-creme-brulee` | `recipes` | Идеальный Крем-брюле: Классический французский рецепт с ванилью и карамельной корочкой | `https://images.unsplash.com/photo-1588515724527-074a7a56616c?w=800` |
| 222 | `recipe-clafoutis-cerises` | `recipes` | Клафути с вишней: лимузенский рецепт с kirsch и косточками | `https://images.unsplash.com/photo-1535912259830-92ec2c73e0c9?w=800` |
| 224 | `recipe-souffle-chocolat` | `recipes` | Шоколадное суфле: физика горба, меренга и правило 90 секунд | `https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800` |
| 226 | `recipe-madeleines` | `recipes` | Мадлен: beurre noisette, температурный шок и горб — техника Ritz Paris | `https://images.unsplash.com/photo-1548940740-204726a19be3?w=800` |
| 229 | `chiffres-marche-15mlrd` | `chiffres-gourmands` | 15 миллиардов евро и 12 миллионов круассанов в день: анатомия французской кондитерской | `https://images.unsplash.com/photo-1616684000067-36952fde56ec?w=800` |
| 243 | `chiffres-macarons-laduree-herme` | `chiffres-gourmands` | Империи макаронов: как Ladurée и Pierre Hermé превратили миндальное печенье в 100 млн € | `https://images.unsplash.com/photo-1558024920-b41e1887dc32?w=800` |
| 257 | `chiffres-education-mof` | `chiffres-gourmands` | От ученика до MOF: полная экономика французского кондитерского образования | `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800` |
| 271 | `chiffres-luxury-desserts` | `chiffres-gourmands` | Топ-15 самых дорогих десертов Франции 2026: от 18 € за trompe-l'œil до 25 000 € за showpiece | `https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800` |
| 285 | `chiffres-anatomie-gateau` | `chiffres-gourmands` | Анатомия французского торта: entremets, tartes и gâteaux à partager | `https://images.unsplash.com/photo-1612809075774-7e9a9a55d217?w=800` |
| 300 | `recipe-macarons-herme` | `recipes` | Рецепт макарон (Macarons) от Пьера Эрме: Итальянская меренга и секреты идеальной «юбочки» | `https://images.unsplash.com/photo-1558326567-98166e232c52?w=800` |
| 321 | `recipe-croissant-poilane` | `recipes` | Французские круассаны в домашних условиях: Рецепт слоеного теста и техника ламинирования | `https://images.unsplash.com/photo-1607478900766-efe13248b125?w=800` |
| 337 | `recipe-eclairs-adam` | `recipes` | Секреты идеальных эклеров: Заварное тесто без трещин и хрустящий кракелин | `https://images.unsplash.com/photo-1601379321458-71fea421bf28?w=800` |
| 357 | `recipe-opera-dalloyau` | `recipes` | Торт Опера (L'Opéra): Архитектура французской классики и кофейный масляный крем | `https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800` |
| 373 | `recipe-millefeuille-inverser` | `recipes` | Классический Мильфей: Инвертированное слоеное тесто и секрет карамелизации слоев | `https://images.unsplash.com/photo-1612809075774-7e9a9a55d217?w=800` |

## Уже заменены на локальные/кастомные

| line | id | category | title | image |
|---:|---|---|---|---|
| 77 | `recipe-pecan-chocolate-creme-brulee` | `recipes` | Entremets «Пекан, шоколад и крем-брюле»: рецепт от Ogre de Carrouselberg | `localImages.pecan` |
| 81 | `tech-tempering-chocolate` | `techniques` | Темперирование шоколада: кривая, кристаллы и глянец | `/images/articles/tech-tempering-chocolate.webp` |
| 95 | `genin-millefeuille` | `jacques-genin` | Мильфей Жани: «К 14:00 или к 20:00?» — почему сборка решает всё | `/images/articles/genin-millefeuille.webp` |
| 97 | `herme-architecture-taste` | `pierre-herme` | Эрме в Гарварде: лекция об архитектуре вкуса, соль и Испахан | `/images/articles/herme-architecture-taste.webp` |
| 113 | `croissant-history` | `histoire-culinaire` | История круассана: не французский, не из Парижа — и всё равно символ Франции | `/images/articles/croissant-history.webp` |
| 176 | `mercotte-tarte-citron` | `mercotte` | Меркотт: тарт с лимоном — кислота, баланс и идеальная меренга | `/images/articles/mercotte-tarte-citron.webp` |
| 189 | `heitzler-floral-palette` | `claire-heitzler` | Клер Эйцлер: цветочная палитра — жасмин, фиалка, роза в современном десерте | `/images/articles/heitzler-floral-palette.webp` |
| 203 | `ansel-cronut` | `dominique-ansel` | Ансель после Cronut: токийская лаборатория, концепция невозможного десерта и эволюция | `/images/articles/ansel-cronut.webp` |
| 209 | `conticini-paris-brest` | `philippe-conticini` | Контисини: верин, эмоция и La Table d'Anvers — революция, которую не заметили | `/images/articles/conticini-paris-brest.webp` |
| 390 | `recipe-baba-rhum-alain-ducasse` | `recipes` | Ром-баба по рецепту Алена Дюкасса: Идеальное бриошь-тесто и сироп | `/images/articles/recipe-baba-rhum-alain-ducasse.webp` |
| 410 | `recipe-tarte-citron-grolet` | `recipes` | Тарт о Ситрон Седрика Гроле: Запеченный лимонный крем и цукаты | `/images/articles/recipe-tarte-citron-grolet.webp` |