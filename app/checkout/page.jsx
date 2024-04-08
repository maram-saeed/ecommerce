"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);

export default function Checkout() {
  const searchParams = useSearchParams();
  const options = {
    mode: "payment",
    currency: "usd",
    amount: Number(searchParams.get("amount")),
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={Number(searchParams.get("amount"))} />
    </Elements>
  );
}
