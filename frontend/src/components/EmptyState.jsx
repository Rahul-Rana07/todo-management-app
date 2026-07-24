import { FolderOpen } from "lucide-react";

export default function EmptyState({ onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-[#17171C] p-16 text-center">
      <FolderOpen
        size={60}
        className="mb-6 text-zinc-500"
      />

      <h2 className="text-2xl font-semibold text-white">
        No Collections Yet
      </h2>

      <p className="mt-2 text-zinc-400">
        Create your first collection to organize your todos.
      </p>

      <button
        onClick={onCreate}
        className="mt-8 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-black transition hover:bg-amber-300"
      >
        Create Collection
      </button>
    </div>
  );
}