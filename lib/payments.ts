import Stripe from "stripe";
import { getDbConnection } from "./db";

// ✅ Stripe Initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-05-28.basil",
});

// ✅ Handle Checkout Session Completed Webhook
export async function handleCheckSessionCompleted({
    session,
}: {
    session: Stripe.Checkout.Session;
}) {
    console.log("Session completed", session);

    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);

    // ✅ Get line items (not included in session object by default)
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 1,
    });

    const priceId = lineItems?.data?.[0]?.price?.id;
    const sql = await getDbConnection();

    if ("email" in customer && priceId) {
        const { email, name } = customer;

        // ✅ Insert user if not already in DB
        await createOrUpdateUser({
            sql,
            email: email as string,
            full_name: name as string,
            customer_id: customerId,
            price_id: priceId,
            status: "active",
        });

        // ✅ Record payment in DB
        await createPayment({
            sql,
            session,
            price_id: priceId,
            user_email: email as string,
        });
    }
}

async function createOrUpdateUser({
    email,
    full_name,
    customer_id,
    price_id,
    status,
    sql,
}: {
    email: string;
    full_name: string;
    customer_id: string;
    price_id: string;
    status: string;
    sql: any;
}) {
    try {
        const user = await sql`SELECT * FROM users WHERE email = ${email}`;
        if (user.length === 0) {
            await sql`
                INSERT INTO users (email, full_name, customer_id, price_id, status)
                VALUES (${email}, ${full_name}, ${customer_id}, ${price_id}, ${status})
            `;
        }
    } catch (error) {
        console.error("❌ Failed to create user:", error);
    }
}



async function createPayment({
    sql,
    session,
    price_id,
    user_email,
}: {
    sql: any;
    session: Stripe.Checkout.Session;
    price_id: string;
    user_email: string;
}) {
    try {
        const { amount_total: amount, id, status } = session;

        await sql`
            INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
            VALUES (${amount}, ${status}, ${id}, ${price_id}, ${user_email})
        `;
    } catch (error) {
        console.error("❌ Error creating payment:", error);
    }
}

export async function  handleSubscriptionDeleted({subscriptionId}:{subscriptionId:string}) {
    console.log('Subscription deleted',subscriptionId);

    try {
        const subscription=await stripe.subscriptions.retrieve(subscriptionId);
        const sql=await getDbConnection();
        await sql `UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;
        console.log('Subscription cancelled');
    } catch (error) {
        console.log('Error handling subscription deleted',error);
        throw error;
    }
}