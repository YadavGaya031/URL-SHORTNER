// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import axiosClient from "@/api/axiosClient";
// import { Button } from "@/components/ui/button";
// import { Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
// import { toast } from "sonner";

// const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:3000/";

// export default function AdminPanel() {
//   const [urls, setUrls] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");

//   const fetchAll = async () => {
//     try {
//       const res = await axiosClient.get("/api/admin/all-urls", { withCredentials: true });
//       setUrls(res.data || []);
//     } catch (error) {
//       toast.error("Failed to load URLs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUrl = async (slug) => {
//     if (!confirm(`Are you sure you want to delete /${slug}?`)) return;
//     try {
//       await axiosClient.delete(`/api/admin/url/${slug}`, { withCredentials: true });
//       toast.success("URL deleted");
//       fetchAll();
//     } catch {
//       toast.error("Delete failed");
//     }
//   };

//   const toggleUrlStatus = async (slug) => {
//     try {
//       await axiosClient.patch(`/api/admin/url/${slug}/toggle`, {}, { withCredentials: true });
//       toast.success("Status updated");
//       fetchAll();
//     } catch {
//       toast.error("Failed to update status");
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const filteredUrls = urls.filter((url) =>
//     (url.full_url || "").toLowerCase().includes(search.toLowerCase()) ||
//     (url.short_url || "").toLowerCase().includes(search.toLowerCase()) ||
//     (url.user?.email || "").toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container py-10 bg-amber-50">
//       <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>

//       {/* Search Input */}
//       <div className="flex items-center gap-2 mb-6">
//         <Search className="text-white/60" />
//         <input
//           type="text"
//           placeholder="Search by short URL, full URL, or user email..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="bg-neutral-800 border border-white/20 text-white p-2 rounded w-full"
//         />
//       </div>

//       {loading ? (
//         <div className="space-y-3">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="h-12 w-full bg-neutral-800/50 rounded-md animate-pulse"></div>
//           ))}
//         </div>
//       ) : filteredUrls.length === 0 ? (
//         <p className="text-white/60">No URLs found.</p>
//       ) : (
//         <div className="overflow-auto border border-white/10 rounded-lg">
//           <table className="w-full text-left text-white/80">
//             <thead className="bg-neutral-900 text-white/60">
//               <tr>
//                 <th className="p-3">Short URL</th>
//                 <th className="p-3">Full URL</th>
//                 <th className="p-3">User</th>
//                 <th className="p-3 text-center">Clicks</th>
//                 <th className="p-3 text-center">Status</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody> 
//               {filteredUrls.map((url) => (
//                 <tr key={url._id} className="border-t border-white/10">
//                   <td className="p-3 text-indigo-400">
//                     <a href={`${appUrl}${url.short_url}`} target="_blank" rel="noreferrer">
//                       {url.short_url}
//                     </a>
//                   </td>
//                   <td className="p-3 max-w-sm truncate">{url.full_url}</td>
//                   <td className="p-3">{url.user ? `${url.user.name} (${url.user.email})` : "Guest"}</td>
//                   <td className="p-3 text-center">{url.clicks}</td>
//                   <td className="p-3 text-center">
//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       onClick={() => toggleUrlStatus(url.short_url)}
//                     >
//                       {url.isActive ? (
//                         <ToggleRight className="h-5 w-5 text-green-400" />
//                       ) : (
//                         <ToggleLeft className="h-5 w-5 text-red-400" />
//                       )}
//                     </Button>
//                   </td>
//                   <td className="p-3 text-center">
//                     <Button
//                       variant="ghost"
//                       className="text-red-400 hover:text-red-500"
//                       onClick={() => deleteUrl(url.short_url)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }




/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    <div className="container mx-auto px-4 py-10 ">
      <div className="max-w-7xl mx-auto mt-18">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-white">Admin Panel</h1>
          <p className="text-sm text-white/70 mt-1">Manage all short URLs, toggle status or remove problematic links.</p>
        </header>

        {/* Search / Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 w-full sm:w-1/2">
            <span className="inline-flex items-center justify-center px-3 py-2 rounded-l-md bg-white/5 border border-white/6">
              <Search className="h-4 w-4 text-white/70" />
            </span>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search short URL, full URL or user email..."
              className="flex-1 rounded-l-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={fetchAll} variant="ghost">Refresh</Button>
            <div className="text-sm text-white/60 hidden sm:block">
              Results: <span className="text-white font-medium">{filteredUrls.length}</span>
            </div>
          </div>
        </div>

        {/* Loading / Empty */}
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-12 w-full rounded-md bg-neutral-800 animate-pulse" />
            ))}
          </div>
        ) : filteredUrls.length === 0 ? (
          <div className="rounded-2xl bg-neutral-900 border border-white/6 p-8 text-center text-white/60">
            No URLs found.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-auto border border-white/10 rounded-lg bg-slate-900/50">
              <table className="w-full text-left text-white/80 min-w-[900px]">
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
                    <tr key={url._id} className="border-t border-white/6 hover:bg-white/3 transition-colors">
                      <td className="p-3 text-indigo-300 w-40">
                        <a href={`${appUrl.replace(/\/+$/, "")}/${url.short_url}`} target="_blank" rel="noreferrer" className="hover:underline">
                          {url.short_url}
                        </a>
                      </td>

                      <td className="p-3 max-w-3xl truncate">{url.full_url}</td>

                      <td className="p-3">
                        {url.user ? (
                          <div className="text-sm">
                            <div className="font-medium text-white">{url.user.name}</div>
                            <div className="text-xs text-white/60">{url.user.email}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-white/70">Guest</div>
                        )}
                      </td>

                      <td className="p-3 text-center">{url.clicks}</td>

                      <td className="p-3 text-center">
                        <Button size="icon" variant="ghost" onClick={() => toggleUrlStatus(url.short_url)} aria-label="Toggle status">
                          {url.isActive ? (
                            <ToggleRight className="h-5 w-5 text-green-400" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 text-red-400" />
                          )}
                        </Button>
                      </td>

                      <td className="p-3 text-center">
                        <Button variant="ghost" className="text-red-400 hover:text-red-500" onClick={() => deleteUrl(url.short_url)} aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filteredUrls.map((url) => (
                <Card key={url._id} className="bg-neutral-900 border-white/10">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <a href={`${appUrl.replace(/\/+$/, "")}/${url.short_url}`} target="_blank" rel="noreferrer" className="text-indigo-300 font-medium">
                        {url.short_url}
                      </a>
                      <div className="text-xs text-white/60">{url.clicks} clicks</div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="text-sm text-white/70 truncate">{url.full_url}</div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/70">
                        {url.user ? <span>{url.user.name} • <span className="text-xs text-white/60">{url.user.email}</span></span> : "Guest"}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="ghost" onClick={() => toggleUrlStatus(url.short_url)} aria-label="Toggle status">
                          {url.isActive ? <ToggleRight className="h-5 w-5 text-green-400" /> : <ToggleLeft className="h-5 w-5 text-red-400" />}
                        </Button>

                        <Button variant="ghost" className="text-red-400" onClick={() => deleteUrl(url.short_url)} aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
