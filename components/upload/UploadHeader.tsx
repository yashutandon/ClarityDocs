import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { MotionDiv } from "@/components/common/MotionWrapper";
import { itemVariants } from "@/utils/constant";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
        <MotionDiv variants={itemVariants} className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500  to-rose-800 animate-gradient-x group">
        <Badge variant={"secondary"} className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors">
          <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse "/>
          <p className="text-base">AI-Powered Content Creation</p>
        </Badge>
        </MotionDiv>

        <MotionDiv variants={itemVariants} className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
       
        Start Uploading {''}
      <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDF's</span>
          <span className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform  -skew-y-1" aria-hidden="true"></span>
      </span>

        
        </MotionDiv>
        <MotionDiv variants={itemVariants} className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
          <p>
            Upload your PDF and let our AI do the magic!✨
          </p>
        </MotionDiv>
      </div>
  );
}
