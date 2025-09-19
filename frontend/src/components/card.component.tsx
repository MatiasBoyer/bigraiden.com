import { IGetUrl } from "@/types/geturl.type";
import Image from "next/image";
import questionmark from "../assets/question-mark-svgrepo-com.svg";
import github_icon from "../assets/github-mark-white.svg";

export default function Card({ cardprops }: { cardprops: IGetUrl }) {
  if (!cardprops.img) {
    cardprops.img = "";
  }

  return (
    <div
      className="relative bg-stone-800 w-full lg:w-200 p-5 flex flex-row gap-3 ease-in-out transition-transform duration-300
    hover:-translate-x-[-2%] hover:bg-stone-900"
    >
      <a
        href={cardprops.href}
        className="absolute hover:cursor-pointer inset-0 w-full h-full block z-0"
        target="_blank"
        rel="noopener noreferrer"
      />
      <div className="min-w-[20%] items-center justify-center flex">
        {
          <Image
            src={cardprops.img.length > 0 ? cardprops.img : questionmark}
            alt="icon"
            width={100}
            height={100}
          />
        }
      </div>
      <div className="grow flex flex-col">
        <span className="top-0 py-2 font-bold grow-1">{cardprops.title}</span>
        <span className="grow py-2">{cardprops.description}</span>
        <span className="grow-1 flex justify-end items-center py-2 px-10 gap-5">
          {cardprops.github_href && (
            <a
              href={cardprops.github_href}
              className="w-5 z-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={github_icon}
                alt="github-icon"
                width={100}
                height={100}
              />
            </a>
          )}
        </span>
      </div>
    </div>
  );
}
