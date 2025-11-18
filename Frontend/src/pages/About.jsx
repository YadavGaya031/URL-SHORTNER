// /* eslint-disable no-unused-vars */
// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Users, Rocket, Heart } from "lucide-react";
// import { motion, useMotionValue, useTransform } from "framer-motion";

// function FeatureCard({ title, desc, Icon, colorFrom, colorTo }) {
//   // motion values for subtle tilt based on cursor position
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const rotateY = useTransform(mouseX, [-100, 100], [8, -8]);
//   const rotateX = useTransform(mouseY, [-100, 100], [-8, 8]);
//   const shadow = useTransform(rotateY, [-8, 8], ["0px 10px 30px rgba(2,6,23,0.6)", "0px 12px 40px rgba(20,24,40,0.65)"]);

//   function handleMove(e) {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;
//     mouseX.set(x);
//     mouseY.set(y);
//   }

//   function handleLeave() {
//     mouseX.set(0);
//     mouseY.set(0);
//   }

//   return (
//     <motion.article
//       onMouseMove={handleMove}
//       onMouseLeave={handleLeave}
//       style={{ rotateX, rotateY, boxShadow: shadow }}
//       whileHover={{ scale: 1.02 }}
//       className="w-full rounded-2xl p-6 bg-linear-to-b from-slate-800/60 to-slate-900/60 border border-white/6"
//     >
//       <header className="flex items-start gap-4">
//         <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg bg-linear-to-br ${colorFrom} ${colorTo} text-white shadow-inner`}>
//           <Icon className="h-5 w-5" />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-white">{title}</h3>
//           <p className="mt-2 text-sm text-white/70 max-w-xs">{desc}</p>
//         </div>
//       </header>
//     </motion.article>
//   );
// }

// export default function About() {
//   return (
//     <section className="bg-linear-to-b from-slate-800/70 to-slate-700 py-16">
//       <div className="container mx-auto px-14 mt-22">
//         <div className="max-w-2xl mx-auto text-center">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About Linkly</h1>
//           <p className="mt-3 text-base text-white/70">Linkly makes short links smart, secure, and beautiful — trusted by creators and teams worldwide.</p>
//         </div>

//         <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           <Card className="bg-transparent border-transparent shadow-none">
//             <CardContent className="p-0">
//               <FeatureCard
//                 title="Community First"
//                 desc="Features shaped by real users — built for developers and marketers."
//                 Icon={Users}
//                 colorFrom="from-indigo-500"
//                 colorTo="to-purple-500"
//               />
//             </CardContent>
//           </Card>

//           <Card className="bg-transparent border-transparent shadow-none">
//             <CardContent className="p-0">
//               <FeatureCard
//                 title="Lightning Fast"
//                 desc="Optimized for speed — instant redirects and lightweight analytics."
//                 Icon={Rocket}
//                 colorFrom="from-purple-500"
//                 colorTo="to-pink-500"
//               />
//             </CardContent>
//           </Card>

//           <Card className="bg-transparent border-transparent shadow-none">
//             <CardContent className="p-0">
//               <FeatureCard
//                 title="Built with Love"
//                 desc="Attention to detail, clean design, and code we’re proud to ship."
//                 Icon={Heart}
//                 colorFrom="from-pink-500"
//                 colorTo="to-rose-500"
//               />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </section>
//   );
// }


/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Rocket,
  Heart,
  ShieldCheck,
  BarChart3,
  Globe2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

