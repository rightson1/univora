import School from "@/models/School";
import Seller from "@/models/Seller";
import { conn } from "@/models/mongo_db_connection";
import { ISeller } from "@/types";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  await conn();

  try {
    let { name, phone, email, school, uid, slug }: ISeller = await req.json();
    //find if slug exists
    const no_of_slugs = await Seller.countDocuments({ slug });
    if (no_of_slugs > 0) {
      slug = `${slug}-${no_of_slugs}`;
    }
    const newSeller = await Seller.create({
      name: name,
      phone: phone,
      email: email,
      uid: uid,
      school: school,
      slug: slug,
    });
    return NextResponse.json({
      message: "Seller created successfully",
      success: true,
      data: newSeller,
    });
  } catch (e: any) {
    console.log(e.message);
    return NextResponse.json({
      message: e.message,
      success: false,
    });
  }
}
export async function GET(req: NextRequest) {
  await conn();
  const admin = req.nextUrl.searchParams.get("uid");
  const email = req.nextUrl.searchParams.get("email");

  if (!admin && !email) {
    return NextResponse.json({
      message: "Who are you?",
      success: false,
    });
  }
  try {
    const query = admin ? { uid: admin } : { email };
    School;
    const adminRaw = await Seller.findOne(query).populate("school");
    if (!adminRaw) {
      return NextResponse.json({
        message: `Kwa sasa huna akaunti nduguyangu,unda alafu urudi tuuze hii simu`,
        success: false,
      });
    }
    return NextResponse.json(adminRaw);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: e,
      success: false,
    });
  }
}
