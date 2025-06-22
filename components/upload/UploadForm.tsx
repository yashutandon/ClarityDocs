"use client";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "@/components/upload/UploadFormInput";
import {z} from "zod";
import { toast } from "sonner";
import { generatePdfSummary, generatePdfText, storePdfSummaryAction } from "@/action/uploadaction";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "@/components/upload/LoadingSkeleton";
import { formFileNameAsTitle } from "@/utils/format";



const schema=z.object({
    file:z.instanceof(File,{message:'Invalid File'}).refine((file)=>file.size<=20 *1024*1024,'File size must be less than 20MB').refine((file)=>file.type.startsWith('application/pdf'),'File must be a PDF')
});

export default function UploadForm() {

  const formRef=useRef<HTMLFormElement>(null);
  const [isloading,setIsloading]=useState(false);
  const router= useRouter();
  

     const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading",err);
      toast.error('Error occurred while uploading'+ err);
    },
    onUploadBegin: ( data ) => {
      console.log("upload has begun for", data);
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
    console.log("Upload response:", resp); 
    if(!resp){
      toast.error("Something went wrong while uploading " + "Please use a different file" );
      setIsloading(false);
        return;
    }
toast.success('✅PDF Uploaded '+ "Hang tight! Our AI us reading through your document" );
const uploadFileUrl=resp[0].serverData.fileUrl;
    // parse the pdf using langchain
   
    const fomattedfilename = formFileNameAsTitle(file.name);
    const pdfTextResponse=await generatePdfText({
      ufsUrl:uploadFileUrl,
    })
    if (!pdfTextResponse.success || !pdfTextResponse.data?.pdfText) {
  toast.error("❌ Failed to extract text from PDF");
  setIsloading(false);
  return;
}

const pdfText = pdfTextResponse.data.pdfText;

     toast('📄Generating  PDF summary '+ "Hold for a second" );
    //call ai service
    
    const summaryResult = await generatePdfSummary([
  {
    serverData: {
      pdfText: pdfText,
      file: {
        ufsUrl: uploadFileUrl,
        name: file.name,
      },
    },
  },
]);

    console.log({summaryResult});
    
    const {data= null,message=null}= summaryResult || {}
        if(data?.summary){
        let storeResult:any;
        toast.success('✅Saving your  PDF '+ "Hang tight! We are saving your summary!✨" );
      //save the summary to the database
        storeResult= await storePdfSummaryAction({
          summary: data.summary,
          fileUrl:resp[0].serverData.fileUrl,
          title:fomattedfilename,
          fileName:file.name,
         
        });
        
        toast.success('Summary Generated!✨' + " Your PDF has been successfully summarized and saved!🤝");
        formRef.current?.reset();
        router.push(`/summaries/${storeResult.data.id}`);
      }
    
    // summarize the pdf
    // save the summary to the database
   } catch (error) {
    setIsloading(false);
    console.error('Error occurred',error);
    formRef.current?.reset();
   } finally{
    setIsloading(false);
   }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isloading}
        ref={formRef}
        onSubmit={handlesubmit}
      />

      {isloading && (
        <>
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-muted-foreground text-sm">
              Processing
            </span>
          </div>
        </div>
        <LoadingSkeleton/>
        </>
      )}
    </div>
  );
}