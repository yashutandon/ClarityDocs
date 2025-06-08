import Stripe from "stripe";
import { getDbConnection } from "./db";

export async function handleCheckSessionCompleted({session,stripe}:{session:Stripe.Checkout.Session,stripe:Stripe}) {
    console.log('Session completed',session);
    const customerId=session.customer as string;
    const customer=await stripe.customers.retrieve(customerId);
    const priceId=session.line_items?.data[0]?.price?.id;

    if('email' in customer && priceId){
    const {email,name}=customer;
    await createOrUpdateUser({
        email,
        full_name:name,
        customerId,
        price_id:priceId as string,
        status:'active'
    });
} 

}


async function createOrUpdateUser({email,full_name,customer_id,price_id,status}:{email:string,full_name:string,customer_id:string,price_id:string,status:string}){
    try {
        const sql=await getDbConnection();
        
        const user=await sql`SELECT * FROM users WHERE email=${email}`;
        if(user.length===0){
            await sql`INSERT INTO users (email,full_name,customer_id,price_id,status) VALUES (${email},${full_name},${customer_id},${price_id},${status})` 
        }

    } catch (error) {
        console.log("failed to create user",error);
    }
}