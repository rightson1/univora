import { NextRequest, NextResponse } from "next/server";
// ?!api/|
export const config = {
  matcher: ["/((?!_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  let hostname = req.headers.get("host")!;
  // .replace(
  //   /(.localhost:3000|192.168.100.2:3000)$/,
  //   `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  // );
  // hostname = hostname.replace("www.", "");
  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;
  if (path.startsWith("/api")) {
    NextResponse.rewrite(new URL(`${path}`, req.url));
    return NextResponse.next();
  }

  if (hostname == `admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/admin${path === "/" ? "" : path}`, req.url)
    );
  }
  if (hostname == `super.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/super${path === "/" ? "" : path}`, req.url)
    );
  }
  if (hostname == `seller.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    return NextResponse.rewrite(
      new URL(`/seller${path === "/" ? "" : path}`, req.url)
    );
  }
  //if cookies school is set redirect to school subdomain
  const school = req.cookies.get("school")?.value;
  if (school) {
    return NextResponse.redirect(
      `http://${school}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
    );
  }

  let subdomain = hostname.split(".")[0];
  if (
    subdomain &&
    subdomain !== "www" &&
    subdomain !== process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(new URL(`/school/${subdomain}`, req.url));
  }

  return NextResponse.next();
}
