import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, ShieldCheck, QrCode, Gauge } from "lucide-react";
import Magnet from "@/components/animation/Magnet";


export default function Home() {
  
  return (
    <>
      <section className="relative overflow-hidden py-16 md:py-28 bg-linear-to-b from-slate-800/70 to-slate-700">
            <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none bg-red-500">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#4f46e5" stopOpacity="0.08" />
                    <stop offset="1" stopColor="#7c3aed" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
                <rect width="1440" height="600" fill="url(#g1)" />
                <g opacity="0.06" transform="translate(120,40)">
                  <circle cx="200" cy="80" r="120" fill="#fff" />
                  <circle cx="860" cy="220" r="260" fill="#fff" />
                </g>
              </svg>
            </div>

            <div className="container px-6 md:px-12 mt-5">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12">
                {/* Left content */}
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600/20 px-3 py-1 text-sm font-medium text-indigo-300 border border-indigo-500/30">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    New — Short links, reimagined
                  </span>

                  <h1 className="mt-6 text-4xl md:text-6xl leading-tight font-extrabold tracking-tight text-white">
                    Short links,
                    <br />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-purple-400">big impact</span>
                    <span className="text-white">.</span>
                  </h1>

                  <p className="mt-6 max-w-2xl text-lg text-white/70">
                    Create branded short URLs with analytics, expiry, and QR codes. AI-generated slugs and ultra-fast redirects to scale with your apps.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/register" className="inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-indigo-500 to-purple-500 px-6 py-3 text-white text-sm font-semibold shadow-lg transform transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-400/30">
                      <Rocket className="h-5 w-5" />
                      Get started free
                    </Link>

                    <Link to="/pricing" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-blue-500/80 transition">
                      See pricing
                    </Link>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-green-300" />
                      <span>Secure by default</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-cyan-300" />
                      <span>Instant redirects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <QrCode className="h-4 w-4 text-violet-300" />
                      <span>QR & campaigns</span>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-white/3 backdrop-blur-sm border border-white/6">
                      <div className="text-xs text-white/60">Uptime</div>
                      <div className="mt-1 text-lg font-semibold text-white">99.98%</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/3 backdrop-blur-sm border border-white/6">
                      <div className="text-xs text-white/60">Avg. redirect</div>
                      <div className="mt-1 text-lg font-semibold text-white"><span className="text-indigo-300">38ms</span></div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/3 backdrop-blur-sm border border-white/6">
                      <div className="text-xs text-white/60">QR scans</div>
                      <div className="mt-1 text-lg font-semibold text-white">1.2M+</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/3 backdrop-blur-sm border border-white/6">
                      <div className="text-xs text-white/60">Domains</div>
                      <div className="mt-1 text-lg font-semibold text-white">24+</div>
                    </div>
                  </div>
                </div>


                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-md">
                    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/6 bg-linear-to-b from-white/3 to-white/2 backdrop-blur-md p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">SL</div>
                          <div>
                            <div className="text-sm font-medium text-white">Devira Short</div>
                            <div className="text-xs text-white/60">Analytics & links</div>
                          </div>
                        </div>
                        <div className="text-xs text-white/50">Active</div>
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-xl bg-slate-900/60 p-3 border border-white/6">
                          <div className="text-xs text-white/50">branded.dev/</div>
                          <div className="mt-1 text-sm font-semibold text-white">launch-now</div>
                        </div>

                        <div className="rounded-xl bg-slate-900/60 p-3 border border-white/6 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-white/50">Clicks</div>
                            <div className="text-sm font-semibold text-white">3.2k</div>
                          </div>
                          <div className="text-xs text-white/60">Today</div>
                        </div>

                        <div className="rounded-xl bg-slate-900/40 p-3 border border-white/4 flex items-center justify-between">
                          <div className="text-sm text-white/90">QR ready</div>
                          <div className="text-sm text-white/70">Scan to open</div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-3">
                        <Link to="/dashboard" className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/6 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/8">Open dashboard</Link>
                        <Link to="/create" className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white">Create</Link>
                      </div>
                    </div>
    {/* <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="160" height="160" rx="32" fill="#8b5cf6" />
                      </svg> */}
                    {/* <div className="absolute -left-35 -bottom-4 rotate-12 opacity-30">
                      
                      <img src="/src/assets/qr.jpg" alt="Decorative Shape" className="rounded-2xl opacity-400 " />
                    </div> */}
                    <div className="absolute -left-10 -bottom-6 md:-left-20 md:-bottom-10 rotate-12 opacity-40 blur-[1px] hover:opacity-60 transition-all duration-500 ease-in-out">
  <img
    src="/src/assets/qr.jpg"
    alt="Decorative Shape"
    className="w-32 md:w-48 lg:w-56 rounded-3xl object-cover shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:scale-105 hover:rotate-6 transition-transform duration-700"
  />
</div>

                  </div>
                </div>
              </div>
            </div>
      </section>
       
      <section className="container mx-auto max-w-fit px-4 sm:px-6 lg:px-8 py-16 grid gap-8 md:grid-cols-3 bg-linear-to-b from-slate-700 to-slate-600/70">
        <div className="md:col-span-3 px-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Everything you need</h2>
            <p className="mt-2 text-white/70 max-w-2xl">Powerful features that make building and sharing short links effortless.</p>
          </div>
        </div>

        <article className="w-full rounded-2xl bg-slate-900/60 border border-white/6 p-6 md:p-9 shadow-md">
          <header className="flex items-start gap-3">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-indigo-500/20">
              <svg className="h-5 w-5 text-indigo-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 21l18-9L3 3v7l12 2-12 2v7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white">AI-powered slugs</h3>
          </header>
          <p className="mt-3 text-white/70">Get smart, human-readable slugs generated by AI. No more random strings — higher click-through and brand consistency.</p>
        </article>

        <article className="w-full rounded-2xl bg-slate-900/60 border border-white/6 p-6 shadow-md">
          <header className="flex items-start gap-3">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-purple-500/20">
              <svg className="h-5 w-5 text-purple-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 3h18v18H3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white">QR codes</h3>
          </header>
          <p className="mt-3 text-white/70">Every short link comes with a ready-to-share QR — perfect for print, packaging, and offline campaigns.</p>
        </article>

        <article className="w-full rounded-2xl bg-slate-900/60 border border-white/6 p-6 shadow-md">
          <header className="flex items-start gap-3">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-500/20">
              <svg className="h-5 w-5 text-cyan-300" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white">Analytics & expiry</h3>
          </header>
          <p className="mt-3 text-white/70">Track clicks by device, browser, and country — and schedule expirations when links are time-sensitive.</p>
        </article>
      </section>


      <section className="container py-20 text-center max-w-full bg-linear-to-b from-slate-600/70 to-slate-600">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Ready to launch shorter, smarter links?
        </h2>
        <p className="mt-3 text-white/70">
          Join creators and teams using Linkly to share links that actually work for them.
        </p>
        <div className="mt-6 ">
          
          <Magnet padding={80} disabled={false} magnetStrength={3}>
              {/* <p>Star React Bits on GitHub!</p> */}
              <Button asChild size="lg" className="bg-linear-to-b from-green-500 to-slate-600/70 ">
            <Link to="/register"><Sparkles className="mr-2 h-5 w-5 " /> Create your first link</Link>
          </Button>
          </Magnet>
        </div>
      </section>
    </>
  );
}


