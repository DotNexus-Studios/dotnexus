import type { Dictionary, Locale } from "./types";

const nl: Dictionary = {
  meta: {
    title: "DotNexus: Growth bureau",
    description:
      "Growth bureau voor startups en corporates: strategie, branding, content, webdevelopment, AI, workflow automation en data-gedreven groei.",
  },
  nav: {
    about: "Over ons",
    services: "Diensten",
    approach: "Aanpak",
    showcase: "Werk",
    contact: "Contact",
  },
  about: {
    label: "Team",
    title: "Wie zijn wij?",
    titleAccent: "Mensen achter DotNexus.",
    subtitle:
      "Twee ondernemers met complementaire expertise: creatief vakmanschap, marketing en strategische bedrijfsvoering. Samen zetten we beweging neer voor merken die willen groeien.",
    company: {
      label: "Over DotNexus",
      title: "Growth bureau met ondernemers-DNA",
      description:
        "DotNexus is een growth bureau voor startups en corporates. Wij leveren geen los product, maar zetten momentum neer: strategie, branding, content, web, AI en data werken samen voor de volgende stap. Onze kracht zit in de combinatie van creativiteit, zakelijke ervaring en technische kennis.",
    },
    team: {
      label: "Team",
      title: "Onze persona's",
      members: [
        {
          name: "Nol Algra",
          role: "Social media marketing & creatief ondernemer",
          bio: "Ik ben Arnoldus. Ik studeerde Design and Photography aan de High School for the Arts en studeerde af in 1986. Met jarenlange ervaring in grafisch ontwerp, fotografie, marketing en kunst, breng ik dat vakmanschap mee in elk project waar ik bij betrokken raak. Tegenwoordig specialiseer ik me in social media marketingstrategieën. Door creativiteit en marketingkennis te combineren, help ik merken en projecten zichtbaar worden en verder komen.",
          tags: ["Design", "Fotografie", "Marketing", "Social media"],
          image: "/team/nol-algra.png",
        },
        {
          name: "Tim Verkuil, BSc Eng.",
          role: "Strategisch business consultant",
          bio: "Ik ben Tim en woon in Utrecht. Opgegroeid in een ondernemersgezin — mijn vader had een bouwbedrijf, mijn moeder is kunstenaar en beeldhouwer — koester ik een natuurlijke neiging tot creatief ondernemen. Na mijn bachelor Water Management in 2022 werk ik als strategisch business consultant aan uiteenlopende projecten. Met een creatieve kijk op strategie en technische kennis help ik ideeën door te vertalen naar concrete stappen.",
          tags: ["Strategie", "Engineering", "Consultancy", "Groei"],
          image: "/team/tim-verkuil.png",
        },
      ],
    },
  },
  hero: {
    eyebrow: "Growth bureau",
    title: "De volgende stap",
    titleAccent: "begint met beweging.",
    subtitle:
      "Van startup met een groeiplan tot corporate die een frisse, out of the box impuls zoekt: wij leveren geen los product, maar zetten momentum neer. Strategie, bedrijfsvoering, web, AI en inzichten zetten we functioneel in voor de volgende stap.",
    ctaPrimary: "Stuur een e-mail",
    ctaSecondary: "Bekijk ons werk",
    stats: [
      { value: "360°", label: "Integrale aanpak" },
      { value: "A-Z", label: "Van strategie tot executie" },
      { value: "Elke fase", label: "Startup tot corporate" },
    ],
    dotsLabel: "Connecting the dots",
    dotsHint:
      "Vooruitgang ontstaat alleen in beweging. Ergens beginnen, meegaan met de stroom, en blijven optimaliseren tot alles met elkaar verbonden valt.",
  },
  services: {
    label: "Diensten",
    title: "Meer dan een marketingbureau",
    subtitle:
      "Van strategie en branding tot content, web, AI, workflow automation en data: wij denken mee, bouwen mee en zetten door.",
    items: [
      {
        title: "Strategisch advies",
        description:
          "Groeiplannen, heldere prioriteiten en een routekaart die past bij jouw fase. Of je nu net start of opschaalt: wij helpen keuzes maken die de volgende stap mogelijk maken.",
        tags: ["Groeiplan", "Positionering", "Roadmap"],
      },
      {
        title: "Bedrijfsvoering",
        description:
          "Waar processen vastlopen of teams energie verliezen, brengen wij structuur en tempo terug. Scherper executeren, zonder de creativiteit te doden.",
        tags: ["Operations", "Teams", "Executie"],
      },
      {
        title: "Online groei & social",
        description:
          "Groeiplafonds doorbreken via online kanalen en organic social. Zichtbaarheid en bereik die vertrouwen opbouwen, zonder alleen op advertenties te leunen.",
        tags: ["Organic", "Social", "Bereik"],
      },
      {
        title: "Webdevelopment",
        description:
          "Websites en webapplicaties die groei ondersteunen: snel, helder en gebouwd om mee te bewegen met jouw bedrijf. Van landing tot platform.",
        tags: ["Websites", "Webapps", "UX"],
      },
      {
        title: "AI integratie",
        description:
          "AI functioneel inzetten in je bedrijf: van klantcontact tot interne tools. Slimmer werken zonder de menselijke touch te verliezen.",
        tags: ["AI tools", "Integratie", "Innovatie"],
      },
      {
        title: "Data & inzichten",
        description:
          "Statistieken verbeteren, inzichten scherp krijgen en die data inzetten in bedrijfsvoering en strategie. Minder gissen, meer sturen.",
        tags: ["Analytics", "Dashboards", "Besluitvorming"],
      },
      {
        title: "Workflow automation",
        description:
          "Repetitieve processen automatiseren en workflows strakker koppelen. Minder handwerk, meer tijd voor wat echt verschil maakt.",
        tags: ["Automatisering", "Processen", "Efficiëntie"],
      },
      {
        title: "Branding & design",
        description:
          "Merkidentiteit, visuele stijl en design die je positionering versterken. Consistent, herkenbaar en klaar voor elk kanaal.",
        tags: ["Branding", "Visual design", "Identiteit"],
      },
      {
        title: "Contentstrategie",
        description:
          "Welke verhalen, welke kanalen, welk ritme. Een plan dat past bij je merk, doelgroep en groeifase.",
        tags: ["Strategie", "Kanalen", "Planning"],
      },
      {
        title: "Content creatie",
        description:
          "Van concept tot deliverable: copy, visuals en formats die werken op social en daarbuiten. Authentiek en afgestemd op je merk.",
        tags: ["Copy", "Visuals", "Productie"],
      },
    ],
  },
  approach: {
    label: "Aanpak",
    title: "Zakelijk creatief. Altijd in beweging.",
    subtitle:
      "Onze kracht zit in de combinatie: strategie, branding, content, operatie, web, AI en data versterken elkaar. Daardoor zetten we een beweging in gang die je hele bedrijf voelt.",
    pillars: [
      {
        title: "Ondernemend",
        description:
          "Wij kennen het traject van idee tot uitvoering, omdat we het zelf hebben doorlopen. Die ervaring nemen we mee in elk plan.",
      },
      {
        title: "Creatief",
        description:
          "Out of the box denken met een zakelijke basis. Geen standaard playbook, wel oplossingen die opvallen en werken.",
      },
      {
        title: "Dynamisch",
        description:
          "Energie, snelheid en bijsturen. Groei is geen statisch document, maar een ritme dat we samen vasthouden.",
      },
    ],
    bundle: {
      title: "Alles onder één dak, slim ingeregeld",
      description:
        "Wij doen in principe alles wat nodig is, maar laten los wat anderen beter kunnen en halen expertise aan waar het hoort. Eén aanspreekpunt, één lijn, één beweging vooruit.",
    },
    bundleTags: [
      "Strategie",
      "Branding",
      "Content",
      "Web",
      "AI",
      "Automatisering",
      "Data",
    ],
  },
  marketing: {
    label: "Wat we oplossen",
    title: "Groei op alle fronten",
    subtitle:
      "Geen los marketingbureau. Wij pakken groei integraal aan: van merk en content tot web, AI, automatisering en inzichten die je strategie sturen.",
    points: [
      "Bedrijfsvoering die weer flow en richting krijgt",
      "Branding en design die je merk herkenbaar en consistent maken",
      "Contentstrategie en creatie die aansluiten op je doelgroep en kanalen",
      "Groeiplafonds doorbreken via online kanalen en organic social",
      "Websites, webapps en workflow automation die schaal geven",
      "AI integratie en data die strategie en operatie slimmer maken",
      "Teams opnieuw enthousiasmeren voor de volgende stap",
    ],
  },
  showcase: {
    label: "Showcase",
    title: "Van idee tot merk in de markt",
    subtitle:
      "Projecten waar wij van A tot Z betrokken zijn geweest en een uniek product of merk hebben helpen neerzetten.",
    project: "Masking Master",
    role: "Van concept tot lancering: strategie, branding, B2C/B2B positionering en internationale groei",
    visit: "Bekijk project",
    metrics: [
      { value: "A-Z", label: "Betrokkenheid" },
      { value: "B2C/B2B", label: "Positionering" },
      { value: "Global", label: "Markt focus" },
    ],
  },
  cta: {
    title: "Klaar voor beweging?",
    subtitle:
      "Mail ons waar je staat en wat je zoekt. Wij denken vrijblijvend mee over de slimste volgende stap.",
    button: "Stuur een e-mail",
    email: "hello@dotnexus.nl",
  },
  footer: {
    tagline: "Growth bureau: strategie, branding, content, web en AI",
    rights: "Alle rechten voorbehouden.",
  },
};

