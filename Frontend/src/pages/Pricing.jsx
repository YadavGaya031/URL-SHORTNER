import { useEffect, useState } from "react";
import axiosClient from "@/api/axiosClient";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

export default function Pricing() {
  const [user, setUser] = useState(null);
  const plans = [
    {
      name: "Free",
      price: "₹0",
      credits: 5,
      features: [
        "5 short links",
        "Basic analytics",
        "QR code support",
        "Community email support"
      ],
      planKey: "free",
    },
    {
      name: "Pro",
      price: "₹99",
      credits: 50,
      features: [
        "50 short links",
        "Advanced analytics",
        "Custom expiry",
        "No ads + Faster redirects"
      ],
      planKey: "pro",
    },
    {
      name: "Business",
      price: "₹299",
      credits: 250,
      features: [
        "250 short links",
        "Team access + RBAC",
        "Webhook/API Access",
        "Priority support"
      ],
      planKey: "business",
    },
  ];

  useEffect(() => {
    axiosClient.get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => {});
  }, []);

  const handlePayment = async (plan) => {
    try {
      const planId = plan.planKey;
      const res = await axiosClient.post("/api/payment/create-order", { planId }, { withCredentials: true });
      const order = res.data.order;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Linkly",
        description: `${plan.name} Plan Subscription`,
        order_id: order.id,
        handler: async (response) => {
            console.log("RAZORPAY RESPONSE =>", response);
          await axiosClient.post("/api/payment/verify-payment",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            planId: plan.planKey
          } , { withCredentials: true });
          toast.success("Payment successful! Plan upgraded.");
          setTimeout(() => window.location.reload(), 1000);
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: { color: "#6366f1" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 bg-linear-to-b from-slate-800/70 to-slate-700 max-w-full">
      <div className="max-w-3xl mx-auto text-center mt-22">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Choose Your Plan</h1>
        <p className="mt-2 text-white/70">Pick a plan that fits — keep your links fast, secure and branded.</p>
      </div>

      {user && (
        <div className="mt-8 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-6 bg-slate-900/50 border border-white/6 rounded-full px-4 py-2 text-sm">
            <div className="text-white/70">Current Plan:</div>
            <div className="font-semibold text-white tracking-wide">{user.plan?.toUpperCase()}</div>
            <div className="text-white/60">•</div>
            <div className="text-white/70">Available Credits: <span className="text-indigo-300 font-medium ml-1">{user.credits}</span></div>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = user?.plan === plan.planKey;

          return (
            <div
              key={plan.planKey}
              className={`
                relative overflow-hidden rounded-2xl p-6
                bg-linear-to-b from-slate-900/70 to-slate-800/60
                border border-white/6
                transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl
                `}
            >
              {/* Badge / Ribbon for Pro (just visual, doesn't change data) */}
              {plan.planKey === "pro" && (
                <div className="absolute right-25 top-8 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-linear-to-br from-indigo-500 to-purple-500 text-white shadow-sm">
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{plan.name}</h2>
                  <p className="mt-1 text-sm text-white/70">Credits: <span className="text-indigo-300 font-medium">{plan.credits}</span></p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-extrabold text-white">{plan.price}</div>
                   {plan.planKey === "pro" && (
                      <div className="text-xs text-white/60">
                        Monthly
                      </div>
                    )}
                    {plan.planKey === "free" && (
                      <div className="text-xs text-white/60">
                        Free
                      </div>
                    )}
                    {plan.planKey === "business" && (
                      <div className="text-xs text-white/60">
                        Yearly
                      </div>
                    )}
                  {/* <div className="text-xs text-white/60">Free</div> */}
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/6">
                      <Check className="h-4 w-4 text-green-400" />
                    </span>
                    <span className="text-sm text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                {isCurrent ? (
                  <Button disabled className="w-full bg-white/6 text-white/70 border-transparent cursor-default">
                    Your Current Plan
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-linear-to-br from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-[1.01] active:translate-y-0.5 transition-transform"
                    onClick={() => handlePayment(plan)}
                    aria-label={`Choose ${plan.name} plan`}
                  >
                    {plan.price === "₹0" ? "Start Free" : "Upgrade"}
                  </Button>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <div>Secure checkout</div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2l4 4v6a4 4 0 01-8 0V6l4-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Encrypted</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
