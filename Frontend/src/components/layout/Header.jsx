
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Magnet from "../animation/Magnet";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

function UserMenu({ user, initials, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      if (!menuRef.current) return;
      if (
        !menuRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleDocClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleDocClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-white/5 transition"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Avatar className="h-8 w-8 text-black">
          <AvatarImage src={user.avatarUrl || ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-sm text-white">{user.name}</span>
          <span className="text-xs text-white/60 capitalize">
            {user.role} • {user.plan}
          </span>
        </div>
        <svg
          className={`h-4 w-4 text-white/60 transition-transform ${open ? "rotate-180" : ""
            }`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={menuRef}
        className={`origin-top-right absolute right-0 mt-3 w-64 rounded-lg bg-slate-700/95 border border-white/6 backdrop-blur-md p-3 shadow-2xl ring-1 ring-black/10 transform transition-all duration-150 ${open ? "opacity-200 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"
          }`}
      >
        <div className="flex items-center gap-3 px-1 py-2 text-black">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-white/60 truncate">{user.email}</p>
          </div>
        </div>

        <div className="my-2 h-px bg-green-500" />

        <div className="px-2 text-xs text-white/70 flex items-center justify-between">
          <div>Credits</div>
          <div className="font-medium text-indigo-300">{user.credits}</div>
        </div>

        <div className="my-2 h-px bg-green-500" />

        <nav className="flex flex-col gap-2 px-2">
          <Link to="/profile" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-cyan-400 transition-colors duration-300 relative group">Profile</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-cyan-400 transition-colors duration-300 relative group">Dashboard</Link>
          {user.role === "admin" && (
            <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-cyan-400 transition-colors duration-300 relative group">Admin Panel</Link>
          )}
          <Link to="/pricing" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-cyan-400 transition-colors duration-300 relative group">Pricing / Upgrade</Link>
        </nav>

        <div className="my-3 h-px bg-white/6" />

        <div className="px-2">
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="w-full rounded-md py-2 text-sm text-red-400 hover:bg-red-600/6 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = (user?.name || "U")
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className={`fixed top-0 w-3/4 z-50 transition-all duration-500 left-1/2 -translate-x-1/2 mt-5 rounded-3xl ${scrolled ? 'bg-gray-500/60 backdrop-blur-xl shadow-lg shadow-cyan-500/10' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto">
        <nav className="relative flex items-center justify-between rounded-2xl px-4 py-3">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center gap-3">
            {/* <div className="h-9 w-9 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow" /> */}
            <div className=" h-12 w-12">
                <img
                  src="/src/assets/logo.png"
                  alt="Decor"
                  className="w-full max-w-sm rounded-2xl object-cover opacity-90 shadow-2xl"
                />
              </div>
            {/* <span className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Linkly</span> */}
          </Link>

          {/* Desktop nav */}
          <div className="flex gap-8">
            <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  // className={({ isActive }) => `relative text-sm font-medium transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"}`}
                  className="text-gray-100 hover:text-cyan-400 transition-colors duration-300 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
                </NavLink>
              ))}
              
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link to="/dashboard" className="inline-flex items-center rounded-md px-3 py-1 text-sm font-medium bg-green-500 hover:bg-blue-400 transition">
                    Dashboard
                  </Link>
                  <UserMenu user={user} initials={initials} onLogout={handleLogout} />
                </>
              ) : (
                <>
                  <Magnet><Link to="/login" className=" font-medium text-gray-100 text-xl rounded-2xl transition">Login</Link></Magnet>
                  <Link to="/register" className="inline-flex items-center rounded-md px-3 py-1 bg-linear-to-br from-indigo-500 to-purple-500 text-white text-sm font-semibold shadow hover:brightness-105 transition">Get Started</Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen((s) => !s)}
              className="inline-flex items-center justify-center rounded-md p-2 text-cyan-400 md:hidden"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          </div>

          {/* Mobile menu */}
          <div className={`absolute left-4 right-4 top-full mt-3 md:hidden transition-all duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
            <div className="rounded-2xl bg-slate-900/95 border border-white/6 p-4 shadow-lg">
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `block text-left text-sm font-medium px-2 py-2 rounded-md transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"}`}
                  >
                    {l.label}
                  </NavLink>
                ))}

                <div className="border-t border-white/6 my-2" />

                {user ? (
                  <>
                    <div className="text-sm text-white/70">Credits: <span className="text-indigo-300">{user.credits}</span></div>

                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full">
                      <button className="w-full mt-2 rounded-md px-3 py-2 bg-white/6 hover:bg-white/8 transition text-sm">Dashboard</button>
                    </Link>

                    <Link to="/profile" onClick={() => setIsOpen(false)} className="w-full">
                      <button className="w-full mt-2 rounded-md px-3 py-2 border border-white/6 hover:bg-white/4 transition text-sm">Profile</button>
                    </Link>

                    {user.role === "admin" && (
                      <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full">
                        <button className="w-full mt-2 rounded-md px-3 py-2 bg-transparent hover:bg-white/4 transition text-sm">Admin Panel</button>
                      </Link>
                    )}

                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full mt-2 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/6 transition">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                      <button className="w-full mt-2 rounded-md px-3 py-2 text-sm text-white/80 hover:text-white transition">Login</button>
                    </Link>

                    <Link to="/register" onClick={() => setIsOpen(false)} className="w-full">
                      <button className="w-full mt-2 rounded-md px-3 py-2 bg-linear-to-br from-indigo-500 to-purple-500 text-white font-semibold hover:brightness-105 transition">Get Started</button>
                    </Link> 
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
} 
        
