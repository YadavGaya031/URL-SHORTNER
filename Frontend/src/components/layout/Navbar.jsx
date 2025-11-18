import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { gsap, isReducedMotion } from "@/lib/gsap";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const rootRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Subtle reveal animation for nav on mount
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-brand]", {
        opacity: 0,
        y: -8,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.from("[data-navlink]", {
        opacity: 0,
        y: -8,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.06,
        delay: 0.05,
      });
      gsap.from("[data-cta]", {
        opacity: 0,
        y: -8,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      });
    }, rootRef);

    return () => ctx.revert();
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
    <header
      ref={rootRef}
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "bg-neutral-950/70 backdrop-blur border-b border-white/10"
          : "bg-neutral-950/40 backdrop-blur-sm"
      }`}
    >
      {/* subtle premium glow behind header */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-full -translate-x-1/2 h-16 w-[70%] rounded-[40px] bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-fuchsia-500/10 blur-2xl" />
      </div>

      <div className="container mx-auto px-6 md:px-8">
        <nav className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="group inline-flex items-center gap-2" data-brand>
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center text-white text-sm font-bold">
              L
            </div>
            <span className="text-base sm:text-lg font-semibold">
              <span className="text-amber-300">Linkly</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  [
                    "relative text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-zinc-300 hover:text-white",
                    // underline on active/hover
                    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-gradient-to-r after:from-amber-400 after:to-rose-400",
                    isActive ? "after:scale-x-100" : "hover:after:scale-x-100",
                    "after:transition-transform after:duration-300",
                  ].join(" ")
                }
                data-navlink
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-3" data-cta>
              {user ? (
                <>
                  <Button variant="ghost" asChild className="text-zinc-200 hover:text-zinc-900">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-white/5 transition">
                        <Avatar className="h-8 w-8 ring-2 ring-white/10">
                          <AvatarImage src={user.avatarUrl || ""} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:flex flex-col items-start leading-tight">
                          <span className="text-sm text-white">{user.name}</span>
                          <span className="text-xs text-zinc-400 capitalize">
                            {user.role} • {user.plan}
                          </span>
                        </div>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-64 ">
                      <DropdownMenuLabel>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl || ""} />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-zinc-400">{user.email}</p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <div className="px-3 py-2 text-xs text-zinc-600">
                        Credits:{" "}
                        <span className="text-amber-300 font-medium">{user.credits}</span>
                        <span className="mx-1">•</span>
                        Plan: <span className="capitalize text-amber-300 font-semibold">{user.plan}</span>
                      </div>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile">Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      {user.role === "admin" && (
                        <DropdownMenuItem asChild>
                          <Link to="/admin">Admin Panel</Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/pricing">Pricing / Upgrade</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-rose-400">
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="text-zinc-200 hover:text-zinc-900">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 shadow-lg hover:shadow-amber-500/80"
                  >
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="border-white/10 text-amber-300">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-neutral-950 text-zinc-100 border-l border-white/10">
                  <div className="mt-4 px-4">
                    <Link to="/" className="inline-flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center text-white text-xs font-bold">
                        L
                      </div>
                      <span className="font-semibold">
                        <span className="text-amber-300">Linkly</span>
                      </span>
                    </Link>
                  </div>

                  <nav className="mt-8 flex flex-col gap-2">
                    {NAV_LINKS.map((l) => (
                      <NavLink
                        key={l.to}
                        to={l.to}
                        className={({ isActive }) =>
                          [
                            "block w-full px-3 py-2 rounded-md text-sm",
                            isActive ? "bg-white/5 text-white" : "text-zinc-300 hover:bg-white/5 hover:text-white",
                          ].join(" ")
                        }
                      >
                        {l.label}
                      </NavLink>
                    ))}

                    <div className="border-t border-white/10 my-3" />

                    {user ? (
                      <>
                        <div className="text-sm text-zinc-400 px-1">
                          Credits: <span className="text-amber-300">{user.credits}</span>
                        </div>

                        <Button asChild className="w-full mt-2">
                          <Link to="/dashboard">Dashboard</Link>
                        </Button>
                        <Button variant="outline" asChild className=" w-full mt-2">
                          <Link to="/profile">Profile</Link>
                        </Button>
                        {user.role === "admin" && (
                          <Button variant="ghost" asChild className="w-full mt-2">
                            <Link to="/admin">Admin Panel</Link>
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          onClick={handleLogout}
                          className="w-full mt-2"
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" asChild className="w-full">
                          <Link to="/login">Login</Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full mt-2 bg-gradient-to-r from-amber-600 to-rose-600"
                        >
                          <Link to="/register">Get Started</Link>
                        </Button>
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}