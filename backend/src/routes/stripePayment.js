const express = require("express");
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Referral = require("../models/Referral");
const WalletTransaction = require("../models/WalletTransaction");
const { sendMail } = require("../utils/mailer");

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY missing in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

/* ============================================================
   1) CREATE PAYMENT INTENT
   ============================================================ */
router.post("/create-payment-intent", async (req, res) => {
  try {
const { userId, amount, referralCode } = req.body;
    if (!userId || !amount)
      return res.status(400).json({ error: "Missing userId or amount" });

const paymentIntent = await stripe.paymentIntents.create({
  amount: amount * 100,
  currency: "inr",
  metadata: { 
    userId, 
    referralCode: referralCode || "" 
  }
});

    res.json({
      ok: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ error: "Payment intent failed" });
  }
});

// ============================================================
// 2) WEBHOOK HANDLER
// ============================================================
const webhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ────────────────────────────────────────────
  // PAYMENT SUCCESS (MAIN LOGIC)
  // ────────────────────────────────────────────
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;

    const userId = intent.metadata.userId;
    const referralCode = intent.metadata.referralCode;  // Added
    const amount = intent.amount / 100;

    console.log("✔ PAYMENT SUCCESS for User:", userId);

    // Create payment record
    await Payment.create({
      userId,
      orderId: intent.id,
      paymentId: intent.id,
      amount,
      status: "success",
    });

    // Mark user paid
    const user = await User.findById(userId);
    if (!user) return res.json({ received: true });

    user.hasPaid = true;
    user.paidAt = new Date();
    await user.save();

    // Send confirmation email
    sendMail(
      user.email,
      "Payment Confirmed",
      `<p>Your payment of ₹${amount} was successful.</p>`
    );

    // ────────────────────────────────────────────
    // REFERRAL BONUS LOGIC
    // ────────────────────────────────────────────
    const refCode = referralCode || user.referredBy; // fallback
    if (refCode) {
      const referrer = await User.findOne({ referralCode: refCode });

      if (referrer) {
        console.log("Referral bonus credited to:", referrer.email);

        // 1) referral table entry
        const ref = await Referral.create({
          referrerUserId: referrer._id,
          referredUserId: user._id,
          amount: 600,
          status: "credited",
        });

        // 2) wallet balance update
        referrer.walletBalance = (referrer.walletBalance || 0) + 600;
        await referrer.save();

        // 3) wallet transaction entry
        await WalletTransaction.create({
          userId: referrer._id,
          type: "referral_bonus",
          referralId: ref._id,
          amount: 600,
          status: "success",
        });
      }
    }
  }

  // Required by Stripe
  res.json({ received: true });
};


module.exports = {
  router,
  webhook,
};
