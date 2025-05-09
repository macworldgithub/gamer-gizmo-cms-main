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
//     "Gaming PCS",
//     "Gaming Consoles",
//     "Components and Accessories",
//     "Popular Laptops",
//     "Popular Gaming PCS",
//     "Popular Gaming Consoles",
//     "Popular Components and Accessories",
//     "Blogs",
//     // "About Us",
//     "Contact Us",
//     "Store",
//   ];

//   const categoryUploadLimits: Record<string, number> = {
//     Home: 9,
//     Laptops: 4,
//     "Gaming PCS": 4,
//     "Gaming Consoles": 4,
//     "Components and Accessories": 4,
//     "Popular Laptops": 6,
//     "Popular Gaming PCS": 6,
//     "Popular Gaming Consoles": 6,
//     "Popular Components and Accessories": 6,
//     Blogs: 4,
//     "Contact Us": 4,
//     Store: 4,
//   };

//   const [selectedCategory, setSelectedCategory] = useState<string>("Home");
//   const [categoryImages, setCategoryImages] = useState<
//     Record<string, ImageType[]>
//   >({});
//   const [updateId, setUpdateId] = useState<number | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const fetchCategoryImages = async (category: string) => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/fetch`,
//         {
//           params: {
//             page: category,
//           },
//         }
//       );
//       // Assuming response.data is an array of images
//       setCategoryImages((prev) => ({
//         ...prev,
//         [category]: response.data.map((img: any) => ({
//           id: img.id,
//           ad_id: img.ad_id,
//           src: img.url.startsWith("http")
//             ? img.url
//             : `${process.env.NEXT_PUBLIC_API_BASE_URL}${img.url}`,
//         })),
//       }));
//     } catch (error) {
//       console.error("Error fetching categ ory images:", error);
//     }
//   };
//   useEffect(() => {
//     fetchCategoryImages("Home");
//   }, []);

//   const handleCategorySelect = async (category: string) => {
//     // Set active tab and fetch images for that category.
//     setSelectedCategory(category);
//     await fetchCategoryImages(category);
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!selectedCategory) return;
//     const files = e.target.files;
//     if (!files) return;

//     const existing = categoryImages[selectedCategory] || [];
//     const maxImages = categoryUploadLimits[selectedCategory] || 4;
//     const remainingSlots = maxImages - existing.length;

