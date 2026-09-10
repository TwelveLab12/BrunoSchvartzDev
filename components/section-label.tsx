import { cn } from "@/lib/utils";

export function SectionLabel({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tag className={cn("text-muted font-mono text-[11.5px] tracking-[0.1em] uppercase", className)}>
      {children}
    </Tag>
  );
}
