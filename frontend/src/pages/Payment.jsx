import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ userId, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ Create PaymentIntent from backend
    const res = await API.post("/payments/create-payment-intent", {
      userId,
      amount,
    });

    const clientSecret = res.data.clientSecret;

    // 2️⃣ Confirm card payment
    const card = elements.getElement(CardElement);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (result.error) {
      setErrorMsg(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");

        // Refresh user profile
        API.get("/auth/me").then((r) => {
          localStorage.setItem("user", JSON.stringify(r.data.user));
        });

        navigate("/dashboard");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6">
      <CardElement className="border p-3 rounded" />

      <button
        className="btn w-full mt-4"
        disabled={loading}
        type="submit"
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>

      <p className="text-red-600 mt-2">{errorMsg}</p>
    </form>
  );
}

export default function PaymentStripe() {
  const { userId } = useParams();
  const amount = 1200;

  return (
    <div className="container text-center mt-5">
      <h1 className="text-xl font-semibold mb-4">Pay ₹{amount}</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm userId={userId} amount={amount} />
      </Elements>
    </div>
  );
}
