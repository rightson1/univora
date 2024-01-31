import { orderStatus } from "@/utils/data";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { ISchool, ISchoolFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await conn();
  const schools = await School.find();
  return NextResponse.json(schools);
}
