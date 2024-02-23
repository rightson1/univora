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
  edit?: boolean;
  initialVariants?: IVariant[];
}

export const Product_Variants_Trial: React.FC<VariantsProps> = ({
  options,
  setVariants,
  variants,
  productType,
  initialVariants,
  edit,
}) => {
  type TVariants = {
    id: string;
    variants: {
      [key: string]: string;
    };
  };
  function generateProductVariants(options: TOption[]): TVariants[] {
    const variants: TVariants[] = [];
    let idCounter = 1;

    function generateVariantsRecursive(
      optionIndex: number,
      currentVariant: { [key: string]: string }
    ) {
      if (optionIndex === options.length) {
        variants.push({
          id: (idCounter++).toString(),
          variants: currentVariant,
        });
        return;
      }

      const currentOption = options[optionIndex];
      for (const variation of currentOption.variations) {
        const newVariant = {
          ...currentVariant,
          [currentOption.title]: variation.text,
        };
        generateVariantsRecursive(optionIndex + 1, newVariant);
      }
    }

    generateVariantsRecursive(0, {});

    return variants;
  }

  useEffect(() => {
    const allOptions = generateProductVariants(options);
    if (initialVariants && initialVariants.length > 0) {
      const combinations = allOptions
        .filter((option) => Object.keys(option.variants).length > 0)
        .map((option) => {
          return {
            options: option.variants,
            price: 0,
            active: true,
            stock: 1,
          };
        });

      //find if their is any combination element that has the same options as the initial variants
      combinations.forEach((combination) => {
        const found = initialVariants.find((v) => {
          const combinationOptions = Object.values(combination.options).join(
            ","
          );
          const vOptions = Object.values(v.options).join(",");
          return combinationOptions === vOptions;
        });
        if (found) {
          combination.price = found.price;
          combination.stock = found.stock;
          combination.active = found.active;
        }
      });

      setVariants(combinations);
    } else {
      const combinations = allOptions
        .filter((option) => Object.keys(option.variants).length > 0)
        .map((option) => ({
          options: option.variants,
          price: 0,
          active: true,
          stock: 1,
        }));
      setVariants(combinations);
    }
  }, [options]);
  return (
    <Card
      className={`
    w-full ${edit && "border-none"}
    `}
    >
      <CardHeader>
        <CardTitle>
          {getStr(productType, "Product Variants", "Service Variants")}
        </CardTitle>
        <CardDescription>
          You must add at least one product option before you can begin adding
          product variants. They will override the default price and stock of
          the product.
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
                {
                  // if product type is product
                  productType === "product" && (
                    <th className="px-4 py-2">Stock</th>
                  )
                }
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
                        <Badge>
                          {Object.values(option.options).join(", ")}
                        </Badge>
                      </td>
                      <td className="border px-4 py-2">
                        <Input
                          type="number"
                          id={`Price-${optionIndex}`}
                          placeholder="Price of your product"
                          className="border-none outline-none"
                          value={option.price}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[optionIndex].price = Number(
                              e.target.value
                            );
                            setVariants(newVariants);
                          }}
                        />
                      </td>
                      {
                        // if product type is product
                        productType === "product" && (
                          <td className="border px-4 py-2">
                            <Input
                              type="number"
                              id={`Stock-${optionIndex}`}
                              placeholder="Stock of your product"
                              className="border-none outline-none"
                              value={option.stock}
                              onChange={(e) => {
                                const newVariants = [...variants];
                                newVariants[optionIndex].stock = Number(
                                  e.target.value
                                );
                                setVariants(newVariants);
                              }}
                            />
                          </td>
                        )
                      }
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
