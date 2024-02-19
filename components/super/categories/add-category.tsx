import {
  deleteFile,
  toSlug,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import {
  ImageInput,
  ImageInputWithView,
} from "@/components/seller/utils/image-input";
import { CustomModal } from "@/components/shared/CustomModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ICategory, ICategoryFetched, ICategoryTable } from "@/types";
import { useAddCategory } from "@/utils/hooks/useCategories";
import React from "react";
import { IoIosAdd } from "react-icons/io";

export const AddCategory = ({
  parentCategory,
}: {
  parentCategory?: ICategoryFetched;
}) => {
  const [image, setImage] = React.useState<File | null>(null);
  const { mutateAsync: addCategory } = useAddCategory();
  const { loading, customToast, modalOpen, setModalOpen } = useCustomToast();
  console.log(image);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let name = formData.get("name") as string;
    let description = formData.get("description") as string;
    let isActive =
      (formData.get("isActive") as string) === "true" ? true : false;
    let isFeatured =
      (formData.get("isFeatured") as string) === "true" ? true : false;

    let keywords_raw = formData.get("keywords") as string;
    const keywords = keywords_raw
      .split(",")
      .map((item) => item.trim().toLocaleLowerCase());

    const category: ICategory = {
      name,
      description,
      isActive,
      isFeatured,
      slug: toSlug(name),
      parent: parentCategory ? parentCategory._id : undefined,
      children: [],
      keywords,
    };
    let url = "";
    const uploadCat = async () => {
      if (image) {
        url = await uploadFile(image, `/categories/${category.slug}`);
        category.image = url;
      }
      await addCategory(category);
    };

    customToast({
      func: uploadCat,
      suc: "Category added successfully",
      err: "Failed to add category",
      sfunc: () => {
        setImage(null);
        // e.currentTarget.reset();
      },
      efunc: () => {
        url && deleteFile(url);
      },
    });
  };
  return (
    <CustomModal
      disableSubmit={loading}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title={
        parentCategory
          ? `Add Category to ${parentCategory.name}`
          : "Add Category"
      }
      trigger={
        <Button size={"icon"} variant={parentCategory ? "ghost" : "default"}>
          <IoIosAdd className="text-xl" />
        </Button>
      }
      onSubmit={submit}
    >
      <div className="grid md:grid-cols-1 w-full  gap-4 py-5">
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="name">Name </Label>
          <Input
            id="name"
            placeholder="Name of your category"
            required
            name="name"
          />
        </div>
        {/* keywords */}
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="keywords">Keywords </Label>
          <Input
            id="keywords"
            placeholder="Keywords of your category"
            name="keywords"
          />
        </div>
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Description of your school"
            name="description"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Is Active</Label>
          <select
            name="isActive"
            className="w-full h-10 px-3 
            mb-3 border-border border-[1px] rounded-lg 
            bg-background
             focus:outline-none focus:shadow-outline"
          >
            {[true, false].map((item, index) => (
              <option key={index} value={`${item}`}>
                {`${item}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Featured</Label>
          <select
            name="isFeatured"
            className="w-full h-10 px-3 
            mb-3 border-border border-[1px] rounded-lg 
            bg-background
             focus:outline-none focus:shadow-outline"
          >
            {[false, true].map((item, index) => (
              <option key={index} value={`${item}`}>
                {`${item}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="image">Image </Label>
          <ImageInputWithView file={image} setFile={setImage} />
        </div>
      </div>
    </CustomModal>
  );
};
