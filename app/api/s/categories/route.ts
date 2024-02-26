import Category from "@/models/Categories";
import { conn } from "@/models/mongo_db_connection";
import { ICategory, ICategoryFetched } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await conn();

    const categoryBody: ICategory = await req.json();
    const { parent } = categoryBody;
    const sortingPriority =
      (await Category.countDocuments({ parent: categoryBody.parent })) + 1;
    const newCategory = new Category({
      sortingPriority,
      ...categoryBody,
    });

    await newCategory.save();

    if (categoryBody.parent) {
      const parentCategory = await Category.findById(parent);
      if (parentCategory) {
        parentCategory.children.push(newCategory._id);
        await parentCategory.save();
      }
    }
    return NextResponse.json({
      message: "Category created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
}
export async function GET() {
  await conn();
  const categories = await Category.find({
    parent: { $exists: false },
  })
    .populate({
      path: "children",
      populate: {
        path: "children", // Level 2
        populate: {
          path: "children", // Level 3
          populate: {
            path: "children", // Level 4
            populate: {
              path: "children", // Level 5 - adjust depth as needed
            },
          },
        },
      },
    })
    .populate("parent");
  return NextResponse.json(categories);
}
//edit category
export async function PUT(req: NextRequest) {
  try {
    await conn();
    const categoryBody: ICategoryFetched = await req.json();
    const category = await Category.findOneAndUpdate(
      { _id: categoryBody._id },
      { ...categoryBody },
      { new: true }
    );

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
}
//delete category
export async function DELETE(req: NextRequest) {
  try {
    await conn();
    const _id = req.nextUrl.searchParams.get("_id");
    const category = await Category.findById(_id);
    if (category.children.length > 0) {
      return NextResponse.json({
        message: "Category has children, please delete them first",
        success: false,
      });
    }

    //remove category from parent
    if (category.parent) {
      const parentCategory = await Category.findById(category.parent);
      if (parentCategory) {
        parentCategory.children.pull(category._id);
        await parentCategory.save();
      }
    }
    if (category) {
      await Category.deleteOne({ _id });
    }

    return NextResponse.json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
}
