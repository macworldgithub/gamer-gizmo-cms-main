"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  created_at: string;
  created_by?: string;
  images?: { image_url: string }[];
  is_featured: boolean;
  feature_start_date?: string;
  feature_end_date?: string;
}

const ProductList = () => {
  const [variants, setVariants] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log(variants, "my product data");

  // Fetch categories and set initial selected category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<{ data: Category[] }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll`
        );
        setCategories(res?.data?.data);

        // Retrieve and set selected category from localStorage
        const savedCategory = localStorage.getItem("selectedCategory");
        const defaultCategory = savedCategory
          ? Number(savedCategory)
          : res.data.data[0]?.id;

        setSelectedCategory(defaultCategory);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products whenever selectedCategory changes
  useEffect(() => {
    if (selectedCategory !== null) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async (categoryId: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin-x-token');
      console.log("Fetching products with token:", token);
      const res = await axios.get<{ data: Product[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getAll?category_id=${categoryId}`,
        {
          headers: token ? {
            Authorization: `Bearer ${token}`
          } : {}
        }
      );
      console.log("Products response:", res.data);
      setVariants(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category change and store in localStorage
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = Number(e.target.value);
    setSelectedCategory(newCategory);
    localStorage.setItem("selectedCategory", String(newCategory)); // Store in localStorage
  };

  const setFeatured = async (productId: number) => {
    try {
      const token = localStorage.getItem('admin-x-token');
      if (!token) {
        toast.error('Please login to set product as premium');
        return;
      }

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/setFeatured?product_id=${productId}`,
        {},  // Empty body since backend only needs product_id
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        // Refresh the products list to get the updated data
        if (selectedCategory !== null) {
          await fetchProducts(selectedCategory);
        }
        toast.success('Product marked as premium successfully');
      }
    } catch (error) {
      console.error("Error setting product as premium:", error);
      toast.error('Failed to set product as premium. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">User Products Management</h2>
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          onChange={handleCategoryChange}
          value={selectedCategory || ""}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 min-w-[800px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S.No</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Posted At</th>
              <th className="border p-2">Posted By</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : variants.length > 0 ? (
              variants.map((record, index) => (
                <tr key={record.id} className="border">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">
                    {record.images?.length ? (
                      <Image
                        src={`${record.images[0].image_url}`}
                        alt="Product Image"
                        width={50}
                        height={50}
                        className="rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border p-2">{record.name?.slice(0, 30)}...</td>
                  <td className="border p-2">
                    {record.description?.slice(0, 30)}...
                  </td>
                  <td className="border p-2">{record.category || "N/A"}</td>
                  <td className="border p-2">
                    {new Date(record.created_at).toLocaleDateString()}
                  </td>
                  <td className="border p-2">
                    {record.created_by || "Unknown"}
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-custom-gradient text-white px-2 text-[10px] py-[2px] rounded"
                        onClick={() =>
                          router.push(
                            `/admin/product-list/viewdetail/${record.id}`
                          )
                        }
                      >
                        View Details
                      </button>
                      <button
                        className={`${record.is_featured ? 'bg-green-500' : 'bg-red-500'} text-white px-2 text-[10px] py-[2px] rounded`}
                        onClick={() => setFeatured(record.id)}
                      >
                        {record.is_featured ? 'Premium Product' : 'Set Premium'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
