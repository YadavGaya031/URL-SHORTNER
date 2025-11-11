import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Analytics() {
  const { slug } = useParams();
  const [data, setData] = useState({ total: 0, items: [], summary: [] });
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const res = await axiosClient.get(`/api/analytics/${slug}`, { withCredentials: true });
      console.log(res)
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

  if (loading) {
    return (
      <div className="container py-10">
        <div className="h-8 w-48 bg-neutral-700 animate-pulse rounded mb-6"></div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-neutral-800/50 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8">
      <Button variant="outline" asChild>
        <Link to="/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Link>
      </Button>

      <h1 className="text-3xl font-semibold">Analytics for /{slug}</h1>

      <Card className="bg-neutral-900 border-white/10">
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent className="text-4xl font-bold">{data.total}</CardContent>
      </Card>

      <Card className="bg-neutral-900 border-white/10">
        <CardHeader>
          <CardTitle>Top Sources</CardTitle>
        </CardHeader>
        <CardContent>
          {data.summary.length === 0 ? (
            <p className="text-white/60">No data available</p>
          ) : (
            <table className="w-full text-left text-white/80">
              <thead className="text-white/60">
                <tr>
                  <th className="p-2">Browser</th>
                  <th className="p-2">OS</th>
                  <th className="p-2">Country</th>
                  <th className="p-2 text-center">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {data.summary.map((row, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="p-2">{row._id.browser || "Unknown"}</td>
                    <td className="p-2">{row._id.os || "Unknown"}</td>
                    <td className="p-2">{row._id.country || "Unknown"}</td>
                    <td className="p-2 text-center">{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border-white/10">
        <CardHeader>
          <CardTitle>Recent Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          {data.items.length === 0 ? (
            <p className="text-white/60">No clicks recorded</p>
          ) : (
            <table className="w-full text-left text-white/80">
              <thead className="text-white/60">
                <tr>
                  <th className="p-2">Time</th>
                  <th className="p-2">IP</th>
                  <th className="p-2">Browser</th>
                  <th className="p-2">OS</th>
                  <th className="p-2">Country</th>
                </tr>
              </thead>
              <tbody>
                {data.items.slice(0, 10).map((item, idx) => (
                  <tr key={idx} className="border-t border-white/10">
                    <td className="p-2">{new Date(item.timestamp).toLocaleString()}</td>
                    <td className="p-2">{item.ip || "N/A"}</td>
                    <td className="p-2">{item.browser || "Unknown"}</td>
                    <td className="p-2">{item.os || "Unknown"}</td>
                    <td className="p-2">{item.country || "Unknown"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
