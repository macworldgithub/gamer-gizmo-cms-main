"use client";
import { useState } from "react";

export default function NewCategory() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    productTags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Category Submitted:", formData);
    // You can add API calls here to submit data
  };

  return (
    <div className="w-full mx-auto bg-white  rounded-lg shadow-md h-full min-h-min">
      <h2 className="text-xl font-bold px-6  pt-16 pb-2 border-b border-black ">Add New Category</h2>
      <div className=""></div>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 lg:p-4 ">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg border-black mt-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg border-black mt-2"
            required
          />
          <p className="lg:text-xs text-[10px] mt-2 text-gray-500">The “slug” is the URL-friendly version of the name. It is usually all
          lowercase and contains only letters, numbers and hyphens.</p>
        </div>
        <div>
          <label className="block text-sm font-medium">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg border-black mt-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Full Description</label>
          <textarea
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg border-black mt-2"
          />
        </div>
        <div>
          <div className="flex gap-2 items-center">
          <label className="block text-sm font-medium">Product Tags</label>
          <p className="text-xs text-gray-500">(Type and make comma to separate tags)</p>
          </div>
          <input
            type="text"
            name="productTags"
            value={formData.productTags}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg border-black mt-2"
          />
        </div>
        <button type="submit" className=" bg-custom-gradient text-white py-2 rounded-xl font-bold px-2">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
