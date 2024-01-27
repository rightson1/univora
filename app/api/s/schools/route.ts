import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { ISchool } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await conn();
  const body: ISchool = await req.json();
  const school = await School.exists({ subdomain: body.subdomain });
  if (school) {
    return NextResponse.json({
      message: "School already exists",
      success: false,
    });
  }
  try {
    await School.create(body);
    return NextResponse.json({
      message: "School created successfully",
      success: true,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "School creation failed",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
//get all schools

export async function GET() {
  await conn();
  const schools = await School.find();
  return NextResponse.json(schools);
}
