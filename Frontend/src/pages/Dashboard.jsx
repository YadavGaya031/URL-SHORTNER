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
    <Card className="bg-neutral-900 border-white/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-white/70">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div className="text-3xl font-semibold">{value}</div>
        {cta}
      </CardContent>
    </Card>
  );

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">My Links</h1>
        <Button asChild>
          <Link to="/create">+ Create New</Link>
        </Button>
      </div>

      {/* Stats Section */}
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

      {/* Search */}
      <Input
        placeholder="Search your links…"
        className="mb-4 bg-neutral-800 border-white/20"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full bg-neutral-800/50 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : filteredUrls.length === 0 ? (
        <Card className="bg-neutral-900 border-white/10">
          <CardContent className="py-10 text-center text-white/60">
            No URLs found. Create your first one!
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-auto border border-white/10 rounded-lg">
          <table className="w-full text-left text-white/80">
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
                  <tr key={url._id} className="border-t border-white/10">
                    <td className="p-3 text-indigo-400">
                      <a href={fullShortUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        {slug}
                      </a>
                    </td>
                    <td className="p-3 max-w-xs truncate">{url.full_url}</td>
                    <td className="p-3 text-center">{url.clicks}</td>
                    <td className="p-3 text-center flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          navigator.clipboard.writeText(fullShortUrl);
                          toast.success("Copied to clipboard");
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setSelectedSlug(slug);
                          setQrOpen(true);
                        }}
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>

                      <Button size="icon" variant="ghost" asChild>
                        <Link to={`/analytics/${slug}`}>
                          <BarChart3 className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:text-red-500"
                        onClick={() => deleteUrl(url._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* QR Modal */}
      <QRCodeModal open={qrOpen} onClose={() => setQrOpen(false)} slug={selectedSlug} />
    </div>
  );
}