const en: Dictionary = {
  meta: {
    title: "DotNexus: Growth agency",
    description:
      "Growth agency for startups and corporates: strategy, branding, content, web development, AI, workflow automation, and data-driven growth.",
  },
  nav: {
    about: "About us",
    services: "Services",
    approach: "Approach",
    showcase: "Work",
    contact: "Contact",
  },
  about: {
    label: "Team",
    title: "Who are we?",
    titleAccent: "The people behind DotNexus.",
    subtitle:
      "Two entrepreneurs with complementary expertise: creative craft, marketing, and strategic business operations. Together we create momentum for brands that want to grow.",
    company: {
      label: "About DotNexus",
      title: "Growth agency with entrepreneurial DNA",
      description:
        "DotNexus is a growth agency for startups and corporates. We don't deliver a standalone product, we create momentum: strategy, branding, content, web, AI, and data work together for your next step. Our strength lies in the combination of creativity, business experience, and technical knowledge.",
    },
    team: {
      label: "Team",
      title: "Our personas",
      members: [
        {
          name: "Nol Algra",
          role: "Social media marketing & creative entrepreneur",
          bio: "I'm Arnoldus. I studied Design and Photography at the High School for the Arts, graduating in 1986. With years of experience in graphic design, photography, marketing, and art, I bring that craft to every project I work on. Nowadays, I specialize in social media marketing strategies. By combining creativity and marketing knowledge, I help brands and projects gain visibility and move forward.",
          tags: ["Design", "Photography", "Marketing", "Social media"],
          image: "/team/nol-algra.png",
        },
        {
          name: "Tim Verkuil, BSc Eng.",
          role: "Strategic business consultant",
          bio: "I'm Tim and I live in Utrecht. Raised in an entrepreneurial family — my father ran a construction company, my mother is an artist and sculptor — I have a natural drive for creative entrepreneurship. After completing my bachelor's degree in Water Management in 2022, I work as a strategic business consultant on a range of projects. With a creative approach to strategy and technical knowledge, I help turn ideas into concrete next steps.",
          tags: ["Strategy", "Engineering", "Consulting", "Growth"],
          image: "/team/tim-verkuil.png",
        },
      ],
    },
  },
  hero: {
    eyebrow: "Growth agency",
    title: "The next step",
    titleAccent: "starts with motion.",
    subtitle:
      "From startups building a growth plan to corporates needing a fresh, out of the box push: we don't deliver a standalone product, we create momentum. Strategy, operations, web, AI, and insights work together for your next step.",
    ctaPrimary: "Send an email",
    ctaSecondary: "View our work",
    stats: [
      { value: "360°", label: "Integrated approach" },
      { value: "A-Z", label: "Strategy through execution" },
      { value: "All stages", label: "Startup to corporate" },
    ],
    dotsLabel: "Connecting the dots",
    dotsHint:
      "Progress only emerges in motion. Start somewhere, move with the flow, and keep refining until everything connects.",
  },
  services: {
    label: "Services",
    title: "More than a marketing agency",
    subtitle:
      "From strategy and branding to content, web, AI, workflow automation, and data: we think along, build along, and deliver.",
    items: [
      {
        title: "Strategic consulting",
        description:
          "Growth plans, clear priorities, and a roadmap that fits your stage. Whether you're launching or scaling, we help you make the next step possible.",
        tags: ["Growth plan", "Positioning", "Roadmap"],
      },
      {
        title: "Business operations",
        description:
          "Where processes stall or teams lose energy, we bring structure and pace back. Sharper execution without killing creativity.",
        tags: ["Operations", "Teams", "Execution"],
      },
      {
        title: "Online growth & social",
        description:
          "Break growth ceilings through online channels and organic social. Visibility and reach that build trust, without relying on ads alone.",
        tags: ["Organic", "Social", "Reach"],
      },
      {
        title: "Web development",
        description:
          "Websites and web applications built for growth: fast, clear, and designed to move with your business. From landing pages to platforms.",
        tags: ["Websites", "Web apps", "UX"],
      },
      {
        title: "AI integration",
        description:
          "Deploy AI functionally across your business: from customer touchpoints to internal tools. Work smarter without losing the human touch.",
        tags: ["AI tools", "Integration", "Innovation"],
      },
      {
        title: "Data & insights",
        description:
          "Improve your statistics, sharpen insights, and put data to work in operations and strategy. Less guessing, more steering.",
        tags: ["Analytics", "Dashboards", "Decisions"],
      },
      {
        title: "Workflow automation",
        description:
          "Automate repetitive processes and connect workflows more tightly. Less manual work, more time for what truly moves the needle.",
        tags: ["Automation", "Processes", "Efficiency"],
      },
      {
        title: "Branding & design",
        description:
          "Brand identity, visual style, and design that strengthen your positioning. Consistent, recognizable, and ready for every channel.",
        tags: ["Branding", "Visual design", "Identity"],
      },
      {
        title: "Content strategy",
        description:
          "Which stories, which channels, which cadence. A plan that fits your brand, audience, and growth stage.",
        tags: ["Strategy", "Channels", "Planning"],
      },
      {
        title: "Content creation",
        description:
          "From concept to deliverable: copy, visuals, and formats that work on social and beyond. Authentic and aligned with your brand.",
        tags: ["Copy", "Visuals", "Production"],
      },
    ],
  },
  approach: {
    label: "Approach",
    title: "Business creative. Always in motion.",
    subtitle:
      "Our strength is the combination: strategy, branding, content, operations, web, AI, and data amplify each other. That sets a movement your whole company can feel.",
    pillars: [
      {
        title: "Entrepreneurial",
        description:
          "We know the journey from idea to execution because we've lived it. That experience shapes every plan we build.",
      },
      {
        title: "Creative",
        description:
          "Out of the box thinking with a business backbone. No standard playbook, solutions that stand out and work.",
      },
      {
        title: "Dynamic",
        description:
          "Energy, speed, and iteration. Growth isn't a static document, it's a rhythm we keep together.",
      },
    ],
    bundle: {
      title: "Everything under one roof, smartly arranged",
      description:
        "We do what's needed, release what others do better, and bring in expertise where it belongs. One point of contact, one line, one move forward.",
    },
    bundleTags: [
      "Strategy",
      "Branding",
      "Content",
      "Web",
      "AI",
      "Automation",
      "Data",
    ],
  },
  marketing: {
    label: "What we solve",
    title: "Growth on every front",
    subtitle:
      "Not a standalone marketing agency. We tackle growth integrally: from brand and content to web, AI, automation, and insights that drive strategy.",
    points: [
      "Operations that regain flow and direction",
      "Branding and design that make your brand recognizable and consistent",
      "Content strategy and creation aligned with your audience and channels",
      "Breaking growth ceilings through online channels and organic social",
      "Websites, web apps, and workflow automation that create scale",
      "AI integration and data that make strategy and operations smarter",
      "Re-energizing teams for the next step",
    ],
  },
  showcase: {
    label: "Showcase",
    title: "From idea to market-ready brand",
    subtitle:
      "Projects where we were involved A to Z and helped launch a unique product or brand.",
    project: "Masking Master",
    role: "From concept to launch: strategy, branding, B2C/B2B positioning, and international growth",
    visit: "View project",
    metrics: [
      { value: "A-Z", label: "Involvement" },
      { value: "B2C/B2B", label: "Positioning" },
      { value: "Global", label: "Market focus" },
    ],
  },
  cta: {
    title: "Ready for motion?",
    subtitle:
      "Email us where you are and what you're looking for. We'll think along, no strings attached, about the smartest next step.",
    button: "Send an email",
    email: "hello@dotnexus.nl",
  },
  footer: {
    tagline: "Growth agency: strategy, branding, content, web, and AI",
    rights: "All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { nl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
