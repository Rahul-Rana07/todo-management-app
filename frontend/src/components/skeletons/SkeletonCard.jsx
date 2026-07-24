export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-800 bg-[#17171C] p-6">

      <div className="mb-5 h-6 w-2/3 rounded bg-zinc-700"></div>

      <div className="mb-3 h-4 w-full rounded bg-zinc-800"></div>

      <div className="h-4 w-1/2 rounded bg-zinc-800"></div>

    </div>
  );
}