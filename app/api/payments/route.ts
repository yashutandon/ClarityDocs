import { handleCheckSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature header" }, { status: 400 });
  }

  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed');
        const sessioniD = event.data.object.id ;
        console.log(sessioniD);

        const session=await stripe.checkout.sessions.retrieve(sessioniD,{
            expand: ['line_items'],
        });
        await handleCheckSessionCompleted({session});

        break;

      case 'customer.subscription.deleted':
        console.log('Customer subscription deleted');
        const subscription = event.data.object ;
        const subscriptionId= event.data.object.id ;
        await handleSubscriptionDeleted({subscriptionId});
        console.log(subscription);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

  } catch (err) {
    console.log('Error processing event:', err);
    return NextResponse.json({ error: 'Failed to trigger webhook', err }, { status: 400 });
  }

  return NextResponse.json({ status: 'success' });
};
