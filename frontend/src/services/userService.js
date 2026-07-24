import api from "./api";

export const userService = {
  getProfile: async () => {
    const response = await api.get("/me");
    return response.data;
  },
};