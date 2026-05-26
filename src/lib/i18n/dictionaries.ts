import type { Dictionary, Locale } from "./types";

const nl: Dictionary = {
  meta: {
    title: "DotNexus — Strategie, operatie & marketing",
    description:
      "DotNexus adviseert en voert uit: strategisch advies, bedrijfsvoering en organic social marketing in één bundel voor bedrijven die willen groeien.",
  },
  nav: {
    services: "Diensten",
    approach: "Aanpak",
    showcase: "Werk",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Growth bureau · Amsterdam",
    title: "De volgende stap",
    titleAccent: "in één beweging.",
    subtitle:
      "Wij combineren strategisch advies, bedrijfsvoering en marketing tot één dynamische bundel — creatief, vooruitstrevend en gericht op meetbare groei.",
    ctaPrimary: "Plan een gesprek",
    ctaSecondary: "Bekijk ons werk",
    stats: [
      { value: "360°", label: "Integrale groeiaanpak" },
      { value: "Organic", label: "Social-first marketing" },
      { value: "1", label: "Partner, één lijn" },
    ],
  },
  services: {
    label: "Diensten",
    title: "Advies én uitvoering",
    subtitle:
      "Geen losse slides. Wij denken mee, sturen bij en zetten door — van strategie tot dagelijkse operatie en zichtbaarheid.",
    items: [
      {
        title: "Strategisch advies",
        description:
          "Scherpe analyse, heldere prioriteiten en een routekaart die past bij jouw fase. Wij helpen keuzes maken die morgen nog kloppen.",
        tags: ["Positionering", "Groei", "Roadmap"],
      },
      {
        title: "Bedrijfsvoering",
        description:
          "Processen strakker, teams scherper, executie sneller. Wij brengen structuur zonder de creativiteit te doden.",
        tags: ["Operations", "Teams", "Schaal"],
      },
      {
        title: "Organic social marketing",
        description:
          "Content die blijft hangen — authentiek, consistent en gebouwd voor algoritmes én mensen. Geen advertentie-budget, wel momentum.",
        tags: ["Content", "Social", "Community"],
      },
    ],
  },
  approach: {
    label: "Aanpak",
    title: "Eén bundel. Drie disciplines.",
    subtitle:
      "De kracht van DotNexus zit in de combinatie: strategie, operatie en marketing lopen bij ons niet parallel — ze versterken elkaar.",
    pillars: [
      {
        title: "Creatief",
        description: "Verhalen en visuals die opvallen zonder schreeuwerig te zijn.",
      },
      {
        title: "Vooruitstrevend",
        description: "Trends vertalen we naar wat nú werkt voor jouw merk.",
      },
      {
        title: "Dynamisch",
        description: "Snel schakelen, testen, optimaliseren — groei is geen statisch plan.",
      },
    ],
    bundle: {
      title: "Alles in één lijn",
      description:
        "Geen silo's tussen consultants en marketeers. Eén team, één ritme, één doel: jouw bedrijf naar de volgende fase brengen.",
    },
  },
  marketing: {
    label: "Marketing",
    title: "Organic social als motor",
    subtitle:
      "Wij geloven in owned attention: content die vertrouwen opbouwt, bereik vergroot en conversie voedt — zonder afhankelijkheid van paid spend.",
    points: [
      "Contentstrategie afgestemd op jouw merk en doelgroep",
      "Productie en publicatie met consistente cadans",
      "Community building en engagement die echt voelt",
      "Data-gedreven bijsturing op basis van performance",
    ],
  },
  showcase: {
    label: "Showcase",
    title: "Bewijs in de praktijk",
    subtitle:
      "Een selectie van projecten waar strategie, operatie en marketing samenkomen.",
    project: "Masking Master",
    role: "Strategie · Branding · Organic social · Groei",
    visit: "Bekijk project",
    metrics: [
      { value: "B2B", label: "Positionering" },
      { value: "Social", label: "Content engine" },
      { value: "NL", label: "Markt focus" },
    ],
  },
  cta: {
    title: "Klaar voor de volgende stap?",
    subtitle:
      "Vertel ons waar je staat — wij denken vrijblijvend mee over wat de slimste beweging is.",
    button: "Neem contact op",
    email: "hello@dotnexus.nl",
  },
  footer: {
    tagline: "Strategie · Operatie · Organic marketing",
    rights: "Alle rechten voorbehouden.",
  },
};

