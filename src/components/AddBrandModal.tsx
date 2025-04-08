"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowDropdown } from "react-icons/io";

interface AddNewBrandProps {
  setIsModalOpen: (value: boolean) => void;
  categories: { id: string; name: string }[];
  fetchBrands: () => void;
}

export default function AddNewBrand({
  setIsModalOpen,
  categories,
  fetchBrands,
}: AddNewBrandProps) {
  const token = localStorage.getItem("admin-x-token");
  const [formData, setFormData] = useState({
    category: "",
    brandName: "",
    brandLogo: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, brandLogo: e.target.files![0] }));
    }
  };

  const handleReset = () => {
    setFormData({ category: "", brandName: "", brandLogo: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category_id", formData.category);
    data.append("name", formData.brandName);
    data.append("status", "true");
    if (formData.brandLogo) {
      data.append("logo", formData.brandLogo);
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleReset();
      fetchBrands();
      toast.success(res.data.message);
      setIsModalOpen(false);
    } catch (error: unknown) {
      if (isAxiosErrorWithResponse(error)) {
        // @ts-expect-error jhjk
        if (Array.isArray(error.response.data.message)) {
          // @ts-expect-error jhjk
          error.response.data.message.forEach((msg: string) =>
            toast.error(msg)
          );
        } else {
          // @ts-expect-error jhjk
          toast.error(`Error adding brand: ${error.response.data.message}`);
        }
      } else if (error instanceof Error) {
        toast.error(`Error adding brand: ${error.message}`);
      } else {
        toast.error("Error adding brand: Unknown error");
      }
    }
  };

  function isAxiosErrorWithResponse(
    error: unknown
  ): error is AxiosError<{ message: string | string[] }> {
    return axios.isAxiosError(error) && error.response !== undefined;
  }

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Brand
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2 pr-8 appearance-none"
            >
              <option value="">Select Category</option>
              {categories &&
                categories.length > 0 &&
                categories.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
            <IoMdArrowDropdown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Brand Name Input */}
        <div>
          <label className="block text-gray-700 font-medium">Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleInputChange}
            placeholder="Enter brand name"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Brand Logo Upload */}
        <div>
          <label className="block text-gray-700 font-medium">Brand Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
