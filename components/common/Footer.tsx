import React from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin, SiX  } from "react-icons/si";


export default function Footer() {
  return (
    <footer className="w-full bg-rose-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Logo & Tagline */}
          <div className="  text-center md:text-left">
            <h2 className="text-xl font-bold text-black">ClarityDocs</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Powered by AI. Simplifying long documents into smart summaries.
            </p>
          </div>

          {/* Middle: Quick Links */}
         

          {/* Right: Social Icons */}
          <div className="flex space-x-4">
            <Link href="https://x.com/Yashu84868099?t=YmuEBLaYQ4qBVqXuVjTkRg&s=35" target="_blank">
              <SiX  className="h-5 w-5 hover:text-rose-500 transition" />
            </Link>
            <Link href="https://github.com/yashutandon" target="_blank">
              <SiGithub className="h-5 w-5 hover:text-rose-500 transition" />
            </Link>
            <Link href="https://linkedin.com/yashu-tandon-279038260" target="_blank">
              <SiLinkedin className="h-5 w-5 hover:text-rose-500 transition" />
            </Link>
            <Link href="https://www.instagram.com/yashu_tandon?igsh=emR3eHVxaWttcHJ1" target="_blank">
              <SiInstagram className="h-5 w-5 hover:text-rose-500 transition" />
            </Link>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8  text-center text-xs text-gray-800">
          © {new Date().getFullYear()} ClarityDocs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
