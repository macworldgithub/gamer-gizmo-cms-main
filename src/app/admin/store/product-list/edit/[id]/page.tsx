"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Card, Input, Select, Button, Spin } from "antd";
import Image from "next/image";
import UploadImages from "../../components/UploadImages";

const EditStorePage = () => {
    const { id } = useParams();
    const router = useRouter();
    const token = localStorage.getItem("admin-x-token");

    // Get user data from localStorage with correct key
    const getUserData = () => {
        try {
            const adminData = localStorage.getItem("admin");
            if (adminData) {
                const parsedData = JSON.parse(adminData);
                console.log(parsedData?.id, 'User ID from localStorage');
                return parsedData?.id || null; // Return only the ID
            }
            return null;
        } catch (error) {
            console.error("Error parsing admin data:", error);
            return null;
        }
    };

    const [adData, setAdData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [model, setModels] = useState<any[]>([]);
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (!id) return;
        fetchAdDetails();
        fetchLocations();
    }, [id]);

    useEffect(() => {
        fetchBrands();
    }, [adData]);

    const fetchAdDetails = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById?id=${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const product = response.data.data;
            setAdData({
                ...product,
                category_id: product?.category_id || "",
            });

            const formattedImages = (product?.product_images || []).map(
                (img: any, index: number) => ({
                    uid: img.id.toString(),
                    name: `image-${img.id}`,
                    url: new URL(
                        img.image_url.replace(/^\/+/, ""),
                        process.env.NEXT_PUBLIC_API_BASE_URL
                    ).toString(),
                    status: "done",
                    id: img.id,
                })
            );

            setFileList(formattedImages);
        } catch (err) {
            toast.error("Failed to fetch product details");
        } finally {
            setLoading(false);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${adData.category_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setBrands(response.data.data || []);
        } catch (err: any) {
            console.error("Error fetching brands:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/getAll?brand=${adData?.brand_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setModels(response.data.data || []);
            } catch (err: any) {
                console.error("Error fetching models:", err.response?.data || err.message);
            }
        };

        if (adData?.brand_id) {
            fetchModels();
        }
    }, [adData?.brand_id]);

    const fetchLocations = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/location/getAll`
            );
            setLocations(response?.data?.data || []);
        } catch (err) {
            console.error("Failed to fetch locations.");
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setAdData({ ...adData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userId = getUserData();
            if (!userId) {
                toast.error("Admin data not found. Please login again.");
                return;
            }

            // Prepare form data
            const formData = new FormData();

            // Handle images
            fileList.forEach((file: any) => {
                if (file.originFileObj) {
                    formData.append("images", file.originFileObj);
                }
            });

            // Handle category-specific fields
            if (adData.category_id === 1) { // Laptops
                const laptopFields = {
                    battery_life: "",
                    color: "",
                    graphics: "",
                    ports: "",
                    processor: "",
                    processor_variant: "",
                    ram: "",
                    storage: "",
                    storage_type: "",
                };

                formData.append("laptops", JSON.stringify([laptopFields]));
            }
            else if (adData.category_id === 2) { // Personal Computers
                const pcFields = {
                    graphics: "",
                    ports: "",
                    processor: "",
                    processor_variant: "",
                    ram: "",
                    storage: "",
                    storage_type: "",
                };

                formData.append("personal_computers", JSON.stringify([pcFields]));
            }
            else if (adData.category_id === 4) { // Gaming Console
                const consoleFields = {
                    accessories: "",
                    battery_life: "",
                    color: "",
                    connectivity: "",
                    warranty_status: "",
                };

                formData.append("gaming_console", JSON.stringify([consoleFields]));
            }
            else if (adData.category_id === 3) { // Components
                const componentFields = {
                    component_type: "",
                    text: "",
                };

                formData.append("components", JSON.stringify([componentFields]));
            }

            // Append basic product data
            formData.append("prod_id", adData?.id?.toString() || "");
            formData.append("user_id", userId.toString());
            formData.append("category_id", adData?.category_id?.toString() || "");
            formData.append("name", adData?.name || "");
            formData.append("price", adData?.price?.toString() || "");
            formData.append("condition", adData?.condition?.toString() || "");
            formData.append("description", adData?.description || "");
            formData.append("brand_id", adData?.brand_id?.toString() || "");
            formData.append("location", adData?.location?.toString() || "");
            formData.append("model_id", adData?.model_id?.toString() || "");
            formData.append("stock", adData?.stock?.toString() || "");
            formData.append("is_store_product", "true");
            formData.append("is_published", "true");

            // Update product
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/updateProduct`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success("Product updated successfully");
            router.push("/admin/store/product-list");
        } catch (err: any) {
            console.error("Error during submission:", err);
            toast.error(err.response?.data?.message || "Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="p-6">
            <Card className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Edit Store Product</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Product Name</label>
                            <Input
                                name="name"
                                value={adData.name || ""}
                                onChange={handleChange}
                                placeholder="Product Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Price</label>
                            <Input
                                type="number"
                                name="price"
                                value={adData.price || ""}
                                onChange={handleChange}
                                placeholder="Price"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Condition</label>
                            <Select
                                className="w-full"
                                value={adData.condition || ""}
                                onChange={(value) => setAdData({ ...adData, condition: value })}
                            >
                                <Select.Option value="">Select Condition</Select.Option>
                                <Select.Option value="1">New</Select.Option>
                                <Select.Option value="2">Used</Select.Option>
                            </Select>
                        </div>
                        <div>
                            <label className="block mb-1">Location</label>
                            <Select
                                className="w-full"
                                value={adData.location || ""}
                                onChange={(value) => setAdData({ ...adData, location: value })}
                            >
                                <Select.Option value="">Select Location</Select.Option>
                                {locations.map((location) => (
                                    <Select.Option key={location.id} value={location.id}>
                                        {location.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        {/* Only show brand and model for Laptops, PCs, and Gaming Consoles */}
                        {(adData?.category_id === 1 || adData?.category_id === 2 || adData?.category_id === 4) && (
                            <>
                                <div>
                                    <label className="block mb-1">Brand</label>
                                    <Select
                                        className="w-full"
                                        value={adData?.brand_id || ""}
                                        onChange={(value) => setAdData({ ...adData, brand_id: value, model_id: "" })}
                                    >
                                        <Select.Option value="">Select Brand</Select.Option>
                                        {brands.map((brand) => (
                                            <Select.Option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <label className="block mb-1">Model</label>
                                    <Select
                                        className="w-full"
                                        value={adData?.model_id || ""}
                                        onChange={(value) => setAdData({ ...adData, model_id: value })}
                                    >
                                        <Select.Option value="">Select Model</Select.Option>
                                        {model.map((mod) => (
                                            <Select.Option key={mod.id} value={mod.id}>
                                                {mod.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </>
                        )}
                        <div>
                            <label className="block mb-1">Stock</label>
                            <Input
                                type="number"
                                name="stock"
                                value={adData.stock || ""}
                                onChange={handleChange}
                                placeholder="Stock"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">Description</label>
                        <Input.TextArea
                            name="description"
                            value={adData.description || ""}
                            onChange={handleChange}
                            placeholder="Description"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Image upload section */}
                    <div>
                        <label className="block mb-2">Product Images</label>
                        <UploadImages
                            fileList={fileList}
                            setFileList={setFileList}
                            adData={adData}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="bg-custom-gradient"
                            loading={loading}
                        >
                            Update Product
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default EditStorePage; 