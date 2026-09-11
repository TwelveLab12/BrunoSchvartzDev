import Image from "next/image";
import { cv } from "@/content/profile";
import { Wordmark } from "@/components/wordmark";

/**
 * Feuille CV — masquée à l'écran, seul contenu imprimé (voir @media print dans
 * globals.css). Une page A4 : grille libellé / contenu, filets fins, beaucoup d'air.
 * Tenir sur une page : vérifier l'aperçu d'impression après tout ajout.
 */
export function CvPrint() {
  return (
    <div
      data-print="cv"
      className="text-print-body text-print-ink hidden bg-white print:block print:px-[16mm] print:py-[14mm]"
    >
      <header className="flex items-end justify-between gap-[12mm] pb-[5mm]">
        <div className="flex items-center gap-[5mm]">
          <Image
            src="/portrait.jpg"
            alt="Portrait de Bruno Schvartz"
            width={200}
            height={200}
            className="size-[20mm] rounded-full object-cover"
          />
          <div>
            <p className="text-print-name text-ink font-wordmark m-0 font-semibold tracking-[-0.015em]">
              <Wordmark />
            </p>
            <p className="text-print-lead text-muted mt-[2.5mm] mb-0">{cv.headline}</p>
          </div>
        </div>
        <address className="text-print-contact text-ink-muted text-right font-mono whitespace-nowrap not-italic">
          {cv.contact.map((line) =>
            "href" in line ? (
              <a key={line.label} href={line.href} className="block">
                {line.label}
              </a>
            ) : (
              <span key={line.label} className="block">
                {line.label}
              </span>
            ),
          )}
        </address>
      </header>

      <div className="border-ink border-t" />

      <Row label="Profil">
        <p className="text-print-profil m-0">{cv.profil}</p>
      </Row>

      <Row label="Expérience">
        <div className="grid gap-[4mm]">
          {cv.jobs.map((job) => (
            <Entry key={job.title} {...job} />
          ))}
        </div>
      </Row>

      <Row label="Projets" note={cv.projectsNote}>
        <div className="grid gap-[4mm]">
          {cv.projects.map((p) => (
            <Entry key={p.title} {...p} />
          ))}
        </div>
      </Row>

      <Row label="Compétences">
        <div className="grid gap-[2.5mm]">
          {cv.skills.map((s) => (
            <div key={s.label}>
              <span className="text-print-meta text-print-muted block font-mono tracking-[0.06em] uppercase">
                {s.label}
              </span>
              {s.value}
            </div>
          ))}
        </div>
      </Row>

      <section className="border-print-rule grid grid-cols-[26mm_1fr_1fr] gap-[6mm] border-t py-[3.2mm]">
        <h2 className="text-print-kicker text-print-muted m-0 pt-[1.5pt] font-mono font-normal tracking-[0.14em] uppercase">
          Formation
        </h2>
        <div className="grid content-start gap-[1.5mm]">
          {cv.education.map((e) => (
            <div key={e.title}>
              {e.title} <span className="text-print-muted">— {e.meta}</span>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-print-kicker text-print-muted m-0 font-mono font-normal tracking-[0.14em] uppercase">
            Langues
          </h2>
          <p className="mt-[1.5mm] mb-0">{cv.languages}</p>
        </div>
      </section>

      <p className="border-print-rule text-print-kicker text-print-muted mt-[4.5mm] mb-0 border-t pt-[3mm] font-mono tracking-[0.1em] uppercase">
        Schvartz — avec un v, jamais un w
      </p>
    </div>
  );
}

function Row({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-print-rule grid grid-cols-[26mm_1fr] gap-[6mm] border-t py-[3.2mm]">
      <div className="pt-[1.5pt]">
        <h2 className="text-print-kicker text-print-muted m-0 font-mono font-normal tracking-[0.14em] uppercase">
          {label}
        </h2>
        {note ? <p className="text-print-meta text-print-muted mt-[1.5mm] mb-0">{note}</p> : null}
      </div>
      <div>{children}</div>
    </section>
  );
}

function Entry({ title, meta, body }: { title: string; meta: string; body: string }) {
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto] items-baseline gap-[6mm]">
        <h3 className="text-print-entry-title m-0 font-semibold tracking-[-0.005em]">{title}</h3>
        <span className="text-print-meta text-print-muted font-mono whitespace-nowrap">{meta}</span>
      </div>
      <p className="mt-[2mm] mb-0">{body}</p>
    </div>
  );
}
