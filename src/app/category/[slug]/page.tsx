import { notFound } from "next/navigation";
import Link from "next/link";

// Simple placeholder: In a real app you'd fetch products filtered by category slug.
const allowed = new Set([
  "plant-pots",
  "ceramics",
  "tables",
  "chairs",
  "crockery",
  "tableware",
  "cutlery",
]);

interface Props {
  params: { slug: string };
}

export default function CategoryPage({ params }: Props) {
  const { slug } = params;
  if (!allowed.has(slug)) return notFound();

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 mb-2">
            {title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            This is a placeholder category page for <strong>{title}</strong>. Add your product listing grid or server data fetching logic here.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border border-slate-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-sm"
            >
              <span className="font-semibold">Product {i + 1}</span>
              <span className="text-xs opacity-70">Coming soon</span>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 via-indigo-300 to-amber-300 text-slate-900 font-semibold text-sm px-5 py-2 shadow-sm hover:shadow-md transition active:translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
