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
        success_url: `${protocol}://${host}/success/${reqData?.cartId}`,
        cancel_url: `${protocol}://${host}/checkout/${reqData?.cartId}`,
        shipping_address_collection: { allowed_countries: ["NL"] },
        customer_email: reqData?.user?.email,
        client_reference_id: reqData?.user?.uid,
        phone_number_collection: { enabled: true },
        metadata: {
          cartId: reqData?.cartId,
        },
        custom_fields: [
          {
            key: "pickup",
            label: { type: "custom", custom: "Pick up location if needed" },
            type: "dropdown",
            optional: true,
            dropdown: {
              options: [
                {
                  label: "Amsterdam Centraal",
                  value: "amsterdamCentral",
                },
                {
                  label: "Amsterdam Zuid",
                  value: "amsterdamZuid",
                },
                { label: "Amsterdam West", value: "amsterdamWest" },
                {
                  label: "Rotterdam Centraal",
                  value: "rotterdamCentral",
                },
                {
                  label: "Rotterdam Kop van Zuid",
                  value: "rotterdamKopVanZuid",
                },
                {
                  label: "Rotterdam Katendrecht",
                  value: "rotterdamKatendrecht",
                },
                { label: "The Hague Grote Markt", value: "theHagueGroteMarkt" },
                {
                  label: "The Hague Bezuidenhout",
                  value: "theHagueBezuidenhout",
                },
                {
                  label: "The Hague Regentesekwartier ",
                  value: "theHagueRegentesekwartier",
                },
              ],
            },
          },
        ],
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
