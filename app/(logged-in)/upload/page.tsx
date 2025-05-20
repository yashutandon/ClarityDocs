import BgGradient from "@/components/common/BgGradient";
import { Badge } from "@/components/ui/badge";
import UploadFolder from "@/components/upload/UploadFolder";
import UploadForm from "@/components/upload/UploadForm";
import { Sparkle, Sparkles } from "lucide-react";

const page = () => (
  <section className="min-h-screen">
    <BgGradient />
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
      <UploadFolder/>
      <UploadForm/>
      </div>
    </div>
  </section>
);

export default page;
