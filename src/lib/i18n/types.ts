export type Locale = "nl" | "en";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    approach: string;
    showcase: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      tags: string[];
    }[];
  };
  approach: {
    label: string;
    title: string;
    subtitle: string;
    pillars: {
      title: string;
      description: string;
    }[];
    bundle: {
      title: string;
      description: string;
    };
    bundleTags: string[];
  };
  marketing: {
    label: string;
    title: string;
    subtitle: string;
    points: string[];
  };
  showcase: {
    label: string;
    title: string;
    subtitle: string;
    project: string;
    role: string;
    visit: string;
    metrics: { value: string; label: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
    email: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};
