import { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, CheckCircle2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const cardRef = useRef(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosClient.post("/api/auth/register", form, { withCredentials: true });
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = isReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.06,
      });

      gsap.from("[data-benefit]", {
        scrollTrigger: { trigger: leftRef.current, start: "top 80%", once: true },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      gsap.from("[data-card]", {
        scrollTrigger: { trigger: cardRef.current, start: "top 85%", once: true },
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.65,
        ease: "power2.out",
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

  return (
    <main ref={rootRef} className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-zinc-100 flex items-center relative overflow-hidden">
      {/* Premium background: blobs + grid */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-blob absolute -top-28 left-1/3 w-[36rem] h-[36rem] rounded-full blur-3xl bg-amber-500/15" />
        <div className="gradient-blob absolute bottom-[-16rem] right-1/5 w-[42rem] h-[42rem] rounded-full blur-3xl bg-rose-500/15" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1f_1px,transparent_1px),linear-gradient(to_bottom,#71717a1f_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: Branding / benefits */}
            <div ref={leftRef} className="hidden md:flex flex-col justify-center gap-6 pr-4">
              <div className="inline-flex items-center gap-3" data-hero>
                <div className="mt-1 h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center text-white font-bold">
                  L
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold">Create your Linkly account</h1>
                  <p className="text-sm text-zinc-300">Sign up to create branded short links, generate QR codes, and track analytics.</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur" data-benefit>
                <p className="text-zinc-300">
                  Join thousands of creators and businesses using Linkly to share links that are fast, trackable, and beautiful.
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    "AI‑generated slugs for on‑brand URLs",
                    "Built‑in QR codes for offline sharing",
                    "Privacy‑first, real‑time analytics",
                  ].map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-zinc-300">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4" data-benefit>
                
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <span className="text-sm text-zinc-300">SSO & 2FA ready</span>
                  </div>
                  <div className="mt-2 text-xs text-zinc-400">Security-first by design.</div>
                  {/* <img
                  src="/src/assets/register.webp"
                  alt="Preview"
                  className="w-full rounded-2xl mt-3 object-cover opacity-95 shadow-2xl border border-white/10"
                /> */}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div ref={cardRef}>
              <Card data-card className="bg-white/5 border border-white/10 rounded-3xl gap-0 shadow-xl backdrop-blur">
                <CardHeader className="px-6 py-6 text-center">
                  <CardTitle className="text-xl md:text-2xl text-amber-300 font-extrabold flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-300" />
                    Create an account
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                      <Label htmlFor="name" className="text-sm text-zinc-300">
                        Full name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        autoComplete="name"
                        className="mt-2 bg-neutral-900/60 border-white/10 text-white placeholder-zinc-500 focus-visible:ring-amber-500/30 focus-visible:border-amber-400"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm text-zinc-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="mt-2 bg-neutral-900/60 border-white/10 text-white placeholder-zinc-500 focus-visible:ring-amber-500/30 focus-visible:border-amber-400"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-sm text-zinc-300">
                        Password
                      </Label>
                      <div className="relative mt-2">
                        <Input
                          id="password"
                          name="password"
                          type={showPwd ? "text" : "password"}
                          value={form.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="bg-neutral-900/60 border-white/10 text-white placeholder-zinc-500 pr-10 focus-visible:ring-amber-500/30 focus-visible:border-amber-400"
                          required
                        />
                        <button
                          type="button"
                          aria-label={showPwd ? "Hide password" : "Show password"}
                          onClick={() => setShowPwd((s) => !s)}
                          className="absolute inset-y-0 right-2 grid place-items-center text-zinc-400 hover:text-zinc-200"
                        >
                          {showPwd ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <p role="alert" className="text-sm text-rose-300 mt-1">
                        {error}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-1 text-sm">
                      <span className="text-zinc-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-amber-300 hover:underline">
                          Login
                        </Link>
                      </span>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-semibold shadow-lg hover:shadow-amber-500/25 disabled:opacity-60"
                      >
                        {loading ? "Creating account…" : "Sign up"}
                      </Button>
                    </div>
                  </form>

                  <div className="mt-6 text-center text-sm text-zinc-400">
                    <span>By signing up you agree to our </span>
                    <Link to="/terms" className="text-amber-300 hover:underline">
                      Terms
                    </Link>
                    <span> and </span>
                    <Link to="/privacy" className="text-amber-300 hover:underline">
                      Privacy Policy
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-4 text-center text-xs text-zinc-500">
                Need help?{" "}
                <a href="mailto:support@linkly.app" className="text-amber-300 hover:underline">
                  support@linkly.app
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local gradient helper */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient { background-size: 200% 200%; animation: gradient 8s ease infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient { animation: none !important; }
        }
      `}</style>
    </main>
  );
}