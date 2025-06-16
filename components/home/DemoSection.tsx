import { Pizza } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/MotionWrapper";
import SummaryView from "../summary/SummaryView";

 const demoSummary = {
   summary: `

# 📄 ClarityDocs – Your AI-Powered Document Summary Assistant 🚀
- 📌 An intelligent document reader that transforms PDFs into human-friendly summaries.
- 🔧 Ideal for admit cards, resumes, notes, and any formal document needing a quick overview.

# Document Details
- 📄 Type: AI Summary Tool
- 🎯 For: Students, Job Seekers, Professionals, and Document Reviewers

# Key Highlights
- 🔥 Upload any PDF and get a clean, emoji-rich, structured summary.
- ⭐ Uses OpenAI's GPT-4o model for fast, contextual understanding.
- 💫 Secure login system with Clerk & Firebase support.

# Why It Matters
- 🧠 Reading long PDFs is time-consuming. ClarityDocs cuts through the clutter and gives you the main points instantly.
- 💡 It makes document review fast, beautiful, and interactive — especially useful for exam forms, resumes, or business docs.

# Main Points
- 🔍 Built using Next.js 14, Tailwind CSS, Framer Motion for frontend.
- 💪 Backend is powered by Node.js server actions and Vercel Edge Functions.
- ⚠️ Uses Firestore, Neon Postgres, UploadThing, Zod, and Clerk for full-stack integration.

# Pro Tips
- 🌟 Use it for admit cards, resumes, or class notes.
- 💎 Results improve when the PDF has clean, structured content.
- 🧩 You can easily share summaries or generate them again anytime.

# Key Terms to Know
- 🧠 GPT-4o: OpenAI’s latest fast and smart AI model.
- 🗂️ Clerk Auth: Authentication system used for secure user handling.

# Bottom Line
- 🪂 ClarityDocs helps you turn any boring PDF into an engaging summary in seconds. Save time. Stay smart.

`
};



export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6  lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 56.2%, 85.5% 15%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex  items-center justify center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border-gray-500/20 mb-4">
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16 ">
            <MotionH3 initial={{y:20,opacity:0}} whileInView={{y:'0',opacity:1}} transition={{duration:0.5, delay:0.2}} className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
              Experience how ClarityDocs{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                {" "}
                simplifies this complex PDF
              </span>{" "}
              in seconds!
            </MotionH3>
          </div>
          </div>
          <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
            
              <MotionDiv initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.5}}>
              <SummaryView summary={demoSummary.summary}/>
            </MotionDiv> 
          </div>
        
      </div>
    </section>
  );
}
