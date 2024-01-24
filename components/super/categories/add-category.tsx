import { CustomModal } from "@/components/shared/CustomModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/types";
import React from "react";
import { IoIosAdd } from "react-icons/io";

export const AddCategory = ({
  parentCategory,
  setCategories,
  categories,
}: {
  parentCategory: ICategory;
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  categories: ICategory[];
}) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { name, description, status } = e.currentTarget;

    name = name;
    description = description.value;
    status = status.value;
    const newCategory: ICategory = {
      id: Math.random().toString(),
      name,
      description,
      status,
      children: [],
      rank: 0,
      parentCategoryId: parentCategory.id,
    };

    const newCategories = categories.map((category) => {
      if (category.id === parentCategory.id) {
        return {
          ...category,
          children: [...category.children, newCategory],
        };
      }
      return category;
    });
    setCategories(newCategories);
  };
  return (
    <CustomModal
      title={`Add Category to ${parentCategory.name}`}
      trigger={
        <Button size={"icon"} variant={"ghost"}>
          <IoIosAdd className="text-xl" />
        </Button>
      }
      onSubmit={submit}
    >
      <div className="grid md:grid-cols-1 w-full  gap-4 py-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Subdomian</Label>
          <Input id="name" placeholder="Name" name="name" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Subdomian</Label>
          <Textarea
            id="description"
            placeholder="Description "
            name="description"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <select
            name="status"
            className="w-full h-10 px-3 
            mb-3 border-border border-[1px] rounded-lg 
            bg-background
             focus:outline-none focus:shadow-outline"
          >
            {["Active", "Inactive"].map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </CustomModal>
  );
};
