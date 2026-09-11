import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";
import { authConfig } from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // Un seul utilisateur autorisé : le propriétaire du site. Comparé avant
    // toute création de session — un mauvais compte LinkedIn n'obtient jamais
    // de JWT (voir docs/adr/0012-admin-401-403-scope.md).
    signIn({ profile }) {
      return Boolean(profile?.sub) && profile?.sub === process.env.AUTH_LINKEDIN_ALLOWED_SUB;
    },
    jwt({ token, profile }) {
      if (profile) {
        token.name = profile.name;
        token.email = profile.email;
      }
      return token;
    },
    session({ session, token }) {
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      return session;
    },
  },
});
