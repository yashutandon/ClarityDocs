import BgGradient from "@/components/common/BgGradient";
import UploadHeader from "@/components/upload/UploadHeader";
import UploadForm from "@/components/upload/UploadForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { hasReachedUploadLimit } from "@/lib/user";
import { MotionDiv } from "@/components/common/MotionWrapper";
import { containerVariants } from "@/utils/constant";

export default async function UploadPage() {
  const user = await currentUser();
  const userId = user?.id;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!userId || !email) {
    return redirect("/sign-in");
  }

  const { hasReachedLimit } = await hasReachedUploadLimit({
    userId,
    userEmail: email,
  });

  if (hasReachedLimit) {
    return redirect("/dashboard");
  }

  return (
    <section className="min-h-screen">
      <BgGradient />
      <MotionDiv variants={containerVariants} initial='hidden' animate='visible' className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
}
