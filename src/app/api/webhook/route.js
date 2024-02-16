import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req, res) {
  try {
    // console.log("req.headers", req.headers);

    const sig = req.headers.get("stripe-signature");
    const body = await req.text();

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      return new Response({ message: err.message }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      if (!lineItems)
        return new Respnonse("Internal server error", { status: 500 });

      try {
        // console.log(lineItems);
        // Save the data, change customer account info, etc
        console.log("Fullfill the order with custom logic");
        // console.log("data", lineItems.data);
        console.log("customer email", event.data.object);
        // console.log("created", event.data.object.created);
      } catch (error) {
        console.log("Handling when you're unable to save an order");
      }
    }

    return new Response({ status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
