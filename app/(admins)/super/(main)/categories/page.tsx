import { CategoryTable } from "@/components/super/categories/table";
import React from "react";
import { dummyCategories } from "@/utils/data";

const Categories = () => {
  return (
    <div className="p-2 md:p-4">
      <CategoryTable />
    </div>
  );
};

export default Categories;
