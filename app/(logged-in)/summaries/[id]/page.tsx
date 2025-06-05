import BgGradient from "@/components/common/BgGradient";
import SourceInfo from "@/components/summary/SourceInfo";
import SummaryHeader from "@/components/summary/SummaryHeader";
import SummaryView from "@/components/summary/SummaryView";
import { getSummaryId } from "@/lib/summaries";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

export default async function SummeryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummaryId(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name, word_count, created_at, original_text } = summary;
  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="relative isolate bg-gradient-to-b from-rose-50/40 to-white overflow-hidden">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="flex flex-col">
            <SummaryHeader title={title} createdAt={created_at} readingTime={readingTime} />
          </div>

          {file_name && (
            <SourceInfo
              file_name={file_name}
              original_text={original_text}
              title={title}
              summary_text={summary_text}
              created_at={created_at}
            />
          )}

          <div className="relative mt-4 sm:mt-6 lg:mt-10">
            <div className="relative p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30 transition-all duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl" />

              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400" />
                {word_count?.toLocaleString()} words
              </div>

              <div className="relative mt-8 sm:mt-6 flex justify-center">
                <SummaryView summary={summary.summary_text} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
