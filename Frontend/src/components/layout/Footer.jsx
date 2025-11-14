import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Twitter, Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-linear-to-b from-slate-900/90 via-slate-900/80 to-slate-800/70 border-t border-white/6 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* <div className="h-9 w-9 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-md flex items-center justify-center" /> */}
              <div className=" h-12 w-12">
                <img
                  src="/src/assets/logo.png"
                  alt="Decor"
                  className="w-full max-w-sm rounded-2xl object-cover opacity-90 shadow-2xl"
                />
              </div>
              <div>
                <span className="font-semibold text-white text-lg">Linkly</span>
                <div className="text-xs text-white/60">Short links, big impact</div>
              </div>
            </div>
            <p className="text-sm text-white/70 max-w-xs">
              Premium URL shortener with analytics, QR, expiry, and AI slugs —
              trusted by creators and teams.
            </p>

            <div className="flex items-center gap-3 mt-3">
              <a
                href="#"
                aria-label="Twitter"
                className="rounded-lg p-2 hover:bg-white/6 transition"
              >
                <Twitter className="h-4 w-4 text-white/80" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="rounded-lg p-2 hover:bg-white/6 transition"
              >
                <Github className="h-4 w-4 text-white/80" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-lg p-2 hover:bg-white/6 transition"
              >
                <Linkedin className="h-4 w-4 text-white/80" />
              </a>
            </div>
          </div>

          {/* Product */}
          <nav aria-label="product" className="text-sm">
            <h4 className="mb-3 font-medium text-white">Product</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link to="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="resources" className="text-sm">
            <h4 className="mb-3 font-medium text-white">Resources</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#" className="hover:text-white transition">
                  Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Status
                </a>
              </li>
            </ul>
          </nav>

          {/* Newsletter / Legal */}
          <div className="text-sm">
            <h4 className="mb-3 font-medium text-white">Stay updated</h4>

            {/* newsletter */}
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                // handle submit (wire to your API)
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@company.com"
                required
                className="flex-1 rounded-lg bg-white/4 border border-white/6 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <button
                type="submit"
                className="rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:brightness-105 transition"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6">
              <h4 className="mb-2 font-medium text-white">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-6 flex items-center gap-2 text-white/60">
              <Mail className="h-4 w-4" /> <span className="text-sm">support@linkly.io</span>
            </div>
          </div>
        </div>

        {/* separator */}
        <div className="mt-10">
          <Separator className="bg-white/6" />
        </div>

        {/* bottom bar */}
        <div className="mt-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-sm text-white/60">
          <div>© {new Date().getFullYear()} Linkly. All rights reserved.</div>

          <div className="flex items-center gap-4">
            <Link to="/status" className="hover:text-white transition">
              System status
            </Link>
            <Link to="/security" className="hover:text-white transition">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
