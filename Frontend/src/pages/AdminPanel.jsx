// // /* eslint-disable no-unused-vars */
// // import { useEffect, useState } from "react";
// // import axiosClient from "@/api/axiosClient";
// // import { Button } from "@/components/ui/button";
// // import { Trash2, ToggleLeft, ToggleRight, Search } from "lucide-react";
// // import { toast } from "sonner";

// // const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:3000/";

// // export default function AdminPanel() {
// //   const [urls, setUrls] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");

// //   const fetchAll = async () => {
// //     try {
// //       const res = await axiosClient.get("/api/admin/all-urls", { withCredentials: true });
// //       setUrls(res.data || []);
// //     } catch (error) {
// //       toast.error("Failed to load URLs");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteUrl = async (slug) => {
// //     if (!confirm(`Are you sure you want to delete /${slug}?`)) return;
// //     try {
// //       await axiosClient.delete(`/api/admin/url/${slug}`, { withCredentials: true });
// //       toast.success("URL deleted");
// //       fetchAll();
// //     } catch {
// //       toast.error("Delete failed");
// //     }
// //   };

// //   const toggleUrlStatus = async (slug) => {
// //     try {
// //       await axiosClient.patch(`/api/admin/url/${slug}/toggle`, {}, { withCredentials: true });
// //       toast.success("Status updated");
// //       fetchAll();
// //     } catch {
// //       toast.error("Failed to update status");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchAll();
// //   }, []);

// //   const filteredUrls = urls.filter((url) =>
// //     (url.full_url || "").toLowerCase().includes(search.toLowerCase()) ||
// //     (url.short_url || "").toLowerCase().includes(search.toLowerCase()) ||
// //     (url.user?.email || "").toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="container py-10 bg-amber-50">
// //       <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>

// //       {/* Search Input */}
// //       <div className="flex items-center gap-2 mb-6">
// //         <Search className="text-white/60" />
// //         <input
// //           type="text"
// //           placeholder="Search by short URL, full URL, or user email..."
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //           className="bg-neutral-800 border border-white/20 text-white p-2 rounded w-full"
// //         />
// //       </div>

// //       {loading ? (
// //         <div className="space-y-3">
// //           {[1, 2, 3].map((i) => (
// //             <div key={i} className="h-12 w-full bg-neutral-800/50 rounded-md animate-pulse"></div>
// //           ))}
// //         </div>
// //       ) : filteredUrls.length === 0 ? (
// //         <p className="text-white/60">No URLs found.</p>
// //       ) : (
// //         <div className="overflow-auto border border-white/10 rounded-lg">
// //           <table className="w-full text-left text-white/80">
// //             <thead className="bg-neutral-900 text-white/60">
// //               <tr>
// //                 <th className="p-3">Short URL</th>
// //                 <th className="p-3">Full URL</th>
// //                 <th className="p-3">User</th>
// //                 <th className="p-3 text-center">Clicks</th>
// //                 <th className="p-3 text-center">Status</th>
// //                 <th className="p-3 text-center">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody> 
// //               {filteredUrls.map((url) => (
// //                 <tr key={url._id} className="border-t border-white/10">
// //                   <td className="p-3 text-indigo-400">
// //                     <a href={`${appUrl}${url.short_url}`} target="_blank" rel="noreferrer">
// //                       {url.short_url}
// //                     </a>
// //                   </td>
// //                   <td className="p-3 max-w-sm truncate">{url.full_url}</td>
// //                   <td className="p-3">{url.user ? `${url.user.name} (${url.user.email})` : "Guest"}</td>
// //                   <td className="p-3 text-center">{url.clicks}</td>
// //                   <td className="p-3 text-center">
// //                     <Button
// //                       size="icon"
// //                       variant="ghost"
// //                       onClick={() => toggleUrlStatus(url.short_url)}
// //                     >
// //                       {url.isActive ? (
// //                         <ToggleRight className="h-5 w-5 text-green-400" />
// //                       ) : (
// //                         <ToggleLeft className="h-5 w-5 text-red-400" />
// //                       )}
// //                     </Button>
// //                   </td>
// //                   <td className="p-3 text-center">
// //                     <Button
// //                       variant="ghost"
// //                       className="text-red-400 hover:text-red-500"
// //                       onClick={() => deleteUrl(url.short_url)}
// //                     >
// //                       <Trash2 className="h-4 w-4" />
// //                     </Button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import axiosClient from "@/api/axiosClient";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
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
//     <div className="container mx-auto px-4 py-10 ">
//       <div className="max-w-7xl mx-auto mt-18">
//         <header className="mb-6">
//           <h1 className="text-3xl font-semibold text-white">Admin Panel</h1>
//           <p className="text-sm text-white/70 mt-1">Manage all short URLs, toggle status or remove problematic links.</p>
//         </header>

