import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null); 

  useEffect(() => {
    axiosClient
      .get("/api/auth/me", { withCredentials: true })
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p className="text-white text-center mt-10">Loading...</p>;

  return auth ? children : <Navigate to="/login" />;
}
