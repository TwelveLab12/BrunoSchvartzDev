import type { Metadata } from "next";
import { PostEditor } from "@/app/admin/posts/post-editor";

export const metadata: Metadata = {
  title: "Nouvel article",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <main className="mx-auto max-w-[960px] px-6 py-16">
      <p className="text-muted font-mono text-xs tracking-[0.1em] uppercase">Admin</p>
      <h1 className="m-0 mt-4 font-serif text-[clamp(32px,5vw,56px)] leading-[1.05] font-normal tracking-[-0.02em]">
        Nouvel article
      </h1>
      <PostEditor className="mt-10" />
    </main>
  );
}
