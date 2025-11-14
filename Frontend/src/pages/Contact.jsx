import React, { useState } from "react";
import { Send } from "lucide-react";
import SocialIcons from "@/components/Socialicon";
import axiosClient from "@/api/axiosClient";

const Contactpage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // POST to backend (endpoint: POST /contact)
      const res = await axiosClient.post("/contact", formData);

      if (res.data && res.data.success) {
        setStatus({ type: "success", msg: res.data.message || "Message sent!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        // handle unexpected but successful HTTP code
        setStatus({ type: "error", msg: res.data?.message || "Unexpected response from server." });
      }
    } catch (err) {
      // Normalise error message
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Network or server error";
      setStatus({ type: "error", msg });
      console.error("Contact submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <section
      id="contact"
      className="py-24 relative bg-linear-to-b from-gray-900 via-gray-950 to-black overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.3),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.3),transparent_50%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                <textarea
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300 resize-none"
                />
              </div>

              {status && (
                <div
                  className={`text-sm px-4 py-2 rounded-md ${
                    status.type === "success" ? "bg-emerald-900 text-emerald-200" : "bg-rose-900 text-rose-200"
                  }`}
                >
                  {status.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-purple-600/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5 animate-bounce" />
              </button>
            </form>
          </div>

          {/* Social Icons */}
          <div className="mt-10">
            <SocialIcons />
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contactpage;

