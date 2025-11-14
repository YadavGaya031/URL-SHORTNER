import { useState, useEffect } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Link2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateURL() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    url: "",
    slug: "",
    expiresInDays: "",
  });

  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // Fetch Logged in User + Credits
  useEffect(() => {
    axiosClient
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // AI generate slug
  const handleGenerateSlug = async () => {
    if (!form.url) {
      toast.error("Enter a URL first before generating a slug");
      return;
    }
    try {
      setAiLoading(true);
      const res = await axiosClient.post(
        "/api/ai/slug",
        { url: form.url },
        { withCredentials: true }
      );
      console.log(res.data)
      setForm({ ...form, slug: res.data });
      toast.success("✨ AI-generated slug added!");
    } catch {
      toast.error("Failed to generate AI slug");
    } finally {
      setAiLoading(false);
    }
  };

  // Submit form with Credits check
  const handleSubmit = async (e) => {
    e.preventDefault();
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

      await axiosClient.post("/api/create", payload, {
        withCredentials: true,
      });

      toast.success("✅ Short URL created successfully!");
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 402) {
        toast.error("You have no credits left. Upgrade your plan.");
        return navigate("/pricing");
      }
      toast.error(err.response?.data?.message || "❌ Failed to create URL");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-white">Loading…</p>;
  }

  return (
    <div className="container py-10 max-w-xl">
      <Card className="bg-neutral-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-xl">
            Create New Short URL
            <span className="text-sm text-white/60 ml-3">
              (Credits: <span className="text-indigo-400">{user?.credits}</span>)
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label>Original URL</Label>
              <Input
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://example.com/very/long/link"
                className="bg-neutral-800 border-white/20 text-white"
                required
              />
            </div>

            <div>
              <Label>Custom Slug (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="my-custom-url"
                  className="bg-neutral-800 border-white/20 text-white"
                />
                <Button
                  type="button"
                  onClick={handleGenerateSlug}
                  disabled={aiLoading}
                  className="flex items-center gap-2"
                >
                  <Wand2 className="h-4 w-4" />
                  {aiLoading ? "Generating..." : "AI Slug"}
                </Button>
              </div>
            </div>

            <div>
              <Label>Expiry (in days — optional)</Label>
              <Input
                type="number"
                name="expiresInDays"
                value={form.expiresInDays}
                onChange={handleChange}
                placeholder="7"
                min="1"
                className="bg-neutral-800 border-white/20 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full flex items-center gap-2"
              disabled={loading || user?.credits <= 0}
            >
              <Link2 className="h-4 w-4" />
              {user?.credits <= 0
                ? "No Credits - Upgrade"
                : loading
                ? "Creating..."
                : "Shorten Link"}
            </Button>
          </form> 
        </CardContent>
      </Card>
    </div>
  );
}
