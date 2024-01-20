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
import { Editor } from "./Editor";
import { WithOutContext as ReactTags } from "react-tag-input";
import { ChangeEvent, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MdDeleteOutline } from "react-icons/md";
import { TOption } from "@/types/sellerTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const NewProductForm = () => {
  const [options, setOptions] = useState<TOption[]>([
    { title: "", variations: [] },
  ]);

  return (
    <div className="w-full rounded-lg ">
      <div className="fb">
        <h2 className="h3">New Product</h2>
        <Button size={"sm"}>Publish Product</Button>
      </div>

      <Tabs defaultValue="simple" className="w-full py-5">
        <TabsList className="  ">
          <TabsTrigger value="simple">Simple Product</TabsTrigger>
          <TabsTrigger value="complex">Complex Product</TabsTrigger>
        </TabsList>
        <TabsContent value="simple">
          <div className="py-5 fx-c gap-5">
            <GeneralInformation />
            <Description />
            <Organise />
          </div>
        </TabsContent>
        <TabsContent value="complex">
          <div className="py-5 fx-c gap-5">
            <GeneralInformation />
            <Description />
            <Organise />
            {/* <Attributes /> */}
            <Options {...{ options, setOptions }} />
            <Variants {...{ options, setOptions }} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
const GeneralInformation = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>General Information*</CardTitle>
        <CardDescription>
          Please enter the general information about your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-4">
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your product" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Price</Label>
              <Input
                id="price"
                placeholder="Price of your product"
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                placeholder="
                  A small description of your product"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
const Organise = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Organise</CardTitle>
        <CardDescription>
          Please provide the category and brand of your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid md:grid-cols-2 w-full  gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category *</Label>
              <Input
                type="number"
                id="category"
                placeholder="Category of your product in Kg"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input
                type="number"
                id="brand"
                placeholder="Brand of your product in Kg"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
const Attributes = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Attributes</CardTitle>
        <CardDescription>
          Please Provide the attributes of your product.(Optional)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 md:grid-cols-3 w-full  gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input
                type="text"
                id="brand"
                placeholder="Brand of your product"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="material">Material</Label>
              <Input
                type="text"
                id="material"
                placeholder="Material of your product"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="weight">Weight</Label>
              <Input
                type="number"
                id="weight"
                placeholder="Weight of your product in Kg"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="height">Height</Label>
              <Input
                type="number"
                id="height"
                placeholder="Height of your product in cm"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="width">Width</Label>
              <Input
                type="number"
                id="width"
                placeholder="Width of your product in cm"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="length">Length</Label>
              <Input
                type="number"
                id="length"
                placeholder="Length of your product in cm"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

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

export const Description = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Description</CardTitle>
        <CardDescription>
          Please enter the description of your product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Editor />
      </CardContent>
    </Card>
  );
};

interface Variant {
  name: string;
  option: string;
  price: number;
}

interface VariantsProps {
  options: TOption[];
}

const Variants: React.FC<VariantsProps> = ({ options }) => {
  const [variants, setVariants] = useState<Variant[]>([
    { name: "", option: "", price: 0 },
  ]);
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
                <th className="px-4 py-2">Visible</th>
                <th className="px-4 py-2">Option</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {allOptions.map((option, optionIndex) => {
                if (option.length === 0) return null;
                return (
                  <tr key={optionIndex}>
                    <td className="border px-4 py-2">
                      <Checkbox id={`Visible-${optionIndex}`} />
                    </td>
                    <td className="border px-4 py-2">
                      <Badge>{option.join(", ")}</Badge>
                    </td>
                    <td className="border px-4 py-2">
                      <Input
                        type="text"
                        id={`Price-${optionIndex}`}
                        placeholder="Price of your product"
                        className="border-none outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Variants;
