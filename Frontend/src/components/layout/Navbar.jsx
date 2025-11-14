// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext"; 
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList
// } from "@/components/ui/navigation-menu";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";

// const links = [
//   { to: "/", label: "Home" },
//   { to: "/about", label: "About" },
//   { to: "/pricing", label: "Pricing" },
//   { to: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { user, setUser, logout } = useAuth(); 

//   const handleLogout = async () => {
//     try {
//       await logout(); 
//       navigate("/");
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   const initials = (user?.name || "U")
//     .split(" ")
//     .map((word) => word[0]?.toUpperCase())
//     .join("");

//   return (
//     <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur pl-6">
//       <div className="container flex h-16 items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
//           <span className="text-lg font-semibold">Linkly</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center gap-6">
//           <NavigationMenu>
//             <NavigationMenuList>
//               {links.map((l) => (
//                 <NavigationMenuItem key={l.to}>
//                   <NavLink to={l.to}>
//                     <NavigationMenuLink className="text-sm text-white/80 hover:text-white">
//                       {l.label}
//                     </NavigationMenuLink>
//                   </NavLink>
//                 </NavigationMenuItem>
//               ))}
//             </NavigationMenuList>
//           </NavigationMenu>

//           {user ? (
//             <div className="flex items-center gap-3">
//               <Button variant="ghost" asChild>
//                 <Link to="/dashboard">Dashboard</Link>
//               </Button>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <button className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-white/5">
//                     <Avatar className="h-8 w-8">
//                       <AvatarImage src={user.avatarUrl || ""} />
//                       <AvatarFallback>{initials}</AvatarFallback>
//                     </Avatar>
//                     <div className="hidden sm:flex flex-col items-start text-left leading-tight">
//                       <span className="text-sm">{user.name}</span>
//                       <span className="text-xs text-white/60 capitalize">
//                         {user.role} • {user.plan}
//                       </span>
//                     </div>
//                   </button>
//                 </DropdownMenuTrigger>

//                 <DropdownMenuContent align="end" className="w-64">
//                   <DropdownMenuLabel>
//                     <div className="flex items-center gap-3">
//                       <Avatar className="h-8 w-8">
//                         <AvatarImage src={user.avatarUrl || ""} />
//                         <AvatarFallback>{initials}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="text-sm font-medium">{user.name}</p>
//                         <p className="text-xs text-muted-foreground">{user.email}</p>
//                       </div>
//                     </div>
//                   </DropdownMenuLabel>

//                   <DropdownMenuSeparator />

//                   <div className="px-3 py-2 text-xs text-white/70">
//                     Credits: <span className="text-indigo-400">{user.credits}</span> •
//                     Plan: <span className="capitalize">{user.plan}</span>
//                   </div>

//                   <DropdownMenuSeparator />

//                   <DropdownMenuItem asChild>
//                     <Link to="/profile">Profile</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link to="/dashboard">Dashboard</Link>
//                   </DropdownMenuItem>
//                   {user.role === "admin" && (
//                     <DropdownMenuItem asChild>
//                       <Link to="/admin">Admin Panel</Link>
//                     </DropdownMenuItem>
//                   )}
//                   <DropdownMenuItem asChild>
//                     <Link to="/pricing">Pricing / Upgrade</Link>
//                   </DropdownMenuItem>

//                   <DropdownMenuSeparator />

//                   <DropdownMenuItem onClick={handleLogout} className="text-red-400">
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" asChild>
//                 <Link to="/login">Login</Link>
//               </Button>
//               <Button asChild>
//                 <Link to="/register">Get Started</Link>
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button size="icon" variant="outline">
//                 <Menu className="h-5 w-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="bg-neutral-950 text-white">
//               <nav className="mt-10 flex flex-col gap-4">
//                 {links.map((l) => (
//                   <NavLink key={l.to} to={l.to} className="text-lg">
//                     {l.label}
//                   </NavLink>
//                 ))}

//                 <div className="mt-4 flex flex-col gap-2">
//                   {user ? (
//                     <>
//                       <p className="text-sm text-white/70">
//                         Credits: <span className="text-indigo-400">{user.credits}</span> •
//                         Plan: <span className="capitalize">{user.plan}</span>
//                       </p>
//                       {user.role === "admin" && (
//                         <Button asChild><Link to="/admin">Admin Panel</Link></Button>
//                       )}
//                       <Button asChild><Link to="/dashboard">Dashboard</Link></Button>
//                       <Button asChild><Link to="/profile">Profile</Link></Button>
//                       <Button asChild><Link to="/pricing">Pricing / Upgrade</Link></Button>
//                       <Button variant="outline" onClick={handleLogout}>Logout</Button>
//                     </>
//                   ) : (
//                     <>
//                       <Button variant="ghost" asChild><Link to="/login">Login</Link></Button>
//                       <Button asChild><Link to="/register">Get Started</Link></Button>
//                     </>
//                   )}
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }


import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext"; // adjust path if needed

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth(); // assume your auth hook provides these

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <header
      className={`fixed inset-x-0 top-5 z-50 mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-slate-900/60 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <nav className="relative flex items-center justify-between rounded-2xl px-4 py-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow" />
              <span className="text-lg font-semibold text-white">Linkly</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `relative text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-white/80 hover:text-white"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right: auth / CTAs */}
          <div className="flex items-center gap-3">
            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-white/5 transition">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatarUrl || ""} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:flex flex-col items-start leading-tight">
                          <span className="text-sm text-white">{user.name}</span>
                          <span className="text-xs text-white/60 capitalize">
                            {user.role} • {user.plan}
                          </span>
                        </div>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatarUrl || ""} />
                            <AvatarFallback>{initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-white/60">{user.email}</p>
                          </div>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />

                      <div className="px-3 py-2 text-xs text-white/70">
                        Credits: <span className="text-indigo-400">{user.credits}</span>
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

                      <DropdownMenuSeparator />

                      <DropdownMenuItem onClick={handleLogout} className="text-red-400">
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
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

          {/* Mobile menu (dropdown) */}
          <div
            className={`absolute left-0 right-0 top-full mt-3 md:hidden transition-all duration-300 ${
              isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <div className="mx-4 rounded-2xl bg-slate-900/90 border border-white/6 p-4 shadow-lg">
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block w-full text-right text-sm font-medium px-2 py-2 rounded-md transition-colors ${
                        isActive ? "text-white" : "text-white/80 hover:text-white"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}

                <div className="border-t border-white/6 my-2" />

                {user ? (
                  <>
                    <div className="text-sm text-white/70 text-right">
                      Credits: <span className="text-indigo-300">{user.credits}</span>
                    </div>

                    <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-2">Dashboard</Button>
                    </Link>

                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full mt-2">Profile</Button>
                    </Link>

                    {user.role === "admin" && (
                      <Link to="/admin" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full mt-2">Admin Panel</Button>
                      </Link>
                    )}

                    <Button variant="destructive" onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full mt-2">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Login</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mt-2">Get Started</Button>
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

