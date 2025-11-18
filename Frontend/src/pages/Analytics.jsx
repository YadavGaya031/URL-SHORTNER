// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axiosClient from "@/api/axiosClient";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import { toast } from "sonner";

// export default function Analytics() {
//   const { slug } = useParams();
//   const [data, setData] = useState({ total: 0, items: [], summary: [] });
//   const [loading, setLoading] = useState(true);

//   const fetchAnalytics = async () => {
//     try {
//       const res = await axiosClient.get(`/api/analytics/${slug}`, { withCredentials: true });
//       console.log(res)
//       setData(res.data);
//     } catch {
//       toast.error("Failed to load analytics");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="container py-10">
//         <div className="h-8 w-48 bg-neutral-700 animate-pulse rounded mb-6"></div>
//         <div className="space-y-3">
//           {[1, 2].map((i) => (
//             <div key={i} className="h-20 bg-neutral-800/50 rounded-xl animate-pulse"></div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-10 space-y-8">
//       <Button variant="outline" asChild>
//         <Link to="/dashboard">
//           <ArrowLeft className="mr-2 h-4 w-4" /> Back
//         </Link>
//       </Button>

//       <h1 className="text-3xl font-semibold">Analytics for /{slug}</h1>

//       <Card className="bg-neutral-900 border-white/10">
//         <CardHeader>
//           <CardTitle>Total Clicks</CardTitle>
//         </CardHeader>
//         <CardContent className="text-4xl font-bold">{data.total}</CardContent>
//       </Card>

//       <Card className="bg-neutral-900 border-white/10">
//         <CardHeader>
//           <CardTitle>Top Sources</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {data.summary.length === 0 ? (
//             <p className="text-white/60">No data available</p>
//           ) : (
//             <table className="w-full text-left text-white/80">
//               <thead className="text-white/60">
//                 <tr>
//                   <th className="p-2">Browser</th>
//                   <th className="p-2">OS</th>
//                   <th className="p-2">Country</th>
//                   <th className="p-2 text-center">Clicks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.summary.map((row, idx) => (
//                   <tr key={idx} className="border-t border-white/10">
//                     <td className="p-2">{row._id.browser || "Unknown"}</td>
//                     <td className="p-2">{row._id.os || "Unknown"}</td>
//                     <td className="p-2">{row._id.country || "Unknown"}</td>
//                     <td className="p-2 text-center">{row.count}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </CardContent>
//       </Card>

//       <Card className="bg-neutral-900 border-white/10">
//         <CardHeader>
//           <CardTitle>Recent Clicks</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {data.items.length === 0 ? (
//             <p className="text-white/60">No clicks recorded</p>
//           ) : (
//             <table className="w-full text-left text-white/80">
//               <thead className="text-white/60">
//                 <tr>
//                   <th className="p-2">Time</th>
//                   <th className="p-2">IP</th>
//                   <th className="p-2">Browser</th>
//                   <th className="p-2">OS</th>
//                   <th className="p-2">Country</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.items.slice(0, 10).map((item, idx) => (
//                   <tr key={idx} className="border-t border-white/10">
//                     <td className="p-2">{new Date(item.timestamp).toLocaleString()}</td>
//                     <td className="p-2">{item.ip || "N/A"}</td>
//                     <td className="p-2">{item.browser || "Unknown"}</td>
//                     <td className="p-2">{item.os || "Unknown"}</td>
//                     <td className="p-2">{item.country || "Unknown"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3, Globe2, Clock } from "lucide-react";
import { toast } from "sonner";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

