import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState("loading"); 

  useEffect(() => {
    axiosClient
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => {
        if (res.data.user?.role === "admin") setStatus("allowed");
        else setStatus("denied");
      })
      .catch(() => setStatus("denied"));
  }, []);

  if (status === "loading") return <p className="text-white text-center mt-10">Checking admin access...</p>;

  return status === "allowed" ? children : <Navigate to="/" />;
}
