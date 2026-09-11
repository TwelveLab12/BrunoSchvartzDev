import type { Metadata } from "next";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { buttonVariants, ButtonLink } from "@/components/ui/button";
import { listAdminPosts } from "@/lib/github-content";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();
  const identity = session?.user?.name ?? session?.user?.email ?? "propriétaire du site";
  const posts = await listAdminPosts();

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">Admin</p>
          <h1 className="m-0 mt-4 font-serif text-[clamp(40px,7vw,72px)] leading-[1.05] font-normal tracking-[-0.02em]">
            Articles
          </h1>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button type="submit" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Se déconnecter
          </button>
        </form>
      </div>
      <p className="text-ink-muted mt-4">Connecté en tant que {identity}.</p>

      <div className="mt-10">
        <ButtonLink href="/admin/posts/new">Nouvel article</ButtonLink>
      </div>

      <ul className="divide-ink/10 mt-10 divide-y">
        {posts.length === 0 && <p className="text-muted">Aucun article pour l&apos;instant.</p>}
        {posts.map((post) => (
          <li key={post.slug} className="py-4">
            <Link href={`/admin/posts/${post.slug}`} className="font-medium">
              {post.title}
            </Link>
            <p className="text-muted mt-1 text-sm">
              {post.date} — {post.status === "published" ? "Publié" : "Brouillon"}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
