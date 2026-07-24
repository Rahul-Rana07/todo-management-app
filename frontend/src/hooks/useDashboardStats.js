import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { collectionService } from "../services/collectionService";
import { todoService } from "../services/todoService";

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    collections: 0,
    todos: 0,
    completed: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      setLoading(true);

      const collections = await collectionService.getCollections();

      let totalTodos = 0;
      let completed = 0;
      let pending = 0;

      for (const collection of collections) {
        const response = await todoService.getTodos(collection._id);

        const todos = response.data;

        totalTodos += todos.length;

        completed += todos.filter((todo) => todo.done).length;

        pending += todos.filter((todo) => !todo.done).length;
      }

      setStats({
        collections: collections.length,
        todos: totalTodos,
        completed,
        pending,
      });

    } catch (err) {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    refreshStats: fetchStats,
  };
}