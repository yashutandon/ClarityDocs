import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 500,
    description: "Perfect for occasional use",
    items: ["50 PDF summaries per month", "Standard processing speed", "Email support"],
    paymentLink: process.env.NODE_ENV === 'development' ? "https://buy.stripe.com/test_dRm6oJcGs4itdSgfxE9sk00" : "",
    priceId: process.env.NODE_ENV=== 'development' ? "price_1RXlrvSAXpJOyYa2AM1Se0CZ" : "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 1800,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: process.env.NODE_ENV === 'development'?"https://buy.stripe.com/test_5kQ28t35ScOZaG499g9sk01":"" ,
    priceId: process.env.NODE_ENV=== 'development' ? "price_1RXlrvSAXpJOyYa2FQvSnJHg" : "",
  },
];

const PricingCard = ({ name, price, description, items, id, paymentLink }: PriceType) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300 flex flex-col h-full gap-6 z-10 p-8 border rounded-2xl transition-all hover:shadow-xl",
        id === "pro" ? "border-rose-500 border-2 bg-rose-50" : "border-gray-200 bg-white"
      )}
    >
      {/* Badge for Pro */}
      {id === "pro" && (
        <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <div>
        <p className="text-lg font-bold capitalize">{name}</p>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <div className="flex gap-2 items-end">
        <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
        <div className="flex flex-col leading-none mb-1">
          <p className="text-xs uppercase font-semibold">INR</p>
          <p className="text-xs text-gray-500">per month</p>
        </div>
      </div>

      <ul className="space-y-2.5 leading-relaxed text-base flex-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
            <CheckIcon size={18} className="text-rose-500" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex justify-center w-full mt-auto">
        <Link
          href={paymentLink}
          className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-400 hover:from-rose-700 hover:to-rose-500 text-white font-medium transition-all"
        >
          Buy Now <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-rose-500">Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
