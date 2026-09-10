import { cn } from "@/lib/utils";

/** "Schvartz" — avec un v, pas un w. Le v porte l'accent de la marque. */
export function Wordmark({
  className,
  vClassName = "text-accent",
  first = "Bruno",
}: {
  className?: string;
  vClassName?: string;
  first?: string | false;
}) {
  return (
    <span className={cn(className)}>
      {first ? `${first} ` : null}Sch<span className={cn("font-medium", vClassName)}>v</span>artz
    </span>
  );
}
