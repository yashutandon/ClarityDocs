import type { Metadata } from "next";
import { Source_Sans_3 as fontSans} from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";


const fontsans =fontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight:["200","300","400","500","600","700","800","900"]
});



export const metadata: Metadata = {
  title: "ClarityDocs",
  description: "An Ai Powered Platform Helps To Get Summary Of Long PDF DOCUMENT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontsans.variable} font-sans antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header/>
          <main className="flex-1">{children}</main>
          <Footer/>
        </div>
       
      </body>
    </html>
  );
}