export default function Analytics() {
  const { slug } = useParams();
  const [data, setData] = useState({ total: 0, items: [], summary: [] });
  const [loading, setLoading] = useState(true);

  const rootRef = useRef(null);
  const statRef = useRef(null);
  const tablesRef = useRef(null);

  const fetchAnalytics = async () => {
    try {
      const res = await axiosClient.get(`/api/analytics/${slug}`, { withCredentials: true });
      setData(res.data);
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [slug]);

  // Build last-24h hourly series from items
  const series = useMemo(() => buildHourlySeries(data.items || [], 24), [data.items]);
  const { counts, max, totalLast24h } = series;

  // Quick stats from data
  const uniqueCountries = useMemo(() => {
    const set = new Set((data.items || []).map((i) => i.country).filter(Boolean));
    return set.size;
  }, [data.items]);

  const topBrowser = useMemo(() => {
    const byBrowser = new Map();
    (data.summary || []).forEach((row) => {
      const b = row?._id?.browser || "Unknown";
      byBrowser.set(b, (byBrowser.get(b) || 0) + (row.count || 0));
    });
    let best = "—";
    let bestCount = -1;
    byBrowser.forEach((v, k) => {
      if (v > bestCount) {
        bestCount = v;
        best = k;
      }
    });
    return bestCount > -1 ? best : "—";
  }, [data.summary]);

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

      gsap.from("[data-card]", {
        scrollTrigger: { trigger: tablesRef.current, start: "top 85%", once: true },
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
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

  if (loading) {
    return (
      <div className="container mx-auto px-6 md:px-8 py-14">
        <div className="h-8 w-48 bg-white/5 border border-white/10 animate-pulse rounded mb-6"></div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-white/5 border border-white/10 rounded-2xl animate-pulse"></div>
          ))}
        </div>
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

      <div className="container mx-auto px-6 md:px-8 py-14 space-y-8">
        {/* Back + heading */}
        <div className="flex items-center justify-between" data-heading>
          <Button variant="outline" asChild className="border-white/15 text-zinc-900">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4 text-zinc-900" /> Back
            </Link>
          </Button>
        </div>

        <div data-heading>
          <h1 className="text-3xl md:text-4xl font-bold">
            Analytics for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300">
              /{slug}
            </span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Real‑time insights for performance and audience breakdowns.
          </p>
        </div>

        {/* Stats */}
        <div ref={statRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={<BarChart3 className="h-5 w-5 text-amber-300" />}
            label="Total clicks"
            value={data.total}
          />
          <StatCard
            icon={<Globe2 className="h-5 w-5 text-emerald-300" />}
            label="Unique countries"
            value={uniqueCountries}
          />
          <StatCard
            icon={<Clock className="h-5 w-5 text-rose-300" />}
            label="Last 24h"
            value={totalLast24h}
            hint="Clicks in the past 24 hours"
          />
        </div>

        {/* Mini chart + Top browser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" ref={tablesRef}>
          <Card data-card className="lg:col-span-7 border border-white/10 bg-white/5 backdrop-blur rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-zinc-400">Activity — last 24 hours</CardTitle>
            </CardHeader>
            <CardContent>
              <Sparkline counts={counts} max={max} />
              <div className="mt-3 text-xs text-zinc-400">
                Local time • Each point is one hour
              </div>
            </CardContent>
          </Card>

          <Card data-card className="lg:col-span-5 border border-white/10 bg-white/5 backdrop-blur rounded-3xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-zinc-400">Top browser</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 flex items-center justify-between">
                <div className="text-2xl font-semibold text-zinc-100">{topBrowser}</div>
                <div className="text-sm text-zinc-400">by clicks</div>
              </div>
              <p className="mt-3 text-xs text-zinc-400">
                Based on all recorded events for this link.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Top Sources */}
        <Card data-card className="border border-white/10 bg-white/5 backdrop-blur rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-zinc-100">Top sources</CardTitle>
          </CardHeader>
          <CardContent>
            {(!data.summary || data.summary.length === 0) ? (
              <EmptyState msg="No source data available yet." />
            ) : (
              <div className="overflow-auto rounded-xl text-zinc-100 border border-white/10">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-neutral-900/80 text-zinc-400">
                    <tr>
                      <th className="p-3 font-medium">Browser</th>
                      <th className="p-3 font-medium">OS</th>
                      <th className="p-3 font-medium">Country</th>
                      <th className="p-3 text-center font-medium">Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.summary.map((row, idx) => (
                      <tr key={idx} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-3">{row?._id?.browser || "Unknown"}</td>
                        <td className="p-3">{row?._id?.os || "Unknown"}</td>
                        <td className="p-3">{row?._id?.country || "Unknown"}</td>
                        <td className="p-3 text-center">{row?.count ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Clicks */}
        <Card data-card className="border border-white/10 bg-white/5 backdrop-blur rounded-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-zinc-100">Recent clicks</CardTitle>
          </CardHeader>
          <CardContent>
            {(!data.items || data.items.length === 0) ? (
              <EmptyState msg="No clicks recorded yet." />
            ) : (
              <div className="overflow-auto rounded-xl border text-zinc-100 border-white/10">
                <table className="w-full min-w-[720px] text-left">
                  <thead className="bg-neutral-900/80 text-zinc-400 sticky top-0">
                    <tr>
                      <th className="p-3 font-medium">Time</th>
                      <th className="p-3 font-medium">IP</th>
                      <th className="p-3 font-medium">Browser</th>
                      <th className="p-3 font-medium">OS</th>
                      <th className="p-3 font-medium">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.slice(0, 50).map((item, idx) => (
                      <tr key={idx} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-3">{formatDate(item.timestamp)}</td>
                        <td className="p-3">{item.ip || "N/A"}</td>
                        <td className="p-3">{item.browser || "Unknown"}</td>
                        <td className="p-3">{item.os || "Unknown"}</td>
                        <td className="p-3">{item.country || "Unknown"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* Helpers */

function StatCard({ icon, label, value, hint }) {
  return (
    <Card data-stat className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur rounded-3xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b22_0deg,#f43f5e22_120deg,#10b98122_240deg,#f59e0b22_360deg)] opacity-70"
      />
      <CardHeader className="relative z-[1] pb-2">
        <CardTitle className="text-xs uppercase tracking-wider text-zinc-400">{label}</CardTitle>
      </CardHeader>
      <CardContent className="relative z-[1]">
        <div className="flex items-center justify-between">
          <div className="text-2xl md:text-3xl text-zinc-100 font-semibold">{value}</div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center">
            {icon}
          </div>
        </div>
        {hint && <div className="mt-1 text-xs text-zinc-500">{hint}</div>}
      </CardContent>
    </Card>
  );
}

function EmptyState({ msg }) {
  return (
    <div className="py-10 text-center text-zinc-400">{msg}</div>
  );
}

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleString();
  } catch {
    return "—";
  }
}

// Build an array of hourly counts over the last `hours` hours.
function buildHourlySeries(items, hours = 24) {
  const now = Date.now();
  const start = now - (hours - 1) * 3600_000;
  const counts = new Array(hours).fill(0);

  (items || []).forEach((it) => {
    const t = new Date(it.timestamp).getTime();
    if (Number.isFinite(t) && t >= start) {
      const idx = Math.floor((t - start) / 3600_000);
      if (idx >= 0 && idx < hours) counts[idx] += 1;
    }
  });

  const max = Math.max(1, ...counts);
  const totalLast24h = counts.reduce((a, b) => a + b, 0);
  return { counts, max, totalLast24h };
}

// Simple sparkline component
function Sparkline({ counts, max, w = 300, h = 90 }) {
  const points = useMemo(() => {
    if (!counts || counts.length === 0) return "";
    const n = counts.length;
    const stepX = n > 1 ? w / (n - 1) : w;
    return counts
      .map((c, i) => {
        const x = i * stepX;
        const y = h - (c / (max || 1)) * h;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [counts, max, w, h]);

  const polygon = useMemo(() => {
    if (!points) return "";
    return `0,${h} ${points} ${w},${h}`;
  }, [points, w, h]);

  const gid = "gLine-" + Math.random().toString(36).slice(2);
  const fid = "fillGrad-" + Math.random().toString(36).slice(2);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[90px]">
      <defs>
        <linearGradient id={gid} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id={fid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(245,158,11,0.16)" />
          <stop offset="100%" stopColor="rgba(245,158,11,0)" />
        </linearGradient>
      </defs>

      <polyline fill="none" stroke={`url(#${gid})`} strokeWidth="3" points={points} />
      <polygon points={polygon} fill={`url(#${fid})`} />
    </svg>
  );
}