import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; 
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth(); 

  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const initials = (user?.name || "U")
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur pl-6">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
          <span className="text-lg font-semibold">Linkly</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {links.map((l) => (
                <NavigationMenuItem key={l.to}>
                  <NavLink to={l.to}>
                    <NavigationMenuLink className="text-sm text-white/80 hover:text-white">
                      {l.label}
                    </NavigationMenuLink>
                  </NavLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 rounded-md px-2 py-1 hover:bg-white/5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl || ""} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start text-left leading-tight">
                      <span className="text-sm">{user.name}</span>
                      <span className="text-xs text-white/60 capitalize">
                        {user.role} • {user.plan}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl || ""} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <div className="px-3 py-2 text-xs text-white/70">
                    Credits: <span className="text-indigo-400">{user.credits}</span> •
                    Plan: <span className="capitalize">{user.plan}</span>
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

                  <DropdownMenuItem onClick={handleLogout} className="text-red-400">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-neutral-950 text-white">
              <nav className="mt-10 flex flex-col gap-4">
                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} className="text-lg">
                    {l.label}
                  </NavLink>
                ))}

                <div className="mt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <p className="text-sm text-white/70">
                        Credits: <span className="text-indigo-400">{user.credits}</span> •
                        Plan: <span className="capitalize">{user.plan}</span>
                      </p>
                      {user.role === "admin" && (
                        <Button asChild><Link to="/admin">Admin Panel</Link></Button>
                      )}
                      <Button asChild><Link to="/dashboard">Dashboard</Link></Button>
                      <Button asChild><Link to="/profile">Profile</Link></Button>
                      <Button asChild><Link to="/pricing">Pricing / Upgrade</Link></Button>
                      <Button variant="outline" onClick={handleLogout}>Logout</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild><Link to="/login">Login</Link></Button>
                      <Button asChild><Link to="/register">Get Started</Link></Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
