import {
  Check,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";

export default function TodoCard({
  todo,
  onDelete,
  onComplete,
  onEdit,
}) {
  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-[#17171C] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/5 sm:flex-row sm:items-center sm:justify-between sm:p-5">

      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">

        <button
          onClick={() => onComplete(todo._id)}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
            todo.done
              ? "border-green-500 bg-green-500"
              : "border-zinc-500 hover:border-amber-400"
          }`}
        >
          {todo.done && (
            <Check size={14} className="text-white" />
          )}
        </button>

        <div className="min-w-0">

          <h2
            className={`truncate text-lg font-semibold transition ${
              todo.done
                ? "text-zinc-500 line-through"
                : "text-white"
            }`}
          >
            {todo.title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
            <CalendarDays size={14} />

            <span>
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center justify-end gap-2">

        <button
          onClick={() => onEdit(todo)}
          className="rounded-lg p-2 transition hover:bg-zinc-800"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={() => onDelete(todo)}
          className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}