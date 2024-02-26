import { Seller_Container } from "@/components/client/search/search_dealers";
import { TPageProps } from "@/types";
import { getSchool, getSellers } from "@/utils/api";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    school: string;
  };
}) => {
  const sellers = await getSellers(params.school);

  return (
    <section className="pad-x  flex-col gap-4 flex pt-5 pb-20 ">
      <h1 className="h3 text-indigo-500">Search For Dealers</h1>
      <Seller_Container subdomain={params.school} sellers={sellers} />
    </section>
  );
};
export async function generateMetadata(
  { params, searchParams }: TPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.school;
  const school = await getSchool(slug);

  const title = `Sellers in ${school?.name || "School"}`;
  const description = `Explore sellers offering products within ${
    school?.name || "the school"
  } community`;

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

export default Page;
