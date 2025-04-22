
import BgGradient from "@/components/common/BgGradient";
import HeroSection from "@/components/home/HeroSection";
import DemoSectiom from '@/components/home/DemoSection'
export default function Home() {
  return (
    <div className="relative w-full ">
      <BgGradient/>
      <div className="flex flex-col ">
        <HeroSection />
        <DemoSectiom/>
      </div>
      {/*
      <HowItWorkSection/>
      <PricingSection/>
      <CTA/> */}
    </div>
  );
}
