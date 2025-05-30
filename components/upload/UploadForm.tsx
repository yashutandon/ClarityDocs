"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./UploadFormInput";
import {z} from "zod";
import { toast } from "sonner";
import { error } from "console";
import { generatePdfSummary } from "@/action/uploadaction";
import { useRef, useState } from "react";

const schema=z.object({
    file:z.instanceof(File,{message:'Invalid File'}).refine((file)=>file.size<=20 *1024*1024,'File size must be less than 20MB').refine((file)=>file.type.startsWith('application/pdf'),'File must be a PDF')
});

export default function UploadForm() {

  const formRef=useRef<HTMLFormElement>(null);
  const [isloading,setIsloading]=useState(false);

     const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading",err);
      toast.error('Error occurred while uploading'+ err);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
   try {
     setIsloading(true);
    const formData=new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    //validation the fields 
    // schema with zod
    const validatedFields = schema.safeParse({file});
    console.log(validatedFields);
    if (!validatedFields.success) {
        const errormessage=validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invaild file';
        console.log(errormessage)

        toast.error("❌ Something went wrong" + errormessage);
        setIsloading(false);
        return;

    }

    toast('📄Processing  PDF '+ "Hold for a second" );

    // upload the file to the uploadthing
    const resp= await startUpload([file]);
    if(!resp){
      toast.error("Something went wrong while uploading " + "Please use a different file" );
      setIsloading(false);
        return;
    }
toast.success('✅PDF Uploaded '+ "Hang tight! Our AI us reading through your document" );
    // parse the pdf using langchain
    const result = await generatePdfSummary(resp);
    console.log({result});
    const { data=null, message=null}=result || {};
    if(data){
      toast.success('✅Saving your  PDF '+ "Hang tight! We are saving your summary!✨" );
      formRef.current?.reset();
    }
    // summarize the pdf
    // save the summary to the database
   } catch (error) {
    setIsloading(false);
    console.error('Error occurred',error);
    formRef.current?.reset();
   }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput isLoading={isloading} ref={formRef} onSubmit={handlesubmit} />
    </div>
  );
}
