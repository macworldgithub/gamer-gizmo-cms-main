import React from "react";
import clsx from "clsx";

interface Category {
  id: string;
  name: string;
}

interface CategoryStepProps {
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
  loadingCategories: boolean;
  categoryError: string | null;
  next: () => void;
}

const categoryIconMapping: { [key: string]: string } = {
  Desktops: "/desktopImage.jpg",
  Laptops: "/LaptopImage.png",
  Components: "/components.jpg",
  "Gaming Consoles": "/consoles2.png",
  Default: "/images/default.jpg",
};

const CategoryStep: React.FC<CategoryStepProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  loadingCategories,
  categoryError,
  next,
}) => {
  return (
    <div className="w-full text-black text-center">
      <h2 className="text-lg font-bold dark:text-white">Select Category</h2>
      {loadingCategories ? (
        <p>Loading categories...</p>  
      ) : categoryError ? (
        <p className="text-red-500">{categoryError}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:gap-3 sm:gap-4 md:gap-2 mt-6 mx-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              onDoubleClick={next}
              className={clsx(
                "px-2 border rounded-lg cursor-pointer text-center dark:bg-white",
                selectedCategory?.id === category.id
                  ? "bg-custom-gradient text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-400"
              )}
            >
              <div className="relative w-24 h-24 md:w-16 max-sm:h-16 max-sm:w-16 mx-auto ">
                <img
                  src={
                    categoryIconMapping[category?.name] ||
                    categoryIconMapping["Default"]
                  }
                  alt={category.name}
                  className="rounded-lg object-contain w-full h-full"
                />
              </div>
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryStep;
