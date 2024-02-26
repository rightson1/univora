import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import { conn } from "@/models/mongo_db_connection";
import School from "@/models/School";
import { IUser } from "@/types/client";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await conn();
  const userData: IUser = await request.json();

  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    return NextResponse.json(existingUser, {
      status: 200,
    });
  }
  const newUser = await User.create(userData);
  return NextResponse.json(newUser, {
    status: 201,
  });
}
export async function GET(request: NextRequest) {
  await conn();
  const email = request.nextUrl.searchParams.get("email") as string;
  School;
  const user = await User.findOne({ email }).populate("school");
  return NextResponse.json(user);
}
//edit user
export async function PUT(request: NextRequest) {
  await conn();
  const { phone, displayName, _id, school } = await request.json();
  const user = await User.findOneAndUpdate(
    {
      _id,
    },
    {
      phone,
      displayName,
      school,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return NextResponse.json(null, {
      status: 404,
      statusText: "User not found",
    });
  }
  return NextResponse.json(user);
}
