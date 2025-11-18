// import { useEffect, useState } from "react";
// import axiosClient from "@/api/axiosClient";
// import { Button } from "@/components/ui/button";
// import { Check } from "lucide-react";
// import { toast } from "sonner";

// export default function Pricing() {
//   const [user, setUser] = useState(null);
//   const plans = [
//     {
//       name: "Free",
//       price: "₹0",
//       credits: 5,
//       features: [
//         "5 short links",
//         "Basic analytics",
//         "QR code support",
//         "Community email support"
//       ],
//       planKey: "free",
//     },
//     {
//       name: "Pro",
//       price: "₹99",
//       credits: 50,
//       features: [
//         "50 short links",
//         "Advanced analytics",
//         "Custom expiry",
//         "No ads + Faster redirects"
//       ],
//       planKey: "pro",
//     },
//     {
//       name: "Business",
//       price: "₹299",
//       credits: 250,
//       features: [
//         "250 short links",
//         "Team access + RBAC",
//         "Webhook/API Access",
//         "Priority support"
//       ],
//       planKey: "business",
//     },
//   ];

//   useEffect(() => {
//     axiosClient.get("/api/auth/me", { withCredentials: true })
//       .then((res) => setUser(res.data.user))
//       .catch(() => {});
//   }, []);

//   const handlePayment = async (plan) => {
//     try {
//       const planId = plan.planKey;
//       const res = await axiosClient.post("/api/payment/create-order", { planId }, { withCredentials: true });
//       const order = res.data.order;
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Linkly",
//         description: `${plan.name} Plan Subscription`,
//         order_id: order.id,
//         handler: async (response) => {
//             console.log("RAZORPAY RESPONSE =>", response);
//           await axiosClient.post("/api/payment/verify-payment",
//           {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//             planId: plan.planKey
//           } , { withCredentials: true });
//           toast.success("Payment successful! Plan upgraded.");
//           setTimeout(() => window.location.reload(), 1000);
//         },
//         prefill: {
//           name: user?.name || "",
//           email: user?.email || "",
//         },
//         theme: { color: "#6366f1" },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment failed");
//     }
//   };

//   return (
//     <section className="container mx-auto px-4 py-12 bg-linear-to-b from-slate-800/70 to-slate-700 max-w-full">
//       <div className="max-w-3xl mx-auto text-center mt-22">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Choose Your Plan</h1>
//         <p className="mt-2 text-white/70">Pick a plan that fits — keep your links fast, secure and branded.</p>
//       </div>

//       {user && (
//         <div className="mt-8 max-w-3xl mx-auto text-center">
//           <div className="inline-flex items-center justify-center gap-6 bg-slate-900/50 border border-white/6 rounded-full px-4 py-2 text-sm">
//             <div className="text-white/70">Current Plan:</div>
//             <div className="font-semibold text-white tracking-wide">{user.plan?.toUpperCase()}</div>
//             <div className="text-white/60">•</div>
//             <div className="text-white/70">Available Credits: <span className="text-indigo-300 font-medium ml-1">{user.credits}</span></div>
//           </div>
//         </div>
//       )}

//       <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
//         {plans.map((plan) => {
//           const isCurrent = user?.plan === plan.planKey;

//           return (
//             <div
//               key={plan.planKey}
//               className={`
//                 relative overflow-hidden rounded-2xl p-6
//                 bg-linear-to-b from-slate-900/70 to-slate-800/60
//                 border border-white/6
//                 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl
//                 `}
//             >
//               {/* Badge / Ribbon for Pro (just visual, doesn't change data) */}
//               {plan.planKey === "pro" && (
//                 <div className="absolute right-25 top-8 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
//                   Popular
//                 </div>
//               )}

//               <div className="flex items-center justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">{plan.name}</h2>
//                   <p className="mt-1 text-sm text-white/70">Credits: <span className="text-indigo-300 font-medium">{plan.credits}</span></p>
//                 </div>

