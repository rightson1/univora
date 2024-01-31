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
    const { parent } = categoryBody;
    const category = await Category.findById(categoryBody._id);
    if (category) {
      category.name = categoryBody.name;
      category.slug = categoryBody.slug;
      category.image = categoryBody.image;
      category.parent = categoryBody.parent;
      await category.save();
    }
    return NextResponse.json({
      message: "Category updated successfully",
    });
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
    const categoryBody: ICategoryFetched = await req.json();
    const category = await Category.findById(categoryBody._id);

    //remove category from parent
    if (categoryBody.parent) {
      const parentCategory = await Category.findById(categoryBody.parent);
      if (parentCategory) {
        parentCategory.children.pull(categoryBody._id);
        await parentCategory.save();
      }
    }
    if (category) {
      await category.remove();
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
