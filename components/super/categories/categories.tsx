"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosAdd, IoIosMore } from "react-icons/io";
import { ICategory, ICategoryFetched, ICategoryTable } from "@/types";
import { dummyCategories } from "@/utils/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { AddCategory } from "./add-category";
import { Button } from "@/components/ui/button";
import { useGetPopulatedCategories } from "@/utils/hooks/useCategories";
import { EditCategory } from "./edit-category";

export const CategoryTable = () => {
  const { data: categories, isLoading } = useGetPopulatedCategories();
  console.log(categories);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderCategory = (category: ICategoryFetched, level = 0) => {
    const pl = level * 30;
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        style={{
          paddingLeft: `${pl}px`,
        }}
        className={`flex justify-between items-center my-4`}
      >
        <div className="flex items-center">
          {category.children?.length > 0 && (
            <button
              className="mr-2"
              onClick={() => toggleCategory(category._id)}
            >
              {openCategories.includes(category._id) ? (
                <FaCaretDown />
              ) : (
                <FaCaretRight />
              )}
            </button>
          )}
          <span>{category.name}</span>
        </div>
        <div className="flex">
          <AddCategory parentCategory={category} />
          <EditCategory category={category} />
        </div>
      </motion.div>
    );
  };

  const renderCategories = (categories: ICategoryFetched[], level = 0) => {
    if (level > 10) return null; // Limit to 10 levels of nesting

    return (
      <AnimatePresence>
        {categories.map((category) => (
          <React.Fragment key={category._id}>
            {renderCategory(category, level)}
            {category.children &&
              openCategories.includes(category._id) &&
              renderCategories(category.children, level + 1)}
          </React.Fragment>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="fb w-full">
          <CardTitle>Categories</CardTitle>
          <AddCategory />
        </div>
        <CardDescription>Product Categories.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>Loading...</div>
        ) : categories ? (
          renderCategories(categories)
        ) : (
          <div>No Categories</div>
        )}
      </CardContent>
    </Card>
  );
};
