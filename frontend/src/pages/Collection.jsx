import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search } from "lucide-react";

import useTodos from "../hooks/useTodos";
import TodoCard from "../components/TodoCard";
import TodoModal from "../components/TodoModal";
import ConfirmModal from "../components/ConfirmModal";
import SkeletonTodo from "../components/skeletons/SkeletonTodo";

export default function Collection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
const [selectedTodo, setSelectedTodo] = useState(null);
  const [search, setSearch] = useState("");

  const {
    todos,
    loading,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  } = useTodos(id);

  function handleAddTodo() {
    setEditingTodo(null);
    setOpen(true);
  }

  function handleEditTodo(todo) {
    setEditingTodo(todo);
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
    setEditingTodo(null);
  }

  function handleDeleteClick(todo) {
  setSelectedTodo(todo);
  setConfirmOpen(true);
}

async function handleConfirmDelete() {
  if (!selectedTodo) return;

  await deleteTodo(selectedTodo._id);

  setConfirmOpen(false);
  setSelectedTodo(null);
}

  const filteredTodos = useMemo(() => {
  return todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );
}, [todos, search]);

  if (loading) {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">

        <div className="space-y-4">
          <SkeletonTodo />
          <SkeletonTodo />
          <SkeletonTodo />
          <SkeletonTodo />
        </div>

      </div>
    </div>
  );
}
console.log("Search:", search);
console.log(todos);
  return (
    <div className="min-h-screen bg-[#09090B]">
      <div className="mx-auto max-w-5xl p-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mb-3 flex items-center gap-2 text-zinc-400 hover:text-white"
            >
              <ArrowLeft size={18} />
              Dashboard
            </button>

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Todos
            </h1>
          </div>

          <button
            onClick={handleAddTodo}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-semibold text-black transition hover:bg-amber-300 sm:w-auto"
          >
            <Plus size={18} />
            Add Todo
          </button>

        </div>
        <div className="relative mb-6 sm:mb-8">
  <Search
    size={18}
    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
  />

  <input
    type="text"
    placeholder="Search todos..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-xl border border-zinc-800 bg-[#17171C] py-3 pl-12 pr-4 text-sm text-white outline-none transition focus:border-amber-400 sm:text-base"
  />
</div>

        {/* Todo List */}

        {filteredTodos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-6 text-center text-zinc-500 sm:p-12">
            {search
  ? "No matching todos found."
  : "No Todos Yet"}
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredTodos.map((todo) => (
              <TodoCard
    key={todo._id}
    todo={todo}
    onDelete={handleDeleteClick}
    onComplete={toggleComplete}
    onEdit={handleEditTodo}
/>
            ))}
          </div>
        )}

      </div>

      <TodoModal
        isOpen={open}
        onClose={handleCloseModal}
        onCreate={createTodo}
        onUpdate={updateTodo}
        collectionId={id}
        editingTodo={editingTodo}
      />

      <ConfirmModal
  isOpen={confirmOpen}
  onClose={() => {
    setConfirmOpen(false);
    setSelectedTodo(null);
  }}
  onConfirm={handleConfirmDelete}
  title="Delete Todo"
  message={
    selectedTodo
      ? `Are you sure you want to delete "${selectedTodo.title}"?`
      : ""
  }
/>
    </div>
  );
}