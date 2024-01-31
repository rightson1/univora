import {
  deleteFile,
  toSlug,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import {
  ImageInput,
  ImageInputWithView,
  SingleImageInputWithView,
} from "@/components/seller/utils/image-input";
import { CustomModal } from "@/components/shared/CustomModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ICategory,
  ICategoryFetched,
  ICategoryTable,
  InputChangeEventTypes,
} from "@/types";
import { useAddCategory, useEditCategory } from "@/utils/hooks/useCategories";
import React from "react";
import toast from "react-hot-toast";
import { IoIosAdd, IoIosMore } from "react-icons/io";

export const EditCategory = ({ category }: { category: ICategoryFetched }) => {
  const [image, setImage] = React.useState<File | null>(null);
  const { mutateAsync: editCategory } = useEditCategory();
  const { loading, customToast, modalOpen, setModalOpen } = useCustomToast();
  const [values, setValues] = React.useState({
    name: category.name,
    description: category.description || "",
    isActive: category.isActive,
    isFeatured: category.isFeatured,
    image: category.image,
  });
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.name) return toast("Name is required");
    let url = "";
    const edit = async () => {
      if (image) {
        url = await uploadFile(
          image,
          `categories/${toSlug(values.name)}-${image.name}`
        );
        category.image && (await deleteFile(category.image));
      }

      const data = {
        ...values,
        image: url || category.image,
        _id: category._id,
      };
      await editCategory(data);
    };
    customToast({
      func: edit,
      efunc: () => {
        url && deleteFile(url);
      },
    });
    setImage(null);
  };
  const handleChange = <T extends InputChangeEventTypes>(
    e: React.ChangeEvent<T>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleBoleanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value === "true" });
  };
  return (
    <CustomModal
      disableSubmit={loading}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      title={`Add Category to ${category.name}`}
      trigger={
        <Button size={"icon"} variant={"ghost"}>
          <IoIosMore className="text-xl" />
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
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5 ">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Description of your school"
            name="description"
            value={values.description}
            onChange={handleChange}
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
            value={`${values.isActive}`}
            onChange={handleBoleanChange}
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
            value={`${values.isFeatured}`}
            name="isFeatured"
            className="w-full h-10 px-3 
            mb-3 border-border border-[1px] rounded-lg 
            bg-background
             focus:outline-none focus:shadow-outline"
            onChange={handleBoleanChange}
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
          <SingleImageInputWithView
            file={image}
            setFile={setImage}
            imageUrl={category.image}
          />
        </div>
      </div>
    </CustomModal>
  );
};
