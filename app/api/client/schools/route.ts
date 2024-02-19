import { orderStatus } from "@/utils/data";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { ISchool, ISchoolFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await conn();
  const subdomain = req.nextUrl.searchParams.get("subdomain");
  const school = await School.findOne({
    subdomain: subdomain,
  });
  return NextResponse.json(school);
}
