import { personalProjects, type Project } from "@/content/projects";

export type Figure = { value: string; label: string };

const API = "https://api.github.com";

function repoOf(project: Project): string | undefined {
  return new URL(project.links.repository).pathname.slice(1).replace(/\/$/, "") || undefined;
}

async function github(path: string): Promise<unknown> {
  const token = process.env.GITHUB_CONTENT_TOKEN;
  const response = await fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "force-cache",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`GitHub ${response.status} sur ${path}`);
  return response.json();
}

/**
 * Chiffres clés d'un projet, lus sur son dépôt GitHub au build plutôt que saisis à la main
 * (CLAUDE.md : « derived facts… computed at build time »). Une réponse indisponible, une limite
 * de débit atteinte par exemple, retire le chiffre concerné : le site se construit quand même.
 */
export async function getProjectFigures(project: Project): Promise<Figure[]> {
  const repo = repoOf(project);
  if (!repo) return [];

  const [adrCount, pullRequests] = await Promise.all([
    github(`/repos/${repo}/contents/docs/adr`).then(
      (entries) =>
        Array.isArray(entries)
          ? entries.filter((e) => /^\d{4}-.+\.md$/.test(String(e?.name))).length
          : undefined,
      () => undefined,
    ),
    github(
      `/search/issues?q=${encodeURIComponent(`repo:${repo} is:pr is:merged`)}&per_page=1`,
    ).then(
      (result) => (result as { total_count?: number }).total_count,
      () => undefined,
    ),
  ]);

  const figures: Figure[] = [];
  if (adrCount) figures.push({ value: String(adrCount), label: personalProjects.figureLabels.adr });
  if (pullRequests) {
    figures.push({
      value: String(pullRequests),
      label: personalProjects.figureLabels.pullRequests,
    });
  }
  return figures;
}
