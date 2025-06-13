import { plans } from "@/components/home/PricePlan";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";

export async function getPriceId(email: string) {
  const sql = await getDbConnection();

  const query = await sql`
    SELECT price_id FROM users WHERE LOWER(email) = LOWER(${email}) AND status = 'active'
  `;

  console.log("📦 DB result for", email, "=>", query);
  return query?.[0]?.price_id || null;
}
// ✅ Get price_id using userId instead of email
export async function getPriceIdFromUserId(userId: string) {
  const sql = await getDbConnection();

  const query = await sql`
    SELECT price_id FROM users WHERE id = ${userId} AND status = 'active'
  `;

  console.log("📦 DB price_id for userId:", userId, "=>", query);
  return query?.[0]?.price_id || null;
}


export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdFromUserId(userId); // ✅ Now using userId properly

  const matchedPlan = plans.find(plan => plan.priceId === priceId);
  const isPro = matchedPlan?.id === 'Pro';
  const uploadLimit: number = isPro ? 1000 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}
