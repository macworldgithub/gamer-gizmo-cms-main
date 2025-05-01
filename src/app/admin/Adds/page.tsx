// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import axios from "axios";

// interface ImageType {
//   id: number;
//   src: string;
// }

// const AddsPage = () => {
//   const categories = [
//     "Home",
//     "Laptops",
//     "Desktops",
//     "Gaming",
//     "Accessories",
//     "Blogs",
//     "About Us",
//     "Contact Us",
//   ];
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [categoryImages, setCategoryImages] = useState<Record<string, ImageType[]>>({});
//   const [updateId, setUpdateId] = useState<number | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   // 👉 Load images from localStorage when page loads
//   useEffect(() => {
//     const storedImages = localStorage.getItem("categoryImages");
//     if (storedImages) {
//       setCategoryImages(JSON.parse(storedImages));
//     }
//   }, []);

//   // 👉 Save images to localStorage whenever categoryImages changes
//   useEffect(() => {
//     localStorage.setItem("categoryImages", JSON.stringify(categoryImages));
//   }, [categoryImages]);

//   const handleCategorySelect = (category: string) => {
//     setSelectedCategory(category);
//     if (!categoryImages[category]) {
//       setCategoryImages((prev) => ({ ...prev, [category]: [] }));
//     }
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!selectedCategory) return;
//     const files = e.target.files;
//     if (!files) return;

//     const existing = categoryImages[selectedCategory] || [];
//     const newImages: ImageType[] = [];
//     const startingId = existing.length + 1;

//     const validFiles = Array.from(files).slice(0, 4 - existing.length);

//     for (const [index, file] of validFiles.entries()) {
//       const newId = startingId + index;
//       const imageUrl = URL.createObjectURL(file);
//       newImages.push({ id: newId, src: imageUrl });

//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("ad_id", String(newId));
//       formData.append("page", selectedCategory);
//       formData.append("price", "0");
//       formData.append("start_date", new Date().toISOString());
//       formData.append("end_date", new Date().toISOString());

//       try {
//         await axios.post(
//           "http://localhost:4009/ads/create-or-update-or-delete",
//           formData
//         );
//       } catch (err) {
//         console.error("Upload failed:", err);
//       }
//     }

//     setCategoryImages((prev) => ({
//       ...prev,
//       [selectedCategory]: [...existing, ...newImages],
//     }));

//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleUpdateFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!selectedCategory || updateId === null) return;
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const imageUrl = URL.createObjectURL(file);
//     const updatedImages = categoryImages[selectedCategory].map((img) =>
//       img.id === updateId ? { ...img, src: imageUrl } : img
//     );

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("ad_id", String(updateId));
//     formData.append("page", selectedCategory);
//     formData.append("price", "0");
//     formData.append("start_date", new Date().toISOString());
//     formData.append("end_date", new Date().toISOString());

//     try {
//       await axios.post(
//         "http://localhost:4009/ads/create-or-update-or-delete",
//         formData
//       );
//     } catch (err) {
//       console.error("Update failed:", err);
//     }

//     setCategoryImages((prev) => ({
//       ...prev,
//       [selectedCategory]: updatedImages,
//     }));

//     setUpdateId(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleDelete = async (id: number) => {
//     if (!selectedCategory) return;

//     const formData = new FormData();
//     formData.append("ad_id", String(id));
//     formData.append("page", selectedCategory);

//     try {
//       await axios.post(
//         "http://localhost:4009/ads/create-or-update-or-delete",
//         formData
//       );
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }

