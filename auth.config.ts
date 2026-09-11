import type { NextAuthConfig } from "next-auth";

/**
 * Config sans provider, consommée par middleware.ts (Edge) et étendue par
 * auth.ts (Node, ajoute le provider LinkedIn) — pattern split-config d'Auth.js
 * v5 pour ne jamais faire charger de code spécifique à un provider sur l'Edge.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
    error: "/admin/error",
  },
  providers: [],
} satisfies NextAuthConfig;
