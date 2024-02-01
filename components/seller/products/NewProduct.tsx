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
import { BiPlus } from "react-icons/bi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MdDeleteOutline } from "react-icons/md";
import { TOption } from "@/types/sellerTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageInputWithView } from "../utils/image-input";
import {
  ICategory,
  ICategoryFetched,
  IProduct,
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
  uploadFile,
  useCustomToast,
} from "@/components/helpers/functions";
import { useSellerAuth } from "@/utils/sellerAuth";
import { useAddProduct } from "@/utils/hooks/useProduct";
import toast from "react-hot-toast";

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
      active: true,
      business: seller._id,
      slug: values.name.toLowerCase().replace(/ /g, "-"),
    };
    console.log(data);
    let thumbnailUrl = "";
    let mediaUrls: string[] = [];
    const publishProduct = async () => {
      thumbnailUrl = await uploadFile(
        thumbnail,
        `products/${seller.name}/${values.name}/thumbnail`
      );
      if (media.length > 0) {
        mediaUrls = await Promise.all(
          media.map(
            async (file) =>
              await uploadFile(
                file,
                `products/${seller.name}/${values.name}/media`
              )
          )
        );
      }
      const product: IProduct = {
        ...data,
        thumbnail: thumbnailUrl,
        media: mediaUrls,
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
        <h2 className="h3">New Product</h2>
        <Button size={"sm"} type="submit" disabled={loading}>
          Publish Product
        </Button>
      </div>

      <Tabs defaultValue="simple" className="w-full py-5">
        <TabsList className="  ">
          <TabsTrigger value="simple">Simple Product</TabsTrigger>
          <TabsTrigger value="complex">Complex Product</TabsTrigger>
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
            <Description setDescription={setLongDescription} />

            <ThumbNail {...{ thumbnail, setThumbnail }} />
            <Media {...{ media, setMedia }} />
            <Options {...{ options, setOptions }} />
            <Variants {...{ options, setOptions, variants, setVariants }} />
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
          Please enter the general information about your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
          <div className="flex flex-col space-y-1.5 ">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Name of your product"
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
              placeholder="
                  A small description of your product"
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
          Please provide the category and brand of your product.
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
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="tags">
              Tags | Keywords (Separate With Commas)*
            </Label>
            <Input
              id="tags"
              placeholder="
             Tags or keywords that describe your product
             "
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
// const Attributes = () => {
//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Attributes</CardTitle>
//         <CardDescription>
//           Please Provide the attributes of your product.(Optional)
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="grid grid-cols-2 md:grid-cols-3 w-full  gap-4">
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="brand">Brand</Label>
//               <Input
//                 type="text"
//                 id="brand"
//                 placeholder="Brand of your product"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="material">Material</Label>
//               <Input
//                 type="text"
//                 id="material"
//                 placeholder="Material of your product"
//               />
//             </div>

//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="weight">Weight</Label>
//               <Input
//                 type="number"
//                 id="weight"
//                 placeholder="Weight of your product in Kg"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="height">Height</Label>
//               <Input
//                 type="number"
//                 id="height"
//                 placeholder="Height of your product in cm"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="width">Width</Label>
//               <Input
//                 type="number"
//                 id="width"
//                 placeholder="Width of your product in cm"
//               />
//             </div>
//             <div className="flex flex-col space-y-1.5">
//               <Label htmlFor="length">Length</Label>
//               <Input
//                 type="number"
//                 id="length"
//                 placeholder="Length of your product in cm"
//               />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

const Options = ({
  options,
  setOptions,
}: {
  options: TOption[];
  setOptions: (options: TOption[]) => void;
}) => {
  const handleDelete = (optionIndex: number, variationIndex: number) => {
    const newOptions = [...options];
    newOptions[optionIndex].variations.splice(variationIndex, 1);
    setOptions(newOptions);
  };

  const handleAddition = (
    optionIndex: number,
    tag: { id: string; text: string }
  ) => {
    const newOptions = [...options];
    newOptions[optionIndex].variations.push(tag);
    setOptions(newOptions);
  };

  const handleTitleChange = (
    optionIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newOptions = [...options];
    newOptions[optionIndex].title = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { title: "", variations: [] }]);
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDrag = (
    optionIndex: number,
    tag: { id: string; text: string },
    currPos: number,
    newPos: number
  ) => {
    const newOptions = [...options];
    const newTags = newOptions[optionIndex].variations.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    newOptions[optionIndex].variations = newTags;
    setOptions(newOptions);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>
          Options are used to define the color, size, etc. of the
          product(Optional)
        </CardDescription>
      </CardHeader>
      <CardContent className="fx-c gap-5 ">
        {options.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className=" flex flex-col md:flex-row gap-5  items-start w-full"
          >
            <div className="flex flex-col gap-1.5 w-full h-full ">
              <Label htmlFor={`option-${optionIndex}`}>Option Title</Label>
              <Input
                type="text"
                id={`option-${optionIndex}`}
                placeholder="Size, Color, etc."
                value={option.title}
                onChange={(event) => handleTitleChange(optionIndex, event)}
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full ">
              <Label htmlFor={`option-${optionIndex}`}>
                Variation(Comma Separated)
              </Label>
              <DndProvider backend={HTML5Backend}>
                <ReactTags
                  tags={option.variations.map((variation, index) => ({
                    id: variation.id,
                    text: variation.text,
                  }))}
                  handleDelete={(variationIndex) =>
                    handleDelete(optionIndex, variationIndex)
                  }
                  handleAddition={(tag) => handleAddition(optionIndex, tag)}
                  delimiters={delimiters}
                  handleDrag={(tag, currPos, newPos) =>
                    handleDrag(optionIndex, tag, currPos, newPos)
                  }
                  inputFieldPosition="top"
                  placeholder="Add new variation"
                  classNames={{
                    tagInputField: "ReactTags__tagInputField",
                    tag: "ReactTags__tag",
                    remove: "ReactTags__remove",
                    suggestions: "ReactTags__suggestions",
                    activeSuggestion: "ReactTags__activeSuggestion",
                  }}
                />
              </DndProvider>
            </div>

            <Button
              className="flex-end md:self-center px-2"
              type="button"
              size={"icon"}
              variant={"ghost"}
              onClick={() => {
                const newOptions = [...options];
                newOptions.splice(optionIndex, 1);
                setOptions(newOptions);
              }}
            >
              <MdDeleteOutline className="text-xl text-destructive" />
            </Button>
          </div>
        ))}
        <Button onClick={addOption} type="button">
          <BiPlus className="text-xl" />
          Add Option
        </Button>
      </CardContent>
    </Card>
  );
};

