import { Seller_Container } from "@/components/client/search/search_dealers";
import { getSellers } from "@/utils/api";
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

export default Page;
