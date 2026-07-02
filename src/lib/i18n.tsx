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
    aboutText: "I went from academic drawing and marketing to product design and AI. That path helps me understand users, business, and technology equally well. I work across the full product lifecycle: research, UX, interfaces, design systems, launches, hypothesis validation, and continuous improvement. From 2023 to 2026 I led design across 20+ products at MiraiTech. By integrating AI workflows into the team's daily process, I improved the efficiency of two major SaaS products. I built an MVP delivery process that cut Time-to-Market from one week to five hours.",
    servicesHeading: 'Services',
    services: [
      { name: 'Product Thinking', desc: 'I studied marketing before opening my first design tool. That background shapes how I think about user behavior, business models and product metrics. Every screen should move users toward the next meaningful action.' },
      { name: 'Design Systems', desc: 'I design, audit, present, document, optimize and evolve design systems. I work closely with clients, developers and AI agents, helping teams prototype faster and ship products more consistently.' },
      { name: 'UX/UI Centric', desc: 'I design user journeys from the first interaction to long-term daily use or a single conversion-focused action. My interfaces focus on clarity, typography and hierarchy. Trust appears when people instantly understand what to do next.' },
      { name: 'AI Native', desc: 'AI has been part of my daily workflow for more than three years. Cursor, Claude Code, ComfyUI, Midjourney, Kling, n8n and many other tools are integrated into my production process. I\'ve built internal AI tools and automation pipelines for both the holding company and the design team.' },
      { name: 'Mentorship', desc: '2020–2024 I mentored product designers through CONTENTED and Skillbox. Thousands of students completed my programs. I helped designers grow faster through structured thinking, product skills, and real-world projects.' },
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
        num: '01', category: '2023–2026 — Senior Product Designer', name: 'Gate19', tag: 'Connectivity Service · B2B SaaS',
        metrics: ['~60% handoff reduction', '<7 days new product UI', '1 codebase, 20+ skins'],
        task: 'A connectivity service serves dozens of corporate clients, each with its own brand. If we build a theming system that swaps visual identity without touching the core product, new clients onboard in days instead of weeks.',
        whatWasDone: 'Designed the full UX from ON/OFF toggle to server selection. Built a skin system where each client gets a custom visual layer on one codebase. Multiple stylistic variations tested across audiences. Backend: optimized server distribution, custom algorithm for best server by location. CI/CD pipeline for updates across all branded versions.',
        result: '~60% reduction in frontend handoff. New product UI in under 7 days. One architecture, 20+ branded skins in parallel.',
        role: 'Senior Product Designer', duration: '3 years', team: '',
        images: { col1Top: 'images/Gate19-col1-Top.png', col1Bottom: 'images/Gate19-col1-Botton.png', col2: 'images/Gate19-col2.gif' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '02', category: '2023–2026 — Senior Product Designer', name: 'JAVHD', tag: 'Adult SaaS · B2C',
        metrics: ['+40% conversion', '+25% mobile registrations', '300+ targeted tours'],
        task: 'A video platform in a competitive niche. Trial-to-paid conversion was flat. If we gamify onboarding and run structured A/B tests across landing variants, conversion grows. Users need to reach value before the paywall.',
        whatWasDone: '100+ landing pages, each tied to a conversion hypothesis. 50+ monetization screens: paywalls, checkout, upsell. Live streaming with real-time chat, token-based interactions. 300+ targeted tours by region and audience. AI promo pipeline cut asset production by ~70%. "Pornojacks" campaign drove 60% higher engagement.',
        result: '+40% overall conversion. +25% mobile registrations. +60% engagement from themed campaigns. +20% high-tier subscriptions.',
        role: 'Senior Product Designer', duration: '3 years', team: '',
        images: { col1Top: 'images/Jav-col1-Top.png', col1Bottom: 'images/Jav-col1-Botton.png', col2: 'images/Jav-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '03', category: '2024–2026 — Senior Product Designer', name: 'ShugarAi', tag: 'AI Platform · B2C',
        metrics: ['+27% WoW retention', '+19% session length', '10K+ creatives tested'],
        task: 'An AI character platform where users create personas and interact via text, voice, and images. If onboarding guides character creation in three steps instead of a blank screen, activation rates improve.',
        whatWasDone: 'Full UX for the generation flow: onboarding via AI character guide, social gallery for retention, real-time agent control. Chat with voice support. 10,000+ ad creatives tested with segmentation and A/B testing. Cloud infrastructure for performance at scale. Encryption for user privacy.',
        result: '+27% week-over-week return visits. +19% average session length. 10K+ creatives tested across platforms.',
        role: 'Senior Product Designer', duration: '2 years', team: '',
        images: { col1Top: 'images/shugar-col1-Top.png', col1Bottom: 'images/shugar-col1-Botton.png', col2: 'images/shugar-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '04', category: '2023–2026 — UX/UI & Research', name: 'Corgday', tag: 'HR Tech · B2B SaaS',
        metrics: ['−40% manual follow-up', '−28% salary queue time', '3-step document generation'],
        task: 'HR teams across a multi-company holding spend hours switching tabs to process salary exceptions. If we rebuild the interface around the actual triage workflow, processing time drops. Employees also need self-service.',
        whatWasDone: 'HR CRM designed mobile-first with adaptive layout. 3-step document generation flow. Self-service for leave requests, sick days, personal records. Contextual actions in-row, no screen switching. IA rebuilt around real HR workflows, not data structure.',
        result: '−40% manual follow-up across the holding. −28% median salary queue processing time.',
        role: 'UX/UI & Research', duration: '3 years', team: '',
        images: { col1Top: 'images/Corgday-col1-Top.png', col1Bottom: 'images/Corgday-col1-Botton.png', col2: 'images/Corgday-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '05', category: '2023–2024 — Lead Product Designer', name: 'White Label', tag: 'Design System · Multi-tenant SaaS',
        metrics: ['5 min brand launch', '1 codebase, unlimited brands', 'AI pipeline integration'],
        task: 'Launching a new branded landing page takes weeks of design and dev work. If we separate structural tokens from brand tokens, a marketing manager can configure and publish a branded page in minutes.',
        whatWasDone: 'Templated landing architecture: hero banners, feature grids, CTA blocks as self-contained sections. Admin panel with visual controls, real-time preview, instant publish, rollback. Page-builder logic designed around how marketers think: sections, not components. Connected to AI creative pipeline as the final step.',
        result: 'Brand launch from days to 5 minutes. One codebase, unlimited brand expressions. Same-day delivery across the portfolio.',
        role: 'Lead Product Designer', duration: '1 year', team: '',
        images: { col1Top: 'images/Whitelable-col1-Top.png', col1Bottom: 'images/Whitelable-col1-Botton.png', col2: 'images/Whitelable-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '06', category: '2024–2026 — Creative Direction, Brand, Web', name: 'PNB Agency', tag: 'Creative Direction · Web',
        metrics: ['AI-generated → hand-finished', 'case-first architecture', 'dual-read: clients + hiring'],
        task: 'An agency site should sell by showing work, not listing services. If visitors arrive with a specific problem, direct-to-case entry points convert better. The site also needed to work as a hiring filter.',
        whatWasDone: 'Case-first architecture with dense visual storytelling. Typography loud at a glance, quiet on close read. Restrained palette, motion for emotional rhythm. Contact CTAs at every scroll depth. v2 rebuilt as vibecode experiment: AI-generated layouts refined by hand. Each section doubled as proof-of-concept.',
        result: 'One site, two jobs: selling to clients and screening candidates. The site became a portfolio piece.',
        role: 'Creative Direction, Brand, Web', duration: '2 years', team: '',
        images: { col1Top: 'images/PNB-col1-Top.png', col1Bottom: 'images/PNB-col1-Botton.png', col2: 'images/PNB-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '07', category: '2023–2026 — UX/UI & Communication Design', name: 'MiraiTech', tag: 'AI Pipeline · Design Systems',
        metrics: ['~30 brand identities', '~100 logo directions', 'AI creative pipeline'],
        task: 'A holding manages 30+ partner brands. If partners inherit structural tokens but control their own brand layer, we run them all in parallel without a designer in every routine request.',
        whatWasDone: 'Tiered theming: partners shared structural tokens, overrode brand layers. ~30 brand styles, ~100 logo directions over three years. Each brand as a self-service kit. AI pipeline: n8n workflows, generative models, review queues. Adxad ad platform for B2B self-qualification. White Paper on AI Ethics.',
        result: '~30 brands and ~100 logos in 3 years, each as a self-service kit. AI pipeline turned mass production into a built-in competency.',
        role: 'UX/UI & Communication Design', duration: '3 years', team: '',
        images: { col1Top: 'images/Miraitech-Top.png', col1Bottom: 'images/Miraitech-col1-Botton.png', col2: 'images/Miraitech-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
    ],
    liveProject: 'About project',
    fullProjects: 'All projects',
    oldPortfolio: 'Old portfolio',
    letsTalk: 'Open to work',
    footerDesc: 'Looking for Senior Product Designer, Lead Product Designer, Staff Product Designer roles and Design Systems Consulting. Interested in AI Products, B2B SaaS, FinTech, Trading Platforms, Gaming, EdTech, Affiliate-tech, Internal Tools and Developer Platforms. Bangkok-based. Remote-first. Open to relocation and international teams.',
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
    aboutText: 'Прошел путь от академического рисунка и маркетинга до продуктового дизайна и AI. Этот путь помогает одинаково хорошо понимать пользователя, бизнес и технологии. Работаю с полным циклом: исследование, UX, интерфейсы, дизайн-системы, запуск, проверка гипотез и развитие продукта. С 2023 по 2026 год отвечал за дизайн 20+ продуктов в MiraiTech. Интегрируя AI-пайплайны в рабочие процессы команды, повысил эффективность двух крупных SaaS-продуктов. Настроил процесс запуска MVP, который сократил Time-to-Market с недели до 5 часов.',
    servicesHeading: 'Услуги',
    services: [
      { name: 'Продуктовое мышление', desc: 'Получил маркетинговое образование раньше, чем открыл первый графический редактор. Поэтому думаю через поведение пользователей, экономику продукта и метрики. Каждый экран должен двигать пользователя к следующему действию.' },
      { name: 'Дизайн-системы', desc: 'Умею: проектировать, анализировать, оформлять, презентовать, брифовать, допродавать, дополнять, оптимизировать, исправлять, делиться с клиентом, разработкой или AI-агентами. Вывожу прототипирование и поддержку продукта на новый уровень.' },
      { name: 'UX/UI centric', desc: 'Проектирую путь пользователя от первого экрана до ежедневного использования продукта или разовой целевой акции. В основном создаю чистые интерфейсы с сильной типографикой. Когда интерфейс помогает принимать решения, он начинает работать на доверие к продукту.' },
      { name: 'AI Native', desc: 'AI ежедневно более трех лет. Cursor, Claude Code, ComfyUI, Midjourney, Kling, n8n и десятки специализированных инструментов. Сам создавал AI-инструменты и цепочки автоматизации для холдинга и дизайн-команды.' },
      { name: 'Менторство', desc: 'С 2020 по 2024 год преподавал продуктовый дизайн в CONTENTED и Skillbox. Тысячи студентов прошли мои программы. Помогал дизайнерам расти быстрее через системный подход, продуктовое мышление и работу с реальными кейсами.' },
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
        num: '01', category: '2023–2026 — Старший продакт-дизайнер', name: 'Gate19', tag: 'Connectivity Service · B2B SaaS',
        metrics: ['~60% сокращение handoff', '<7 дней UI нового продукта', '1 кодовая база, 20+ скинов'],
        task: 'Коннективити-сервис работает для десятков корпоративных клиентов, у каждого свой бренд. Если построить теминг-систему, которая меняет визуальную идентичность без правки ядра, новые клиенты онбордятся за дни вместо недель.',
        whatWasDone: 'Полный UX от ON/OFF тогла до выбора сервера. Система скинов: каждый клиент получает кастомный визуальный слой на общей кодовой базе. Несколько вариаций протестированы на разной аудитории. Бэкенд: оптимизированное распределение серверов, кастомный алгоритм выбора по локации. CI/CD для обновлений across все версии.',
        result: '~60% сокращение frontend handoff. UI нового продукта за <7 дней. Одна архитектура, 20+ скинов параллельно.',
        role: 'Старший продакт-дизайнер', duration: '3 года', team: '',
        images: { col1Top: 'images/Gate19-col1-Top.png', col1Bottom: 'images/Gate19-col1-Botton.png', col2: 'images/Gate19-col2.gif' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '02', category: '2023–2026 — Старший продакт-дизайнер', name: 'JAVHD', tag: 'Adult SaaS · B2C',
        metrics: ['+40% конверсия', '+25% мобильные регистрации', '300+ таргетированных туров'],
        task: 'Видеоплатформа в конкурентной нише. Конверсия триал в платный стояла на месте. Если геймифицировать онбординг и запустить A/B тесты across лендинги, конверсия вырастет. Пользователь должен достичь ценности до экрана оплаты.',
        whatWasDone: '100+ лендингов, каждый привязан к гипотезе. 50+ экранов монетизации: воронки, чекаут, апсейл. Стриминг с чатом, токен-взаимодействия. 300+ туров по регионам и аудиториям. AI-генерация промо сократила время на ~70%. Кампания "Pornojacks" дала +60% engagement.',
        result: '+40% общая конверсия. +25% мобильные регистрации. +60% engagement от кампаний. +20% премиум-подписки.',
        role: 'Старший продакт-дизайнер', duration: '3 года', team: '',
        images: { col1Top: 'images/Jav-col1-Top.png', col1Bottom: 'images/Jav-col1-Botton.png', col2: 'images/Jav-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '03', category: '2024–2026 — Старший продакт-дизайнер', name: 'ShugarAi', tag: 'AI Platform · B2C',
        metrics: ['+27% WoW retention', '+19% длина сессии', '10K+ креативов протестировано'],
        task: 'AI-платформа для создания персонажей и взаимодействия через текст, голос и изображения. Если онбординг проведет через создание персонажа за три шага вместо пустого экрана, конверсия в активацию вырастет.',
        whatWasDone: 'Полный UX цикла генерации: онбординг через AI-гайда, социальная галерея для удержания, управление агентом в реальном времени. Чат с голосом. 10 000+ креативов протестировано с сегментацией и A/B. Облачная инфраструктура. Шифрование для приватности.',
        result: '+27% возвратов за неделю. +19% средняя длина сессии. 10K+ креативов протестировано.',
        role: 'Старший продакт-дизайнер', duration: '2 года', team: '',
        images: { col1Top: 'images/shugar-col1-Top.png', col1Bottom: 'images/shugar-col1-Botton.png', col2: 'images/shugar-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '04', category: '2023–2026 — UX/UI и исследования', name: 'Corgday', tag: 'HR Tech · B2B SaaS',
        metrics: ['−40% ручной follow-up', '−28% время очереди по ЗП', '3-шаг генерация документов'],
        task: 'HR-команды холдинга тратят часы на переключение между вкладками при обработке зарплатных исключений. Если пересобрать интерфейс вокруг реального триажа, время обработки упадет. Сотрудникам нужен self-service.',
        whatWasDone: 'HR CRM mobile-first: адаптивная вкладка под смартфоны. 3-шаговый flow генерации документов. Self-service: отпуска, больничные, личные записи. Контекстные действия в строке, без переходов. IA вокруг реальных HR-процессов.',
        result: '−40% ручного follow-up across холдинг. −28% медианное время обработки зарплатных исключений.',
        role: 'UX/UI и исследования', duration: '3 года', team: '',
        images: { col1Top: 'images/Corgday-col1-Top.png', col1Bottom: 'images/Corgday-col1-Botton.png', col2: 'images/Corgday-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '05', category: '2023–2024 — Ведущий продакт-дизайнер', name: 'White Label', tag: 'Design System · Multi-tenant SaaS',
        metrics: ['5 минут на запуск бренда', '1 кодовая база, безлимит брендов', 'интеграция с AI pipeline'],
        task: 'Запуск брендированного лендинга занимает недели дизайна и разработки. Если разделить структурные и брендовые токены, маркетолог настроит и опубликует страницу за минуты без дизайнеров и разработчиков.',
        whatWasDone: 'Шаблонная архитектура: герой-баннеры, гриды фич, CTA-блоки как самостоятельные секции. Админ-панель с визуальными контролами, превью, мгновенная публикация, откат. Page-builder по секциям, а не компонентам. Подключено к AI pipeline как финальный шаг.',
        result: 'Запуск бренда: от дней до 5 минут. Одна кодовая база, безлимит выражений. Same-day delivery across портфель.',
        role: 'Ведущий продакт-дизайнер', duration: '1 год', team: '',
        images: { col1Top: 'images/Whitelable-col1-Top.png', col1Bottom: 'images/Whitelable-col1-Botton.png', col2: 'images/Whitelable-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '06', category: '2024–2026 — Креативная дирекция, бренд, веб', name: 'PNB Agency', tag: 'Creative Direction · Web',
        metrics: ['AI-генерация → ручная доводка', 'case-first архитектура', 'dual-read: клиенты + найм'],
        task: 'Сайт агентства должен продавать через показ работ, а не список услуг. Если посетитель приходит с конкретной задачей, прямые ссылки на кейсы конвертируют лучше. Сайт также работает как фильтр для найма.',
        whatWasDone: 'Case-first архитектура с плотным сторителлингом. Типографика громко при взгляде, тихо при чтении. Сдержанная палитра, motion для ритма. CTAs на каждом скролле. v2 как vibecode-эксперимент: AI-макеты, доведенные вручную. Каждая секция proof-of-concept.',
        result: 'Один сайт, две задачи: продажа клиентам и скрининг кандидатов. Сайт стал портфолио-пьесой.',
        role: 'Креативная дирекция, бренд, веб', duration: '2 года', team: '',
        images: { col1Top: 'images/PNB-col1-Top.png', col1Bottom: 'images/PNB-col1-Botton.png', col2: 'images/PNB-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
      {
        num: '07', category: '2023–2026 — UX/UI и коммуникационный дизайн', name: 'MiraiTech', tag: 'AI Pipeline · Design Systems',
        metrics: ['~30 фирстилей', '~100 логонаправлений', 'AI-конвейер креативов'],
        task: 'Холдинг управляет 30+ партнёрскими брендами. Если партнёры наследуют структурные токены, но контролируют брендовый слой, можно вести их все параллельно без дизайнера в каждом запросе.',
        whatWasDone: 'Tiered теминг: партнёры делят структурные токены, переопределяют бренд. ~30 стилей и ~100 логонаправлений за три года. Каждый бренд как self-service kit. AI pipeline: n8n, генеративные модели, очереди ревью. Adxad для B2B-самоквалификации. Белая книга этики ИИ.',
        result: '~30 брендов и ~100 логотипов за 3 года, каждый как self-service kit. AI pipeline превратил массовое производство в built-in компетенцию.',
        role: 'UX/UI и коммуникационный дизайн', duration: '3 года', team: '',
        images: { col1Top: 'images/Miraitech-Top.png', col1Bottom: 'images/Miraitech-col1-Botton.png', col2: 'images/Miraitech-col2.png' },
        notionUrl: 'https://olezhapth2.github.io/od/#projects',
      },
    ],
    liveProject: 'О проекте',
    fullProjects: 'Все проекты',
    oldPortfolio: 'Старое портфолио',
    letsTalk: 'Открыт к работе',
    footerDesc: 'Ищу роли Senior Product Designer, Lead Product Designer, Staff Product Designer и консалтинг по дизайн-системам. AI-продукты, B2B SaaS, FinTech, Trading Platforms, Gaming, EdTech, Affiliate-tech, Internal Tools и Developer Platforms. Базируюсь в Бангкоке. Удалённая работа. Открыт к международным командам.',
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
