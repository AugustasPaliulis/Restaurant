import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
  const reqData = await req.json();
  const host = req.headers.get("host");
  const protocol = req.headers["x-forwarded-proto"] || "http";
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: reqData?.items ?? [],
        success_url: `${protocol}://${host}`,
        cancel_url: `${protocol}://${host}/menu`,
      });
      // res.status(200).json(session);
      // return NextResponse.redirect(session.url, 302);

      return NextResponse.json({ data: session }, { status: 200 });
    } catch (err) {
      // res.status(500).json({ statusCode: 500, message: err.message });
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  } else {
    res.setHeader("Allow", "POST");
    // res.status(405).end("Method Not Allowed");
    return NextResponse.status(405);
  }
}

export async function GET(req, res) {
  console.log("GET");
  return new Response("ok");
}
