// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// export default function NotFound() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center text-center bg-neutral-950 text-white">
//       <h1 className="text-7xl font-bold text-red-500">404</h1>
//       <p className="mt-4 text-xl text-white/70">This page doesn’t exist.</p>
//       <Button className="mt-6" asChild>
//         <Link to="/">Go back home</Link>
//       </Button>
//     </div>
//   );
// }


import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Sparkles, MessageSquare } from "lucide-react";
import { gsap, isReducedMotion } from "@/lib/gsap";

export default function NotFound() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = isReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from("[data-stagger]", {
        opacity: 0,
        y: 18,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.08,
      });

      gsap.from("[data-card]", {
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
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

  return (
    <main
      ref={rootRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-zinc-100 grid place-items-center px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-blob absolute -top-24 left-1/3 w-[36rem] h-[36rem] rounded-full blur-3xl bg-amber-500/15" />
        <div className="gradient-blob absolute bottom-[-16rem] right-1/5 w-[42rem] h-[42rem] rounded-full blur-3xl bg-rose-500/15" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1f_1px,transparent_1px),linear-gradient(to_bottom,#71717a1f_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl text-center">
        <div className="mb-6" data-stagger>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
            <Sparkles className="h-4 w-4" />
            Oops…
          </span>
        </div>

        <div
          data-card
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b22_0deg,#f43f5e22_120deg,#10b98122_240deg,#f59e0b22_360deg)] opacity-70"
          />

          <div className="relative z-[1]">
            <h1
              data-stagger
              className="text-[64px] md:text-[96px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-300 to-fuchsia-300 animate-gradient"
            >
              404
            </h1>
            <p data-stagger className="mt-2 text-xl md:text-2xl font-semibold">
              Page not found
            </p>
            <p data-stagger className="mt-2 text-zinc-400">
              The page you’re looking for doesn’t exist or may have been moved.
            </p>

            <div data-stagger className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 shadow-lg hover:shadow-amber-500/25"
              >
                <Link to="/" className="inline-flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Go back home
                </Link>
              </Button>

              <Button asChild variant="outline" className="rounded-xl border-white/15">
                <Link to="/create" className="inline-flex items-center gap-2">
                  Create a link
                </Link>
              </Button>

              <Button asChild variant="ghost" className="rounded-xl">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact support
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <p data-stagger className="mt-6 text-xs text-zinc-500">
          Error code: 404 • This route is not available
        </p>
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
    </main>
  );
}