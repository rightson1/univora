import { Button } from "@/components/ui/button";
import { getSchool } from "@/utils/api";
import { hero } from "@/utils/data";
import Image from "next/image";
import React from "react";

const School = async ({
  params,
}: {
  params: {
    school: string;
  };
}) => {
  const school = await getSchool(params.school);
  return (
    <div>
      <section className="flex-1-2 gap-10 py-[50px]">
        <div className="left flex-col-start w-full pad-x gap-5 text-center md:text-start md:max-w-[800px] ">
          <h1
            className="h1-size text-indigo-500 
        "
          >
            {hero.title}
            <span className="text-sm text-indigo">({school?.subdomain})</span>
          </h1>
          <p>{hero.description}</p>
          <div className="self-center md:self-start">
            <Button className="rounded-full" variant={"indigo"}>
              Search Products
            </Button>
          </div>
        </div>
        <div className="w-full pad-x gap-5 fc h-[350px] md:h-[400px] overflow-hidden ">
          <div className="w-full flex-[3] h-full">
            <Image
              alt="Games"
              src="/imgs/Makeup.png"
              width={500}
              height={500}
              className="  w-full h-full  rounded-[5px]"
            />
          </div>
          <div className="flex-col-start  w-full  flex-[2] h-full gap-5 ">
            <Image
              alt="Hero Image"
              src="/imgs/games.png"
              width={300}
              height={300}
              className="h-1/2 w-full object-cover rounded-[5px]"
            />
            <Image
              alt="Headphones"
              src="/imgs/headphone.png"
              width={300}
              height={300}
              className="h-1/2 w-full obkect-cover rounded-[5px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default School;
