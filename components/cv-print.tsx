import { Fragment } from "react";
import Image from "next/image";
import { cv, profile } from "@/content/profile";
import { Wordmark } from "@/components/wordmark";

const kicker =
  "text-print-kicker text-print-muted m-0 font-mono font-medium tracking-[0.14em] uppercase";

/**
 * Feuille CV — masquée à l'écran, seul contenu imprimé (voir @media print dans
 * globals.css). Une page A4, une seule colonne de lecture (lisible par les ATS) :
 * grille libellé / contenu, filets fins, accent réservé au positionnement et aux résultats.
 * Tenir sur une page : vérifier l'aperçu d'impression après tout ajout.
 */
export function CvPrint() {
  return (
    <div
      data-print="cv"
      className="text-print-body text-print-ink hidden bg-white print:block print:px-[16mm] print:pt-[14mm] print:pb-[12mm]"
    >
      <header className="flex items-end justify-between gap-[9mm]">
        <div className="flex items-center gap-[5mm]">
          <Image
            src="/portrait.jpg"
            alt="Portrait de Bruno Schvartz"
            width={200}
            height={200}
            priority
            className="size-[20mm] rounded-full object-cover"
          />
          <div>
            <p className="text-print-name text-ink font-wordmark m-0 font-semibold tracking-[-0.015em]">
              <Wordmark vClassName="text-print-accent" />
            </p>
            <p className="text-print-lead text-ink-muted mt-[1.6mm] mb-0">
              {cv.headline.before}
              <em className="text-print-lead-emphasis text-print-accent font-serif">
                {cv.headline.emphasis}
              </em>
              {cv.headline.after}
            </p>
          </div>
        </div>
        <address className="text-print-contact text-ink-muted text-right whitespace-nowrap not-italic">
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

      <div className="border-print-accent mt-[4.8mm] border-t-2" />

      <div className="text-print-meta text-print-muted flex items-baseline justify-between gap-[6mm] py-[3.2mm] font-mono tracking-[0.06em] uppercase">
        <ul className="m-0 flex shrink-0 list-none items-baseline gap-[3.7mm] p-0">
          {cv.proofs.map((proof, i) => (
            <Fragment key={proof.label}>
              {i > 0 ? (
                <li aria-hidden className="bg-print-rule h-px w-[6.4mm] self-center" />
              ) : null}
              <li className="whitespace-nowrap">
                <strong className="text-print-proof text-ink mr-[1.6mm] font-serif font-normal tracking-normal normal-case">
                  {proof.value}
                </strong>
                {proof.label}
              </li>
            </Fragment>
          ))}
        </ul>
        <span className="inline-flex items-center gap-[2mm] whitespace-nowrap">
          <span aria-hidden className="bg-print-accent size-[1.6mm] rounded-full" />
          {cv.availability}
        </span>
      </div>

      <Row label={cv.labels.profil}>
        <p className="text-print-profil m-0">{cv.profil}</p>
      </Row>

      <Row label={cv.labels.jobs}>
        <div className="grid gap-[3.4mm]">
          {cv.jobs.map((job) => (
            <div key={job.title}>
              <EntryHead meta={job.meta}>
                <h3 className="text-print-entry-title m-0 font-semibold tracking-[-0.005em]">
                  {job.title}
                </h3>
              </EntryHead>
              <p className="mt-[1.3mm] mb-0">{job.body}</p>
            </div>
          ))}
        </div>
      </Row>

      <Row label={cv.labels.projects}>
        <div className="grid gap-[3.4mm]">
          {cv.projects.map((p) => (
            <div key={p.title}>
              <EntryHead meta={p.meta}>
                <h3 className="text-print-project m-0 font-serif font-normal tracking-[-0.01em]">
                  {p.title}
                </h3>
              </EntryHead>
              <p className="mt-[0.8mm] mb-0">{p.body}</p>
              <p className="text-print-meta text-print-accent mt-[1mm] mb-0 font-mono font-medium">
                <span aria-hidden>→ </span>
                {p.result}
              </p>
            </div>
          ))}
        </div>
      </Row>

      <Row label={cv.labels.stack}>
        <ul className="text-print-stack text-ink m-0 flex list-none flex-wrap p-0 font-serif tracking-[-0.01em]">
          {cv.stack.core.map((item) => (
            <li
              key={item}
              className="after:text-print-accent whitespace-nowrap after:mx-[1.6mm] after:content-['·'] last:after:content-none"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="text-print-contact text-ink-muted mt-[2mm] grid grid-cols-2 gap-[4mm] leading-normal">
          {cv.stack.groups.map((g) => (
            <div key={g.label}>
              <span className={`${kicker} block tracking-[0.1em]`}>{g.label}</span>
              {g.value}
            </div>
          ))}
        </div>
      </Row>

      <section className="border-print-rule grid grid-cols-[26mm_1fr_1fr] gap-[6mm] border-t py-[3.4mm]">
        <h2 className={`${kicker} pt-[1.5pt]`}>{cv.labels.education}</h2>
        <div className="grid content-start gap-[1.3mm]">
          {cv.education.map((e) => (
            <div key={e.title}>
              {e.title} <span className="text-print-muted">— {e.meta}</span>
            </div>
          ))}
        </div>
        <div>
          <h2 className={kicker}>{cv.labels.languages}</h2>
          <p className="mt-[1.3mm] mb-0">{cv.languages}</p>
        </div>
      </section>

      <footer className="border-print-rule text-print-kicker text-print-muted mt-[3mm] flex justify-between border-t pt-[3mm] font-mono tracking-[0.1em] uppercase">
        <span>
          <Wordmark first={false} vClassName="text-print-accent" /> {cv.signature}
        </span>
        <span>{profile.websiteLabel}</span>
      </footer>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-print-rule grid grid-cols-[26mm_1fr] gap-[6mm] border-t py-[3.4mm]">
      <h2 className={`${kicker} pt-[1.5pt]`}>{label}</h2>
      <div>{children}</div>
    </section>
  );
}

function EntryHead({ meta, children }: { meta: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-[6mm]">
      {children}
      <span className="text-print-meta text-print-muted font-mono whitespace-nowrap">{meta}</span>
    </div>
  );
}
