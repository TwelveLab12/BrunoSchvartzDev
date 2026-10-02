/**
 * Vérification axe-core sur le rendu du site servi (`vrp build && vrp start`, puis `vrp a11y`).
 * Couche 2 de l'ADR 0016 : complète le lint `jsx-a11y` avec ce qu'il ne voit pas (contraste calculé,
 * landmarks réels, menu mobile ouvert). C'est un indicateur, pas une preuve de conformité — axe ne
 * lit pas les couleurs `oklch()` des pages Markdown (`color-contrast` reste alors « incomplet »),
 * et ne remplace ni le clavier, ni le lecteur d'écran (voir la checklist de CLAUDE.md).
 *
 * Variables d'environnement :
 *   BASE_URL            site à tester (défaut http://localhost:3000)
 *   PLAYWRIGHT_CHANNEL  navigateur installé à utiliser, ex. `chrome` en local (défaut : le Chromium
 *                       de Playwright, installé en CI par `playwright install chromium`)
 */
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const DESKTOP = { width: 1280, height: 800 };
const MOBILE = { width: 320, height: 640 };

let violationCount = 0;

/** `quiet` : n'affiche la page que si elle a des violations (pour les séries de pages). */
async function analyze(label, page, { quiet = false } = {}) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const incomplete = results.incomplete.reduce((sum, rule) => sum + rule.nodes.length, 0);
  const status = results.violations.length === 0 ? "OK " : "KO ";
  if (!quiet || results.violations.length > 0) {
    console.log(
      `${status} ${label} — ${results.violations.length} violation(s), ${incomplete} à vérifier à la main`,
    );
  }
  for (const violation of results.violations) {
    violationCount += violation.nodes.length;
    console.log(`     [${violation.impact}] ${violation.id} — ${violation.help}`);
    console.log(`     ${violation.helpUrl}`);
    for (const node of violation.nodes.slice(0, 3)) {
      console.log(`       ${node.target.join(" ")}`);
    }
  }
}

/** Ouvre `path` ; renvoie le `href` du premier lien correspondant à `selector`, s'il existe. */
async function firstHref(page, path, selector) {
  await page.goto(`${BASE_URL}${path}`);
  return page.locator(selector).first().getAttribute("href");
}

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL });

try {
  const desktop = await (await browser.newContext({ viewport: DESKTOP })).newPage();
  const mobile = await (await browser.newContext({ viewport: MOBILE })).newPage();

  await desktop.goto(`${BASE_URL}/`);
  await analyze("Accueil — 1280 px", desktop);

  await mobile.goto(`${BASE_URL}/`);
  await analyze("Accueil — 320 px, menu fermé", mobile);
  await mobile.getByRole("button", { name: /menu/i }).click();
  await analyze("Accueil — 320 px, menu ouvert", mobile);

  await desktop.goto(`${BASE_URL}/blog`);
  await analyze("Blog — liste", desktop);

  // Articles et ADR découverts depuis les listes plutôt que figés : rien à mettre à jour à la main.
  const articleHref = await firstHref(desktop, "/blog", 'main a[href^="/blog/"]');
  if (articleHref) {
    await desktop.goto(`${BASE_URL}${articleHref}`);
    await analyze(`Blog — article (${articleHref})`, desktop);
  }

  await desktop.goto(`${BASE_URL}/docs`);
  await analyze("Documentation — index", desktop);

  // Toutes les pages de /docs : ce sont des fichiers Markdown très différents (tableaux, blocs de
  // code, listes…) et un défaut de rendu n'apparaît que sur celle qui contient l'élément en cause.
  const docHrefs = await desktop
    .locator('main a[href^="/docs/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  const before = violationCount;
  for (const href of docHrefs) {
    await desktop.goto(`${BASE_URL}${href}`);
    await analyze(`Documentation — ${href}`, desktop, { quiet: true });
  }
  if (violationCount === before) {
    console.log(`OK  Documentation — ${docHrefs.length} pages, 0 violation(s)`);
  }

  await desktop.goto(`${BASE_URL}/page-inexistante`);
  await analyze("404", desktop);

  // Seules pages d'administration accessibles sans connexion ; le reste (liste, éditeur) demande
  // une session LinkedIn et n'est donc pas couvert ici.
  await desktop.goto(`${BASE_URL}/admin/login`);
  await analyze("Admin — connexion", desktop);
  await desktop.goto(`${BASE_URL}/admin/error`);
  await analyze("Admin — accès refusé", desktop);
} finally {
  await browser.close();
}

if (violationCount > 0) {
  console.error(`\n${violationCount} élément(s) en violation.`);
  process.exitCode = 1;
} else {
  console.log("\nAucune violation détectée par axe-core (ce n'est pas une preuve de conformité).");
}
