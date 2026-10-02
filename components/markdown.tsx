import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Rendu Markdown unique du site : /docs, articles de blog et aperçu de l'éditeur admin passent par
 * ici pour afficher la même chose. `remark-gfm` ajoute les tableaux (sans lui, un tableau sort comme
 * un paragraphe de `|`), le texte barré, les liens automatiques et les listes de tâches.
 */
export function Markdown({ children }: { children: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>;
}
