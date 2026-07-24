import api from "./api";

export const collectionService = {
  getCollections: async () => {
    const response = await api.get("/collections");
    return response.data;
  },

  createCollection: async (data) => {
    const response = await api.post("/collection", data);
    return response.data;
  },

  deleteCollection: async (id) => {
    const response = await api.delete(`/collection/${id}`);
    return response.data;
  },
};