import { getPriceIdFromEmail } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { plans } from "@/components/home/PricePlan";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function PlanBadge() {
  const user = await currentUser();
  if (!user?.id) return null;

  const email = user.emailAddresses?.[0]?.emailAddress;
  if (!email) return null;

  const priceId = await getPriceIdFromEmail(email);
  const plan = plans.find((p) => p.priceId === priceId);

  const isFree = !plan || plan.id === "free";

  return (
    <Badge
      variant="outline"
      className={cn(
        "ml-2 hidden lg:flex items-center",
        isFree
          ? "bg-gradient-to-r from-red-100 to-red-200 border-red-300"
          : "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300"
      )}
    >
      <Crown
        className={cn(
          "w-3 h-3 mr-1",
          isFree ? "text-red-600" : "text-amber-600"
        )}
      />
      {plan ? plan.name : "Buy a plan"}
    </Badge>
  );
}
