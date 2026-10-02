import { CvPrint } from "@/components/cv-print";
import { CaseStudies } from "@/components/home/case-studies";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Recommendations } from "@/components/home/recommendations";
import { SiteCase } from "@/components/home/site-case";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { Stack } from "@/components/home/stack";

export default function HomePage() {
  return (
    <>
      {/* Conteneur masqué à l'impression (ADR 0005). Header, main et footer sont frères : un
          <header> ou un <footer> imbriqué dans <main> ne serait pas un repère banner/contentinfo. */}
      <div data-print="screen" className="min-h-dvh px-[clamp(20px,5vw,72px)] print:hidden">
        <SiteHeader />
        <main id="contenu">
          <Hero />
          <Stack />
          <CaseStudies />
          <Experience />
          <Recommendations />
          <SiteCase />
          <Contact />
        </main>
        <SiteFooter />
      </div>
      <CvPrint />
    </>
  );
}
