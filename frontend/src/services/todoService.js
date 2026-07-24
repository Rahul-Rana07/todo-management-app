import api from "./api";

export const todoService = {
  getTodos(collectionId) {
    return api.get(`/collection/${collectionId}/todos`);
  },

  createTodo(data) {
    return api.post("/todo", data);
  },

  updateTodo(id, data) {
    return api.put(`/todo/${id}`, data);
  },

  completeTodo(id) {
    return api.patch(`/todo/${id}/complete`);
  },

  deleteTodo(id) {
    return api.delete(`/todo/${id}`);
  },
};