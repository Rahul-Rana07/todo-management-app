import { useState } from "react";
import {Button} from "./UI/Button";
import {Input} from "./UI/Input";

export default function CreateCollectionModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    onCreate({
      name,
      icon: "📁",
    });

    setName("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="mx-4 w-full max-w-md rounded-2xl border border-zinc-800 bg-[#17171C] p-5 shadow-2xl sm:p-6">

        <h2 className="text-xl font-bold text-white sm:text-2xl">
          New Collection
        </h2>

        <p className="mt-1 text-zinc-400">
          Create a collection for your todos.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <Input
            label="Collection Name"
            placeholder="Work"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row">

            <Button
                type="button"
                className="bg-zinc-700 text-white hover:bg-zinc-600"
                onClick={() => {
                    setName("");
                    onClose();
                }}
            >   
                Cancel
            </Button>

            <Button type="submit">
              Create
            </Button>

          </div>

        </form>

      </div>

    </div>
  );
}