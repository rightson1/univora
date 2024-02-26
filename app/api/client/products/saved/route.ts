import Product from "@/models/Product";
import { conn } from "@/models/mongo_db_connection";
import { NextRequest, NextResponse } from "next/server";
import SavedItems from "@/models/SavedItems";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await conn();
    const userId = req.nextUrl.searchParams.getAll("userId");
    const savedItems = await SavedItems.findOne({ userId }).populate({
      path: "products",
      populate: {
        path: "school",
      },
    });
    if (savedItems) {
      return NextResponse.json(savedItems.products);
    }
    return NextResponse.json([]);
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message });
  }
}
export async function POST(req: NextRequest) {
  try {
    await conn();
    const { user, item } = await req.json();
    const savedItem = await SavedItems.findOne({ userId: user });
    if (savedItem) {
      //update $add to set
      await SavedItems.updateOne(
        { userId: user },
        { $addToSet: { products: item } }
      );
    } else {
      const newItem = new SavedItems({
        userId: user,
        products: [item],
      });
      await newItem.save();
    }
    return NextResponse.json({ message: "Item added to saved items" });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message });
  }
}

//delete product from saved items
export async function DELETE(req: NextRequest) {
  try {
    await conn();
    const userId = req.nextUrl.searchParams.get("userId");
    const item = req.nextUrl.searchParams.get("item");
    await SavedItems.updateOne({ userId }, { $pull: { products: item } });
    return NextResponse.json({ message: "Item removed from saved items" });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json({ message: e.message });
  }
}