//     const validFiles = Array.from(files).slice(0, remainingSlots);
//     const newImages: ImageType[] = [];
//     const startingId = existing.length + 1;

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
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`,
//           formData
//         );
//       } catch (err) {
//         console.error("Upload failed:", err);
//       }
//     }

//     await fetchCategoryImages(selectedCategory);
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
//     formData.append("file", file);
//     formData.append("ad_id", String(updateId));
//     formData.append("page", selectedCategory);
//     formData.append("price", "0");
//     formData.append("start_date", new Date().toISOString());
//     formData.append("end_date", new Date().toISOString());

//     try {
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     } catch (err) {
//       console.error("Update failed:", err);
//     }

//     // setCategoryImages((prev) => ({
//     //   ...prev,
//     //   [selectedCategory]: updatedImages,
//     // }));
//     await fetchCategoryImages(selectedCategory);
//     setUpdateId(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleDelete = async (id: number) => {
//     if (!selectedCategory) return;

//     console.log(
//       "Sending delete request for Ad ID:",
//       id,
//       "Page:",
//       selectedCategory
//     );

//     const formData = new FormData();
//     formData.append("ad_id", String(id));
//     formData.append("page", selectedCategory);

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Required for FormData
//           },
//         }
//       );

//       console.log("Delete response:", response.data);
//       await fetchCategoryImages(selectedCategory);
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-4">
//       <h1 className="text-2xl font-bold mb-4">Category Selection</h1>

//       {/* Category Buttons */}
//       <div className="flex flex-wrap gap-4 justify-center mb-6">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => handleCategorySelect(category)}
//             className={`px-4 py-2 rounded ${
//               selectedCategory === category
//                 ? "bg-custom-gradient text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Selected Category Images */}
//       {selectedCategory && (
//         <div className="w-full max-w-4xl">
//           <h2 className="text-xl font-semibold mb-2">
//             {selectedCategory} Images
//           </h2>
//           {categoryImages[selectedCategory]?.length > 0 ? (
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
//               {categoryImages[selectedCategory]?.map((image) => {
//                 console.log("Image object:", image);
//                 return (
//                   <div
//                     key={image.id}
//                     className="relative group border rounded overflow-hidden"
//                   >
//                     <Image
//                       src={image.src}
//                       alt="Ad"
//                       width={200}
//                       height={200}
//                       className="w-full h-auto"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       {/* <button
//                         onClick={() => {
//                           setUpdateId(image.id);
//                           fileInputRef.current?.click();
//                         }}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded"
//                       >
//                         Update
//                       </button> */}
//                       <button
//                         //@ts-ignore
//                         onClick={() => handleDelete(image.ad_id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center text-red-500 my-8">
//               No images found. Please upload.
//             </div>
//           )}

//           {/* Upload input if less than 4 images */}
//           {/* {categoryImages[selectedCategory]?.length < 4 && (
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="mb-4"
//             />
//           )} */}

//           {(categoryImages[selectedCategory]?.length || 0) <
//             (categoryUploadLimits[selectedCategory] || 4) && (
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

//       {/* Hidden File input for update */}
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

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// interface ImageType {
//   id: number;
//   src: string;
// }

// interface AdSlot {
//   adId: number;
//   width: string;
//   height: string;
// }

// const adLayouts: Record<string, AdSlot[]> = {
//   Home: [
//     { adId: 1, width: "100%", height: "200px" },
//     { adId: 2, width: "48%", height: "200px" },
//     { adId: 3, width: "48%", height: "200px" },
//   ],
//   Explore: [
//     { adId: 1, width: "100%", height: "250px" },
//     { adId: 2, width: "100%", height: "150px" },
//   ],
//   Profile: [{ adId: 1, width: "100%", height: "300px" }],
// };

// const AddsPage: React.FC = () => {
//   const categories = Object.keys(adLayouts);
//   const [selectedCategory, setSelectedCategory] = useState<string>(
//     categories[0]
//   );
//   const [images, setImages] = useState<ImageType[]>([]);
//   const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

//   useEffect(() => {
//     fetchImages(selectedCategory);
//   }, [selectedCategory]);

//   const fetchImages = async (category: string) => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/fetch`,
//         {
//           params: { page: category },
//         }
//       );

//       const fetchedImages: ImageType[] = response.data.map((img: any) => ({
//         id: img.ad_id,
//         src: img.url.startsWith("http")
//           ? img.url
//           : `${process.env.NEXT_PUBLIC_API_BASE_URL}${img.url}`,
//       }));

//       setImages(fetchedImages);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//       setImages([]);
//     }
//   };

//   const handleImageUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>,
//     adId: number
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("page", selectedCategory);
//     formData.append("adId", adId.toString());

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/upload`,
//         formData
//       );
//       const uploadedImage: ImageType = {
//         id: adId,
//         src: response.data.url.startsWith("http")
//           ? response.data.url
//           : `${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.url}`,
//       };

//       setImages((prev) =>
//         prev.some((img) => img.id === adId)
//           ? prev.map((img) => (img.id === adId ? uploadedImage : img))
//           : [...prev, uploadedImage]
//       );
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const getImageByAdId = (adId: number): string | undefined => {
//     return images.find((img) => img.id === adId)?.src;
//   };

//   return (
//     <div style={{ padding: "1rem" }}>
//       <h1>Manage Ads</h1>
//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         style={{ marginBottom: "1rem", padding: "0.5rem" }}
//       >
//         {categories.map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//           </option>
//         ))}
//       </select>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
//         {adLayouts[selectedCategory].map(({ adId, width, height }) => (
//           <div
//             key={adId}
//             style={{
//               width,
//               height,
//               border: "2px dashed #999",
//               borderRadius: "8px",
//               position: "relative",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundImage: `url(${getImageByAdId(adId) || ""})`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               color: "#666",
//               cursor: "pointer",
//             }}
//             onClick={() => fileInputRefs.current[adId]?.click()}
//           >
//             {!getImageByAdId(adId) && <span>Click to upload Ad {adId}</span>}
//             <input
//               type="file"
//               accept="image/*"
//               style={{ display: "none" }}
//               //@ts-ignore
//               ref={(el) => (fileInputRefs.current[adId] = el)}
//               onChange={(e) => handleImageUpload(e, adId)}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AddsPage;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const adSlotsByPage = {
  Home: [
    { id: 1, width: "76%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
    { id: 5, width: "39%", height: "200px" },
    { id: 6, width: "39%", height: "200px" },
    { id: 7, width: "39%", height: "200px" },
    { id: 8, width: "39%", height: "200px" },
    { id: 9, width: "39%", height: "200px" },
  ],
  Laptops: [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
  "Gaming PCS": [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
  "Gaming Consoles": [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
  "Components and Accessories": [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
  "Popular Laptops": [
    { id: 1, width: "90%", height: "200px" },
    { id: 2, width: "25%", height: "480px" },
    { id: 3, width: "25%", height: "480px" },
    { id: 4, width: "90%", height: "150px" },
    { id: 5, width: "39%", height: "200px" },
    { id: 6, width: "39%", height: "200px" },
  ],
  "Popular Gaming PCS": [
    { id: 1, width: "90%", height: "200px" },
    { id: 2, width: "25%", height: "480px" },
    { id: 3, width: "25%", height: "480px" },
    { id: 4, width: "90%", height: "150px" },
    { id: 5, width: "39%", height: "200px" },
    { id: 6, width: "39%", height: "200px" },
  ],
  "Popular Gaming Consoles": [
    { id: 1, width: "90%", height: "200px" },
    { id: 2, width: "25%", height: "480px" },
    { id: 3, width: "25%", height: "480px" },
    { id: 4, width: "90%", height: "150px" },
    { id: 5, width: "39%", height: "200px" },
    { id: 6, width: "39%", height: "200px" },
  ],
  "Popular Components and Accessories": [
    { id: 1, width: "90%", height: "200px" },
    { id: 2, width: "25%", height: "480px" },
    { id: 3, width: "25%", height: "480px" },
    { id: 4, width: "90%", height: "150px" },
    { id: 5, width: "39%", height: "200px" },
    { id: 6, width: "39%", height: "200px" },
  ],
  Blogs: [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
  "Contact Us": [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
  Store: [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
};

const pages = Object.keys(adSlotsByPage);

const AdManager = () => {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [ads, setAds] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchAds(selectedPage);
  }, [selectedPage]);

  const fetchAds = async (page: any) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/fetch`,
        {
          params: { page },
        }
      );
      setAds((prevAds) => ({
        ...prevAds,
        [page]: response.data.map((ad: any) => ({
          id: ad.id,
          ad_id: ad.ad_id,
          src: ad.url.startsWith("http")
            ? ad.url
            : `${process.env.NEXT_PUBLIC_API_BASE_URL}${ad.url}`,
          type: ad.type, // 'image' or 'video'
        })),
      }));
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };
  //@ts-ignore
  const handleFileUpload = async (e, adId) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type.startsWith("video/") ? "video" : "image";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ad_id", adId);
    formData.append("page", selectedPage);
    formData.append("type", fileType);
    formData.append("price", "0");
    formData.append("start_date", new Date().toISOString());
    formData.append("end_date", new Date().toISOString());

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`,
        formData
      );
      fetchAds(selectedPage);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDelete = async (adId: any) => {
    const formData = new FormData();
    formData.append("ad_id", adId);
    formData.append("page", selectedPage);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ads/create-or-update-or-delete`,
        formData
      );
      fetchAds(selectedPage);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  //@ts-ignore
  const currentSlots = adSlotsByPage[selectedPage] || [];

  return (
    <div style={{ padding: 20 }}>
      <h1>Ad Manager</h1>

      {/* Page Selector */}
      <div style={{ marginBottom: 20 }}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setSelectedPage(page)}
            style={{
              marginRight: 10,
              padding: "8px 16px",
              backgroundColor: selectedPage === page ? "#007bff" : "#eee",
              color: selectedPage === page ? "white" : "black",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Ad Slots */}
      <div className="w-[80%] flex flex-wrap justify-center gap-2">
        {currentSlots.map((slot: any) => {
          //@ts-ignore
          const ad = ads[selectedPage]?.find((a) => a.ad_id === slot.id);
          return (
            <div
              key={slot.id}
              style={{
                width: slot.width,
                height: slot.height,
                border: "1px dashed #999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                background: "#f9f9f9",
              }}
            >
              {ad ? (
                <>
                  {ad.type === "image" ? (
                    <img
                      src={ad.src}
                      alt={`Ad ${slot.id}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <video
                      controls
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    >
                      <source src={ad.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <button
                    onClick={() => handleDelete(ad.ad_id)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                    }}
                  >
                    X
                  </button>
                </>
              ) : (
                <label style={{ cursor: "pointer" }}>
                  <span>Upload Ad {slot.id}</span>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e, slot.id)}
                    style={{ display: "none" }}
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdManager;
