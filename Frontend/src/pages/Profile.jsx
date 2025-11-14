import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Magnet from "@/components/animation/Magnet";

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

  const initials = (user?.name || "U")
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div className="container mx-auto px-4 py-10 bg-linear-to-b from-slate-800/70 to-slate-700 max-w-full">
      <div className="max-w-6xl mx-auto mt-24">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">My Profile</h1>
          <p className="mt-2 text-white/70">Manage your account, security, and subscription details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - profile card */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-slate-900/60 border border-white/6 p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatarUrl || ""} />
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold text-white">{user.name}</h2>
                  <p className="text-sm text-white/60">{user.email}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white/3 p-3 text-center">
                  <div className="text-xs text-white/70">Role</div>
                  <div className="mt-1 font-medium text-white capitalize">{user.role}</div>
                </div>
                <div className="rounded-lg bg-white/3 p-3 text-center">
                  <div className="text-xs text-white/70">Member since</div>
                  <div className="mt-1 font-medium text-white">{new Date(user.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="rounded-lg bg-white/3 p-3 text-center col-span-2">
                  <div className="text-xs text-white/70">Total links created</div>
                  <div className="mt-1 text-2xl font-extrabold text-indigo-300">{totalUrls}</div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => setEditing((s) => !s)}
                  className="w-full rounded-lg px-4 py-2 bg-linear-to-br from-indigo-500 to-purple-500 text-white font-semibold hover:brightness-110 transition"
                >
                  {editing ? "Cancel Edit" : "Edit Display Name"}
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full rounded-lg px-4 py-2 bg-white/6 text-white hover:bg-white/8 transition"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </aside>

          {/* Right column - controls */}
          <main className="lg:col-span-2 space-y-6">
            {/* Edit name card */}
            <div className="rounded-2xl bg-slate-900/60 border border-white/6 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Account</h3>
                <div className="text-sm text-white/70">Credits: <span className="text-indigo-300 font-medium">{user.credits}</span> • Plan: <span className="capitalize">{user.plan}</span></div>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-white/70 mb-2">Display name</label>

                {editing ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Input
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      className="flex-1 bg-slate-800 border-white/20 text-white"
                      placeholder="Your name"
                    />
                    <Button onClick={handleNameUpdate} disabled={loading} className="mt-2 sm:mt-0">
                      {loading ? "Saving..." : "Save"}
                    </Button>
                    <Button onClick={() => { setEditing(false); setUpdatedName(user.name); }} variant="ghost" className="mt-2 sm:mt-0">
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-white/80">{user.name}</div>
                    <button onClick={() => setEditing(true)} className="text-sm text-indigo-300 hover:underline">Change</button>
                  </div>
                )}
              </div>
            </div>

            {/* Change password */}
            <div className="rounded-2xl bg-slate-900/60 border border-white/6 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-white">Change Password</h3>
              <p className="text-sm text-white/70 mt-1">Keep your account secure. You will be asked to re-login after password change.</p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  type="password"
                  placeholder="Old Password"
                  value={passwords.oldPassword}
                  onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                  className="bg-slate-800 border-white/20 text-white"
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="bg-slate-800 border-white/20 text-white"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <Button onClick={handlePasswordChange}>Update Password</Button>
                <Button variant="ghost" onClick={() => setPasswords({ oldPassword: "", newPassword: "" })}>Clear</Button>
              </div>
            </div>

            {/* Danger zone */}
            <div className="rounded-2xl bg-linear-to-b from-rose-900/30 to-slate-900/40 border border-red-500/30 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-red-300">Danger Zone</h3>
                  <p className="text-sm text-white/70 mt-1">Deleting your account will remove all your data permanently.</p>
                </div>
                <div>
                  <Magnet>
                    <Button variant="destructive" onClick={handleDeleteAccount}>Delete My Account</Button>
                  </Magnet>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
