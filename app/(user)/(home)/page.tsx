import { SearchSchool } from "@/components/user_general/search_school";
import Button from "@/components/utils/Button";
import { hero } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      {/* <SchoolNavigator /> */}
      <section className="flex-1-2 gap-10 py-[50px]">
        <div className="left flex-col-start w-full pad-x gap-5 text-center md:text-start md:max-w-[800px] ">
          <h1
            className="h1-size text-indigo-500 
        "
          >
            {hero.title}
          </h1>
          <p>{hero.description}</p>
          <div className="self-center md:self-start">
            <SearchSchool />
          </div>
        </div>
        <div className="w-full pad-x gap-5 fc h-[350px] md:h-[400px] overflow-hidden ">
          <div className="w-full flex-[3] h-full">
            <Image
              alt="Games"
              src="/makeup.png"
              width={500}
              height={500}
              className="  w-full h-full  rounded-[5px]"
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
    </div>
  );
};

export default Home;
