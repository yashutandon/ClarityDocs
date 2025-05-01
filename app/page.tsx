
import BgGradient from "@/components/common/BgGradient";
import HeroSection from "@/components/home/HeroSection";
import DemoSectiom from '@/components/home/DemoSection'
import HowItWorkSection from "@/components/home/HowItWorkSection";
import PricingSection from "@/components/home/PricingSection";
import CtaSection from "@/components/home/CtaSection";
export default function Home() {
  return (
    <div className="relative w-full ">
      <BgGradient/>
      <div className="flex flex-col ">
        <HeroSection />
        <DemoSectiom/>
        <HowItWorkSection/>
        <PricingSection/>
      <CtaSection/> 
      </div>
      
      
      
    </div>
  );
}