//                 <div className="text-right">
//                   <div className="text-3xl font-extrabold text-white">{plan.price}</div>
//                    {plan.planKey === "pro" && (
//                       <div className="text-xs text-white/60">
//                         Monthly
//                       </div>
//                     )}
//                     {plan.planKey === "free" && (
//                       <div className="text-xs text-white/60">
//                         Free
//                       </div>
//                     )}
//                     {plan.planKey === "business" && (
//                       <div className="text-xs text-white/60">
//                         Yearly
//                       </div>
//                     )}
//                   {/* <div className="text-xs text-white/60">Free</div> */}
//                 </div>
//               </div>

//               <ul className="mt-6 space-y-3">
//                 {plan.features.map((feature, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/6">
//                       <Check className="h-4 w-4 text-green-400" />
//                     </span>
//                     <span className="text-sm text-white/70">{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-6">
//                 {isCurrent ? (
//                   <Button disabled className="w-full bg-white/6 text-white/70 border-transparent cursor-default">
//                     Your Current Plan
//                   </Button>
//                 ) : (
//                   <Button
//                     className="w-full bg-linear-to-br from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.01] active:translate-y-0.5 transition-transform"
//                     onClick={() => handlePayment(plan)}
//                     aria-label={`Choose ${plan.name} plan`}
//                   >
//                     {plan.price === "₹0" ? "Start Free" : "Upgrade"}
//                   </Button>
//                 )}
//               </div>

//               <div className="mt-4 flex items-center justify-between text-xs text-white/50">
//                 <div>Secure checkout</div>
//                 <div className="flex items-center gap-2">
//                   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
//                     <path d="M12 2l4 4v6a4 4 0 01-8 0V6l4-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                   <span>Encrypted</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }


import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { gsap, ScrollTrigger, isReducedMotion } from "@/lib/gsap";

