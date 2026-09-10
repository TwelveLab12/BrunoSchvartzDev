"use client";

import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
    >
      <Printer className="size-4" aria-hidden />
      {children}
    </button>
  );
}
