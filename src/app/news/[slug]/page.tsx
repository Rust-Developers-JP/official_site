import { getPostBySlug, getAllPosts, Post } from "@/lib/posts";
import { forbidden } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function News({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post: Post = getPostBySlug(slug);
  if (!post) {
    forbidden();
  }
  return (
    <main className="min-h-[60vh]">
      {/* ヘッダーセクション */}
      <section className="w-full">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            <h1>{post.title}</h1>
            <div>
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                投稿日: {new Date(post.date).toLocaleDateString("ja-JP")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 記事本文 */}
      <article className="max-w-4xl w-full px-6 py-12 min-h-[50vh]">
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* 最近のアナウンス */}
      {/*<section className="w-full py-16 bg-gradient-to-br from-slate-50/50 via-white to-slate-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold font-sansen mb-8 text-center animate-fadeInUp">
            最近のアナウンス
          </h2>
          <PostList
            posts={posts}
            dirname="announce"
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden animate-fadeInUp animation-delay-300"
          />
          <div className="text-center mt-8 animate-fadeInUp animation-delay-500">
            <Button
              href="/announce"
              className="border border-slate-200 bg-white hover:bg-slate-50 hover:scale-105 transition-all"
            >
              一覧を見る
            </Button>
          </div>
        </div>
      </section> */}
    </main>
  );
}
