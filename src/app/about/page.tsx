import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "Over ons | DotNexus",
  description:
    "Leer het team achter DotNexus kennen: Nol Algra en Tim Verkuil. Growth bureau voor startups en corporates.",
};

export default function About() {
  return <AboutPage />;
}
