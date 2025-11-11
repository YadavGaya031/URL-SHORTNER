import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await axiosClient.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
        <div className="h-10 w-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
