// app/api/webhook/route.ts

import { handleCheckSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil", // ya latest supported
});

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature header" }, { status: 400 });
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  let event: Stripe.Event;

  try {
    // ✅ Construct and verify Stripe event
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    // ✅ Event Type Handling
    switch (event.type) {
      case "checkout.session.completed": {
        console.log("✅ Stripe Event: checkout.session.completed");

        const session = event.data.object as Stripe.Checkout.Session;
        console.log("🔥 Webhook Triggered with session:", session);

        // ✅ Pass directly to handler — no need to retrieve again
        await handleCheckSessionCompleted({ session });
        break;
      }

      case "customer.subscription.deleted": {
        console.log("🗑️ Stripe Event: customer.subscription.deleted");

        const subscriptionId = event.data.object.id;
        await handleSubscriptionDeleted({ subscriptionId });
        break;
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }
  } catch (err: any) {
    console.error("❌ Webhook Error:", err.message);
    return NextResponse.json({ error: "Webhook handler error", message: err.message }, { status: 400 });
  }

  return NextResponse.json({ received: true });
};
