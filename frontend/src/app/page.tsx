"use client";
import Card from "@/components/card.component";
import { IGetUrl } from "@/types/geturl.type";
import { useEffect, useState } from "react";
import spinner_icon from "../assets/spinner-svgrepo-com.svg";
import Image from "next/image";
import { GetAPI } from "@/utils/getapi.util";

export default function Page() {
  const [CardProps, setCardProps] = useState<IGetUrl[]>([]);

  useEffect(() => {
    fetch(GetAPI() + "/geturl")
      .then((response) => response.json())
      .then((data) => {
        data.data.forEach((d: { img: Buffer }) => {
          if (d.img) d.img = Buffer.from(d.img)
        });
        setCardProps(data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {};
  }, []);

  return (
    <>
      {CardProps.length > 0 ? (
        <div className="flex-grow flex flex-col items-center w-full gap-5">
          {CardProps.map((cp) => (
            <Card cardprops={cp} key={cp.title} />
          ))}
        </div>
      ) : (
        <div className="w-full flex-grow flex justify-center items-center">
          <Image
            src={spinner_icon}
            width={100}
            height={100}
            alt="loading icon"
            className="filter invert animate-spin"
          />
        </div>
      )}
    </>
  );
}
