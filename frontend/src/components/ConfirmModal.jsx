import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-[90%] max-w-md rounded-2xl border border-zinc-800 bg-[#17171C] p-6">

        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-full bg-red-500/20 p-3">
            <AlertTriangle className="text-red-500" size={24} />
          </div>

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        <p className="mb-8 text-zinc-400">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-2 text-white transition hover:bg-zinc-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}