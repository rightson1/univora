import { Search_Page } from "@/components/client/search/search_page";
import { TPageProps } from "@/types";
import { getSchool } from "@/utils/api";

import { Metadata, ResolvingMetadata } from "next";
import React from "react";
const Page = ({
  params,
}: {
  params: {
    school: string;
  };
}) => {
  return <Search_Page school_slug={params.school} />;
};
export async function generateMetadata(
  { params, searchParams }: TPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.school;
  const school = await getSchool(slug);

  const title = "Search"; // Title for the search page
  const description = `Search for products within ${
    school?.name || "the school"
  } community`; // Description for the search page

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
