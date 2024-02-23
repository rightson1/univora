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
//get categories by parent
export async function getSubCategories(
  parent: string
): Promise<ICategoryFetched[]> {
  console.log(parent);
  const data = await fetch(
    `${baseUrl}/api/client/categories?category_slug=${parent}`,
    {
      next: {
        revalidate: 60 * 60 * 5,
        tags: ["sub-categories"],
      },
    }
  ).then(ec);

  return data;
}
//get single category
export async function getSingleCategory(
  slug: string
): Promise<ICategoryFetched> {
  const data = await fetch(`${baseUrl}/api/client/categories?slug=${slug}`, {
    next: {
      revalidate: 60 * 60 * 5,
      tags: [`category-${slug}`],
    },
  }).then(ec);

  return data;
}
//get products in a category
export async function getProductsInCategory(
  school: string,
  category: string
): Promise<IProductFetched[]> {
  const url = `${baseUrl}/api/client/categories/products?school=${school}&category=${category}`;

  const data = await fetch(url, {
    next: {
      revalidate: 60 * 60 * 5,
      tags: [`products-${category}`],
    },
  }).then(ec);

  return data;
}

//get single product
export async function getSingleProduct(slug: string): Promise<IProductFetched> {
  const data = await fetch(
    `${baseUrl}/api/client/products/single?slug=${slug}`,
    {
      next: {
        revalidate: 60 * 60 * 5,
        tags: [`product-${slug}`],
      },
    }
  ).then(ec);

  return data;
}

///get sellers
export async function getSellers(school: string): Promise<ISellerFetched[]> {
  const data = await fetch(`${baseUrl}/api/client/sellers?school=${school}`, {
    next: {
      revalidate: 60 * 60 * 5,
      tags: ["sellers"],
    },
  }).then(ec);

  return data;
}

//get single seller
export async function getSingleSeller(slug: string): Promise<ISellerFetched> {
  const data = await fetch(
    `${baseUrl}/api/client/sellers/single?seller=${slug}`,
    {
      next: {
        revalidate: 0,
        tags: [`seller-${slug}`],
      },
    }
  ).then(ec);

  return data;
}
