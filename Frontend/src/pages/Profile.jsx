import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import Magnet from "@/components/animation/Magnet";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Crown,
  ArrowUpRight,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [totalUrls, setTotalUrls] = useState(0);

  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [showPwd, setShowPwd] = useState({ old: false, next: false });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const rootRef = useRef(null);
  const statsRef = useRef(null);

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
      .then((res) => setTotalUrls(res.data.urls?.length || 0))
      .catch(() => setTotalUrls(0));
  }, []);

  // GSAP animations
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = isReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
      });
      gsap.from("[data-stat]", {
        scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
      gsap.from("[data-card]", {
        scrollTrigger: { trigger: rootRef.current, start: "top 70%", once: true },
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
      });

      if (reduced) return;

      gsap.to(".gradient-blob", {
        x: "random(-40,40)",
        y: "random(-30,30)",
        duration: "random(16,24)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 2, from: "random" },
      });
    }, rootRef);

    return () => ctx.revert();
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
      setTimeout(() => {
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

  if (!user) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-zinc-300">
        Loading...
      </div>
    );
  }

  const initials = (user?.name || "U")
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const StatCard = ({ label, value, cta }) => (
    <Card
      data-stat
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b22_0deg,#f43f5e22_120deg,#10b98122_240deg,#f59e0b22_360deg)] opacity-70"
      />
      <CardHeader className="relative z-[1] pb-2">
        <CardTitle className="text-xs uppercase tracking-wider text-zinc-400">{label}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-[1] flex items-center justify-between">
        <div className="text-2xl md:text-3xl font-semibold text-gray-100">{value}</div>
        {cta}
      </CardContent>
    </Card>
  );

  const memberSince = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—";
  const isFree = (user?.plan || "free") === "free";

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-zinc-100"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-blob absolute -top-24 left-1/3 w-[36rem] h-[36rem] rounded-full blur-3xl bg-amber-500/15" />
        <div className="gradient-blob absolute bottom-[-16rem] right-1/5 w-[42rem] h-[42rem] rounded-full blur-3xl bg-rose-500/15" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1f_1px,transparent_1px),linear-gradient(to_bottom,#71717a1f_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-14">
        {/* Header */}
        <div className="mb-6 text-center max-w-3xl mx-auto" data-hero>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
            <Sparkles className="h-4 w-4" />
            Profile
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold">My Profile</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Manage your account, security, and subscription details.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Plan"
            value={
              <span className="inline-flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-300" />
                <span className="capitalize">{user.plan}</span>
              </span>
            }
            cta={
              isFree && (
                <Button size="sm" variant="outline" onClick={() => navigate("/pricing")}>
                  Upgrade <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              )
            }
          />
          <StatCard
            label="Credits"
            value={user.credits ?? "—"}
            cta={
              (user?.credits ?? 0) <= 0 && (
                <Button size="sm" variant="outline" onClick={() => navigate("/pricing")}>
                  Buy credits <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              )
            }
          />
          <StatCard label="Total links" value={totalUrls} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - profile card */}
          <aside className="lg:col-span-1" data-card>
            <Card className="relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur rounded-3xl">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b22_0deg,#f43f5e22_120deg,#10b98122_240deg,#f59e0b22_360deg)] opacity-70"
              />
              <CardContent className="relative z-[1] p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-white/10">
                    <AvatarImage src={user.avatarUrl || ""} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-100">{user.name}</h2>
                    <p className="text-sm text-zinc-400">{user.email}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/10 bg-neutral-900/60 p-3 text-center">
                    <div className="text-xs text-zinc-400">Role</div>
                    <div className="mt-1 font-medium capitalize text-gray-100">{user.role}</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-neutral-900/60 p-3 text-center">
                    <div className="text-xs text-zinc-400">Member since</div>
                    <div className="mt-1 font-medium text-gray-100">{memberSince}</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-neutral-900/60 p-3 text-center col-span-2">
                    <div className="text-xs text-zinc-400">Total links created</div>
                    <div className="mt-1 text-2xl font-extrabold text-amber-300">{totalUrls}</div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    onClick={() => setEditing((s) => !s)}
                    className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-rose-600"
                  >
                    {editing ? "Cancel edit" : "Edit display name"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="w-full rounded-xl border-white/15"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Right column - controls */}
          <main className="lg:col-span-2 space-y-6">
            {/* Account name */}
            <Card data-card className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-zinc-400">Account</CardTitle>
                  <div className="text-sm text-zinc-400">
                    Credits:{" "}
                    <span className="text-amber-300 font-medium">{user.credits}</span>{" "}
                    • Plan: <span className="capitalize">{user.plan}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <Label className="text-sm text-zinc-300">Display name</Label>

                  {editing ? (
                    <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <Input
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="flex-1 bg-neutral-900/60 border-white/10 text-white"
                        placeholder="Your name"
                      />
                      <Button onClick={handleNameUpdate} disabled={loading} className="rounded-xl">
                        {loading ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        onClick={() => {
                          setEditing(false);
                          setUpdatedName(user.name);
                        }}
                        variant="ghost"
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-zinc-200">{user.name}</div>
                      <button
                        onClick={() => setEditing(true)}
                        className="text-sm text-amber-300 hover:underline"
                      >
                        Change
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card data-card className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-zinc-400">Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-400">
                  Keep your account secure. You will be asked to re‑login after password change.
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm text-zinc-300">Old password</Label>
                    <div className="relative mt-2">
                      <Input
                        type={showPwd.old ? "text" : "password"}
                        placeholder="Old Password"
                        value={passwords.oldPassword}
                        onChange={(e) =>
                          setPasswords((p) => ({ ...p, oldPassword: e.target.value }))
                        }
                        className="bg-neutral-900/60 border-white/10 text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((s) => ({ ...s, old: !s.old }))}
                        className="absolute inset-y-0 right-2 grid place-items-center text-zinc-400 hover:text-zinc-200"
                        aria-label={showPwd.old ? "Hide old password" : "Show old password"}
                      >
                        {showPwd.old ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-zinc-300">New password</Label>
                    <div className="relative mt-2">
                      <Input
                        type={showPwd.next ? "text" : "password"}
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                          setPasswords((p) => ({ ...p, newPassword: e.target.value }))
                        }
                        className="bg-neutral-900/60 border-white/10 text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((s) => ({ ...s, next: !s.next }))}
                        className="absolute inset-y-0 right-2 grid place-items-center text-zinc-400 hover:text-zinc-200"
                        aria-label={showPwd.next ? "Hide new password" : "Show new password"}
                      >
                        {showPwd.next ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Button onClick={handlePasswordChange} className="rounded-xl">
                    Update password
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setPasswords({ oldPassword: "", newPassword: "" })}
                    className="rounded-xl text-zinc-100"
                  >
                    Clear
                  </Button>
                </div>

                <div className="mt-3 text-xs text-zinc-500">
                  <ShieldCheck className="inline h-4 w-4 text-emerald-400 mr-1" />
                  We never store plaintext passwords. Basic hygiene: unique and long passwords.
                </div>
              </CardContent>
            </Card>

            {/* Danger zone */}
            <Card
              data-card
              className="relative overflow-hidden border border-rose-500/30 bg-gradient-to-b from-rose-500/10 to-transparent rounded-3xl"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-rose-200">Danger zone</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-rose-200/80">
                    Deleting your account will remove all your data permanently.
                  </p>
                </div>
                <Magnet>
                  <Button variant="destructive" onClick={handleDeleteAccount} className="rounded-xl">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete my account
                  </Button>
                </Magnet>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </section>
  );
}