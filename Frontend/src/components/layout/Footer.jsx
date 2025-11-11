import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-neutral-950 ">
      <div className="container py-12 grid gap-8 md:grid-cols-4 pl-42 ">
        <div className="space-y-3 gap-12">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
            <span className="font-semibold">Linkly</span>
          </div>
          <p className="text-sm text-white/70">
            Premium URL shortener with analytics, QR, expiry, and AI slugs.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Product</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Resources</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white">Docs</a></li>
            <li><a href="#" className="hover:text-white">API</a></li>
            <li><a href="#" className="hover:text-white">Status</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-medium">Legal</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>
        </div>
      </div>
      <Separator className="bg-white/10" />
      <div className="container py-6 text-sm text-white/60 items-center justify-between">
        © {new Date().getFullYear()} Linkly. All rights reserved.
      </div>
    </footer>
  );
}
