export default function SkeletonTodo() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-800 bg-[#17171C] p-5">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="h-6 w-6 rounded-full bg-zinc-700"></div>

          <div>
            <div className="mb-2 h-5 w-48 rounded bg-zinc-700"></div>
            <div className="h-3 w-24 rounded bg-zinc-800"></div>
          </div>

        </div>

        <div className="flex gap-2">

          <div className="h-9 w-9 rounded-lg bg-zinc-700"></div>

          <div className="h-9 w-9 rounded-lg bg-zinc-700"></div>

        </div>

      </div>

    </div>
  );
}