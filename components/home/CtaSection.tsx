import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">Ready to Save Hours of Reading Time?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto md:text-xl/relaxed lg:text-base/relaxed  xl:text-xl/relaxed dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with our AI-powered summarizer.
            </p>
          </div>

          <Link href="/#pricing" passHref>
            <Button
              size="lg"
              variant={'link'}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 text-white px-6 py-3 rounded-full text-base font-semibold transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
