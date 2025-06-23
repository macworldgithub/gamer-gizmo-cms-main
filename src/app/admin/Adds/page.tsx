"use client";

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
    { id: 5, width: "62%", height: "200px" },
    { id: 6, width: "62%", height: "200px" },
  ],
  "Popular Gaming PCS": [
    { id: 1, width: "90%", height: "200px" },
    { id: 2, width: "25%", height: "480px" },
    { id: 3, width: "25%", height: "480px" },
    { id: 4, width: "90%", height: "150px" },
    { id: 5, width: "62%", height: "200px" },
    { id: 6, width: "62%", height: "200px" },
  ],
  "Popular Gaming Consoles": [
    { id: 1, width: "90%", height: "200px" },
    { id: 2, width: "25%", height: "480px" },
    { id: 3, width: "25%", height: "480px" },
    { id: 4, width: "90%", height: "150px" },
    { id: 5, width: "62%", height: "200px" },
    { id: 6, width: "62%", height: "200px" },
  ],
  "Popular Components and Accessories": [
    { id: 1, width: "90%", height: "200px" },
    { id: 2, width: "25%", height: "480px" },
    { id: 3, width: "25%", height: "480px" },
    { id: 4, width: "90%", height: "150px" },
    { id: 5, width: "62%", height: "200px" },
    { id: 6, width: "62%", height: "200px" },
  ],
  Blogs: [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
    { id: 4, width: "39%", height: "200px" },
  ],
  "Blog Detail": [
    { id: 1, width: "39%", height: "200px" },
    { id: 2, width: "39%", height: "200px" },
    { id: 3, width: "39%", height: "200px" },
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
  const [selectedPage, setSelectedPage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedAdPage") || "Home";
    }
    return "Home";
  });

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
        [page]: response?.data?.map((ad: any) => ({
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
  const handlePageSelect = (page: string) => {
    setSelectedPage(page);
    localStorage.setItem("selectedAdPage", page);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto lg:px-4">
      {/* // <div style={{ padding: 20 } }> */}
      <h1 className="font-bold text-xl mb-2">Ad Manager</h1>

      {/* Page Selector */}
      <div style={{ marginBottom: 20 }} className="">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageSelect(page)}
            style={{
              marginRight: 10,
              marginTop: 10,
              padding: "8px 16px",
              backgroundColor: selectedPage === page ? "#dc39fc" : "#eee",
              color: selectedPage === page ? "white" : "black",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Ad Slots */}
      <div className="lg:w-[100%] md:w-[1200%] flex flex-wrap justify-center gap-2">
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
                // <label style={{ cursor: "pointer" }}>
                //   <span>Upload Ad {slot.id}</span>
                //   <input
                //     type="file"
                //     accept="image/*,video/*"
                //     onChange={(e) => handleFileUpload(e, slot.id)}
                //     style={{ display: "none" }}
                //   />
                // </label>
                <label className="inline-block px-4 py-2 bg-[#dc39fc] text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                  Upload Ad {slot.id}
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e, slot.id)}
                    className="hidden"
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