//         {/* Search / Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//           <div className="flex items-center gap-2 w-full sm:w-1/2">
//             <span className="inline-flex items-center justify-center px-3 py-2 rounded-l-md bg-white/5 border border-white/6">
//               <Search className="h-4 w-4 text-white/70" />
//             </span>
//             <Input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search short URL, full URL or user email..."
//               className="flex-1 rounded-l-none"
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <Button onClick={fetchAll} variant="ghost">Refresh</Button>
//             <div className="text-sm text-white/60 hidden sm:block">
//               Results: <span className="text-white font-medium">{filteredUrls.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* Loading / Empty */}
//         {loading ? (
//           <div className="space-y-3">
//             {[1,2,3].map(i => (
//               <div key={i} className="h-12 w-full rounded-md bg-neutral-800 animate-pulse" />
//             ))}
//           </div>
//         ) : filteredUrls.length === 0 ? (
//           <div className="rounded-2xl bg-neutral-900 border border-white/6 p-8 text-center text-white/60">
//             No URLs found.
//           </div>
//         ) : (
//           <>
//             {/* Desktop table */}
//             <div className="hidden md:block overflow-auto border border-white/10 rounded-lg bg-slate-900/50">
//               <table className="w-full text-left text-white/80 min-w-[900px]">
//                 <thead className="bg-neutral-900 text-white/60">
//                   <tr>
//                     <th className="p-3">Short URL</th>
//                     <th className="p-3">Full URL</th>
//                     <th className="p-3">User</th>
//                     <th className="p-3 text-center">Clicks</th>
//                     <th className="p-3 text-center">Status</th>
//                     <th className="p-3 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUrls.map((url) => (
//                     <tr key={url._id} className="border-t border-white/6 hover:bg-white/3 transition-colors">
//                       <td className="p-3 text-indigo-300 w-40">
//                         <a href={`${appUrl.replace(/\/+$/, "")}/${url.short_url}`} target="_blank" rel="noreferrer" className="hover:underline">
//                           {url.short_url}
//                         </a>
//                       </td>

//                       <td className="p-3 max-w-3xl truncate">{url.full_url}</td>

//                       <td className="p-3">
//                         {url.user ? (
//                           <div className="text-sm">
//                             <div className="font-medium text-white">{url.user.name}</div>
//                             <div className="text-xs text-white/60">{url.user.email}</div>
//                           </div>
//                         ) : (
//                           <div className="text-sm text-white/70">Guest</div>
//                         )}
//                       </td>

//                       <td className="p-3 text-center">{url.clicks}</td>

//                       <td className="p-3 text-center">
//                         <Button size="icon" variant="ghost" onClick={() => toggleUrlStatus(url.short_url)} aria-label="Toggle status">
//                           {url.isActive ? (
//                             <ToggleRight className="h-5 w-5 text-green-400" />
//                           ) : (
//                             <ToggleLeft className="h-5 w-5 text-red-400" />
//                           )}
//                         </Button>
//                       </td>

//                       <td className="p-3 text-center">
//                         <Button variant="ghost" className="text-red-400 hover:text-red-500" onClick={() => deleteUrl(url.short_url)} aria-label="Delete">
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Mobile cards */}
//             <div className="md:hidden space-y-3">
//               {filteredUrls.map((url) => (
//                 <Card key={url._id} className="bg-neutral-900 border-white/10">
//                   <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                       <a href={`${appUrl.replace(/\/+$/, "")}/${url.short_url}`} target="_blank" rel="noreferrer" className="text-indigo-300 font-medium">
//                         {url.short_url}
//                       </a>
//                       <div className="text-xs text-white/60">{url.clicks} clicks</div>
//                     </CardTitle>
//                   </CardHeader>

//                   <CardContent className="space-y-3">
//                     <div className="text-sm text-white/70 truncate">{url.full_url}</div>

//                     <div className="flex items-center justify-between">
//                       <div className="text-sm text-white/70">
//                         {url.user ? <span>{url.user.name} • <span className="text-xs text-white/60">{url.user.email}</span></span> : "Guest"}
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Button size="icon" variant="ghost" onClick={() => toggleUrlStatus(url.short_url)} aria-label="Toggle status">
//                           {url.isActive ? <ToggleRight className="h-5 w-5 text-green-400" /> : <ToggleLeft className="h-5 w-5 text-red-400" />}
//                         </Button>

//                         <Button variant="ghost" className="text-red-400" onClick={() => deleteUrl(url.short_url)} aria-label="Delete">
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ToggleLeft, ToggleRight, Search, RotateCw, ShieldAlert, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:3000/";

