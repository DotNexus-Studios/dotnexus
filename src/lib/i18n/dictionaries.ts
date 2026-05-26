import type { Dictionary, Locale } from "./types";

const nl: Dictionary = {
  meta: {
    title: "DotNexus: Growth bureau",
    description:
      "Growth bureau voor startups en corporates die toe zijn aan de volgende stap. Strategie, bedrijfsvoering en online groei in één beweging.",
  },
  nav: {
    services: "Diensten",
    approach: "Aanpak",
    showcase: "Werk",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Growth bureau",
    title: "De volgende stap",
    titleAccent: "begint met beweging.",
    subtitle:
      "Van startup met een groeiplan tot corporate die een frisse, out of the box impuls zoekt: wij leveren geen los product, maar zetten momentum neer. Met ondernemerservaring, zakelijke creativiteit en een integrale aanpak tillen we plannen naar het volgende level.",
    ctaPrimary: "Stuur een e-mail",
    ctaSecondary: "Bekijk ons werk",
    stats: [
      { value: "360°", label: "Integrale aanpak" },
      { value: "A-Z", label: "Van strategie tot executie" },
      { value: "Elke fase", label: "Startup tot corporate" },
    ],
  },
  services: {
    label: "Diensten",
    title: "Meer dan een marketingbureau",
    subtitle:
      "Door ervaring in ondernemerschap en het grootbrengen van projecten kennen wij vrijwel alle processen die groei mogelijk maken. Wij denken mee, sturen bij en zetten door.",
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
          "Groeiplafonds doorbreken via online kanalen en organic social. Content en zichtbaarheid die vertrouwen opbouwen en momentum geven, zonder alleen op advertenties te leunen.",
        tags: ["Organic", "Content", "Bereik"],
      },
    ],
  },
  approach: {
    label: "Aanpak",
    title: "Zakelijk creatief. Altijd in beweging.",
    subtitle:
      "Onze kracht zit in de combinatie: strategie, operatie en online groei versterken elkaar. Daardoor lossen we niet één symptoom op, maar zetten we een beweging in gang.",
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
    bundleTags: ["Strategie", "Operatie", "Online groei"],
  },
  marketing: {
    label: "Wat we oplossen",
    title: "Drie uitdagingen, één beweging",
    subtitle:
      "Geen los marketingbureau. Wij pakken groei integraal aan: bedrijfsvoering, online kanalen en teamenergie horen bij elkaar.",
    points: [
      "Bedrijfsvoering die weer flow en richting krijgt",
      "Groeiplafonds doorbreken via online kanalen en organic social",
      "Teams opnieuw enthousiasmeren voor de volgende stap",
      "Strategie en executie in hetzelfde ritme, zonder silo's",
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
      { value: "A tot Z", label: "Betrokkenheid" },
      { value: "B2C en B2B", label: "Positionering" },
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
    tagline: "Growth bureau: strategie, operatie en online groei",
    rights: "Alle rechten voorbehouden.",
  },
};

const en: Dictionary = {
  meta: {
    title: "DotNexus: Growth agency",
    description:
      "Growth agency for startups and corporates ready for the next step. Strategy, operations, and online growth in one motion.",
  },
  nav: {
    services: "Services",
    approach: "Approach",
    showcase: "Work",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Growth agency",
    title: "The next step",
    titleAccent: "starts with motion.",
    subtitle:
      "From startups building a growth plan to corporates needing a fresh, out of the box push: we don't deliver a standalone product, we create momentum. With entrepreneurial experience, business creativity, and an integrated approach, we take plans to the next level.",
    ctaPrimary: "Send an email",
    ctaSecondary: "View our work",
    stats: [
      { value: "360°", label: "Integrated approach" },
      { value: "A-Z", label: "Strategy through execution" },
      { value: "All stages", label: "Startup to corporate" },
    ],
  },
  services: {
    label: "Services",
    title: "More than a marketing agency",
    subtitle:
      "Through entrepreneurship and bringing projects to life, we know the processes that enable growth. We think along, steer, and deliver.",
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
          "Break growth ceilings through online channels and organic social. Content and visibility that build trust and momentum, without relying on ads alone.",
        tags: ["Organic", "Content", "Reach"],
      },
    ],
  },
  approach: {
    label: "Approach",
    title: "Business creative. Always in motion.",
    subtitle:
      "Our strength is the combination: strategy, operations, and online growth amplify each other. That sets a movement in motion, instead of fixing one symptom.",
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
    bundleTags: ["Strategy", "Operations", "Online growth"],
  },
  marketing: {
    label: "What we solve",
    title: "Three challenges, one motion",
    subtitle:
      "Not a standalone marketing agency. We tackle growth integrally: operations, online channels, and team energy belong together.",
    points: [
      "Operations that regain flow and direction",
      "Breaking growth ceilings through online channels and organic social",
      "Re-energizing teams for the next step",
      "Strategy and execution in the same rhythm, without silos",
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
      { value: "A to Z", label: "Involvement" },
      { value: "B2C and B2B", label: "Positioning" },
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
    tagline: "Growth agency: strategy, operations, and online growth",
    rights: "All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { nl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
