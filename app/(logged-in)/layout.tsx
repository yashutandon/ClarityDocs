import UpgradeReqruired from "@/components/common/UpgradeReqruired";
import { getSubscriptionStatus, hasActivePlan } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";


export default async function layout({children}:{children:React.ReactNode}) {
    const user=await currentUser();
    if(!user){
        redirect('/sign-in')
    }
    const hasActiveSubscription= await hasActivePlan(user.emailAddresses[0].emailAddress);
    if(!hasActiveSubscription){
        return <UpgradeReqruired/>
    }
  return (

    <div>{children}</div>
  )
}

