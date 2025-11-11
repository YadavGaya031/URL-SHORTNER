import { sendEmail } from "../utils/sendEmail.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

  const hash = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hash !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }

  const plans = {
    pro: { credits: 100, planName: "Pro" },
    business: { credits: 1000, planName: "Business" },
  };

  req.user.plan = plans[planId].planName;
  req.user.credits = plans[planId].credits;
  await req.user.save();

  // ✅ Send Email
  sendEmail(
    req.user.email,
    "🎉 Payment Successful - Linkly Subscription Activated",
    `<h2>Hey ${req.user.name}!</h2>
     <p>Your <b>${plans[planId].planName}</b> is now active.</p>
     <p>You now have <b>${plans[planId].credits} URL credits</b>.</p>`
  );

  res.json({ success: true, message: "Payment verified & subscription activated!" });
};


export const createOrder = async (req, res) => {
  const { planId } = req.body; // ex: "pro"

  const plans = {
    pro: { amount: 9900, credits: 100, name: "Pro Plan" }, // ₹99
    business: { amount: 39900, credits: 1000, name: "Business Plan" }, // ₹399
  };

  const plan = plans[planId];
  if (!plan) return res.status(400).json({ success: false, message: "Invalid plan" });

  const options = {
    amount: plan.amount, // in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);
  res.json({ success: true, order, plan });
};