export default function Pricing() {
  const [user, setUser] = useState(null);
  const rootRef = useRef(null);
  const gridRef = useRef(null);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      credits: 5,
      features: [
        "5 short links",
        "Basic analytics",
        "QR code support",
        "Community email support",
      ],
      planKey: "free",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹99",
      credits: 100,
      features: [
        "50 short links",
        "Advanced analytics",
        "Custom expiry",
        "No ads + Faster redirects",
      ],
      planKey: "pro",
      highlight: true, // Most popular
    },
    {
      name: "Business",
      price: "₹999",
      credits: 1000,
      features: [
        "250 short links",
        "Team access + RBAC",
        "Webhook/API Access",
        "Priority support",
      ],
      planKey: "business",
      highlight: false,
    },
  ];

  useEffect(() => {
    axiosClient
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => {});
  }, []);

  // Ensure Razorpay script exists (safe-guard)
  useEffect(() => {
    if (window.Razorpay) return;
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, []);

  const handlePayment = async (plan) => {
    try {
      if (!window.Razorpay) {
        toast.error("Payment SDK not loaded. Please try again.");
        return;
      }
      const planId = plan.planKey;
      const res = await axiosClient.post(
        "/api/payment/create-order",
        { planId },
        { withCredentials: true }
      );
      const order = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Devira Short",
        description: `${plan.name} Plan Subscription`,
        order_id: order.id,
        handler: async (response) => {
          await axiosClient.post(
            "/api/payment/verify-payment",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.planKey,
            },
            { withCredentials: true }
          );
          toast.success("Payment successful! Plan upgraded.");
          setTimeout(() => window.location.reload(), 1000);
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#f59e0b" }, // amber
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  // GSAP animations
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = isReducedMotion();

    const ctx = gsap.context(() => {
      gsap.from("[data-heading]", {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.06,
      });

      gsap.from("[data-kpis]", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.from("[data-card]", {
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });

      if (reduced) return;

      // subtle background blobs drift
      gsap.to(".gradient-blob", {
        x: "random(-40,40)",
        y: "random(-30,30)",
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
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-gradient-to-b from-neutral-950 to-neutral-900 text-zinc-100"
    >
      {/* Background: premium blobs + grid */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-blob absolute -top-24 left-1/4 w-[36rem] h-[36rem] rounded-full blur-3xl bg-amber-500/15" />
        <div className="gradient-blob absolute bottom-[-16rem] right-1/5 w-[42rem] h-[42rem] rounded-full blur-3xl bg-rose-500/15" />
        <div className="absolute inset-0 opacity-[0.10]">
          <div className="w-full h-full bg-[linear-gradient(to_right,#71717a1f_1px,transparent_1px),linear-gradient(to_bottom,#71717a1f_1px,transparent_1px)] bg-[size:44px_44px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-16">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <span
            data-heading
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-300"
          >
            <Zap className="h-4 w-4" />
            Pricing
          </span>
          <h1 data-heading className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Choose your plan
          </h1>
          <p data-heading className="mt-2 text-zinc-300">
            Pick a plan that fits — keep your links fast, secure and on‑brand.
          </p>
        </div>

        {/* Current plan + credits */}
        {user && (
          <div data-kpis className="mt-7 max-w-[408px] mx-auto ">
            <div className="inline-flex items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
              <span className="text-zinc-400">Current:</span>
              <span className="font-semibold tracking-wide">{user.plan?.toUpperCase()}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">
                Credits: <span className="text-amber-300 font-medium">{user.credits}</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-2 text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Secure billing
              </span>
            </div>
          </div>
        )}

        {/* Plans grid */}
        <div ref={gridRef} className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
          {plans.map((plan) => {
            const isCurrent = user?.plan === plan.planKey;

            return (
              <div
                key={plan.planKey}
                data-card
                className={[
                  "relative overflow-hidden rounded-3xl p-6 backdrop-blur",
                  "border border-white/10 bg-white/5",
                  "transition-transform duration-300 hover:-translate-y-2",
                  plan.highlight ? "ring-1 ring-amber-500/20" : "",
                ].join(" ")}
              >
                {/* Highlight ring and ribbon */}
                {plan.highlight && (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-px rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,#f59e0b26_0deg,#f43f5e26_120deg,#10b98126_240deg,#f59e0b26_360deg)] opacity-70 blur"
                    />
                    <span className="absolute right-2 top-1 z-[1] inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 px-2 py-[3px] text-xs  text-white shadow">
                      Most popular
                    </span>
                  </>
                )}

                {/* Card content */}
                <div className="relative z-[1]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{plan.name}</h2>
                      <p className="mt-1 text-sm text-zinc-400">
                        Credits: <span className="text-amber-300 font-medium">{plan.credits}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-extrabold ${plan.highlight ? "text-amber-300" : "text-white"}`}>
                        {plan.price}
                      </div>
                      <div className="text-xs text-zinc-400">{plan.planKey === "free" ? "Free" : "Monthly"}</div>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md border border-emerald-400/20 bg-emerald-500/10">
                          <Check className="h-4 w-4 text-emerald-400" />
                        </span>
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    {isCurrent ? (
                      <Button disabled className="w-full bg-white/5 text-zinc-400 border-transparent cursor-default">
                        Your current plan
                      </Button>
                    ) : (
                      <Button
                        className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 font-semibold shadow-lg hover:shadow-amber-500/25"
                        onClick={() => handlePayment(plan)}
                        aria-label={`Choose ${plan.name} plan`}
                      >
                        {plan.price === "₹0" ? "Start Free" : "Upgrade"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                    <div className="inline-flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Secure checkout
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path
                          d="M12 2l4 4v6a4 4 0 01-8 0V6l4-4z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Encrypted
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small note */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          All prices in INR. Taxes may apply.
        </p>
      </div>
    </section>
  );
}