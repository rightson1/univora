"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "../utils/Editor";
import { WithOutContext as ReactTags } from "react-tag-input";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";

import { TOption } from "@/types/sellerTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageInputWithView } from "../utils/image-input";
import {
  ICategory,
  ICategoryFetched,
  IProduct,
  IProductType,
  IProductValues,
  IVariant,
  InputChangeEventTypes,
} from "@/types";
import { useGetPopulatedCategories } from "@/utils/hooks/useCategories";
import { CornerUpLeft } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  deleteFile,
  flattenCategories,
  getStr,
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useAddProduct } from "@/utils/hooks/useProduct";
import toast from "react-hot-toast";
import { Product_Options } from "../product/product_options";
import { Product_Variants } from "../product/product_variants";

export const NewProductForm = () => {
  const { seller } = useSellerAuth();
  const [values, setValues] = useState<IProductValues["values"]>({
    name: "",
    price: 0,
    description: "",
    category: "",
    brand: "",
    stock: 0,
    tags: [],
    productType: "product",
  });
  const [options, setOptions] = useState<TOption[]>([
    { title: "", variations: [] },
  ]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { customToast, loading } = useCustomToast();
  const [media, setMedia] = useState<File[]>([]);
  const [longDescription, setLongDescription] = useState("");
  const [variants, setVariants] = useState<IVariant[]>([]);
  const { mutateAsync: addProduct } = useAddProduct();
  const handleChange = (e: ChangeEvent<InputChangeEventTypes>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const publish = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!thumbnail) {
      return toast.error("Please select a thumbnail");
    }
    const data = {
      ...values,
      longDescription: longDescription,
      options,
      variants,
      tags: values.tags.map((tag) => tag.trim()),
      active: true,
      business: seller._id,
      slug: values.name.toLowerCase().replace(/ /g, "-"),
    };
    let thumbnailUrl = "";
    let mediaUrls: string[] = [];
    const publishProduct = async () => {
      thumbnailUrl = await uploadFile(
        thumbnail,
        `/${seller._id}/products/${data.slug}/thumbnail/${thumbnail.name}`
      );
      if (media.length > 0) {
        mediaUrls = await Promise.all(
          media.map(
            async (file) =>
              await uploadFile(
                file,
                `/${seller._id}/products/${data.slug}/media/${file.name}`
              )
          )
        );
      }
      const product: IProduct = {
        ...data,
        thumbnail: thumbnailUrl,
        media: mediaUrls,
        school: seller.school._id,
      };
      console.log(product);
      await addProduct(product);
    };
    customToast({
      func: publishProduct,
      efunc: async () => {
        //delete thumbnail and media
        await deleteFile(thumbnailUrl);
        await Promise.all(mediaUrls.map(async (url) => await deleteFile(url)));
      },
    });
  };

  return (
    <form className="w-full rounded-lg " onSubmit={publish}>
      <div className="fb">
        <h2 className="h3">
          {getStr(values.productType, "New Product", "New Service")}
        </h2>
        <Button size={"sm"} type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </div>

      <Tabs
        defaultValue="simple"
        className="w-full py-5"
        onValueChange={(value) => {
          const productType = value === "service" ? "service" : "product";
          setValues({ ...values, productType });
        }}
      >
        <TabsList className="  ">
          <TabsTrigger value="simple">Simple</TabsTrigger>
          <TabsTrigger value="complex">Complex</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <div className="py-5 fx-c gap-5">
            <GeneralInformation
              setValues={setValues}
              values={values}
              handleChange={handleChange}
            />

            <Organise
              setValues={setValues}
              values={values}
              handleChange={handleChange}
            />
            <ThumbNail {...{ thumbnail, setThumbnail }} />
            <Media {...{ media, setMedia }} />
          </div>
        </TabsContent>
        <TabsContent value="complex">
          <div className="py-5 fx-c gap-5">
            <GeneralInformation
              setValues={setValues}
              values={values}
              handleChange={handleChange}
            />
            <Organise
              setValues={setValues}
              values={values}
              handleChange={handleChange}
            />
            <Description
              setDescription={setLongDescription}
              description={longDescription}
            />

            <ThumbNail {...{ thumbnail, setThumbnail }} />
            <Media {...{ media, setMedia }} />
            {/* <Options {...{ options, setOptions }} />
             */}
            <Product_Options options={options} setOptions={setOptions} />

            <Product_Variants
              options={options}
              variants={variants}
              setVariants={setVariants}
              productType="product"
            />
          </div>
        </TabsContent>
        <TabsContent value="service">
          <div className="py-5 fx-c gap-5">
            <GeneralInformation
              setValues={setValues}
              values={values}
              handleChange={handleChange}
            />
            <Organise
              setValues={setValues}
              values={values}
              handleChange={handleChange}
            />
            <Description
              setDescription={setLongDescription}
              description={longDescription}
            />

            <ThumbNail {...{ thumbnail, setThumbnail }} />
            <Media {...{ media, setMedia }} />
            <Product_Options
              {...{ options, setOptions, productType: "service" }}
            />
            <Product_Variants
              options={options}
              variants={variants}
              setVariants={setVariants}
              productType="service"
            />
          </div>
        </TabsContent>
      </Tabs>
    </form>
  );
};
const GeneralInformation = ({
  values,
  setValues,
  handleChange,
}: IProductValues) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Information*</CardTitle>
        <CardDescription>
          Please enter the general information about your{" "}
          {values.productType === "product" ? "product" : "service"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder={
                values.productType === "product"
                  ? "Name of your product"
                  : "Name of your service"
              }
              name="name"
              onChange={handleChange}
              value={values.name}
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Price</Label>
            <Input
              id="price"
              placeholder="Price of your product"
              type="number"
              onChange={handleChange}
              value={values.price}
              name="price"
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5 md:col-span-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Textarea
              id="shortDescription"
              placeholder="A small description "
              onChange={handleChange}
              value={values.description}
              name="description"
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
const Organise = ({ values, setValues, handleChange }: IProductValues) => {
  const { data: categories, isLoading } = useGetPopulatedCategories();
  const [level, setLevel] = useState(0);
  const [open, setOpen] = useState(false);

  const [currentCategories, setCurrentCategories] = useState<
    ICategoryFetched[]
  >([]);
  useEffect(() => {
    if (categories) {
      setCurrentCategories(categories);
    }
  }, [categories]);
  const handleCategoryChange = (selectedCategory: ICategoryFetched) => {
    setLevel(level + 1);
    const newCategories = selectedCategory.children || [];
    if (newCategories.length === 0) {
      setValues({ ...values, category: selectedCategory._id });
      setOpen(false);
      return;
    }
    setValues({ ...values, category: selectedCategory._id });
    setCurrentCategories(newCategories);
  };
  const ftCategories = flattenCategories(categories || []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Organise</CardTitle>
        <CardDescription>
          Please provide the category and brand of your{" "}
          {getStr(values.productType, "product", "service")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 w-full  gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="categories">
              {isLoading ? "Loading Categories" : "Categories"}
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  {ftCategories.find((c) => c._id === values.category)?.name ||
                    " Select Category"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <Button
                  variant={"ghost"}
                  className="w-full cursor-pointer justify-start"
                  onClick={() => {
                    if (level > 0) {
                      setLevel(level - 1);
                      setCurrentCategories(categories || []);
                    }
                  }}
                >
                  {level === 0 ? (
                    "Categories"
                  ) : (
                    <span className="fc gap-2">
                      <CornerUpLeft className="text-[10px]" />
                      Back
                    </span>
                  )}
                </Button>
                {currentCategories?.map((category) => (
                  <Button
                    variant={"ghost"}
                    key={category._id}
                    className="w-full justify-start  cursor-pointer"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.name}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
            <div className="h-[.1px] w-[1px] overflow-hidden">
              <Input
                id="category"
                placeholder="Category of your product"
                name="category"
                className="h-[1px] overflow-hidden opacity-0 "
                value={values.category}
                required
              />
            </div>
          </div>

          {values.productType === "product" && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                placeholder="Brand of your product"
                name="brand"
                onChange={handleChange}
                value={values.brand}
              />
            </div>
          )}
          {values.productType === "product" && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="stock">Stock*</Label>
              <Input
                type="number"
                id="stock"
                placeholder="Number of products in stock"
                name="stock"
                onChange={handleChange}
                value={values.stock}
                required
              />
            </div>
          )}
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tags">
              Tags | Keywords (Separate With Commas)*
            </Label>
            <Input
              id="tags"
              placeholder={`Tags or keywords that describe your product ${getStr(
                values.productType
              )}`}
              name="tags"
              required
              value={values.tags.length > 0 ? values.tags.join(",") : ""}
              onChange={(e) => {
                setValues({ ...values, tags: e.target.value.split(",") });
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Description = ({
  setDescription,
  description,
}: {
  setDescription: React.Dispatch<SetStateAction<string>>;
  description: string;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Long Description</CardTitle>
        <CardDescription>Please enter the description</CardDescription>
      </CardHeader>
      <CardContent>
        <Editor setEditorContent={setDescription} editorContent={description} />
      </CardContent>
    </Card>
  );
};
const ThumbNail = ({
  thumbnail,
  setThumbnail,
}: {
  thumbnail: File | null;
  setThumbnail: React.Dispatch<SetStateAction<File | null>>;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Thumbnail</CardTitle>
        <CardDescription>
          Used to represent your product during checkout, social sharing and
          more.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ImageInputWithView file={thumbnail} setFile={setThumbnail} />
      </CardContent>
    </Card>
  );
};
const Media = ({
  media,
  setMedia,
}: {
  media: File[];
  setMedia: React.Dispatch<SetStateAction<File[]>>;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Media</CardTitle>
        <CardDescription>Add images to your product.</CardDescription>
      </CardHeader>
      <CardContent>
        <ImageInputWithView files={media} setFiles={setMedia} multiple={true} />
      </CardContent>
    </Card>
  );
};
