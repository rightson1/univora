"use client";
import { ISchoolFetched } from "@/types";
import { useGetSchoolWithInitialData } from "@/utils/hooks/client/useSchool";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { client_hero as hero } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "next-usequerystate";
export const Hero = ({
  school: initial,
  subdomain,
}: {
  school: ISchoolFetched;
  subdomain: string;
}) => {
  const { data: school } = useGetSchoolWithInitialData(subdomain, initial);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const refresh = searchParams.get("refresh");
    if (searchParams.get("refresh") === "true") {
      const url = new URL(window.location.href);
      //  set refresh to false
      url.searchParams.set("refresh", "false");
      router.replace(url.toString());
      router.refresh();
    }
  }, [searchParams]);
  return (
    <section className="flex-1-2 gap-10 py-[50px]">
      <div className="left flex-col-start w-full pad-x gap-5 text-center md:text-start md:max-w-[800px] ">
        <h1
          className="h1-size text-indigo-500 
        "
        >
          {hero.title}
          <span className="text-sm text-indigo">
            ({school?.subdomain || subdomain})
          </span>
        </h1>
        <p>{hero.description}</p>
        <div className="self-center md:self-start">
          <Button className="rounded-full" variant={"indigo"}>
            <Link href="/search">Search Products</Link>
          </Button>
        </div>
      </div>
      <div className="w-full pad-x gap-5 fc h-[350px] md:h-[400px] overflow-hidden ">
        <div className="w-full flex-[3] h-full">
          <Image
            alt="Games"
            src="/makeup.png"
            width={500}
            height={500}
            className="  w-full h-full  rounded-[5px] mb:object-cover"
          />
        </div>
        <div className="flex-col-start  w-full  flex-[2] h-full gap-5 ">
          <Image
            alt="Hero Image"
            src="/games.png"
            width={300}
            height={300}
            className="h-1/2 w-full object-cover rounded-[5px]"
          />
          <Image
            alt="Headphones"
            src="/headphone.png"
            width={300}
            height={300}
            className="h-1/2 w-full obkect-cover rounded-[5px]"
          />
        </div>
      </div>
    </section>
  );
};
