import { db } from "@/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
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
        // Adding order details to order history collection in firestore
        const docRef = doc(
          collection(
            db,
            "order_history",
            event.data.object.client_reference_id,
            "orders"
          ),
          event.data.object.metadata.cartId
        );
        const orderedItems = () => {
          return lineItems.data.map((item) => {
            return {
              mealName: item.description,
              quantity: item.quantity,
              price: item.amount_total / 100,
            };
          });
        };
        let customerInfo = {
          ...event.data.object.shipping_details.address,
          name: event.data.object.shipping_details.name,
          phoneNumber: event.data.object.customer_details.phone,
        };

        if (
          event.data.object.custom_fields[0].dropdown.value &&
          event.data.object.custom_fields[0].dropdown.value !== undefined
        ) {
          customerInfo.restaurant =
            event.data.object.custom_fields[0].dropdown.value;
        }
        setDoc(
          docRef,
          {
            cartId: event.data.object.metadata.cartId,
            items: orderedItems(),
            customerInfo,
            paymentIntent: event.data.object.payment_intent,
            date: new Date(),
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    }

    return new Response({ status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
