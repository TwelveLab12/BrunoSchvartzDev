import { caseStudies, caseStudyLabels } from "@/content/profile";
import { cn } from "@/lib/utils";

type Diagram = (typeof caseStudies)[number]["diagram"];
type NinkasiDiagram = Extract<Diagram, { kind: "ninkasi" }>;
type MedikioskDiagram = Extract<Diagram, { kind: "medikiosk" }>;

/**
 * Bloc du schéma : trait accent = mon périmètre, pointillés = hors périmètre, double contour sombre
 * sur fond grisé = infrastructure. Chaque variante se distingue par sa forme, pas seulement par sa
 * couleur (WCAG 1.4.1), et figure dans la légende (`caseStudyLabels`).
 *
 * Contrastes des contours sur le fond de la figure (WCAG 1.4.11, ≥ 3:1), mesurés sur le rendu :
 * mine 4,6:1, others 3,7:1, infra 7,1:1. Axe ne mesure ni les tracés SVG ni le texte des schémas :
 * à recalculer à la main si l'on touche aux opacités ou aux couleurs.
 * Sous-titres en `ink-muted` : ≥ 7:1 sur les trois fonds (`muted` tombait à 4,35:1 sur infra).
 */
type NodeVariant = "mine" | "others" | "infra";

/** Variantes dessinées par chaque schéma : la légende n'affiche que celles qu'on y voit. */
const variantsDrawn: Record<Diagram["kind"], readonly NodeVariant[]> = {
  ninkasi: ["mine", "others", "infra"],
  medikiosk: ["mine", "others"],
};

const nodeVariants: Record<NodeVariant, string> = {
  mine: "fill-white stroke-accent",
  others: "fill-none stroke-ink/55 [stroke-dasharray:4_3]",
  infra: "fill-ink/5 stroke-ink-muted",
};

/** Second contour, 3 px à l'intérieur : ce qui distingue l'infrastructure sans passer par la couleur. */
function InfraInnerOutline({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <rect
      x={x + 3.5}
      y={y + 3.5}
      width={width - 7}
      height={height - 7}
      rx={2}
      className="stroke-ink-muted fill-none stroke-[1]"
    />
  );
}

function Node({
  x,
  y,
  width,
  height = 60,
  variant,
  title,
  sub,
}: {
  x: number;
  y: number;
  width: number;
  height?: number;
  variant: NodeVariant;
  title: string;
  sub: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        className={cn("stroke-[1.5]", nodeVariants[variant])}
      />
      {variant === "infra" ? <InfraInnerOutline x={x} y={y} width={width} height={height} /> : null}
      <text x={x + 14} y={y + 25} className="fill-ink font-sans text-[13px] font-semibold">
        {title}
      </text>
      <text x={x + 14} y={y + 44} className="fill-ink-muted font-mono text-[11px]">
        {sub}
      </text>
    </g>
  );
}

function Edge({
  d,
  dashed,
  id,
  both,
}: {
  d: string;
  dashed?: boolean;
  id: string;
  both?: boolean;
}) {
  return (
    <path
      d={d}
      markerEnd={`url(#${id})`}
      markerStart={both ? `url(#${id})` : undefined}
      className={cn("stroke-ink-muted fill-none stroke-[1.3]", dashed && "[stroke-dasharray:5_4]")}
    />
  );
}

function EdgeLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} className="fill-ink-muted font-mono text-[11px]">
      {children}
    </text>
  );
}

function ArrowMarker({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX={9}
        refY={5}
        markerWidth={7}
        markerHeight={7}
        orient="auto-start-reverse"
      >
        <path d="M0,0 L10,5 L0,10 z" className="fill-ink-muted" />
      </marker>
    </defs>
  );
}

