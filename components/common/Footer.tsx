import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { FaGlobe } from "react-icons/fa";

export default function Footer() {
  return (
<footer className="w-full bg-rose-100 mt-auto border rounded-4xl">
  <div className="max-w-6xl px-4 sm:px-6 lg:px-8 py-4 mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
      {/* Left: Branding + DP */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <Link
          href="/"
          className="text-xl font-bold text-black hover:text-rose-500 transition hover:scale-110 duration-300 ease-in-out"
        >
          ClarityDocs
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Powered by AI. Simplifying long documents into smart summaries.
        </p>

        <Image
          src="https://avatars.githubusercontent.com/u/126342578?v=4"
          alt="Yashu Tandon GitHub DP"
          width={50}
          height={50}
          className="rounded-full mt-2 border border-black shadow-md hover:scale-105 transition duration-300 ease-in-out"
        />
        <h3 className="text-sm font-semibold text-black mt-1  hover:text-rose-500 transition hover:scale-110 duration-300 ease-in-out ">
          Yashu Tandon
        </h3>
        <p className="text-xs text-gray-600">Full Stack Developer</p>
      </div>

      {/* Right: Social Icons */}
      <div className="flex flex-col space-y-2 items-center md:items-end">
        <Link href="https://x.com/Yashu84868099" target="_blank">
          <SiX className="h-5 w-5 hover:text-rose-500 transition hover:scale-120 duration-300 ease-in-out" />
        </Link>
        <Link href="https://github.com/yashutandon" target="_blank">
          <SiGithub className="h-5 w-5 hover:text-rose-500 transition hover:scale-120 duration-300 ease-in-out" />
        </Link>
        <Link href="https://linkedin.com/yashu-tandon-279038260" target="_blank">
          <SiLinkedin className="h-5 w-5 hover:text-rose-500 transition hover:scale-120 duration-300 ease-in-out" />
        </Link>
        <Link href="https://www.instagram.com/yashu_tandon" target="_blank">
          <SiInstagram className="h-5 w-5 hover:text-rose-500 transition hover:scale-120 duration-300 ease-in-out" />
        </Link>
        <Link href="https://yashutandon.vercel.app" target="_blank">
          <FaGlobe className="h-5 w-5 hover:text-rose-500 transition hover:scale-120 duration-300 ease-in-out" />
        </Link>
      </div>
    </div>

    {/* Bottom Info */}
    <div className="mt-4 text-center text-xs text-gray-800">
      © {new Date().getFullYear()} ClarityDocs. All rights reserved.
    </div>
    <div className="mt-1 text-center text-xs text-gray-700">
      Made with ❤️ by{" "}
      <a
        href="https://my-portfolio-inky-mu-45.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-black hover:text-rose-500"
      >
        Yashu Tandon
      </a>
    </div>
  </div>
</footer>


  );
}
