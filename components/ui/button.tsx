import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center gap-2 rounded-sm text-sm font-medium tracking-[0.01em] no-underline transition-colors",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-accent hover:text-white",
        outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink/[0.04]",
      },
      size: {
        md: "px-6 py-4",
        sm: "px-4 py-2.5",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type ButtonLinkProps = React.ComponentPropsWithoutRef<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
