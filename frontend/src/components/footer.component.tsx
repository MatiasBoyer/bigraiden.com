"use client";
import Image from "next/image";
import github_mark from "../assets/github-mark-white.svg";
import config from "@/utils/config.util";

export default function Footer() {
  return (
    <footer className="w-full p-4 text-xs flex flex-row justify-between items-center">
      <span className="text-left flex-1">
        made with ♥<br />
        matías boyer
      </span>

      <a
        href="https://github.com/MatiasBoyer/bigraiden.com"
        className="flex-1 flex justify-center"
      >
        <Image src={github_mark} alt="github-icon" width={24} height={24} />
      </a>

      <span className="text-right flex-1">
        build {config.build}
        <br />
        {config.branch}
      </span>
    </footer>
  );
}