const en: Dictionary = {
  meta: {
    title: "DotNexus — Strategy, operations & marketing",
    description:
      "DotNexus advises and executes: strategic consulting, business operations, and organic social marketing in one bundle for companies ready to grow.",
  },
  nav: {
    services: "Services",
    approach: "Approach",
    showcase: "Work",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Growth bureau · Amsterdam",
    title: "The next step",
    titleAccent: "in one motion.",
    subtitle:
      "We combine strategic advice, business operations, and marketing into one dynamic bundle — creative, forward-thinking, and built for measurable growth.",
    ctaPrimary: "Book a call",
    ctaSecondary: "View our work",
    stats: [
      { value: "360°", label: "Integrated growth" },
      { value: "Organic", label: "Social-first marketing" },
      { value: "1", label: "Partner, one line" },
    ],
  },
  services: {
    label: "Services",
    title: "Advice and execution",
    subtitle:
      "No standalone decks. We think along, steer, and deliver — from strategy to daily operations and visibility.",
    items: [
      {
        title: "Strategic consulting",
        description:
          "Sharp analysis, clear priorities, and a roadmap that fits your stage. We help you make decisions that still make sense tomorrow.",
        tags: ["Positioning", "Growth", "Roadmap"],
      },
      {
        title: "Business operations",
        description:
          "Tighter processes, sharper teams, faster execution. We bring structure without killing creativity.",
        tags: ["Operations", "Teams", "Scale"],
      },
      {
        title: "Organic social marketing",
        description:
          "Content that sticks — authentic, consistent, and built for algorithms and humans alike. No ad budget required, real momentum.",
        tags: ["Content", "Social", "Community"],
      },
    ],
  },
  approach: {
    label: "Approach",
    title: "One bundle. Three disciplines.",
    subtitle:
      "DotNexus power lies in the combination: strategy, operations, and marketing don't run in parallel — they amplify each other.",
    pillars: [
      {
        title: "Creative",
        description: "Stories and visuals that stand out without shouting.",
      },
      {
        title: "Forward-thinking",
        description: "We translate trends into what works for your brand now.",
      },
      {
        title: "Dynamic",
        description: "Move fast, test, optimize — growth isn't a static plan.",
      },
    ],
    bundle: {
      title: "Everything aligned",
      description:
        "No silos between consultants and marketers. One team, one rhythm, one goal: take your company to the next stage.",
    },
  },
  marketing: {
    label: "Marketing",
    title: "Organic social as engine",
    subtitle:
      "We believe in owned attention: content that builds trust, expands reach, and feeds conversion — without reliance on paid spend.",
    points: [
      "Content strategy aligned with your brand and audience",
      "Production and publishing with consistent cadence",
      "Community building and engagement that feels real",
      "Data-driven iteration based on performance",
    ],
  },
  showcase: {
    label: "Showcase",
    title: "Proof in practice",
    subtitle:
      "A selection of projects where strategy, operations, and marketing converge.",
    project: "Masking Master",
    role: "Strategy · Branding · Organic social · Growth",
    visit: "View project",
    metrics: [
      { value: "B2B", label: "Positioning" },
      { value: "Social", label: "Content engine" },
      { value: "NL", label: "Market focus" },
    ],
  },
  cta: {
    title: "Ready for the next step?",
    subtitle:
      "Tell us where you stand — we'll think along, no strings attached, about the smartest move forward.",
    button: "Get in touch",
    email: "hello@dotnexus.nl",
  },
  footer: {
    tagline: "Strategy · Operations · Organic marketing",
    rights: "All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { nl, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
