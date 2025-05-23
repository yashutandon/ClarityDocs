"use client";

import { useUploadThing } from "@/utilis/uploadthing";
import UploadForminput from "./UploadForminput";
import { z } from "zod";
import { toast } from "sonner"; // ✅ FIXED HERE

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

const UploadForm = () => {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading", err);
      toast.error("❌ Upload failed: " + err.message); // ✅ Working toast
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });
    if (!validatedFields.success) {
      toast.error(
        validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Invalid file"
      );
      return;
    }

    const resp = await startUpload([file]);
    if (!resp) {
      toast.error("❌ Failed to upload the file");
      return;
    }

    toast.success("📄 Uploading your PDF — Hang on for a sec ✨");
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadForminput onSubmit={handleSubmit} />
    </div>
  );
};

export default UploadForm;
