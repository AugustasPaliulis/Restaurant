"use client";
import axios from "axios";
import getStripe from "@/stripe/get-stripe";
import { permanentRedirect, redirect } from "next/navigation";

export const redirectToCheckout = async (cart, user, cartId) => {
  const response = await axios.post("/api/checkout_sessions", {
    items: cart.map(({ priceId, quantity }) => ({
      price: priceId,
      quantity,
    })),
    cartId: cartId,
    user: user,
  });
  const { url } = response.data.data;

  window.location.href = url;
  const stripe = await getStripe();

  // await stripe.redirectToCheckout({ sessionId: id });
};
