// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Link, useNavigate } from "react-router-dom";
// import axiosClient from "../api/axiosClient";
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext"; 

// export default function Login() {
//   const navigate = useNavigate();
//   // const [showPassword, setShowPassword] = useState(false);
//   const { setUser } = useAuth(); 
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axiosClient.post("/api/auth/login", form, { withCredentials: true });
//       setUser(res.data.user); 
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
//       <Card className="w-full max-w-md bg-neutral-900 border-white/10">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="you@example.com"
//                 className="bg-neutral-800 border-white/20 text-white"
//                 required
//               />
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="bg-neutral-800 border-white/20 text-white"
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             <Button type="submit" className="w-full">Login</Button>
//           </form>

//           <p className="text-sm text-center mt-4 text-white/60">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-indigo-400 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </section>
    
//   );
// }




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axiosClient from "../api/axiosClient";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosClient.post("/api/auth/login", form, { withCredentials: true });
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-800/70 to-slate-700 flex items-center">
      <div className="container mx-auto px-6 py-16 mt-12">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Brand / Illustration */}
            <div className="hidden md:flex flex-col justify-center gap-6 pr-6">
              <div className="inline-flex items-center gap-3">
                {/* <div className="h-12 w-12 rounded-lg bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg" /> */}
                <div className="mt-2 h-12 w-12">
                <img
                  src="/src/assets/logo.png"
                  alt="Decor"
                  className="w-full max-w-sm rounded-2xl object-cover opacity-90 shadow-2xl"
                />
              </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">Linkly</h1>
                  <p className="text-sm text-white/70">Short links, big impact — smart, secure and beautiful.</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-linear-to-b from-indigo-700/10 to-transparent p-6 shadow-inner border border-white/6">
                <p className="text-white/70">
                  Sign in to manage your links, view analytics, and upgrade your plan. Fast redirects and AI-powered slugs included.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  <li>• AI-generated slugs</li>
                  <li>• QR codes & campaigns</li>
                  <li>• Privacy-first analytics</li>
                </ul>
              </div>

              {/* Decorative image (optional) */}
              <div className="mt-6">
                <img
                  src="/src/assets/login.png"
                  alt="Decor"
                  className="w-full max-w-sm rounded-2xl object-cover opacity-90 shadow-2xl"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <Card className="bg-slate-900/60 border border-white/6 rounded-2xl shadow-xl">
                <CardHeader className="px-6 py-6">
                  <CardTitle className="text-xl md:text-2xl font-extrabold text-white text-center">Welcome Back</CardTitle>
                </CardHeader>

                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-sm text-white/70">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="mt-2 bg-slate-800 border-white/20 text-white"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-sm text-white/70">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="mt-2 bg-slate-800 border-white/20 text-white"
                        required
                      />
                    </div>

                    {error && <p className="text-sm text-red-400 mt-1">{error}</p>}

                    <div className="flex items-center justify-between mt-1">
                      <div className="text-sm">
                        <Link to="/forgot-password" className="text-white/70 hover:text-indigo-300 transition">Forgot password?</Link>
                      </div>
                      <div className="text-sm text-white/60">No account? <Link to="/register" className="text-indigo-300 hover:underline">Create one</Link></div>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="w-full mt-2 bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:brightness-105 active:translate-y-0.5 transition-transform"
                        disabled={loading}
                      >
                        {loading ? "Signing in…" : "Sign in"}
                      </Button>
                    </div>
                  </form>

                  <div className="mt-6 text-center text-sm text-white/60">
                    <span>By continuing you agree to our </span>
                    <Link to="/terms" className="text-indigo-300 hover:underline">Terms</Link>
                    <span className="text-white/60"> and </span>
                    <Link to="/privacy" className="text-indigo-300 hover:underline">Privacy Policy</Link>
                  </div>
                </CardContent>
              </Card>

              {/* small footer note */}
              <div className="mt-4 text-center text-xs text-white/50">
                Need help? <a href="mailto:support@linkly.io" className="text-indigo-300 hover:underline">support@linkly.io</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
