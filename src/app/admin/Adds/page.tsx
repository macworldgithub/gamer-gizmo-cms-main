'use client';

import React, { useState, useRef } from 'react';

interface ImageItem {
  id: number;
  src: string;
  file: File;
}

type Category = 'Laptops' | 'Desktops' | 'Gaming' | 'Accessories';

const AddsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryImages, setCategoryImages] = useState<Record<Category, ImageItem[]>>({
    Laptops: [],
    Desktops: [],
    Gaming: [],
    Accessories: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [updateId, setUpdateId] = useState<number | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCategory) return;

    const files = e.target.files;
    if (!files) return;

    const existing = categoryImages[selectedCategory];
    const newImages = Array.from(files).slice(0, 4 - existing.length).map((file, index) => ({
      id: Date.now() + index,
      src: URL.createObjectURL(file),
      file,
    }));

    setCategoryImages((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], ...newImages],
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpdateTrigger = (id: number) => {
    setUpdateId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpdateFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCategory) return;
    const file = e.target.files?.[0];
    if (!file || updateId === null) return;

    setCategoryImages((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].map((img) =>
        img.id === updateId ? { ...img, src: URL.createObjectURL(file), file } : img
      ),
    }));

    setUpdateId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: number) => {
    if (!selectedCategory) return;
    setCategoryImages((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter((img) => img.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Manage Ads Images</h1>

      <div className="mb-6">
        {(['Laptops', 'Desktops', 'Gaming', 'Accessories'] as Category[]).map((cat) => (
          <button
            key={cat}
            className={`mr-4 ${selectedCategory === cat ? 'bg-blue-600' : 'bg-gray-300'} text-white py-2 px-4 rounded`}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div>
          <h2 className="text-xl mb-4">{selectedCategory} Ads</h2>
          {categoryImages[selectedCategory].length < 4 && (
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mb-4"
            />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={updateId !== null ? handleUpdateFile : handleImageUpload}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {categoryImages[selectedCategory].map((img) => (
              <div
                key={img.id}
                className="bg-white p-4 rounded shadow flex flex-col items-center space-y-3"
              >
                <img
                  src={img.src}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded"
                />
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleUpdateTrigger(img.id)}
                  >
                    Update
                  </button>
                  {(img.src || img.file) && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(img.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddsPage;
