"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { TOption } from "@/types/sellerTypes";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { IProductType, IVariant } from "@/types";
import { getStr } from "@/components/helpers/functions";

interface VariantsProps {
  options: TOption[];
  variants: IVariant[];
  setVariants: (variants: IVariant[]) => void;
  productType?: IProductType;
}

export const Product_Variants: React.FC<VariantsProps> = ({
  options,
  setVariants,
  variants,
  productType,
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
        active: true,
      }))
    );
  }, [allOptions]);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {getStr(productType, "Product Variants", "Service Variants")}
        </CardTitle>
        <CardDescription>
          You must add at least one product option before you can begin adding
          product variants.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="fx-c gap-5 w-full overflow-x-auto">
          <table className="table-auto w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2">Visible?</th>
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
                      <td className="border px-4 py-2 max-w-[20px]">
                        <Checkbox
                          checked={option.active}
                          id={`Visible-${optionIndex}`}
                          onCheckedChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[optionIndex].active = e as boolean;
                            // newVariants.sort((a, b) =>
                            //   a.active === b.active ? 0 : a.active ? -1 : 1
                            // );

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