export default function AdminPanel() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | inactive

  const rootRef = useRef(null);
  const statRef = useRef(null);
  const tableRef = useRef(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
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

  // Derived: filter + search
  const filteredUrls = useMemo(() => {
    const term = search.toLowerCase().trim();
    return urls
      .filter((u) => {
        if (statusFilter === "active" && !u.isActive) return false;
        if (statusFilter === "inactive" && u.isActive) return false;
        return true;
      })
      .filter((u) => {
        const full = (u.full_url || "").toLowerCase();
        const short = (u.short_url || "").toLowerCase();
        const email = (u.user?.email || "").toLowerCase();
        return full.includes(term) || short.includes(term) || email.includes(term);
      });
  }, [urls, search, statusFilter]);

  const totals = useMemo(() => {
    const total = urls.length;
    const active = urls.filter((u) => u.isActive).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [urls]);

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
        y: 14,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.03,
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

  const formatShort = (short) => {
    const base = appUrl.replace(/\/+$/, "");
    return short?.startsWith("http")
      ? short
      : `${base}/${(short || "").replace(/^\/+/, "")}`;
  };

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
        {/* Heading */}
        <header className="mb-6" data-heading>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
            Admin
          </div>
          <h1 className="mt-3 text-3xl font-extrabold">Admin Panel</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage all short URLs, toggle status or remove problematic links.
          </p>
        </header>

        {/* Stats */}
        <div ref={statRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard label="Total URLs" value={totals.total} />
          <StatCard
            label="Active"
            value={
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                {totals.active}
              </span>
            }
          />
          <StatCard
            label="Inactive"
            value={
              <span className="inline-flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-400" />
                {totals.inactive}
              </span>
            }
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6" data-heading>
          <div className="flex items-center gap-2 w-full sm:w-2/3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search short URL, full URL or user email..."
                className="pl-9 bg-neutral-900/60 border-white/10"
              />
            </div>
            <Button
              variant="ghost"
              onClick={fetchAll}
              className="rounded-xl"
              title="Refresh"
              aria-label="Refresh"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>

          {/* Status filter segment */}
          <div className="inline-flex items-center rounded-xl border border-white/10 p-1 bg-white/5">
            {[
              { key: "all", label: "All" },
              { key: "active", label: "Active" },
              { key: "inactive", label: "Inactive" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setStatusFilter(opt.key)}
                className={[
                  "px-3 py-1.5 text-sm rounded-lg transition-colors",
                  statusFilter === opt.key
                    ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white"
                    : "text-zinc-300 hover:text-white",
                ].join(" ")}
                aria-pressed={statusFilter === opt.key}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Empty */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 w-full rounded-lg bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : filteredUrls.length === 0 ? (
          <Card className="border border-white/10 bg-white/5 backdrop-blur">
            <CardContent className="py-10 text-center text-zinc-400">
              No URLs found.
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop table */}
            <div
              ref={tableRef}
              className="hidden md:block overflow-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
            >
              <table className="w-full text-left text-sm text-zinc-200 min-w-[960px]">
                <thead className="bg-neutral-900/80 text-zinc-400 sticky top-0 z-10">
                  <tr>
                    <th className="p-3 font-medium">Short URL</th>
                    <th className="p-3 font-medium">Full URL</th>
                    <th className="p-3 font-medium">User</th>
                    <th className="p-3 text-center font-medium">Clicks</th>
                    <th className="p-3 text-center font-medium">Status</th>
                    <th className="p-3 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUrls.map((url) => {
                    const fullShort = formatShort(url.short_url);

                    return (
                      <tr key={url._id} data-row className="border-t border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-3 text-amber-300 w-48">
                          <a href={fullShort} target="_blank" rel="noreferrer" className="hover:underline">
                            {url.short_url}
                          </a>
                        </td>

                        <td className="p-3 max-w-3xl truncate text-zinc-300">{url.full_url}</td>

                        <td className="p-3">
                          {url.user ? (
                            <div className="text-sm">
                              <div className="font-medium text-zinc-100">{url.user.name}</div>
                              <div className="text-xs text-zinc-400">{url.user.email}</div>
                            </div>
                          ) : (
                            <div className="text-sm text-zinc-400">Guest</div>
                          )}
                        </td>

                        <td className="p-3 text-center">{url.clicks}</td>

                        <td className="p-3 text-center">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleUrlStatus(url.short_url)}
                            aria-label="Toggle status"
                          >
                            {url.isActive ? (
                              <ToggleRight className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <ToggleLeft className="h-5 w-5 text-rose-400" />
                            )}
                          </Button>
                        </td>

                        <td className="p-3 text-center">
                          <Button
                            variant="ghost"
                            className="text-rose-400 hover:text-rose-500"
                            onClick={() => deleteUrl(url.short_url)}
                            aria-label="Delete"
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

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {filteredUrls.map((url) => {
                const fullShort = formatShort(url.short_url);
                return (
                  <Card key={url._id} data-row className="border border-white/10 bg-white/5 backdrop-blur">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-base">
                        <a href={fullShort} target="_blank" rel="noreferrer" className="text-amber-300 font-medium">
                          {url.short_url}
                        </a>
                        <span className="text-xs text-zinc-400">{url.clicks} clicks</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm text-zinc-300 truncate">{url.full_url}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-zinc-400">
                          {url.user ? (
                            <>
                              {url.user.name} • <span className="text-xs">{url.user.email}</span>
                            </>
                          ) : (
                            "Guest"
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleUrlStatus(url.short_url)}
                            aria-label="Toggle status"
                          >
                            {url.isActive ? (
                              <ToggleRight className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <ToggleLeft className="h-5 w-5 text-rose-400" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-rose-400"
                            onClick={() => deleteUrl(url.short_url)}
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* Helpers */

function StatCard({ label, value }) {
  return (
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
      <CardContent className="relative z-[1] text-2xl md:text-3xl text-zinc-100 font-semibold">
        {value}
      </CardContent>
    </Card>
  );
}