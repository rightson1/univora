import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
export function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  return redirect(url!);
}
