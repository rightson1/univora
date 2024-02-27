import { flattenCategories } from "@/components/helpers/functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ICategoryFetched, IProductFetched, IProductValues } from "@/types";
import { useGetPopulatedCategories } from "@/utils/hooks/useCategories";
import { CornerUpLeft } from "lucide-react";
import { useEffect, useState } from "react";

export const Product_Category = ({
  category,
  setCategory,
  product,
}: {
  product?: IProductFetched;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data: categories, isLoading } = useGetPopulatedCategories();
  const [level, setLevel] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setLevel(3);
      if (product.category) {
        setCategory(product.category._id);
        setCurrentCategories(product.category.children || []);
      }
    }
  }, [product]);

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
      setCategory(selectedCategory._id);
      setOpen(false);
      return;
    }
    setCategory(selectedCategory._id);
    setCurrentCategories(newCategories);
  };
  const ftCategories = flattenCategories(categories || []);

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor="categories">
        {isLoading ? "Loading Categories" : "Categories"}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {ftCategories.find((c) => c._id === category)?.name ||
              " Select Category"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 max-h-[200px] overflow-y-auto">
          <Button
            variant={"ghost"}
            className="w-full cursor-pointer justify-start"
            onClick={() => {
              if (level > 0) {
                setLevel(0);
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
          value={category}
          required
        />
      </div>
    </div>
  );
};
