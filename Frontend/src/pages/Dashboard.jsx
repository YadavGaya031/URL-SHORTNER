import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Copy, Trash2, BarChart3, QrCode, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCodeModal from "@/components/common/QRCodeModal";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState("");

  const navigate = useNavigate();
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

  const filteredUrls = urls.filter((u) =>
    (u.full_url || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.short_url || "").toLowerCase().includes(search.toLowerCase())
  );

  const StatCard = ({ title, value, cta }) => (
    <Card className="bg-linear-to-b from-slate-900/60 to-slate-800/50 border border-white/6 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-white/70">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div className="text-2xl md:text-3xl font-semibold text-white">{value}</div>
        {cta}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-10  bg-linear-to-b from-slate-800/70 to-slate-700 max-w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-6 mt-30">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">My Links</h1>
          <p className="text-sm text-white/70 mt-1">Manage and analyze your short links.</p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            placeholder="Search your links…"
            className="bg-neutral-800 border-white/20 w-64 hidden md:block"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button asChild>
            <Link to="/create" className="inline-flex items-center gap-2">
              + Create New
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Available Credits"
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
          title="Current Plan"
          value={(user?.plan || "free").toUpperCase()}
          cta={
            (user?.plan || "free") === "free" && (
              <Button size="sm" variant="outline" onClick={() => navigate("/pricing")}>
                Upgrade <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            )
          }
        />
        <StatCard title="Total Links" value={urls.length} />
      </div>

      {/* Mobile search */}
      <div className="md:hidden mb-4">
        <Input
          placeholder="Search your links…"
          className="bg-neutral-800 border-white/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 w-full bg-neutral-300/20 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : filteredUrls.length === 0 ? (
        <Card className="bg-neutral-900 border-white/10">
          <CardContent className="py-12 text-center text-white/60">
            No URLs found. Create your first one!
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-auto border border-white/10 rounded-lg">
            <table className="w-full text-left text-white/80 min-w-[720px]">
              <thead className="bg-neutral-900 text-white/60">
                <tr>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Original URL</th>
                  <th className="p-3 text-center">Clicks</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUrls.map((url) => {
                  const fullShortUrl = url.short_url?.startsWith("http")
                    ? url.short_url
                    : `${appUrl.replace(/\/+$/, "")}/${(url.short_url || "").replace(/^\/+/, "")}`;

                  const slug = fullShortUrl.replace(appUrl.replace(/\/+$/, "") + "/", "");

                  return (
                    <tr key={url._id} className="border-t border-white/10 hover:bg-white/2 transition-colors">
                      <td className="p-3 text-indigo-300">
                        <a href={fullShortUrl} target="_blank" rel="noreferrer" className="hover:underline">
                          {slug}
                        </a>
                      </td>
                      <td className="p-3 max-w-xl truncate">{url.full_url}</td>
                      <td className="p-3 text-center">{url.clicks}</td>
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(fullShortUrl);
                              toast.success("Copied to clipboard");
                            }}
                            className="p-2 rounded-md hover:bg-white/5 transition"
                            aria-label="Copy"
                          >
                            <Copy className="h-4 w-4 text-white/80" />
                          </button>

                          <button
                            onClick={() => {
                              setSelectedSlug(slug);
                              setQrOpen(true);
                            }}
                            className="p-2 rounded-md hover:bg-white/5 transition"
                            aria-label="QR"
                          >
                            <QrCode className="h-4 w-4 text-white/80" />
                          </button>

                          <Link to={`/analytics/${slug}`} className="p-2 rounded-md hover:bg-white/5 transition" aria-label="Analytics">
                            <BarChart3 className="h-4 w-4 text-white/80" />
                          </Link>

                          <button
                            onClick={() => deleteUrl(url._id)}
                            className="p-2 rounded-md hover:bg-red-600/10 transition text-red-400"
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
              const fullShortUrl = url.short_url?.startsWith("http")
                ? url.short_url
                : `${appUrl.replace(/\/+$/, "")}/${(url.short_url || "").replace(/^\/+/, "")}`;

              const slug = fullShortUrl.replace(appUrl.replace(/\/+$/, "") + "/", "");

              return (
                <Card key={url._id} className="bg-neutral-900 border-white/10">
                  <CardContent>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <a href={fullShortUrl} target="_blank" rel="noreferrer" className="text-indigo-300 font-medium hover:underline break-words">
                          {slug}
                        </a>
                        <div className="text-sm text-white/70 mt-1 truncate">{url.full_url}</div>
                        <div className="text-xs text-white/60 mt-2">Clicks: <span className="text-white">{url.clicks}</span></div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(fullShortUrl);
                            toast.success("Copied to clipboard");
                          }}
                          className="p-2 rounded-md hover:bg-white/5 transition"
                          aria-label="Copy"
                        >
                          <Copy className="h-4 w-4 text-white/80" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedSlug(slug);
                            setQrOpen(true);
                          }}
                          className="p-2 rounded-md hover:bg-white/5 transition"
                          aria-label="QR"
                        >
                          <QrCode className="h-4 w-4 text-white/80" />
                        </button>

                        <Link to={`/analytics/${slug}`} className="p-2 rounded-md hover:bg-white/5 transition" aria-label="Analytics">
                          <BarChart3 className="h-4 w-4 text-white/80" />
                        </Link>

                        <button
                          onClick={() => deleteUrl(url._id)}
                          className="p-2 rounded-md hover:bg-red-600/10 transition text-red-400"
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
  );
}
