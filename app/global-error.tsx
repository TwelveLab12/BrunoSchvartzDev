"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="bg-paper text-ink flex min-h-dvh items-center justify-center px-6">
        <div className="max-w-[480px] text-center">
          <h1 className="m-0 text-3xl font-semibold">Une erreur critique est survenue</h1>
          <p className="text-muted mt-4">Merci de recharger la page.</p>
          <button
            onClick={reset}
            className="border-ink/30 text-ink hover:border-ink hover:bg-ink/[0.04] mt-6 rounded-sm border px-6 py-3 text-sm font-medium"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
