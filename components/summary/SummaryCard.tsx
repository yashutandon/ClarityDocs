import Link from "next/link"; // ✅ Correct import
import { Card } from "../ui/card";
import DeleteButton from "./DeleteButton";

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div>
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton />
        </div>
        <Link href={`summaries/${summary.id}`} className="block p-4 sm:p-6">
          <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
            {summary.title}
          </h3>
          <p>{summary.summary_text}</p>
          <p className="text-sm text-gray-500">2025</p>
        </Link>
      </Card>
    </div>
  );
}
