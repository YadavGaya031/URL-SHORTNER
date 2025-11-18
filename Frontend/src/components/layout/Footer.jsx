import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Twitter, Github, Mail, Linkedin } from "lucide-react";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

export default function Footer() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = isReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from("[data-reveal='cta']", {
        scrollTrigger: { trigger: rootRef.current, start: "top 95%", once: true },
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from("[data-reveal='col']", {
        scrollTrigger: { trigger: rootRef.current, start: "top 90%", once: true },
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      if (reduced) return;

      gsap.to(".gradient-blob", {
        x: "random(-30,30)",
        y: "random(-20,20)",
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
    <footer
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-zinc-100 border-t border-white/10"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-blob absolute -top-20 left-1/3 w-[34rem] h-[34rem] rounded-full blur-3xl bg-amber-500/12" />
        <div className="gradient-blob absolute -bottom-28 right-1/4 w-[40rem] h-[40rem] rounded-full blur-3xl bg-rose-500/12" />
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1a_1px,transparent_1px),linear-gradient(to_bottom,#71717a1a_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-10 lg:py-14">
        {/* Pre-footer CTA */}
        <div
          data-reveal="cta"
          className="relative overflow-hidden mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b22_0deg,#f43f5e22_120deg,#10b98122_240deg,#f59e0b22_360deg)] opacity-70"
          />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Ready to brand every click?</h3>
              <p className="text-sm text-zinc-300 mt-1">
                Create premium short links with analytics, QR and rules — in minutes.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 shadow-lg hover:shadow-amber-500/50">
                <Link to="/register">Get started</Link>
              </Button>
              <Button variant="ghost" asChild className="text-zinc-200 hover:text-zinc-900">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {/* Brand */}
          <div className="space-y-4" data-reveal="col">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/10">
                <img
                  src="/src/assets/logo.png"
                  alt="Devira Short logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                  <span className="text-amber-500 font-semibold text-xl">Linkly</span>
                <div className="text-xs text-zinc-400">Short links, big impact</div>
              </div>
            </div>

            <p className="text-sm text-zinc-300/90 max-w-xs">
              Premium URL shortener with analytics, QR, expiry and AI slugs — trusted by creators and teams.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <a href="#" aria-label="Twitter" className="rounded-lg p-2 hover:bg-white/10 transition">
                <Twitter className="h-4 w-4 text-zinc-300" />
              </a>
              <a href="#" aria-label="GitHub" className="rounded-lg p-2 hover:bg-white/10 transition">
                <Github className="h-4 w-4 text-zinc-300" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-lg p-2 hover:bg-white/10 transition">
                <Linkedin className="h-4 w-4 text-zinc-300" />
              </a>
            </div>
          </div>

          {/* Product */}
          <nav aria-label="product" className="text-sm" data-reveal="col">
            <h4 className="mb-3 font-medium text-white">Product</h4>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">Contact</Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-white transition">Create link</Link>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="resources" className="text-sm" data-reveal="col">
            <h4 className="mb-3 font-medium text-white">Resources</h4>
            <ul className="space-y-2 text-zinc-300">
              <li><a href="#" className="hover:text-white transition">Docs</a></li>
              <li><a href="#" className="hover:text-white transition">API</a></li>
              <li><a href="#" className="hover:text-white transition">Status</a></li>
              <li><a href="#" className="hover:text-white transition">Changelog</a></li>
            </ul>
          </nav>

          {/* Newsletter / Legal */}
          <div className="text-sm" data-reveal="col">
            <h4 className="mb-3 font-medium text-white">Stay updated</h4>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: hook to newsletter API
              }}
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@company.com"
                required
                className="flex-1 rounded-lg bg-neutral-900/60 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
              />
              <Button type="submit" className="rounded-lg bg-gradient-to-r from-amber-600 to-rose-600">
                Subscribe
              </Button>
            </form>

            <div className="mt-6">
              <h4 className="mb-2 font-medium text-white">Legal</h4>
              <ul className="space-y-2 text-zinc-300">
                <li><Link to="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>

            <div className="mt-6 flex items-center gap-2 text-zinc-400">
              <Mail className="h-4 w-4 text-amber-300" />
              <span className="text-sm">support@linkly.app</span>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="mt-10">
          <Separator className="bg-white/10" />
        </div>

        {/* bottom bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-sm text-zinc-400">
          <div>© {new Date().getFullYear()} Linkly. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link to="/status" className="hover:text-white transition">System status</Link>
            <Link to="/security" className="hover:text-white transition">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}