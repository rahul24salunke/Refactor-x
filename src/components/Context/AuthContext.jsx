import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reloading, setReloading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setReloading(false);
    }
  };

  const logout = async () => {
    await axios.post(
      `${import.meta.env.VITE_AUTH_API_URL}/api/v1/auth/logout`,
      {},
      { withCredentials: true }
    );
    toast.success("Logged out successfully");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, reloading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
