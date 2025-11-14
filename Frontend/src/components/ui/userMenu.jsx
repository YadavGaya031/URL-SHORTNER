/* --- paste this block where your old DropdownMenu was --- */

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";

/* inside your component render */
export default function UserMenu({ user, initials, handleLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (
        !menuRef.current.contains(e.target) &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="relative">
      {/* trigger */}
      <button
        ref={btnRef}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-white/5 transition"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatarUrl || ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        {/* condensed info on small screens, expanded on >=sm */}
        <div className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-sm text-white">{user.name}</span>
          <span className="text-xs text-white/60 capitalize">
            {user.role} • {user.plan}
          </span>
        </div>

        {/* chevron */}
        <svg
          className={`h-4 w-4 text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden
        >
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* menu */}
      <div
        ref={menuRef}
        role="menu"
        aria-hidden={!open}
        className={`
          origin-top-right absolute right-0 mt-3 w-64 rounded-lg bg-slate-900/95 border border-white/6
          backdrop-blur-md p-3 shadow-2xl ring-1 ring-black/10
          transform transition-all duration-200 ease-out
          ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible pointer-events-none"}
        `}
      >
        {/* header */}
        <div className="flex items-center gap-3 px-1 py-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-white/60 truncate">{user.email}</p>
          </div>
        </div>

        <div className="my-2 h-px bg-white/6" />

        {/* quick meta */}
        <div className="px-2 text-xs text-white/70 flex items-center justify-between">
          <div>Credits</div>
          <div className="font-medium text-indigo-300">{user.credits}</div>
        </div>

        <div className="my-2 h-px bg-white/6" />

        {/* actions */}
        <nav className="flex flex-col gap-2 px-2">
          <Link to="/profile" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/4 transition">
            Profile
          </Link>

          <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/4 transition">
            Dashboard
          </Link>

          {user.role === "admin" && (
            <Link to="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/4 transition">
              Admin Panel
            </Link>
          )}

          <Link to="/pricing" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/4 transition">
            Pricing / Upgrade
          </Link>
        </nav>

        <div className="my-3 h-px bg-white/6" />

        {/* logout */}
        <div className="px-2">
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="w-full justify-center text-sm text-red-400 hover:bg-red-500/6 transition"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

/* --- usage in your Header render (replace DropdownMenu block) --- */

/* remove the old DropdownMenu block and add: */
{/* <UserMenu user={user} initials={initials} handleLogout={handleLogout} /> */}
