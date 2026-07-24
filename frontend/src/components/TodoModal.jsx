import { useEffect, useState } from "react";
import {Button} from "./UI/Button";
import {Input} from "./UI/Input";

export default function TodoModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  collectionId,
  editingTodo,
}) {
 const [title, setTitle] = useState("");

useEffect(() => {
  if (editingTodo) {
    setTitle(editingTodo.title);
  } else {
    setTitle("");
  }
}, [editingTodo, isOpen]);
  if (!isOpen) return null;

  async function handleSubmit(e) {
  e.preventDefault();

  if (!title.trim()) return;

  if (editingTodo) {
    await onUpdate(editingTodo._id, {
      title,
      done: editingTodo.done,
      collectionId,
    });
  } else {
    await onCreate({
      title,
      done: false,
      collectionId,
    });
  }

  setTitle("");
  onClose();
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-zinc-800 bg-[#17171C] p-5 shadow-2xl sm:p-6">

        <h2 className="text-xl font-bold text-white sm:text-2xl">
  {editingTodo ? "Edit Todo" : "Add Todo"}
</h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <Input
            label="Todo Title"
            placeholder="Learn React"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <Button
              type="button"
              className="bg-zinc-700 hover:bg-zinc-600"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              {editingTodo ? "Save" : "Create"}
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}