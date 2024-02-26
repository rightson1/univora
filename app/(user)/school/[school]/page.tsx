import { Categories } from "@/components/client/home/categories";
import { Hero } from "@/components/client/home/hero";
import { Newest_Arrials } from "@/components/client/home/newest_arrivals";
import { Sellers_Home } from "@/components/client/shared/Sellers";
import { Button } from "@/components/ui/button";
import { TPageProps } from "@/types";
import {
  getFeaturedCategories,
  getNewArrivals,
  getNewestSellers,
  getSchool,
} from "@/utils/api";
import { protocal, sell_url } from "@/utils/data";
import { Metadata, ResolvingMetadata } from "next";

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
          <Link href={sell_url} className="fc">
            <Button variant={"indigo"} className="rounded-full">
              Start Selling
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
export async function generateMetadata(
  { params, searchParams }: TPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.school;
  const school = await getSchool(slug);
  const title = school?.name || "School";
  const description = "Explore products and sellers within " + title;
  return {
    title,
    description,
    openGraph: {
      title,
      description,

      locale: "en_US",
      type: "website",
    },
  };
}

export default School;
