import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Copy, Trash2, BarChart3, QrCode, ArrowUpRight, Sparkles, Search } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCodeModal from "@/components/common/QRCodeModal";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | clicks | slug
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");

  const navigate = useNavigate();
  const rootRef = useRef(null);
  const statRef = useRef(null);
  const tableRef = useRef(null);

  const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:3000/";

  const fetchMe = async () => {
    try {
      const res = await axiosClient.get("/api/auth/me", { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  const fetchUrls = async () => {
    try {
      const res = await axiosClient.post("/api/user/urls", {}, { withCredentials: true });
      setUrls(res.data.urls || []);
    } catch (error) {
      console.error("Error loading URLs:", error);
      toast.error("Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
    fetchUrls();
  }, []);

  const deleteUrl = async (id) => {
    if (!confirm("Are you sure you want to delete this URL?")) return;
    try {
      await axiosClient.delete(`/api/user/url/${id}`, { withCredentials: true });
      toast.success("URL deleted");
      fetchUrls();
      fetchMe();
    } catch {
      toast.error("Delete failed");
    }
  };

  // Filtering + sorting
  const filteredUrls = useMemo(() => {
    const term = search.trim().toLowerCase();
    let list = urls.filter((u) => {
      const full = (u.full_url || "").toLowerCase();
      const short = (u.short_url || "").toLowerCase();
      return full.includes(term) || short.includes(term);
    });
    if (sortBy === "clicks") {
      list = [...list].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
    } else if (sortBy === "slug") {
      list = [...list].sort((a, b) => (a.short_url || "").localeCompare(b.short_url || ""));
    } else {
      // newest
      list = [...list].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }
    return list;
  }, [urls, search, sortBy]);

  // GSAP animations
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = isReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from("[data-heading]", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
      });

      gsap.from("[data-stat]", {
        scrollTrigger: { trigger: statRef.current, start: "top 85%", once: true },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      gsap.from("[data-row]", {
        scrollTrigger: { trigger: tableRef.current, start: "top 85%", once: true },
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.04,
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

  const StatCard = ({ title, value, cta, accent = "from-amber-500 to-rose-600" }) => (
    <Card
      data-stat
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b22_0deg,#f43f5e22_120deg,#10b98122_240deg,#f59e0b22_360deg)] opacity-70`}
      />
      <CardHeader className="relative z-[1] pb-2">
        <CardTitle className="text-xs uppercase tracking-wider text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-[1] flex items-end justify-between">
        <div className="text-2xl md:text-3xl font-semibold text-white">{value}</div>
        {cta}
      </CardContent>
    </Card>
  );

  const formatShort = (short) => {
    const fullShortUrl = short?.startsWith("http")
      ? short
      : `${appUrl.replace(/\/+$/, "")}/${(short || "").replace(/^\/+/, "")}`;
    const slug = fullShortUrl.replace(appUrl.replace(/\/+$/, "") + "/", "");
    return { fullShortUrl, slug };
  };

  return (
    <div
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6" data-heading>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
              <Sparkles className="h-4 w-4" />
              Dashboard
            </div>
            <h1 className="mt-3 text-2xl md:text-3xl font-extrabold">My Links</h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage and analyze your short links.
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                placeholder="Search your links…"
                className="bg-neutral-900/60 border-white/10 pl-9 w-72"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl bg-neutral-900/60 border border-white/10 px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
            >
              <option value="newest">Newest</option>
              <option value="clicks">Most clicks</option>
              <option value="slug">Slug (A–Z)</option>
            </select>

            <Button asChild className="rounded-xl bg-gradient-to-r from-amber-600 to-rose-600">
              <Link to="/create" className="inline-flex items-center gap-2">
                + Create New
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search your links…"
              className="bg-neutral-900/60 border-white/10 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div ref={statRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Available credits"
            value={user?.credits ?? "—"}
            cta={
              (user?.credits ?? 0) <= 0 && (
                <Button size="sm" variant="outline" onClick={() => navigate("/pricing")}>
                  Upgrade <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              )
            }
          />
          <StatCard
            title="Current plan"
            value={(user?.plan || "free").toUpperCase()}
            cta={
              (user?.plan || "free") === "free" && (
                <Button size="sm" variant="outline" onClick={() => navigate("/pricing")}>
                  Upgrade <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              )
            }
          />
          <StatCard title="Total links" value={urls.length} />
        </div>

        {/* Content */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 w-full bg-white/5 border border-white/10 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredUrls.length === 0 ? (
          <Card className="border border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="py-12 text-center">
              <div className="text-sm text-zinc-400">No URLs found. Create your first one!</div>
              <Button asChild className="mt-4 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600">
                <Link to="/create">Create link</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop table */}
            <div
              ref={tableRef}
              className="hidden md:block overflow-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
            >
              <table className="w-full text-left text-sm text-zinc-200 min-w-[780px]">
                <thead className="bg-neutral-900/80 text-zinc-400">
                  <tr>
                    <th className="p-3 font-medium">Slug</th>
                    <th className="p-3 font-medium">Original URL</th>
                    <th className="p-3 text-center font-medium">Clicks</th>
                    <th className="p-3 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUrls.map((url, idx) => {
                    const { fullShortUrl, slug } = formatShort(url.short_url);

                    return (
                      <tr key={url._id} data-row className="border-t border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-3 text-amber-300">
                          <a href={fullShortUrl} target="_blank" rel="noreferrer" className="hover:underline">
                            {slug}
                          </a>
                        </td>
                        <td className="p-3 max-w-xl truncate text-zinc-300">{url.full_url}</td>
                        <td className="p-3 text-center">{url.clicks}</td>
                        <td className="p-3 text-center">
                          <div className="inline-flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(fullShortUrl);
                                toast.success("Copied to clipboard");
                              }}
                              className="p-2 rounded-md hover:bg-white/10 transition"
                              aria-label="Copy"
                            >
                              <Copy className="h-4 w-4 text-zinc-200" />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedSlug(slug);
                                setQrOpen(true);
                              }}
                              className="p-2 rounded-md hover:bg-white/10 transition"
                              aria-label="QR"
                            >
                              <QrCode className="h-4 w-4 text-zinc-200" />
                            </button>

                            <Link
                              to={`/analytics/${slug}`}
                              className="p-2 rounded-md hover:bg-white/10 transition"
                              aria-label="Analytics"
                            >
                              <BarChart3 className="h-4 w-4 text-zinc-200" />
                            </Link>

                            <button
                              onClick={() => deleteUrl(url._id)}
                              className="p-2 rounded-md hover:bg-rose-600/10 transition text-rose-400"
                              aria-label="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="md:hidden space-y-3">
              {filteredUrls.map((url) => {
                const { fullShortUrl, slug } = formatShort(url.short_url);

                return (
                  <Card key={url._id} data-row className="border border-white/10 bg-white/5 backdrop-blur">
                    <CardContent>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <a
                            href={fullShortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-300 font-medium hover:underline break-words"
                          >
                            {slug}
                          </a>
                          <div className="text-sm text-zinc-300 mt-1 truncate">{url.full_url}</div>
                          <div className="text-xs text-zinc-400 mt-2">
                            Clicks: <span className="text-zinc-100">{url.clicks}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(fullShortUrl);
                              toast.success("Copied to clipboard");
                            }}
                            className="p-2 rounded-md hover:bg-white/10 transition"
                            aria-label="Copy"
                          >
                            <Copy className="h-4 w-4 text-zinc-200" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedSlug(slug);
                              setQrOpen(true);
                            }}
                            className="p-2 rounded-md hover:bg-white/10 transition"
                            aria-label="QR"
                          >
                            <QrCode className="h-4 w-4 text-zinc-200" />
                          </button>

                          <Link to={`/analytics/${slug}`} className="p-2 rounded-md hover:bg-white/10 transition" aria-label="Analytics">
                            <BarChart3 className="h-4 w-4 text-zinc-200" />
                          </Link>

                          <button
                            onClick={() => deleteUrl(url._id)}
                            className="p-2 rounded-md hover:bg-rose-600/10 transition text-rose-400"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* QR Modal */}
        <QRCodeModal open={qrOpen} onClose={() => setQrOpen(false)} slug={selectedSlug} />
      </div>
    </div>
  );
}