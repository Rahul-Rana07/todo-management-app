import { Folder, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CollectionCard({
  collection,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/collection/${collection._id}`)}
      className="group cursor-pointer rounded-2xl border border-zinc-800 bg-[#17171C] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">

        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">

          <div className="rounded-xl bg-amber-400 p-3 text-black">
            <Folder size={22} />
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
              {collection.name}
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Click to open
            </p>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          <ChevronRight
            size={18}
            className="hidden text-zinc-500 transition group-hover:translate-x-1 sm:block"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(collection);
            }}
            className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </div>
  );
}