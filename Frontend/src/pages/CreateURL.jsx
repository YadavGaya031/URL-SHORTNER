// import { useState, useEffect } from "react";
// import axiosClient from "@/api/axiosClient";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Wand2, Link2 } from "lucide-react";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// export default function CreateURL() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [form, setForm] = useState({
//     url: "",
//     slug: "",
//     expiresInDays: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [aiLoading, setAiLoading] = useState(false);

//   // Fetch Logged in User + Credits
//   useEffect(() => {
//     axiosClient
//       .get("/api/auth/me", { withCredentials: true })
//       .then((res) => setUser(res.data.user))
//       .catch(() => {});
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // AI generate slug
//   const handleGenerateSlug = async () => {
//     if (!form.url) {
//       toast.error("Enter a URL first before generating a slug");
//       return;
//     }
//     try {
//       setAiLoading(true);
//       const res = await axiosClient.post(
//         "/api/ai/slug",
//         { url: form.url },
//         { withCredentials: true }
//       );
//       console.log(res.data)
//       setForm({ ...form, slug: res.data });
//       toast.success("✨ AI-generated slug added!");
//     } catch {
//       toast.error("Failed to generate AI slug");
//     } finally {
//       setAiLoading(false);
//     }
//   };

//   // Submit form with Credits check
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (user?.credits <= 0) {
//       toast.error("No credits left! Upgrade to continue.");
//       return navigate("/pricing");
//     }
//     setLoading(true);

//     try {
//       const payload = {
//         url: form.url,
//         slug: form.slug || undefined,
//         expiresInDays: form.expiresInDays ? Number(form.expiresInDays) : undefined,
//       };

//       await axiosClient.post("/api/create", payload, {
//         withCredentials: true,
//       });

//       toast.success("✅ Short URL created successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       if (err.response?.status === 402) {
//         toast.error("You have no credits left. Upgrade your plan.");
//         return navigate("/pricing");
//       }
//       toast.error(err.response?.data?.message || "❌ Failed to create URL");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) {
//     return <p className="text-center mt-10 text-white">Loading…</p>;
//   }

//   return (
//     <div className="container py-10 max-w-xl">
//       <Card className="bg-neutral-900 border-white/10">
//         <CardHeader>
//           <CardTitle className="text-xl">
//             Create New Short URL
//             <span className="text-sm text-white/60 ml-3">
//               (Credits: <span className="text-indigo-400">{user?.credits}</span>)
//             </span>
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <Label>Original URL</Label>
//               <Input
//                 name="url"
//                 value={form.url}
//                 onChange={handleChange}
//                 placeholder="https://example.com/very/long/link"
//                 className="bg-neutral-800 border-white/20 text-white"
//                 required
//               />
//             </div>

//             <div>
//               <Label>Custom Slug (Optional)</Label>
//               <div className="flex gap-2">
//                 <Input
//                   name="slug"
//                   value={form.slug}
//                   onChange={handleChange}
//                   placeholder="my-custom-url"
//                   className="bg-neutral-800 border-white/20 text-white"
//                 />
//                 <Button
//                   type="button"
//                   onClick={handleGenerateSlug}
//                   disabled={aiLoading}
//                   className="flex items-center gap-2"
//                 >
//                   <Wand2 className="h-4 w-4" />
//                   {aiLoading ? "Generating..." : "AI Slug"}
//                 </Button>
//               </div>
//             </div>

//             <div>
//               <Label>Expiry (in days — optional)</Label>
//               <Input
//                 type="number"
//                 name="expiresInDays"
//                 value={form.expiresInDays}
//                 onChange={handleChange}
//                 placeholder="7"
//                 min="1"
//                 className="bg-neutral-800 border-white/20 text-white"
//               />
//             </div>

//             <Button
//               type="submit"
//               className="w-full flex items-center gap-2"
//               disabled={loading || user?.credits <= 0}
//             >
//               <Link2 className="h-4 w-4" />
//               {user?.credits <= 0
//                 ? "No Credits - Upgrade"
//                 : loading
//                 ? "Creating..."
//                 : "Shorten Link"}
//             </Button>
//           </form> 
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Link2, QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

export default function CreateURL() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ url: "", slug: "", expiresInDays: "" });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const rootRef = useRef(null);
  const formRef = useRef(null);
  const previewRef = useRef(null);

  const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:3000/";
  const base = appUrl.replace(/\/+$/, "");

  // Derived preview values
  const previewSlug = form.slug?.trim() || "summer-sale";
  const previewShort = `${base}/${previewSlug}`;

  // Basic URL validation
  const isValidUrl = useMemo(() => {
    if (!form.url) return false;
    try {
      // eslint-disable-next-line no-new
      new URL(form.url);
      return true;
    } catch {
      return false;
    }
  }, [form.url]);

  useEffect(() => {
    axiosClient
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => {});
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // AI generate slug
  const handleGenerateSlug = async () => {
    if (!form.url) {
      toast.error("Enter a URL first before generating a slug");
      return;
    }
    try {
      setAiLoading(true);
      const res = await axiosClient.post("/api/ai/slug", { url: form.url }, { withCredentials: true });
      setForm((f) => ({ ...f, slug: res.data }));
      toast.success("AI-generated slug added");
    } catch {
      toast.error("Failed to generate AI slug");
    } finally {
      setAiLoading(false);
    }
  };

  // Submit with credits check
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidUrl) {
      toast.error("Please enter a valid URL");
      return;
    }
    if (user?.credits <= 0) {
      toast.error("No credits left! Upgrade to continue.");
      return navigate("/pricing");
    }

    setLoading(true);
    try {
      const payload = {
        url: form.url,
        slug: form.slug || undefined,
        expiresInDays: form.expiresInDays ? Number(form.expiresInDays) : undefined,
      };

      await axiosClient.post("/api/create", payload, { withCredentials: true });
      toast.success("Short URL created successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 402) {
        toast.error("You have no credits left. Upgrade your plan.");
        return navigate("/pricing");
      }
      toast.error(err.response?.data?.message || "Failed to create URL");
    } finally {
      setLoading(false);
    }
  };

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
      gsap.from("[data-form]", {
        scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true },
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "power2.out",
      });
      gsap.from("[data-preview]", {
        scrollTrigger: { trigger: previewRef.current, start: "top 85%", once: true },
        opacity: 0,
        y: 22,
        duration: 0.6,
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

  if (!user) {
    return (
      <div className="min-h-[50vh] grid place-items-center text-zinc-300">
        Loading…
      </div>
    );
  }

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
        {/* Page heading + credits */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" data-hero>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
              <Sparkles className="h-4 w-4" />
              Create link
            </div>
            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">Create New Short URL</h1>
            <p className="text-sm text-zinc-400 mt-1">Brand your link and share in seconds.</p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            Credits: <span className="text-amber-300 font-semibold">{user?.credits}</span>
          </div>
        </div>

        {/* Low credits banner */}
        {user?.credits <= 0 && (
          <div className="mt-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            You’re out of credits. Upgrade to continue.
            <Button
              size="sm"
              className="ml-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600"
              onClick={() => navigate("/pricing")}
            >
              Upgrade
            </Button>
          </div>
        )}

        {/* Grid: form + preview */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-7">
            <Card data-form className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Link details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label htmlFor="url" className="text-sm text-zinc-300">Original URL</Label>
                  <Input
                    id="url"
                    name="url"
                    value={form.url}
                    onChange={handleChange}
                    placeholder="https://example.com/very/long/link"
                    className={`mt-2 bg-neutral-900/60 border-white/10 text-white placeholder-zinc-500
                      ${form.url && !isValidUrl ? "focus-visible:border-rose-400 focus-visible:ring-rose-500/30" : "focus-visible:border-amber-400 focus-visible:ring-amber-500/30"}`}
                    required
                  />
                  <p className={`mt-1 text-xs ${form.url && !isValidUrl ? "text-rose-300" : "text-zinc-400"}`}>
                    {form.url && !isValidUrl ? "Enter a valid URL (including http/https)" : "We’ll validate your URL before shortening."}
                  </p>
                </div>

                <div>
                  <Label htmlFor="slug" className="text-sm text-zinc-300">Custom slug (optional)</Label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="slug"
                      name="slug"
                      value={form.slug}
                      onChange={handleChange}
                      placeholder="my-custom-url"
                      className="bg-neutral-900/60 border-white/10 text-white placeholder-zinc-500"
                    />
                    <Button
                      type="button"
                      onClick={handleGenerateSlug}
                      disabled={aiLoading || !form.url}
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 disabled:opacity-60"
                    >
                      <Wand2 className="h-4 w-4" />
                      {aiLoading ? "Generating…" : "AI Slug"}
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-zinc-400">
                    Leave blank to auto‑generate a readable slug.
                  </p>
                </div>

                <div>
                  <Label htmlFor="expiresInDays" className="text-sm text-zinc-300">Expiry (in days — optional)</Label>
                  <Input
                    id="expiresInDays"
                    type="number"
                    name="expiresInDays"
                    value={form.expiresInDays}
                    onChange={handleChange}
                    placeholder="7"
                    min="1"
                    className="mt-2 bg-neutral-900/60 border-white/10 text-white placeholder-zinc-500"
                  />
                  <p className="mt-1 text-xs text-zinc-400">Set an automatic expiration for time‑sensitive links.</p>
                </div>

                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 font-semibold shadow-lg hover:shadow-amber-500/25 disabled:opacity-60"
                  disabled={loading || user?.credits <= 0}
                >
                  <Link2 className="h-4 w-4" />
                  {user?.credits <= 0 ? "No Credits - Upgrade" : loading ? "Creating…" : "Shorten Link"}
                </Button>

                <p className="text-xs text-zinc-500 text-center">
                  <ShieldCheck className="inline h-4 w-4 text-emerald-400 mr-1" />
                  Secure, privacy‑friendly redirects.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div ref={previewRef} className="lg:col-span-5">
            <Card data-preview className="relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur rounded-3xl">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b22_0deg,#f43f5e22_120deg,#10b98122_240deg,#f59e0b22_360deg)] opacity-70"
              />
              <CardHeader className="relative z-[1] pb-3">
                <CardTitle className="text-lg">Live preview</CardTitle>
              </CardHeader>
              <CardContent className="relative z-[1] space-y-4">
                <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4">
                  <div className="text-xs text-zinc-400 mb-1">{base}/</div>
                  <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-rose-400">
                    {previewSlug}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4">
                    <div className="text-xs text-zinc-400 mb-1">Target URL</div>
                    <div className="text-sm text-zinc-200 truncate">
                      {form.url || "—"}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-neutral-900/60 p-4">
                    <div className="text-xs text-zinc-400 mb-1">Expires</div>
                    <div className="text-sm text-zinc-200">
                      {form.expiresInDays ? `${form.expiresInDays} day(s)` : "Never"}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 to-amber-500/10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-rose-300" />
                    <span className="text-sm text-rose-200">QR ready</span>
                  </div>
                  <span className="text-xs text-rose-400/70">Instant PNG/SVG</span>
                </div>

                <div className="text-xs text-zinc-400">
                  Final short link (example):{" "}
                  <span className="text-amber-300">{previewShort}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}