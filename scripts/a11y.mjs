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

async function analyze(label, page) {
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  const incomplete = results.incomplete.reduce((sum, rule) => sum + rule.nodes.length, 0);
  const status = results.violations.length === 0 ? "OK " : "KO ";
  console.log(
    `${status} ${label} — ${results.violations.length} violation(s), ${incomplete} à vérifier à la main`,
  );
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

  const adrHref = await firstHref(desktop, "/docs", 'main a[href^="/docs/adr/"]');
  if (adrHref) {
    await desktop.goto(`${BASE_URL}${adrHref}`);
    await analyze(`Documentation — ADR (${adrHref})`, desktop);
  }

  await desktop.goto(`${BASE_URL}/page-inexistante`);
  await analyze("404", desktop);
} finally {
  await browser.close();
}

if (violationCount > 0) {
  console.error(`\n${violationCount} élément(s) en violation.`);
  process.exitCode = 1;
} else {
  console.log("\nAucune violation détectée par axe-core (ce n'est pas une preuve de conformité).");
}
