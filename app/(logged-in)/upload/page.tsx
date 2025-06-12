import BgGradient from "@/components/common/BgGradient";
import UploadHeader from "@/components/upload/UploadHeader";
import UploadForm from "@/components/upload/UploadForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasReachedUploadLimit } from "@/lib/user";





const upload = () => (


 <section className="min-h-screen">
    <BgGradient />
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <UploadHeader />
        <UploadForm />
      </div>
    </div>
  </section>
);

export default upload;
