import React from "react";
import clsx from "clsx";

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategorySelectionProps {
  setSelectedCategory: (category: Category) => void;
  selectCategory: Category;
  setActiveStep: (step: number) => void;
  categories: Category[];
  loadingCategories: boolean;
  categoryError?: string;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  setSelectedCategory,
  selectCategory,
  setActiveStep,
  categories,
  loadingCategories,
  categoryError,
}) => {
  const categoryIconMapping: Record<string, string> = {
    "Gaming PCs": "/images/desktopImage.jpg",
    Laptops: "/images/LaptopImage.png",
    Components: "/images/components.jpg",
    "Gaming Consoles": "/images/consoles2.png",
    // Accessories: "/images/accessories.jpg",
    Default: "/images/default.jpg",
  };

  // Replace "Desktops" with "Gaming PCs" & sort the categories in required order
  const orderedCategories = categories
    .map((category) =>
      category.name === "Desktops"
        ? { ...category, name: "Gaming PCs" }
        : category
    )
    .sort((a, b) => {
      const order = ["Gaming PCs", "Laptops", "Gaming Consoles", "Components"];
      return order.indexOf(a.name) - order.indexOf(b.name);
    });

  return (
    <div className="w-full text-black text-center">
      <h2 className="text-lg font-bold dark:text-white">Select Category</h2>
      {loadingCategories ? (
        <p className="">Loading categories...</p>
      ) : categoryError ? (
        <p className="text-red-500">{categoryError}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 max-sm:w-[70%] sm:w-[60%] md:w-full lg:w-[80%] xl:w-[60%] max-sm:gap-3 gap-14 mt-6 mx-auto">
          {orderedCategories.map((category) => (
            <div
              key={category.id}
              onDoubleClick={() => setActiveStep(1)}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                "p-2 border rounded-lg cursor-pointer text-center dark:bg-white",
                selectCategory.id === category.id
                  ? "bg-custom-gradient text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-400"
              )}
            >
              <div className="relative w-24 h-24 max-sm:h-16 max-sm:w-16 mx-auto mb-4">
                <img
                  src={
                    category.icon ||
                    categoryIconMapping[category.name] ||
                    categoryIconMapping["Default"]
                  }
                  alt={category.name}
                  className="rounded-lgobject-contain w-full h-full"
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

export default CategorySelection;

// import React from "react";
// import clsx from "clsx";

// const CategorySelection = ({
//   setSelectedCategory,
//   selectCategory,
//   setActiveStep,
//   categories,
//   loadingCategories,
//   categoryError,
// }: any) => {
//   const categoryIconMapping: Record<string, string> = {
//     Desktops: "/images/desktopImage.jpg",
//     Laptops: "/images/LaptopImage.png",
//     Components: "/images/components.jpg",
//     "Gaming Consoles": "/images/consoles2.png",
//     Accessories: "/images/accessories.jpg",
//     Default: "/images/default.jpg",
//   };

//   return (
//     <div className="w-full text-black  text-center">
//       <h2 className="text-lg font-bold">Select Category</h2>
//       {loadingCategories ? (
//         <p>Loading categories...</p>
//       ) : categoryError ? (
//         <p className="text-red-500">{categoryError}</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 max-sm:w-[70%] sm:w-[60%]  md:w-full lg:w-[80%] xl:w-[60%] max-sm:gap-3 gap-14  mt-6 mx-auto">
//           {categories.map((category: any) => (
//             <div
//               key={category?.id}
//               onDoubleClick={() => setActiveStep(1)}
//               onClick={() => {
//                 setSelectedCategory(category);
//               }}
//               className={clsx(
//                 "p-2 border rounded-lg cursor-pointer text-center",
//                 selectCategory.id === category.id
//                   ? "bg-custom-gradient text-white"
//                   : "hover:bg-gray-200 dark:hover:bg-gray-400"
//               )}
//             >
//               <div
//                 className="relative w-24 h-24
//                max-sm:h-16 max-sm:w-16 mx-auto mb-4"
//               >
//                 <img
//                   src={
//                     category?.icon ||
//                     categoryIconMapping[category.name] ||
//                     categoryIconMapping["Default"]
//                   }
//                   alt={category.name}
//                   className="rounded-lg object-contain w-full h-full"
//                 />
//               </div>
//               {category.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategorySelection;
