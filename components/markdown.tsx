import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Les blocs de code et les tableaux défilent horizontalement quand ils dépassent la colonne :
 * sans accès clavier, la partie masquée reste invisible pour qui n'a pas de souris (WCAG 2.1.1, axe
 * `scrollable-region-focusable`). Même règle que pour les schémas : `tabIndex={0}` + `role="group"`
 * + nom constant. Le lint refuse tabIndex sur un élément non interactif, d'où les exceptions.
 */
const components: Components = {
  pre: ({ children }) => (
    <pre
      role="group"
      aria-label="Code, défilement horizontal"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      {children}
    </pre>
  ),
  // Enveloppe le tableau : à 320 px il est plus large que la colonne et ferait déborder la page.
  table: ({ children }) => (
    <div
      className="overflow-x-auto"
      role="group"
      aria-label="Tableau, défilement horizontal"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
    >
      <table>{children}</table>
    </div>
  ),
};

/**
 * Rendu Markdown unique du site : /docs, articles de blog et aperçu de l'éditeur admin passent par
 * ici pour afficher la même chose. `remark-gfm` ajoute les tableaux (sans lui, un tableau sort comme
 * un paragraphe de `|`), le texte barré, les liens automatiques et les listes de tâches.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
