import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
  hostname = hostname.replace("www.", "");
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    console.log(new URL(`/admin${path === "/" ? "" : path}`, req.url));
    return NextResponse.rewrite(
      new URL(`/admin${path === "/" ? "" : path}`, req.url)
    );
  }
  if (hostname == `super.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    console.log(new URL(`/admin${path === "/" ? "" : path}`, req.url));
    return NextResponse.rewrite(
      new URL(`/super${path === "/" ? "" : path}`, req.url)
    );
  }
  let subdomain = hostname.split(".")[0];
  if (subdomain && subdomain !== process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    console.log();
    return NextResponse.rewrite(new URL(`/${subdomain}`, req.url));
  }
  return NextResponse.next();
}