export const Description = ({
  setDescription,
}: {
  setDescription: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Description</CardTitle>
        <CardDescription>
          Please enter the description of your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Editor setEditorContent={setDescription} />
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

interface VariantsProps {
  options: TOption[];
  variants: IVariant[];
  setVariants: (variants: IVariant[]) => void;
}

const Variants: React.FC<VariantsProps> = ({
  options,
  setVariants,
  variants,
}) => {
  const [allOptions, setAllOptions] = useState<string[][]>([]);

  function getCombinations(options: TOption[]): string[][] {
    if (options.length === 0) return [[]];

    const firstOption = options[0];
    const restOptions = options.slice(1);

    const restCombinations = getCombinations(restOptions);

    let combinations: string[][] = [];
    for (let variation of firstOption.variations) {
      for (let restCombination of restCombinations) {
        combinations.push([JSON.stringify(variation), ...restCombination]);
      }
    }

    return combinations;
  }

  useEffect(() => {
    const combinations = getCombinations(options);
    const allOptions: string[][] = combinations.map((combination) =>
      combination.map((variation) => JSON.parse(variation).text)
    );
    setAllOptions(allOptions);
  }, [options]);
  useEffect(() => {
    setVariants(
      allOptions.map((option) => ({
        options: option.join(", "),
        price: 0,
        active: false,
      }))
    );
  }, [allOptions]);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Variants</CardTitle>
        <CardDescription>
          You must add at least one product option before you can begin adding
          product variants.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="fx-c gap-5">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Visible(Check)</th>
                <th className="px-4 py-2">Option</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {
                // sort by option.active
                variants.map((option, optionIndex) => {
                  return (
                    <tr key={optionIndex}>
                      <td className="border px-4 py-2">
                        <Checkbox
                          checked={option.active}
                          id={`Visible-${optionIndex}`}
                          onCheckedChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[optionIndex].active = e as boolean;
                            // newVariants.sort((a, b) =>
                            //   a.active === b.active ? 0 : a.active ? -1 : 1
                            // );
                            console.log(newVariants);
                            setVariants(newVariants);
                          }}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <Badge>{option.options}</Badge>
                      </td>
                      <td className="border px-4 py-2">
                        <Input
                          type="text"
                          id={`Price-${optionIndex}`}
                          placeholder="Price of your product"
                          className="border-none outline-none"
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[optionIndex].price = Number(
                              e.target.value
                            );
                            setVariants(newVariants);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
