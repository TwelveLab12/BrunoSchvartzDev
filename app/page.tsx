import { CvPrint } from "@/components/cv-print";
import { CaseStudies } from "@/components/home/case-studies";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { SiteHeader } from "@/components/home/site-header";
import { Stack } from "@/components/home/stack";

export default function HomePage() {
  return (
    <>
      <main data-print="screen" className="min-h-dvh px-[clamp(20px,5vw,72px)] print:hidden">
        <SiteHeader />
        <Hero />
        <Stack />
        <CaseStudies />
        <Experience />
        <Contact />
      </main>
      <CvPrint />
    </>
  );
}
