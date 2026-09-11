import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdminPost } from "@/lib/github-content";
import { PostEditor } from "@/app/admin/posts/post-editor";
import { DeletePostButton } from "@/app/admin/posts/delete-post-button";

export const metadata: Metadata = {
  title: "Modifier l'article",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getAdminPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-[960px] px-6 py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">Admin</p>
          <h1 className="m-0 mt-4 font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] font-normal tracking-[-0.02em]">
            Modifier l&apos;article
          </h1>
        </div>
        <DeletePostButton slug={post.slug} sha={post.sha} />
      </div>
      <PostEditor post={post} className="mt-10" />
    </main>
  );
}
