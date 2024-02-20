import { Categories } from "@/components/client/home/categories";
import { Newest_Arrials } from "@/components/client/home/newest_arrivals";
import { Sellers } from "@/components/client/shared/Sellers";
import { Button } from "@/components/ui/button";
import {
  getFeaturedCategories,
  getNewArrivals,
  getNewestSellers,
  getSchool,
} from "@/utils/api";
import { client_hero as hero } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const School = async ({
  params,
}: {
  params: {
    school: string;
  };
}) => {
  const [school, categories, newest_arrivals, sellers] = await Promise.all([
    getSchool(params.school),
    getFeaturedCategories(),
    getNewArrivals(params.school),
    getNewestSellers(params.school),
  ]);
  return (
    <div className="pb-5">
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
      <section className=" pad-x">
        <h2 className="h2-size text-indigo-500 text-start   my-5">
          Shop our top categories
        </h2>
        <Categories categories={categories} />

        <div className="fc my-5  w-full fc">
          <Link href="/categories" className="fc">
            <Button variant={"indigo"} className="rounded-full">
              View All
            </Button>
          </Link>
        </div>
      </section>
      <section className="pad-x my-10 py-1">
        <h2 className="h2 text-indigo-500  my-5">Latest Arrivals</h2>
        <Newest_Arrials products={newest_arrivals} subdomain={params.school} />
      </section>

      <section className="pad-x flex-col-start gap-5">
        <h2 className="h2-size text-indigo-500 text-start   mt-5">
          Top Dealers
        </h2>
        <Sellers sellers={sellers} subdomain={params.school} />

        <Link href="/dealers" className="w-full fc">
          <Button variant={"indigo"} className="rounded-full">
            View All
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default School;
