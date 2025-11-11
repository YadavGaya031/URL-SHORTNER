import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [totalUrls, setTotalUrls] = useState(0);
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user details + total links
  useEffect(() => {
    axiosClient
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setUpdatedName(res.data.user?.name || "");
      })
      .catch(() => {});

    axiosClient
      .post("/api/user/urls", {}, { withCredentials: true })
      .then((res) => {
        setTotalUrls(res.data.urls?.length || 0);
      })
      .catch(() => setTotalUrls(0));
  }, []);

  // Update name
  const handleNameUpdate = async () => {
    if (!updatedName.trim()) return toast.error("Name cannot be empty");

    setLoading(true);
    try {
      await axiosClient.put("/api/auth/update-name", { name: updatedName }, { withCredentials: true });
      toast.success("Name updated");
      setUser((prev) => ({ ...prev, name: updatedName }));
      setEditing(false);
    } catch {
      toast.error("Failed to update name");
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const handlePasswordChange = async () => {
    if (!passwords.oldPassword || !passwords.newPassword) {
      return toast.error("Please fill both password fields");
    }

    try {
      await axiosClient.put("/api/auth/change-password", passwords, { withCredentials: true });
      toast.success("Password updated. Please Login again");
      setPasswords({ oldPassword: "", newPassword: "" });
      setTimeout(()=>{
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      await axiosClient.delete("/api/auth/delete-account", { withCredentials: true });
      toast.success("Account deleted");
      navigate("/");
    } catch {
      toast.error("Couldn't delete account");
    }
  };

  if (!user) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      {/* User Info */}
      <div className="bg-neutral-900 p-5 rounded-lg border border-white/10 mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Total Links Created:</strong> {totalUrls}</p>

        {editing ? (
          <div className="mt-4 flex items-center gap-2">
            <Input
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="bg-neutral-800 border-white/20 text-white"
            />
            <Button onClick={handleNameUpdate} disabled={loading}>Save</Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        ) : (
          <Button className="mt-4" onClick={() => setEditing(true)}>Edit Name</Button>
        )}
      </div>

      {/* Change Password */}
      <div className="bg-neutral-900 p-5 rounded-lg border border-white/10 mb-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <div className="flex flex-col gap-3">
          <Input
            type="password"
            placeholder="Old Password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
            className="bg-neutral-800 border-white/20"
          />
          <Input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            className="bg-neutral-800 border-white/20"
          />
          <Button onClick={handlePasswordChange}>Update Password</Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-neutral-900 p-5 rounded-lg border border-red-400/40">
        <h2 className="text-xl font-semibold text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-white/70 mb-4">Deleting your account will remove all your data permanently.</p>
        <Button variant="destructive" onClick={handleDeleteAccount}>Delete My Account</Button>
      </div>
    </div>
  );
}