//     setCategoryImages((prev) => ({
//       ...prev,
//       [selectedCategory]: prev[selectedCategory].filter((img) => img.id !== id),
//     }));
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Category Selection</h1>
//       <div className="flex flex-wrap gap-4 justify-center mb-6">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => handleCategorySelect(category)}
//             className={`px-4 py-2 rounded ${
//               selectedCategory === category
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {selectedCategory && (
//         <div className="w-full max-w-4xl">
//           <h2 className="text-xl font-semibold mb-2">
//             {selectedCategory} Images
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//             {categoryImages[selectedCategory]?.map((image) => (
//               <div
//                 key={image.id}
//                 className="relative group border rounded overflow-hidden"
//               >
//                 <Image
//                   src={image.src}
//                   alt="Ad"
//                   width={200}
//                   height={200}
//                   className="w-full h-auto"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => {
//                       setUpdateId(image.id);
//                       fileInputRef.current?.click();
//                     }}
//                     className="bg-yellow-500 text-white px-2 py-1 rounded"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(image.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* 👇 Only show "Choose File" if less than 4 images */}
//           {categoryImages[selectedCategory]?.length < 4 && (
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="mb-4"
//             />
//           )}
//         </div>
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleUpdateFile}
//       />
//     </div>
//   );
// };

// export default AddsPage;
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

type ImageType = {
  id: number;
  ad_id?: number;
  src: string;
  type?: "image" | "video";
};

const AddsPage = () => {
  const categories = [
    "Home",
    "Laptops",
    "Gaming PCS",
    "Gaming Consoles",
    "Components and Accessories",
    "Popular Laptops",
    "Popular Gaming PCS",
    "Popular Gaming Consoles",
    "Popular Components and Accessoriesming PCS",
    "Blogs",
    "Contact Us",
    "Store",
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("Home");
  const [categoryImages, setCategoryImages] = useState<
    Record<string, ImageType[]>
  >({});
  const [updateId, setUpdateId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getUploadLimit = (category: string): number => {
    if (category === "Home" || category.startsWith("Popular")) {
      return 8;
    }
    return 4;
  };

  const fetchCategoryImages = async (category: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/fetch`,
        {
          params: { page: category },
        }
      );
      setCategoryImages((prev) => ({
        ...prev,
        [category]: response.data.map((item: any) => ({
          id: item.id,
          ad_id: item.ad_id,
          src: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.url}`,
          type: item.type,
        })),
      }));
    } catch (error) {
      console.error("Error fetching category images:", error);
    }
  };

  useEffect(() => {
    fetchCategoryImages("Home");
  }, []);

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    await fetchCategoryImages(category);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCategory) return;

    const files = e.target.files;
    if (!files) return;

    const existing = categoryImages[selectedCategory] || [];
    const newFiles: Array<{ id: number; src: string }> = [];
    const startingId = existing.length + 1;

    const uploadLimit = getUploadLimit(selectedCategory);
    const validFiles = Array.from(files).slice(0, uploadLimit - existing.length);

    for (const [index, file] of validFiles.entries()) {
      const newId = startingId + index;
      const fileUrl = URL.createObjectURL(file);
      newFiles.push({ id: newId, src: fileUrl });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("ad_id", String(newId));
      formData.append("page", selectedCategory);
      formData.append("price", "0");
      formData.append("start_date", new Date().toISOString());
      formData.append("end_date", new Date().toISOString());

      try {
        const apiEndpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`;
        await axios.post(apiEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        toast.success("Uploaded successfully");
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    await fetchCategoryImages(selectedCategory);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpdateFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCategory || updateId === null) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("ad_id", String(updateId));
    formData.append("page", selectedCategory);
    formData.append("price", "0");
    formData.append("start_date", new Date().toISOString());
    formData.append("end_date", new Date().toISOString());

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (err) {
      console.error("Update failed:", err);
    }

    await fetchCategoryImages(selectedCategory);
    setUpdateId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (id: number) => {
    if (!selectedCategory) return;

    const formData = new FormData();
    formData.append("ad_id", String(id));
    formData.append("page", selectedCategory);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchCategoryImages(selectedCategory);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Category Selection</h1>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-custom-gradient text-white"
                : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Selected Category Images */}
      {selectedCategory && (
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-2">
            {selectedCategory} Images
          </h2>

          {categoryImages[selectedCategory]?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {categoryImages[selectedCategory]?.map((image) => (
                <div
                  key={image.id}
                  className="relative group border rounded overflow-hidden"
                >
                  {image.type === "video" ? (
                    <video
                      src={image.src}
                      controls
                      className="w-full h-auto"
                    />
                  ) : (
                    <Image
                      src={image.src}
                      alt="Ad"
                      width={200}
                      height={200}
                      className="w-full h-auto"
                    />
                  )}

                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      //@ts-ignore
                      onClick={() => handleDelete(image.ad_id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-red-500 my-8">
              No images found. Please upload.
            </div>
          )}

          {/* Upload input if under limit */}
          {categoryImages[selectedCategory]?.length <
            getUploadLimit(selectedCategory) && (
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="mb-4"
            />
          )}
        </div>
      )}

      {/* Hidden File input for update */}
      <input
        type="file"
        accept="image/*,video/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleUpdateFile}
      />
    </div>
  );
};

export default AddsPage;
