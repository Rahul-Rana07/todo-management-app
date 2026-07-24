import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    try {
      const response = await api.get("/me");
      setUser(response.data);
    } catch {
      logout();
    }
  }

  async function login(jwt) {
    localStorage.setItem("token", jwt);
    setToken(jwt);
    await fetchProfile();
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    async function init() {
      if (token) {
        await fetchProfile();
      }
      setLoading(false);
    }

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);