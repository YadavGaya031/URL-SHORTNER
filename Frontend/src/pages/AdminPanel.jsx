import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
import { toast } from "sonner";

const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:3000/";

export default function AdminPanel() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchAll = async () => {
    try {
      const res = await axiosClient.get("/api/admin/all-urls", { withCredentials: true });
      setUrls(res.data || []);
    } catch (error) {
      toast.error("Failed to load URLs");
    } finally {
      setLoading(false);
    }
  };

  const deleteUrl = async (slug) => {
    if (!confirm(`Are you sure you want to delete /${slug}?`)) return;
    try {
      await axiosClient.delete(`/api/admin/url/${slug}`, { withCredentials: true });
      toast.success("URL deleted");
      fetchAll();
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleUrlStatus = async (slug) => {
    try {
      await axiosClient.patch(`/api/admin/url/${slug}/toggle`, {}, { withCredentials: true });
      toast.success("Status updated");
      fetchAll();
    } catch {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredUrls = urls.filter((url) =>
    (url.full_url || "").toLowerCase().includes(search.toLowerCase()) ||
    (url.short_url || "").toLowerCase().includes(search.toLowerCase()) ||
    (url.user?.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>

      {/* Search Input */}
      <div className="flex items-center gap-2 mb-6">
        <Search className="text-white/60" />
        <input
          type="text"
          placeholder="Search by short URL, full URL, or user email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-neutral-800 border border-white/20 text-white p-2 rounded w-full"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full bg-neutral-800/50 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : filteredUrls.length === 0 ? (
        <p className="text-white/60">No URLs found.</p>
      ) : (
        <div className="overflow-auto border border-white/10 rounded-lg">
          <table className="w-full text-left text-white/80">
            <thead className="bg-neutral-900 text-white/60">
              <tr>
                <th className="p-3">Short URL</th>
                <th className="p-3">Full URL</th>
                <th className="p-3">User</th>
                <th className="p-3 text-center">Clicks</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUrls.map((url) => (
                <tr key={url._id} className="border-t border-white/10">
                  <td className="p-3 text-indigo-400">
                    <a href={`${appUrl}${url.short_url}`} target="_blank" rel="noreferrer">
                      {url.short_url}
                    </a>
                  </td>
                  <td className="p-3 max-w-sm truncate">{url.full_url}</td>
                  <td className="p-3">{url.user ? `${url.user.name} (${url.user.email})` : "Guest"}</td>
                  <td className="p-3 text-center">{url.clicks}</td>
                  <td className="p-3 text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleUrlStatus(url.short_url)}
                    >
                      {url.isActive ? (
                        <ToggleRight className="h-5 w-5 text-green-400" />
                      ) : (
                        <ToggleLeft className="h-5 w-5 text-red-400" />
                      )}
                    </Button>
                  </td>
                  <td className="p-3 text-center">
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:text-red-500"
                      onClick={() => deleteUrl(url.short_url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
