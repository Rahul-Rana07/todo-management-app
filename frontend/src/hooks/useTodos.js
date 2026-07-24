import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { todoService } from "../services/todoService";

export default function useTodos(collectionId) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTodos() {
    try {
      setLoading(true);

      const response = await todoService.getTodos(collectionId);

      setTodos(response.data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load todos"
      );
    } finally {
      setLoading(false);
    }
  }

async function createTodo(data) {
  try {
    await todoService.createTodo(data);

    toast.success("Todo Added");

    await fetchTodos();
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Unable to create todo"
    );
  }
}

async function updateTodo(id, data) {
  try {
    await todoService.updateTodo(id, data);

    toast.success("Todo Updated");

    await fetchTodos();
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Update failed"
    );
  }
}

  async function deleteTodo(id) {
    try {
      await todoService.deleteTodo(id);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));

      toast.success("Todo Deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  async function toggleComplete(id) {
    try {
      await todoService.completeTodo(id);

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id
            ? { ...todo, done: !todo.done }
            : todo
        )
      );
    } catch {
      toast.error("Unable to update");
    }
  }

  useEffect(() => {
    if (collectionId) {
      fetchTodos();
    }
  }, [collectionId]);

  return {
  todos,
  loading,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
  fetchTodos,
};
}