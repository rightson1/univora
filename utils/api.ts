import { ICategoryFetched, ISchoolFetched } from "@/types";
import { baseUrl } from "./data";

export async function getSchool(slug: string): Promise<ISchoolFetched> {
  const data = await fetch(`${baseUrl}/api/client/schools?subdomain=${slug}`, {
    next: {
      revalidate: 60 * 60 * 5,
      tags: ["school"],
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  return data;
}
//featured categories
export async function getFeaturedCategories(): Promise<ICategoryFetched[]> {
  const data = await fetch(`${baseUrl}/api/client/categories?featured=true`, {
    next: {
      revalidate: 60 * 60 * 5,
      tags: ["featured-categories"],
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  return data;
}
