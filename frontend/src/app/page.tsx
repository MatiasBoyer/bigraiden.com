"use client";
import Card from "@/components/card.component";
import { IGetUrl } from "@/types/geturl.type";
import config from "@/utils/config.util";
import { useEffect, useState } from "react";
import spinner_icon from "../assets/spinner-svgrepo-com.svg";
import Image from "next/image";

export default function Page() {
  const [CardProps, setCardProps] = useState<IGetUrl[]>([]);

  useEffect(() => {
    fetch(config.api_endpoint + "/geturl")
      .then((response) => response.json())
      .then((data) => {
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
        <div className="flex flex-col gap-5">
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
