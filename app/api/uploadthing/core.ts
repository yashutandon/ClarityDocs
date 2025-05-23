
import { currentUser } from "@clerk/nextjs/server";
import {UploadThingError} from "uploadthing/server";
import {createUploadthing, type FileRouter} from "uploadthing/next"

const f = createUploadthing();

export const ourFileRouter={
    pdfUploader: f({pdf:{maxFileSize:'32MB'}})
    .middleware(
        async({req})=>{
            //get user information
            const user = await currentUser();
            if(!user) throw new UploadThingError('Unauthorized');
            return {userId:user.id}
        }
    ).onUploadComplete(async({metadata,file})=>{
        console.log("upload completed for user id",metadata.userId);
        console.log('file url', file.url);
        return {userId:metadata.userId,file:file};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;