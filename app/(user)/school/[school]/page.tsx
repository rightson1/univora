import { Categories } from "@/components/client/home/categories";
import { Hero } from "@/components/client/home/hero";
import { Newest_Arrials } from "@/components/client/home/newest_arrivals";
import { Sellers_Home } from "@/components/client/shared/Sellers";
import { Button } from "@/components/ui/button";
import {
  getFeaturedCategories,
  getNewArrivals,
  getNewestSellers,
  getSchool,
} from "@/utils/api";

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
      <Hero school={school} subdomain={params.school} />
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
      <Sellers_Home sellers={sellers} subdomain={params.school} />
    </div>
  );
};

export default School;
