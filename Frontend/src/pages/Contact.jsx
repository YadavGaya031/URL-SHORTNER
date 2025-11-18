import React, { useLayoutEffect, useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import SocialIcons from "@/components/Socialicon";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

const Contactpage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const rootRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const reduced = isReducedMotion();
    const ctx = gsap.context(() => {
      gsap.from("[data-heading]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.06,
      });

      gsap.from("[data-info]", {
        scrollTrigger: { trigger: infoRef.current, start: "top 80%", once: true },
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      gsap.from("[data-form]", {
        scrollTrigger: { trigger: formRef.current, start: "top 82%", once: true },
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.65,
        ease: "power2.out",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };
      const res = await axiosClient.post("/contact", payload);

      if (res.data && res.data.success) {
        setStatus({ type: "success", msg: res.data.message || "Message sent!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", msg: res.data?.message || "Unexpected response from server." });
      }
    } catch (err) {
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
    <section
      id="contact"
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-zinc-100"
    >
      {/* Premium background */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-blob absolute -top-28 left-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl bg-amber-500/15" />
        <div className="gradient-blob absolute bottom-[-16rem] right-1/5 w-[42rem] h-[42rem] rounded-full blur-3xl bg-rose-500/15" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1f_1px,transparent_1px),linear-gradient(to_bottom,#71717a1f_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <span
            data-heading
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-300"
          >
            <ShieldCheck className="h-4 w-4" />
            Contact
          </span>
          <h2
            data-heading
            className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
          >
            We’d love to hear from you
          </h2>
          <p data-heading className="mt-2 text-zinc-300">
            Questions, feedback, or partnership ideas — our team typically replies within 24 hours.
          </p>
        </div>

        {/* Grid: Info + Form */}
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          {/* Info column */}
          <div ref={infoRef} className="md:col-span-5 space-y-4">
            <div
              data-info
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Email</div>
                  <a
                    href="mailto:support@devirashort.app"
                    className="mt-1 inline-flex items-center gap-2 font-semibold hover:underline"
                  >
                    support@linkly.app
                    <ArrowRight className="h-4 w-4 text-amber-300" />
                  </a>
                </div>
              </div>
            </div>

            <div
              data-info
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 grid place-items-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Phone</div>
                  <div className="mt-1 font-semibold">+91 9407837955</div>
                  <div className="mt-1 text-sm text-zinc-400 inline-flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-300" />
                    Mon–Fri, 10am–6pm IST
                  </div>
                </div>
              </div>
            </div>

            <div
              data-info
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 grid place-items-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400">Address</div>
                  <div className="mt-1 font-semibold">Bhopal, India</div>
                  <div className="mt-1 text-sm text-zinc-400">Serving globally</div>
                </div>
              </div>
            </div>

            <div data-info className="pt-2">
              <SocialIcons />
            </div>
          </div>

          {/* Form column */}
          <div ref={formRef} className="md:col-span-7">
            <div
              data-form
              className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur"
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-neutral-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-neutral-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    required
                    className="w-full px-5 py-3 rounded-xl bg-neutral-900/60 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/30 transition resize-none"
                  />
                </div>

                {status && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`text-sm px-4 py-2 rounded-md ${
                      status.type === "success"
                        ? "bg-emerald-900 text-emerald-200 border border-emerald-700/50"
                        : "bg-rose-900 text-rose-200 border border-rose-700/50"
                    }`}
                  >
                    {status.msg}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 px-8 py-6 font-semibold text-white shadow-lg hover:shadow-amber-500/25 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-5 w-5 motion-safe:animate-pulse" />
                </Button>

                <p className="text-xs text-zinc-500 text-center">
                  <ShieldCheck className="inline h-4 w-4 text-emerald-400 mr-1" />
                  We never share your details. By submitting, you agree to our privacy policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Local gradient helper (used in other pages too; safe to keep) */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Contactpage;