import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const frenchDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Formate une date `YYYY-MM-DD` en « 21 septembre 2026 ». */
export function formatDate(isoDate: string): string {
  return frenchDate.format(new Date(isoDate));
}
