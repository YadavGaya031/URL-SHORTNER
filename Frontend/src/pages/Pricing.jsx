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
      const res = await axiosClient.post("/api/payment/create-order", { plan }, { withCredentials: true });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "Linkly",
        description: `${plan.name} Plan Subscription`,
        order_id: res.data.orderId,
        handler: async (response) => {
          await axiosClient.post("/api/payment/verify", response, { withCredentials: true });
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
    <section className="container py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>

      {/* My Subscription Section */}
      {user && (
        <div className="text-center mb-10">
          <p className="text-white/70">
            Current Plan: <span className="font-semibold">{user.plan?.toUpperCase()}</span>
          </p>
          <p className="text-white/70">
            Available Credits: <span className="text-indigo-400">{user.credits}</span>
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-neutral-900 border border-white/10 rounded-xl p-6 hover:border-indigo-500 transition"
          >
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-white/70">
                  <Check className="h-4 w-4 text-green-400" /> {feature}
                </li>
              ))}
            </ul>

            {user?.plan === plan.planKey ? (
              <Button disabled className="w-full">Your Current Plan</Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => handlePayment(plan)}
              >
                {plan.price === "₹0" ? "Start Free" : "Upgrade"}
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
