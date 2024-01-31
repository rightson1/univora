import { orderStatus } from "@/utils/data";
import School from "@/models/School";
import { conn } from "@/models/mongo_db_connection";
import { ISchool, ISchoolFetched } from "@/types";
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

export async function PUT(req: NextRequest) {
  await conn();
  let { name, subdomain, status, _id } = await req.json();

  const school = await School.findOne({ subdomain: subdomain });
  if (!school) {
    return NextResponse.json({
      message: "School does not exists",
      success: false,
    });
  }
  school as ISchoolFetched;
  name = name || school.name;
  subdomain = subdomain || school.subdomain;
  status = status || school.status;
  try {
    await School.findByIdAndUpdate(_id, { name, subdomain, status });
    return NextResponse.json({
      message: "School updated successfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "School updation failed",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
