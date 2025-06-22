import { plans } from "@/components/home/PricePlan";
import { getDbConnection } from "@/lib/db";
import { getUserUploadCount } from "@/lib/summaries";
import { User } from "@clerk/nextjs/server";

// ✅ Get price_id from email 
export async function getPriceIdFromEmail(email: string) {
  if (!email) {
    console.error("❌ Email not provided for getPriceIdFromEmail");
    return null;
  }

  const sql = await getDbConnection();

  const query = await sql`
    SELECT price_id FROM users WHERE LOWER(email) = LOWER(${email}) AND status = 'active'
  `;

  return query?.[0]?.price_id || null;
}

 export async function hasActivePlan(email: string) {
  if (!email) {
    console.error("❌ Email not provided for getPriceIdFromEmail");
    return null;
  }

  const sql = await getDbConnection();

  const query = await sql`
    SELECT price_id,status FROM users WHERE LOWER(email) = LOWER(${email}) AND status = 'active' AND price_id IS NOT NULL
  `;

  return query && query.length >0;
}

// ✅ Upload limit logic using userId and email
export async function hasReachedUploadLimit({
  userId,
  userEmail,
}: {
  userEmail: string;
  userId: string;
}) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdFromEmail(userEmail);

  const matchedPlan = plans.find((plan) => plan.priceId === priceId);
  const isPro = matchedPlan?.id?.toLowerCase() === "pro";
  const uploadLimit = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}

export async function getSubscriptionStatus(user:User){
  const hasSubscription=await hasActivePlan(user.emailAddresses[0].emailAddress);

  return hasSubscription;

}
