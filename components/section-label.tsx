import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted",
        className,
      )}
    >
      {children}
    </div>
  );
}
