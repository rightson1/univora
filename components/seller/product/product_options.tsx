"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WithOutContext as ReactTags } from "react-tag-input";
import { ChangeEvent } from "react";
import { BiPlus } from "react-icons/bi";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MdDeleteOutline } from "react-icons/md";
import { TOption } from "@/types/sellerTypes";

import { IProductType } from "@/types";

export const Product_Options = ({
  options,
  setOptions,
  productType,
}: {
  options: TOption[];
  setOptions: (options: TOption[]) => void;
  productType?: IProductType;
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
          {productType === "service"
            ? "Options are used to define the duration, etc. of the service(Optional)"
            : `Options are used to define the color, size, etc. of the product(Optional) `}
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
                placeholder={
                  productType === "service"
                    ? `Duration, etc.
                  `
                    : "Color, Size, etc."
                }
                value={option.title}
                onChange={(event) => handleTitleChange(optionIndex, event)}
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full ">
              <Label htmlFor={`option-${optionIndex}`}>
                <span className="hidden md:flex">
                  Variation(Comma Separated)
                </span>
                <span className="flex md:hidden">
                  Variation(Click Enter to add)
                </span>
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
