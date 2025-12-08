const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Referral = require("../models/Referral");
const WalletTransaction = require("../models/WalletTransaction");
const { sendMail } = require("../utils/mailer");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ------------------------------
// Create Payment Intent
// ------------------------------
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount)
      return res.status(400).json({ error: "Missing userId/amount" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert ₹ to paise
      currency: "inr",
      metadata: { userId },
    });

    return res.json({
      ok: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Stripe error" });
  }
});

// ------------------------------
// Stripe Webhook (verifies payment)
// ------------------------------
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Only process successful payments
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    const userId = paymentIntent.metadata.userId;
    const amount = paymentIntent.amount / 100;

    console.log("Payment Success for User:", userId);

    // Save Payment Entry
    const pay = new Payment({
      userId,
      orderId: paymentIntent.id,
      paymentId: paymentIntent.id,
      amount,
      status: "success",
    });
    await pay.save();

    // Fetch the user
    const user = await User.findById(userId);
    if (user) {
      user.hasPaid = true;
      user.paidAt = new Date();
      await user.save();

      // Payment email
      sendMail(
        user.email,
        "Payment received - Excella",
        `<p>Hi ${user.name}, we received your payment of ₹${amount}. Your access is now active.</p>`
      ).catch((e) => console.error(e));

      // ------------------------------
      // Referral Bonus Logic (₹600)
      //------------------------------
      if (user.referredBy) {
        const referrer = await User.findOne({ referralCode: user.referredBy });

        if (referrer) {
          referrer.walletBalance = (referrer.walletBalance || 0) + 600;
          await referrer.save();

          // Referral entry
          const referral = new Referral({
            referrerUserId: referrer._id,
            referredUserId: user._id,
            amount: 600,
            status: "credited",
          });
          await referral.save();

          // Wallet transaction log
          const wallet = new WalletTransaction({
            userId: referrer._id,
            type: "referral",
            amount: 600,
            status: "success",
          });
          await wallet.save();

          // Email to referrer
          sendMail(
            referrer.email,
            "You earned ₹600 from referral",
            `<p>Congrats ${referrer.name}, you earned ₹600 as referral bonus.</p>`
          ).catch((e) => console.error(e));
        }
      }
    }
  }

  res.json({ received: true });
});

module.exports = router;