function FeatureCard({ title, desc, Icon, gradientFrom = "from-amber-500", gradientTo = "to-rose-600" }) {
  // Subtle interactive tilt (framer-motion)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-100, 100], [8, -8]);
  const rotateX = useTransform(mouseY, [-100, 100], [-8, 8]);
  const shadow = useTransform(rotateY, [-8, 8], [
    "0px 10px 30px rgba(2,6,23,0.50)",
    "0px 12px 40px rgba(20,24,40,0.55)",
  ]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      data-reveal="feature"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, boxShadow: shadow }}
      whileHover={{ scale: 1.02 }}
      className="w-full rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur"
    >
      <header className="flex items-start gap-4">
        <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white shadow-inner`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-zinc-300 max-w-xs">{desc}</p>
        </div>
      </header>
    </motion.article>
  );
}

function Milestone({ year, title, desc }) {
  return (
    <div className="relative pl-8" data-reveal="tl">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-br from-amber-500 to-rose-600" />
      <div className="absolute left-1.5 top-2 bottom-[-1.25rem] w-px bg-white/10" aria-hidden />
      <div className="text-xs text-zinc-400">{year}</div>
      <div className="mt-1 text-base font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-zinc-400">{desc}</div>
    </div>
  );
}

export default function About() {
  const rootRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const timelineRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const reduced = isReducedMotion();
    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from("[data-hero-stagger]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.07,
      });

      // Stats counter
      ScrollTrigger.create({
        trigger: statsRef.current,
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
                const v = decimals ? obj.val.toFixed(decimals) : Math.round(obj.val);
                el.textContent = `${v}${suffix}`;
              },
            });
          });
        },
      });

      // Feature grid reveal
      gsap.from("[data-reveal='feature']", {
        scrollTrigger: { trigger: featuresRef.current, start: "top 80%", once: true },
        opacity: 0,
        y: 24,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.08,
      });

      // Timeline reveal
      gsap.from("[data-reveal='tl']", {
        scrollTrigger: { trigger: timelineRef.current, start: "top 85%", once: true },
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      // CTA reveal
      gsap.from("[data-reveal='cta']", {
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%", once: true },
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out",
      });

      if (reduced) return;

      // Blobs gentle drift
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
    <section ref={rootRef} className="relative overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-zinc-100">
      {/* Premium background: blobs + grid */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-blob absolute -top-28 left-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl bg-amber-500/15" />
        <div className="gradient-blob absolute bottom-[-16rem] right-1/5 w-[42rem] h-[42rem] rounded-full blur-3xl bg-rose-500/15" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1f_1px,transparent_1px),linear-gradient(to_bottom,#71717a1f_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      {/* HERO */}
      <div className="container mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-300" data-hero-stagger>
            <Sparkles className="h-4 w-4" />
            About
          </span>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight" data-hero-stagger>
            We’re building the premium way to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300 animate-gradient">
              share links
            </span>
            .
          </h1>

          <p className="mt-4 text-lg text-zinc-300" data-hero-stagger>
            Linkly turns long URLs into branded experiences — fast, measurable, and secure — so every click grows your brand.
          </p>
        </div>

        {/* STATS */}
        <div ref={statsRef} className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: "Uptime", value: 99.98, decimals: 2, suffix: "%" },
            { label: "Avg. redirect", value: 38, decimals: 0, suffix: "ms", accent: "text-amber-300" },
            { label: "Active users", value: 48, decimals: 0, suffix: "k+" },
            { label: "QR scans", value: 1.2, decimals: 1, suffix: "M+" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur hover:border-amber-500/30 transition">
              <div className="text-xs text-zinc-400">{s.label}</div>
              <div className={`mt-1 text-xl font-semibold ${s.accent || ""}`}>
                <span data-count={s.value} data-decimals={s.decimals} data-suffix={s.suffix}></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MISSION + VISION */}
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur" data-hero-stagger>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-300" />
              <h3 className="text-lg font-semibold">Our mission</h3>
            </div>
            <p className="mt-2 text-zinc-300">
              Make links trustworthy, on‑brand, and measurable — so teams can confidently ship campaigns and creators can grow with clarity.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur" data-hero-stagger>
            <div className="flex items-center gap-3">
              <Globe2 className="h-5 w-5 text-teal-300" />
              <h3 className="text-lg font-semibold">Our vision</h3>
            </div>
            <p className="mt-2 text-zinc-300">
              Become the link layer for the web — privacy‑friendly analytics, edge performance, and delightful tooling for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div ref={featuresRef} className="container mx-auto px-6 md:px-8 py-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold">What we value</h2>
          <p className="mt-2 text-zinc-400">The principles that guide how we build, ship, and support.</p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-transparent border-transparent shadow-none">
            <CardContent className="p-0">
              <FeatureCard
                title="Community first"
                desc="Shaped by real feedback — for developers and marketers."
                Icon={Users}
                gradientFrom="from-amber-500"
                gradientTo="to-rose-600"
              />
            </CardContent>
          </Card>

          <Card className="bg-transparent border-transparent shadow-none">
            <CardContent className="p-0">
              <FeatureCard
                title="Lightning fast"
                desc="Edge‑cached redirects and lightweight analytics."
                Icon={Rocket}
                gradientFrom="from-rose-500"
                gradientTo="to-fuchsia-600"
              />
            </CardContent>
          </Card>

          <Card className="bg-transparent border-transparent shadow-none">
            <CardContent className="p-0">
              <FeatureCard
                title="Built with love"
                desc="Careful details, clean design, and solid engineering."
                Icon={Heart}
                gradientFrom="from-emerald-500"
                gradientTo="to-teal-500"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TIMELINE */}
      <div ref={timelineRef} className="container mx-auto px-6 md:px-8 pb-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold">Our journey</h2>
          <p className="mt-2 text-zinc-400">A quick look at how we got here.</p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Milestone year="2022" title="First commit" desc="Started with a simple idea: brand every click." />
            <Milestone year="2023" title="Edge redirects" desc="Moved routing to the edge for ~38ms response." />
          </div>
          <div className="space-y-6">
            <Milestone year="2024" title="Teams & SSO" desc="Roles, 2FA, SSO/SAML and audit logs for orgs." />
            <Milestone year="2025" title="AI slugs + Rules" desc="Readable slugs and per‑campaign routing rules." />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div ref={ctaRef} className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -inset-40 bg-[conic-gradient(from_0deg,rgba(245,158,11,0.16),rgba(244,63,94,0.16),rgba(16,185,129,0.12),rgba(245,158,11,0.16))] blur-3xl opacity-60" />
        </div>

        <div className="container mx-auto px-6 md:px-8 text-center max-w-3xl" data-reveal="cta">
          <h3 className="text-3xl md:text-4xl font-bold">
            Join the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300">
              next wave
            </span>{" "}
            of branded links
          </h3>
          <p className="mt-3 text-zinc-300">
            Try Linkly and see how a simple link can feel premium.
          </p>
          <div className="mt-7 flex justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-fuchsia-600 px-8 py-7 font-bold shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/30"
            >
              <a href="/register">
                <Sparkles className="mr-2 h-5 w-5" />
                Create your first link
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Local gradient animation helper */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient { background-size: 200% 200%; animation: gradient 8s ease infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-gradient { animation: none !important; } }
      `}</style>
    </section>
  );
}