function NinkasiSvg({ diagram }: { diagram: NinkasiDiagram }) {
  const { nodes, edges } = diagram;
  const arrow = "arrow-ninkasi";
  return (
    <>
      <ArrowMarker id={arrow} />
      <Node x={10} y={20} width={170} variant="mine" {...nodes.console} />
      <Node x={10} y={200} width={170} variant="others" {...nodes.backend} />
      <Node x={270} y={200} width={180} variant="infra" {...nodes.hub} />
      <Node x={270} y={20} width={180} variant="mine" {...nodes.players} />
      <Edge id={arrow} d="M95 80 V196" />
      <EdgeLabel x={103} y={140}>
        {edges.actions}
      </EdgeLabel>
      <EdgeLabel x={103} y={155}>
        {edges.actionsVia}
      </EdgeLabel>
      <Edge id={arrow} d="M180 230 H266" />
      <EdgeLabel x={198} y={222}>
        {edges.publish}
      </EdgeLabel>
      <Edge id={arrow} d="M360 200 V84" />
      <EdgeLabel x={368} y={140}>
        {edges.sse}
      </EdgeLabel>
      <Edge id={arrow} dashed d="M300 200 C 300 140, 220 110, 184 70" />
      <EdgeLabel x={205} y={118}>
        {edges.sse}
      </EdgeLabel>
    </>
  );
}

function MedikioskSvg({ diagram }: { diagram: MedikioskDiagram }) {
  const { nodes, edges } = diagram;
  const arrow = "arrow-medikiosk";
  return (
    <>
      <ArrowMarker id={arrow} />
      <Node x={10} y={20} width={190} variant="mine" {...nodes.app} />
      <Node x={260} y={20} width={190} variant="mine" {...nodes.worker} />
      <Node x={10} y={130} width={190} variant="mine" {...nodes.store} />
      <Node x={10} y={232} width={190} height={56} variant="others" {...nodes.api} />
      <Node x={260} y={232} width={190} height={56} variant="others" {...nodes.admin} />
      <Edge id={arrow} both d="M105 84 V126" />
      <EdgeLabel x={114} y={110}>
        {edges.readWrite}
      </EdgeLabel>
      <Edge id={arrow} dashed d="M105 228 V194" />
      <EdgeLabel x={114} y={215}>
        {edges.sync}
      </EdgeLabel>
      <Edge id={arrow} d="M256 50 H204" />
      <EdgeLabel x={212} y={42}>
        {edges.serves}
      </EdgeLabel>
      <Edge id={arrow} dashed d="M256 260 H204" />
    </>
  );
}

export function CaseStudyDiagram({ diagram }: { diagram: Diagram }) {
  return (
    <figure className="border-rule-soft bg-ink/[0.035] m-0 min-w-0 self-start rounded border p-[18px]">
      {/* Largeur minimale : sur mobile, le schéma défile plutôt que de réduire ses textes à ~7px.
          La zone défilante est focalisable et nommée pour que le clavier puisse la faire défiler
          (WCAG 2.1.1). `group` plutôt que `region` : deux schémas portent le même nom, et un
          `region` identique en double polluerait la liste des repères (axe `landmark-unique`). */}
      <div
        className="overflow-x-auto"
        role="group"
        aria-label={caseStudyLabels.scrollRegion}
        // Le lint refuse tabIndex sur un élément non interactif ; ici c'est voulu (axe
        // `scrollable-region-focusable`).
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <svg
          viewBox="0 0 460 300"
          role="img"
          aria-label={diagram.description}
          className="block h-auto w-full min-w-[400px]"
        >
          {diagram.kind === "ninkasi" ? (
            <NinkasiSvg diagram={diagram} />
          ) : (
            <MedikioskSvg diagram={diagram} />
          )}
        </svg>
      </div>
      <figcaption className="text-muted mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="border-accent inline-block h-2.5 w-3.5 rounded-sm border-[1.5px] bg-white"
          />
          {caseStudyLabels.legendMine}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            aria-hidden
            className="border-ink/55 inline-block h-2.5 w-3.5 rounded-sm border-[1.5px] border-dashed"
          />
          {caseStudyLabels.legendOthers}
        </span>
        {variantsDrawn[diagram.kind].includes("infra") ? (
          <span className="inline-flex items-center gap-1.5">
            {/* Même double contour que les blocs du schéma, à l'échelle de la légende. */}
            <svg aria-hidden viewBox="0 0 14 10" className="inline-block h-2.5 w-3.5">
              <rect
                x={0.75}
                y={0.75}
                width={12.5}
                height={8.5}
                rx={1.5}
                className="fill-ink/5 stroke-ink-muted stroke-[1.2]"
              />
              <rect
                x={3}
                y={3}
                width={8}
                height={4}
                rx={0.8}
                className="stroke-ink-muted fill-none stroke-[1]"
              />
            </svg>
            {caseStudyLabels.legendInfra}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
