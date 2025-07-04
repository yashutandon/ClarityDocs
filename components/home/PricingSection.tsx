import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { plans } from "./PricePlan";
import { MotionDiv, MotionSection } from "@/components/common/MotionWrapper";
import { containerVariants, itemVariants } from "@/utils/constant";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const listVariants={
  hidden: { opacity: 0,y:-20 },
  visible: { opacity: 1,x:0,
    transition: {
      type:'spring',
      damping:20,
      stiffness:100
    }
   },
} as const

const PricingCard = ({ name, price, description, items, id, paymentLink }: PriceType) => {
  return (
  <MotionDiv variants={listVariants} whileInView={{scale:1.02}} className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
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

      <MotionDiv variants={listVariants}>
       <div>
         <p className="text-lg font-bold capitalize">{name}</p>
        <p className="text-gray-600 mt-2">{description}</p>
       </div>
      </MotionDiv>

      <MotionDiv variants={listVariants} className="flex gap-2 items-end">
        <p className="text-5xl tracking-tight font-extrabold">₹{price}</p>
        <div className="flex flex-col leading-none mb-1">
          <p className="text-xs uppercase font-semibold">INR</p>
          <p className="text-xs text-gray-500">per month</p>
        </div>
      </MotionDiv>

      <ul className="space-y-2.5 leading-relaxed text-base flex-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700 text-sm">
            <CheckIcon size={18} className="text-rose-500" />
            {item}
          </li>
        ))}
      </ul>

      <MotionDiv variants={listVariants} className="flex justify-center w-full mt-auto">
        <Link
          href={paymentLink}
          className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-rose-400 hover:from-rose-700 hover:to-rose-500 text-white font-medium transition-all"
        >
          Buy Now <ArrowRight size={18} />
        </Link>
      </MotionDiv>
    </div>
  </MotionDiv>
  );
};

const PricingSection = () => {
  return (
    <MotionSection variants={containerVariants} initial="hidden" whileInView="visible" viewport={{once:true,margin:'-100px'}} className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <MotionDiv variants={itemVariants} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-rose-500">Pricing</h2>
        </MotionDiv>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default PricingSection;
