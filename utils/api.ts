import {
  ICategoryFetched,
  IProductFetched,
  ISchoolFetched,
  ISellerFetched,
} from "@/types";
import { baseUrl } from "./data";
import { ec } from "./helpers";

export async function getSchool(slug: string): Promise<ISchoolFetched> {
  const data = await fetch(`${baseUrl}/api/client/schools?subdomain=${slug}`, {
    next: {
      revalidate: 60 * 60 * 5,
      tags: ["school"],
    },
  }).then(ec);

  return data;
}
//featured categories
export async function getFeaturedCategories(): Promise<ICategoryFetched[]> {
  const data = await fetch(`${baseUrl}/api/client/categories?featured=true`, {
    next: {
      revalidate: 60 * 60 * 5,
      tags: ["featured-categories"],
    },
  }).then(ec);

  return data;
}
//new arrivals
export async function getNewArrivals(
  school: string
): Promise<IProductFetched[]> {
  const data = await fetch(
    `${baseUrl}/api/client/products/new-arrivals?school=${school}`,
    {
      next: {
        revalidate: 60 * 60 * 5,
        tags: ["new-arrivals"],
      },
    }
  ).then(ec);

  return data;
}
//latest sellers
export async function getNewestSellers(
  school: string
): Promise<ISellerFetched[]> {
  const data = await fetch(
    `${baseUrl}/api/client/sellers/latest?school=${school}`,
    {
      next: {
        revalidate: 60 * 60 * 5,
        tags: ["new-sellers"],
      },
    }
  ).then(ec);

  return data;
}
