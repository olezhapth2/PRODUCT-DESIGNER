import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'ru';

interface ProjectData {
  num: string;
  category: string;
  name: string;
  tag?: string;
  metrics: string[];
  task: string;
  whatWasDone: string;
  result: string;
  role: string;
  duration: string;
  team: string;
  images: { col1Top: string; col1Bottom: string; col2: string };
  notionUrl: string;
}

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations.en;
}

const translations = {
  en: {
    nav: ['Work', 'About', 'Services', 'Contact'],
    heroHeading: 'Designer',
    heroName: 'Oleg Devyatov',
    heroTagline: 'Senior Product Designer. UX strategy, design systems, AI workflows. I ship full-cycle products and measure what changes.',
    contactMe: 'Get in touch',
    aboutHeading: 'About me',
    aboutText: "9 years in product design. UX strategy, design systems, AI-augmented workflows. I've run full-cycle products — from hypothesis to post-launch metrics. Built internal tools that cut team overhead by hundreds of hours. Based in Bangkok. Open to remote.",
    servicesHeading: 'Services',
    services: [
      { name: 'Product Thinking', desc: 'Outcomes, not screens. I work from JTBD and CJM through to Impact Mapping and roadmap prioritization via RICE/ICE — co-owned with PM, not handed off.' },
      { name: 'UX Research', desc: "Marketing background, designer's instincts. Qualitative interviews, usability tests, 100+ A/B experiments shipped." },
      { name: 'Design Systems', desc: 'One component library powering 20+ products simultaneously. Tokens, Atomic Design, documented states. New brand live in under a day — handoff to dev down 60%.' },
      { name: 'AI-Augmented Workflow', desc: 'Cursor agents, n8n automations, generative models. Not experiments — production pipelines used daily.' },
      { name: 'Agentive UX', desc: "Designed in ShugarAi: when AI acts on the user's behalf, the interface must stay legible, interruptible, and safe to fail." },
    ],
    projectsHeading: 'Projects',
    task: 'Task',
    whatWasDone: 'What was done',
    result: 'Result',
    role: 'Role',
    duration: 'Duration',
    team: 'Team',
    projects: [
      {
        num: '01', category: '2022–2025 — Lead Product Designer', name: 'Gate19',
        metrics: ['+8% checkout conversion', '−60% handoff time', '<7 days new product UI'],
        task: 'If we unify 20+ partner product interfaces into one design system, handoff time drops and checkout conversion grows — because ops teams stop context-switching between inconsistent UIs.',
        whatWasDone: 'Affiliate platform, 20+ products on one system. Designed everything from acquisition pages to dense ops dashboards.',
        result: '+8% checkout conversion after A/B. New product UI in under 7 days. System adopted across all partner products.',
        role: '', duration: '3 years · 4 designers, 8 engineers', team: '',
        images: { col1Top: '/images/Gate19 col1 Top.png', col1Bottom: '/images/Gate19 col1 Botton.png', col2: '/images/Gate19 col2.gif' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '02', category: '2022–2025 — Senior Product Designer', name: 'JAVHD', tag: 'Adult SaaS Platform',
        metrics: ['+12% trial-to-paid', '100+ landing hypotheses', '50+ payment gateways'],
        task: 'If we gamify the onboarding funnel and localize across 5+ markets, trial-to-paid conversion grows — because users reach a value moment before the paywall.',
        whatWasDone: 'Mature SaaS video platform. Redesigned onboarding with light gamification. 100+ landing variants tested, each with an explicit conversion hypothesis.',
        result: '+12% trial-to-paid. 100+ landing experiments shipped. 50+ payment gateways integrated across 5+ markets.',
        role: '', duration: '3 years · solo design, cross-functional team', team: '',
        images: { col1Top: '/images/Jav col1 Top.png', col1Bottom: '/images/Jav col1 Botton.png', col2: '/images/Jav col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '03', category: '2023–2025 — Lead Product Designer', name: 'ShugarAi', tag: 'AI-Generation · Adult',
        metrics: ['+27% WoW retention', '+19% session length', '10K+ creatives tested'],
        task: 'If users can direct AI character behavior in real time, engagement metrics grow — because interactive agency beats passive content consumption.',
        whatWasDone: 'AI character generation product. Designed full UX of generation cycles — onboarding through a character guide, social gallery for retention loop, real-time agent control UX.',
        result: '+27% WoW return visits. +19% session length. 10K+ creatives tested across acquisition channels.',
        role: '', duration: '2 years · 3 designers, ML team', team: '',
        images: { col1Top: '/images/shugar col1 Top.png', col1Bottom: '/images/shugar col1 Botton.png', col2: '/images/shugar col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '04', category: '2022–2025 — Product Designer', name: 'Corgday',
        metrics: ['−40% manual follow-up', '−28% salary queue time', '10+ HR teams'],
        task: 'If we rebuild the salary exception queue around the actual triage workflow — not the database schema — processing time drops because HR stops switching between tabs to gather context per case.',
        whatWasDone: 'HR CRM for multi-company holding. Rebuilt IA around real HR workflows. Added Slack alerts for priority exceptions. Contextual actions in-row — no screen switching per case.',
        result: '−40% manual follow-up across the holding. −28% median salary queue time.',
        role: '', duration: '3 years · solo design, ops stakeholders', team: '',
        images: { col1Top: '/images/Corgday col1 Top.png', col1Bottom: '/images/Corgday col1 Botton.png', col2: '/images/Corgday col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '05', category: '2022–2023 — Senior Product Designer', name: 'White Label', tag: 'Multi-tenant SaaS',
        metrics: ['5+ brands', '1 codebase', '−70% per-brand setup time'],
        task: 'If we separate structural tokens from brand tokens, new brands onboard in days — not weeks — because 90% of setup time was manual repetition of what already existed.',
        whatWasDone: 'White-label UX architecture: theming engine, brand token system, multi-tenant dashboard. Component library that adapts per client without touching the structure.',
        result: '5+ brands on one codebase. −70% per-brand setup time. Brand onboarding in under a day.',
        role: '', duration: '2 years · 2 designers, 5 engineers', team: '',
        images: { col1Top: '/images/Whitelable col1 Top.png', col1Bottom: '/images/Whitelable col1 Botton.png', col2: '/images/Whitelable col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '06', category: '2023–2025 — Creative Direction, Brand, Web', name: 'PNB Agency',
        metrics: ['pnb.agency', 'Vibecode v2', 'AI-generated → hand-finished'],
        task: 'If an agency site sells through case results — not service lists — high-intent leads convert better, because creative buyers already know what they need.',
        whatWasDone: 'Brand positioning, site architecture, visual language — from scratch. v1 launched, then v2 as a vibecode experiment: layouts AI-generated, refined by hand, the site itself becomes the demo.',
        result: 'One site, two jobs: selling to clients and screening candidates. v2 became a filter — people who got excited by it were worth hiring.',
        role: '', duration: '2 years · solo', team: '',
        images: { col1Top: '/images/PNB col1 Top.png', col1Bottom: '/images/PNB col1 Botton.png', col2: '/images/PNB col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '07', category: '2022–2025 — Design Lead', name: 'MiraiTech',
        metrics: ['~30 brand identities', '~100 logo directions', 'AI creative pipeline'],
        task: 'If partners inherit structural design tokens but control their own brand layer, we can run 30+ brands in parallel without a designer in every routine asset request.',
        whatWasDone: "Designed White Paper on AI Ethics (ethics.a-ai.ru) — longform architecture for audiences from policymakers to practitioners. Designed Adxad ad platform for B2B self-qualification without sales. Built the holding's shared AI creative pipeline: n8n, generative models, review queues for consistent quality at scale.",
        result: '~30 brand identities and ~100 logo directions over 3 years. Each delivered as a self-service kit. AI pipeline later connected to White Label as the publishing step.',
        role: '', duration: '3 years · design lead, cross-functional', team: '',
        images: { col1Top: '/images/Miraitech Top.png', col1Bottom: '/images/Miraitech col1 Botton.png', col2: '/images/Miraitech col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
    ],
    liveProject: 'Full Project',
    letsTalk: 'Open to work',
    footerDesc: 'Looking for senior product design roles or design systems consulting. B2B SaaS, iGaming, EdTech, Affiliate-tech. Bangkok-based, remote-first.',
    copyright: '© 2026 Oleg Devyatov',
    footerCardCaption: 'Built with OpenCode',
  },
  ru: {
    nav: ['Работы', 'Обо мне', 'Услуги', 'Контакт'],
    heroHeading: 'Дизайнер',
    heroName: 'Олег Девятов',
    heroTagline: 'Старший продуктовый дизайнер. UX-стратегия, дизайн-системы, AI-инструменты. Реализую полный цикл продукта и замеряю результат.',
    contactMe: 'Написать',
    aboutHeading: 'Обо мне',
    aboutText: '9 лет в продуктовом дизайне. UX-стратегия, дизайн-системы, AI-инструменты. Веду продукты полного цикла — от гипотезы до замера после релиза. Строил внутренние инструменты, которые срезали накладные расходы команды на сотни часов. Базируюсь в Бангкоке. Открыт к удалённой работе.',
    servicesHeading: 'Услуги',
    services: [
      { name: 'Продуктовое мышление', desc: 'Результат важнее экрана. Работаю от JTBD и CJM через Impact Mapping до приоритизации роадмапа через RICE/ICE — совместно с PM, а не по брифу.' },
      { name: 'UX-исследования', desc: 'Маркетинговый бэкграунд, дизайнерский инстинкт. Качественные интервью, юзабилити-тесты, 100+ A/B-экспериментов в продакшне.' },
      { name: 'Дизайн-системы', desc: 'Одна библиотека компонентов на 20+ параллельных продуктов. Токены, Atomic Design, задокументированные состояния. Новый бренд в продакшне меньше чем за день — передача в разработку минус 60%.' },
      { name: 'AI-интеграция', desc: 'Агенты Cursor, автоматизации n8n, генеративные модели. Не эксперименты — продакшн-пайплайны, которые работают каждый день.' },
      { name: 'Агентный UX', desc: 'Реализовано в ShugarAi: когда AI действует за пользователя, интерфейс должен оставаться читаемым, прерываемым и безопасным при ошибке.' },
    ],
    projectsHeading: 'Проекты',
    task: 'Задача',
    whatWasDone: 'Что сделали',
    result: 'Результат',
    role: 'Роль',
    duration: 'Длительность',
    team: 'Команда',
    projects: [
      {
        num: '01', category: '2022–2025 — Ведущий продакт-дизайнер', name: 'Gate19',
        metrics: ['+8% конверсия чекаута', '−60% время передачи', '<7 дней UI нового продукта'],
        task: 'Если унифицировать интерфейсы 20+ партнёрских продуктов в одну дизайн-систему, время передачи упадёт, а конверсия чекаута вырастет — потому что операционные команды перестанут переключаться между несогласованными UI.',
        whatWasDone: 'Партнёрская платформа, 20+ продуктов на одной системе. Делал всё — от страниц аквизиции до плотных операционных дашбордов.',
        result: '+8% конверсия чекаута после A/B. UI нового продукта за <7 дней. Система внедрена на все партнёрские продукты.',
        role: '', duration: '3 года · 4 дизайнера, 8 инженеров', team: '',
        images: { col1Top: '/images/Gate19 col1 Top.png', col1Bottom: '/images/Gate19 col1 Botton.png', col2: '/images/Gate19 col2.gif' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '02', category: '2022–2025 — Старший продакт-дизайнер', name: 'JAVHD', tag: 'Adult SaaS Platform',
        metrics: ['+12% триал→платный', '100+ гипотез лендингов', '50+ платёжных шлюзов'],
        task: 'Если геймифицировать онбординг-воронку и локализовать для 5+ рынков, конверсия триал→платный вырастет — потому что пользователь достигает ценностного момента до экрана оплаты.',
        whatWasDone: 'Зрелая SaaS-видеоплатформа. Переделал онбординг с лёгкой геймификацией. 100+ вариантов лендингов, каждый — с явной гипотезой конверсии.',
        result: '+12% триал→платный. 100+ лендинг-экспериментов в продакшне. 50+ платёжных шлюзов на 5+ рынках.',
        role: '', duration: '3 года · дизайн соло, кросс-функциональная команда', team: '',
        images: { col1Top: '/images/Jav col1 Top.png', col1Bottom: '/images/Jav col1 Botton.png', col2: '/images/Jav col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '03', category: '2023–2025 — Ведущий продакт-дизайнер', name: 'ShugarAi', tag: 'AI-генерация · Adult',
        metrics: ['+27% WoW retention', '+19% длина сессии', '10K+ креативов протестировано'],
        task: 'Если дать пользователям управлять поведением AI-персонажа в реальном времени, метрики вовлечения вырастут — потому что интерактивная агентность сильнее пассивного потребления контента.',
        whatWasDone: 'Продукт генерации AI-персонажей. Спроектировал полный UX циклов генерации — онбординг через персонажа-гайда, социальная галерея для петли удержания, UX управления агентом в реальном времени.',
        result: '+27% возвратов за неделю. +19% длина сессии. 10K+ креативов протестировано на каналах аквизиции.',
        role: '', duration: '2 года · 3 дизайнера, ML-команда', team: '',
        images: { col1Top: '/images/shugar col1 Top.png', col1Bottom: '/images/shugar col1 Botton.png', col2: '/images/shugar col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '04', category: '2022–2025 — Продакт-дизайнер', name: 'Corgday',
        metrics: ['−40% ручной follow-up', '−28% время в очереди по ЗП', '10+ HR-команд'],
        task: 'Если пересобрать очередь зарплатных исключений вокруг реального сценария триажа, а не схемы базы данных, время обработки упадёт — потому что HR перестанет переключаться между вкладками ради контекста.',
        whatWasDone: 'HR CRM для мультикомпанийного холдинга. Пересобрал IA вокруг реального рабочего процесса HR. Добавил Slack-алерты на приоритетные исключения. Контекстные действия в строке — без перехода на другой экран.',
        result: '−40% ручного follow-up по всему холдингу. −28% медианное время очереди по ЗП.',
        role: '', duration: '3 года · дизайн соло, операционные стейкхолдеры', team: '',
        images: { col1Top: '/images/Corgday col1 Top.png', col1Bottom: '/images/Corgday col1 Botton.png', col2: '/images/Corgday col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '05', category: '2022–2023 — Старший продакт-дизайнер', name: 'White Label', tag: 'Multi-tenant SaaS',
        metrics: ['5+ брендов', '1 кодовая база', '−70% время настройки бренда'],
        task: 'Если разделить структурные токены и брендовые токены, новые бренды онбордятся за дни, а не недели — потому что 90% времени настройки уходило на ручное повторение того, что уже было сделано для предыдущего бренда.',
        whatWasDone: 'Архитектура white-label UX: теминг-движок, система бренд-токенов, мульти-tenant дашборд. Библиотека компонентов, которая адаптируется под клиента без касания структуры.',
        result: '5+ брендов на одной кодовой базе. −70% время настройки нового бренда. Онбординг бренда меньше чем за день.',
        role: '', duration: '2 года · 2 дизайнера, 5 инженеров', team: '',
        images: { col1Top: '/images/Whitelable col1 Top.png', col1Bottom: '/images/Whitelable col1 Botton.png', col2: '/images/Whitelable col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '06', category: '2023–2025 — Креативная дирекция, бренд, веб', name: 'PNB Agency',
        metrics: ['pnb.agency', 'Vibecode v2', 'AI-генерация → ручная доводка'],
        task: 'Если сайт агентства продаёт через результаты кейсов, а не через список услуг, высокоинтентные лиды конвертируются лучше — потому что покупатели агентского креатива уже знают, что им нужно.',
        whatWasDone: 'Бренд-позиционирование, архитектура сайта, визуальный язык — с нуля. Запустил v1, затем v2 как vibecode-эксперимент: макеты сгенерированы AI, доработаны вручную, сайт сам стал демонстрацией.',
        result: 'Один сайт, две задачи: продавал клиентам и скринил кандидатов. v2 стал фильтром — те, кого он зажигал, оказывались теми, кого стоило нанять.',
        role: '', duration: '2 года · соло', team: '',
        images: { col1Top: '/images/PNB col1 Top.png', col1Bottom: '/images/PNB col1 Botton.png', col2: '/images/PNB col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '07', category: '2022–2025 — Дизайн-лид', name: 'MiraiTech',
        metrics: ['~30 фирстилей', '~100 логонаправлений', 'AI-конвейер креативов'],
        task: 'Если партнёры наследуют структурные токены дизайна, но контролируют свой брендовый слой, можно вести 30+ брендов параллельно — без дизайнера в каждом типовом запросе на материалы.',
        whatWasDone: 'Спроектировал Белую книгу этики ИИ (ethics.a-ai.ru) — архитектура лонгрида для аудитории от политиков до практиков. Adxad — рекламная платформа для B2B-самоквалификации без отдела продаж. Построил общий AI-конвейер креативов холдинга: n8n, генеративные модели, очереди ревью для стабильного качества на масштабе.',
        result: '~30 фирстилей и ~100 логонаправлений за 3 года. Каждый поставлялся как self-service кит. AI-конвейер позже подключился к White Label как шаг публикации.',
        role: '', duration: '3 года · дизайн-лид, кросс-функционально', team: '',
        images: { col1Top: '/images/Miraitech Top.png', col1Bottom: '/images/Miraitech col1 Botton.png', col2: '/images/Miraitech col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
    ],
    liveProject: 'Full Project',
    letsTalk: 'Открыт к работе',
    footerDesc: 'Ищу роли продакт-дизайнера или консалтинг по дизайн-системам. B2B SaaS, iGaming, EdTech, Affiliate-tech. Базируюсь в Бангкоке, работаю удалённо.',
    copyright: '© 2026 Олег Девятов',
    footerCardCaption: 'Собрано в OpenCode',
  },
};

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export type { ProjectData };
