import { useRef, useLayoutEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, ShieldCheck, QrCode, Gauge, ArrowRight, BarChart3, Wand2, Globe2, CalendarClock } from "lucide-react";
import Magnet from "@/components/animation/Magnet";

export default function Home() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howRef = useRef(null);
  const ctaRef = useRef(null);
  const metricsRef = useRef(null);
  const tiltCardRef = useRef(null);

  // Soft spotlight follows cursor in hero
  const handleHeroMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroRef.current.style.setProperty("--x", `${x}px`);
    heroRef.current.style.setProperty("--y", `${y}px`);
  }, []);

  // Subtle 3D tilt on the right preview card
  const handleTiltMove = useCallback((e) => {
    if (!tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6; // tiltX
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;  // tiltY
    gsap.to(tiltCardRef.current, { rotateX: rx, rotateY: ry, transformPerspective: 800, transformOrigin: "center", duration: 0.4, ease: "power2.out" });
  }, []);
  const handleTiltLeave = useCallback(() => {
    if (!tiltCardRef.current) return;
    gsap.to(tiltCardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const reduced = isReducedMotion();
    const ctx = gsap.context(() => {
      // HERO entrance
      gsap.from("[data-hero-stagger]", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
      });

      // Scroll reveals (once)
      const reveal = (selector, trigger, y = 24, stagger = 0.07) => {
        gsap.from(selector, {
          scrollTrigger: { trigger, start: "top 80%", once: true },
          opacity: 0,
          y,
          duration: 0.65,
          ease: "power2.out",
          stagger,
        });
      };
      reveal("[data-reveal='feature']", featuresRef.current);
      reveal("[data-reveal='how']", howRef.current, 20, 0.06);
      gsap.from("[data-reveal='cta']", {
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%", once: true },
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out",
      });

      // Metrics counters
      ScrollTrigger.create({
        trigger: metricsRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const els = gsap.utils.toArray("[data-count]");
          els.forEach((el) => {
            const target = parseFloat(el.getAttribute("data-count") || "0");
            const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
            const suffix = el.getAttribute("data-suffix") || "";
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.6,
              ease: "power1.out",
              onUpdate: () => {
                const value = decimals ? obj.val.toFixed(decimals) : Math.round(obj.val).toString();
                el.textContent = `${value}${suffix}`;
              },
            });
          });
        },
      });

      if (reduced) return;

      // Gentle float
      gsap.to("[data-float='slow']", {
        y: -8,
        duration: 6.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 1, from: "random" },
      });
      gsap.to("[data-float='fast']", {
        y: -5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.8, from: "random" },
      });

      // Blobs subtle drift
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

  return (
    <>
      {/* HERO */}
      <section
        ref={rootRef}
        className="relative overflow-hidden bg-neutral-950 text-zinc-100"
      >
        <div
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          className="relative"
        >
          {/* spotlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px at var(--x, 50%) var(--y, 40%), rgba(245,158,11,0.12), transparent 60%)",
            }}
          />
          {/* gradient blobs */}
          <div className="absolute inset-0 -z-10">
            <div className="gradient-blob absolute -top-24 left-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl bg-amber-500/15" />
            <div className="gradient-blob absolute bottom-[-14rem] right-1/5 w-[44rem] h-[44rem] rounded-full blur-3xl bg-rose-500/15" />
            <div className="absolute inset-0 opacity-[0.10]">
              <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1f_1px,transparent_1px),linear-gradient(to_bottom,#71717a1f_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </div>

          <div className="container mx-auto px-6 md:px-8 pt-14 md:pt-20 pb-10 md:pb-16">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              {/* LEFT */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-300" data-hero-stagger>
                  <Sparkles className="h-4 w-4" />
                  New: AI Slugs + Team SSO
                </div>

                <h1 className="mt-4 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight" data-hero-stagger>
                  Shorten smarter.
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300 animate-gradient">
                    Brand every click.
                  </span>
                </h1>

                <p className="mt-4 text-lg text-zinc-300 max-w-xl" data-hero-stagger>
                  Create premium, brand‑safe short links with real‑time analytics, QR, rules and enterprise security — in one sleek dashboard.
                </p>

                <div className="mt-7 flex flex-wrap gap-3" data-hero-stagger>
                  <Magnet padding={100} disabled={false} magnetStrength={3}>
                    <Button asChild size="lg" className="rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 px-7 py-6 font-semibold shadow-lg hover:shadow-amber-500/25">
                      <Link to="/register">
                        <Rocket className="mr-2 h-5 w-5" />
                        Start free
                      </Link>
                    </Button>
                  </Magnet>
                  <Link to="/pricing" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10 transition">
                    See pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-zinc-300" data-hero-stagger>
                  <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-400" /> SSO & 2FA</span>
                  <span className="inline-flex items-center gap-2"><Gauge className="h-4 w-4 text-amber-300" /> ~38ms redirects</span>
                  <span className="inline-flex items-center gap-2"><QrCode className="h-4 w-4 text-rose-300" /> QR & UTM</span>
                </div>

                {/* METRICS */}
                <div ref={metricsRef} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl" data-hero-stagger>
                  {[
                    { label: "Uptime", value: 99.98, decimals: 2, suffix: "%" },
                    { label: "Avg. redirect", value: 38, decimals: 0, suffix: "ms", accent: "text-amber-300" },
                    { label: "QR scans", value: 1.2, decimals: 1, suffix: "M+" },
                    { label: "Domains", value: 24, decimals: 0, suffix: "+" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-amber-500/30 transition" data-float="fast">
                      <div className="text-xs text-zinc-400">{s.label}</div>
                      <div className={`mt-1 text-xl font-semibold ${s.accent || ""}`}>
                        <span data-count={s.value} data-decimals={s.decimals} data-suffix={s.suffix}></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT PREVIEW CARD */}
              <div className="lg:col-span-6">
                <div
                  className="relative mx-auto max-w-xl"
                  onMouseMove={handleTiltMove}
                  onMouseLeave={handleTiltLeave}
                >
                  <div
                    ref={tiltCardRef}
                    className="relative rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 shadow-2xl"
                    data-hero-stagger
                    data-float="slow"
                  >
                    {/* ring glow */}
                    <div className="absolute -inset-1 rounded-[28px] bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b2b_0deg,#f43f5e2b_120deg,#10b9812b_240deg,#f59e0b2b_360deg)] blur-xl opacity-70 pointer-events-none" aria-hidden />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center text-white font-bold">
                            L
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Linkly</div>
                            <div className="text-xs text-zinc-400">URL Builder</div>
                          </div>
                        </div>
                        <span className="text-xs text-emerald-300">Live</span>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-neutral-900/70 p-4">
                        <div className="text-xs text-zinc-400 mb-1">branded.dev/</div>
                        <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-rose-400">
                          launch-now
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="rounded-xl border border-white/10 bg-neutral-900/70 p-4">
                          <div className="text-xs text-zinc-400 mb-1">Clicks</div>
                          <div className="text-xl font-bold">3.2k</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-neutral-900/70 p-4">
                          <div className="text-xs text-zinc-400 mb-1">Today</div>
                          <div className="text-xl font-bold">127</div>
                        </div>
                      </div>

                      <div className="mt-3 rounded-xl border border-rose-500/30 bg-gradient-to-r from-rose-500/10 to-amber-500/10 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <QrCode className="h-5 w-5 text-rose-300" />
                            <span className="text-sm text-rose-200">QR ready</span>
                          </div>
                          <span className="text-xs text-rose-400/70">Scan to open</span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <Link to="/dashboard" className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition px-4 py-2 text-sm">
                          Open dashboard
                        </Link>
                        <Button asChild className="rounded-xl bg-gradient-to-r from-amber-600 to-rose-600">
                          <Link to="/create">Create</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Floating QR */}
                    <div className="absolute -left-16 -bottom-8" data-float="fast">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl blur-2xl opacity-40" />
                        <img
                          src="/src/assets/qr.jpg"
                          alt="QR Code"
                          className="relative w-32 md:w-38 rounded-3xl object-cover border-4 border-neutral-900 shadow-[0_0_32px_rgba(244,63,94,0.28)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* tiny spark graph */}
                <div className="relative mt-6 max-w-xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-xl p-6" data-float="slow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-emerald-300" />
                      <span className="text-sm text-zinc-300">Real‑time analytics</span>
                    </div>
                    <span className="text-xs text-zinc-400">Last 24h</span>
                  </div>
                  <svg viewBox="0 0 300 90" className="w-full h-[90px]">
                    <defs>
                      <linearGradient id="gLine" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <polyline fill="none" stroke="url(#gLine)" strokeWidth="3" points="0,70 30,65 60,60 90,62 120,48 150,40 180,44 210,30 240,36 270,22 300,28" />
                    <linearGradient id="fillGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="rgba(245,158,11,0.16)" />
                      <stop offset="100%" stopColor="rgba(245,158,11,0)" />
                    </linearGradient>
                    <polygon points="0,90 0,70 30,65 60,60 90,62 120,48 150,40 180,44 210,30 240,36 270,22 300,28 300,90" fill="url(#fillGrad)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="relative py-16 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300">
              Everything you need
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold">Premium features</h2>
            <p className="mt-2 text-zinc-400">Create, manage and measure branded links with tools built for growth.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Wand2 className="h-6 w-6 text-amber-400" />, title: "AI‑powered slugs", desc: "Readable, on‑brand slugs that increase CTR — no random strings." },
              { icon: <Globe2 className="h-6 w-6 text-emerald-300" />, title: "Custom domains", desc: "Use your own domain for fully branded short links." },
              { icon: <BarChart3 className="h-6 w-6 text-teal-300" />, title: "Real‑time analytics", desc: "Breakdowns by device, browser, referrer and country." },
              { icon: <CalendarClock className="h-6 w-6 text-rose-300" />, title: "Expiry & rules", desc: "Schedule expirations and set routing rules per campaign." },
              { icon: <QrCode className="h-6 w-6 text-rose-400" />, title: "QR built‑in", desc: "Instant PNG/SVG QRs for links, campaigns and print." },
              { icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />, title: "Enterprise security", desc: "SSO/SAML, 2FA, roles and audit logs for teams." },
            ].map((f, i) => (
              <article key={i} data-reveal="feature" className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-amber-500/30 transition">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(245,158,11,0.12),transparent)]" />
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    {f.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-zinc-400">{f.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-amber-300">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={howRef} className="relative py-16 bg-neutral-950">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
              <p className="mt-2 text-zinc-400">Three simple steps to shorter, smarter links.</p>
              <div className="mt-6 space-y-4">
                {[
                  { n: 1, t: "Paste your URL", d: "Use the dashboard or API to create links in seconds." },
                  { n: 2, t: "Brand it", d: "Pick a slug, add a domain, and tag your campaign." },
                  { n: 3, t: "Share & track", d: "Share anywhere and measure performance in real‑time." },
                ].map((s) => (
                  <div key={s.n} data-reveal="how" className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center font-bold">
                      {s.n}
                    </div>
                    <div>
                      <div className="font-semibold">{s.t}</div>
                      <div className="text-zinc-400 text-sm mt-1">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* visual rail */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_70%_0%,rgba(244,63,94,0.12),transparent)]" />
                <div className="relative grid md:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4" data-float="fast">
                    <div className="text-xs text-zinc-400 mb-1">New link</div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center">
                        <QrCode className="h-4 w-4" />
                      </div>
                      <div className="text-sm">yourbrand.dev/black-friday</div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4" data-float="fast">
                    <div className="text-xs text-zinc-400 mb-1">Rules</div>
                    <div className="text-sm">UTM=paid • geo=US/EU • expiry=30d</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4" data-float="fast">
                    <div className="text-xs text-zinc-400 mb-1">QR</div>
                    <div className="flex items-center gap-3">
                      <img src="/src/assets/qr.jpg" alt="QR" className="h-14 w-14 rounded-lg object-cover" />
                      <span className="text-sm">PNG / SVG</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4" data-float="fast">
                    <div className="text-xs text-zinc-400 mb-1">Analytics</div>
                    <div className="text-sm">Clicks: 3.2k • CTR: 4.7% • Today: 127</div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300/90 bg-emerald-500/10 text-xs">Edge‑cached</span>
                  <span className="px-3 py-1 rounded-full border border-rose-400/30 text-rose-300/90 bg-rose-500/10 text-xs">GDPR‑ready</span>
                  <span className="px-3 py-1 rounded-full border border-teal-400/30 text-teal-300/90 bg-teal-500/10 text-xs">API‑first</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative py-20 overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -inset-40 bg-[conic-gradient(from_0deg,rgba(245,158,11,0.16),rgba(244,63,94,0.16),rgba(16,185,129,0.12),rgba(245,158,11,0.16))] blur-3xl opacity-60" />
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center max-w-4xl" data-reveal="cta">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Ready to launch{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300">
              shorter, smarter
            </span>{" "}
            links?
          </h2>
          <p className="mt-5 text-lg text-zinc-300">
            Join creators and teams using Linkly to brand every click.
          </p>
          <div className="mt-9 flex justify-center">
            <Magnet padding={120} disabled={false} magnetStrength={3}>
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-fuchsia-600 px-10 py-7 text-lg font-bold shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/30 transition"
              >
                <Link to="/register" className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 group-hover:rotate-180 transition-transform duration-700" />
                  Create your first link
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
                </Link>
              </Button>
            </Magnet>
          </div>
        </div>
      </section>

      {/* Local CSS for gradient + float */}
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
    </>
  );
}