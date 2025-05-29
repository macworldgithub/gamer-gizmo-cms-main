"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Table } from "antd";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, Button, Typography, Badge, Spin, Alert } from "antd";
import { FormatDate } from "@/components/dateFormate";
import DeleteButton from "@/components/common/ProductDeleteButtton";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  stock: number;
  created_at: string;
  product_images?: { image_url: string }[];
  categories?: { name: string };
  condition_product_conditionTocondition?: { name: string };
  location_product_locationTolocation?: { name: string };
  brands?: { name: string };
  laptops: any;
  personal_computers: any;
  models?: { name: string };
  gaming_console: any;
  is_store_product: any;
  other_brand_name: string;
  users?: {
    username: string;
    first_name: string;
    last_name: string;
    profile?: string;
    email?: string;
    phone?: string;
    created_at?: string;
    gender?: string;
  };
  product_reviews?: {
    comments: string;
    created_at: string;
    ratings: number;
    users?: { username: string; profile?: string };
  }[];
}

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const token = localStorage.getItem("admin-x-token");

  const productId = params?.id;
  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get<{ data: Product }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/getProductById?id=${productId}`
        );
        setProduct(res.data.data);
        console.log(res?.data?.data, "My products");
      } catch (error) {
        setError("Error fetching product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const deleteProduct = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/deleteProductByIdFromAdmin?product_id=${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      //@ts-expect-error h jk nmnjk
      product.is_store_product == true
        ? router.push("/admin/store/product-list")
        : router.push("/admin/product-list");
      toast.success("Item deleted successfully!");
    } catch (error) {
      setError("Error deleting product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin className="flex justify-center" size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;
  if (!product)
    return <Alert message="Product not found." type="warning" showIcon />;
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Graphics",
      dataIndex: "graphics",
      key: "graphics",
    },
    {
      title: "Ports",
      dataIndex: "ports",
      key: "ports",
    },
    {
      title: "Battery Life",
      dataIndex: "battery_life",
      key: "battery_life",
    },
    {
      title: "Screen Size",
      dataIndex: "screen_size",
      key: "screen_size",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Screen Resolution",
      dataIndex: "screen_resolution",
      key: "screen_resolution",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Processor",
      dataIndex: "processors",
      key: "processors",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "Processor Variant",
      dataIndex:
        "processor_variant_laptops_processor_variantToprocessor_variant",
      key: "processor_variant_laptops_processor_variantToprocessor_variant",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "Storage",
      dataIndex: "storage_laptops_storageTostorage",
      key: "storage_laptops_storageTostorage",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "Storage Type",
      dataIndex: "storage_type_laptops_storage_typeTostorage_type",
      key: "storage_type_laptops_storage_typeTostorage_type",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "RAM",
      dataIndex: "ram_laptops_ramToram",
      key: "ram_laptops_ramToram",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "GPU",
      dataIndex: "gpu_laptops_gpuTogpu",
      key: "gpu_laptops_gpuTogpu",
      render: (e: any) => <>{e?.name}</>,
    },
  ];
  const Desktopcolumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Graphics",
      dataIndex: "graphics",
      key: "graphics",
    },
    {
      title: "Ports",
      dataIndex: "ports",
      key: "ports",
    },

    {
      title: "Processor",
      dataIndex: "processors",
      key: "processors",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "Processor Variant",
      dataIndex:
        "processor_variant_personal_computers_processor_variantToprocessor_variant",
      key: "processor_variant_personal_computers_processor_variantToprocessor_variant",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "Storage",
      dataIndex: "storage_personal_computers_storageTostorage",
      key: "storage_personal_computers_storageTostorage",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "Storage Type",
      dataIndex: "storage_type_personal_computers_storage_typeTostorage_type",
      key: "storage_type_personal_computers_storage_typeTostorage_type",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "RAM",
      dataIndex: "ram_personal_computers_ramToram",
      key: "ram_personal_computers_ramToram",
      render: (e: any) => <>{e?.name}</>,
    },
    {
      title: "GPU",
      dataIndex: "gpu_personal_computers_gpuTogpu",
      key: "gpu_personal_computers_gpuTogpu",
      render: (e: any) => <>{e?.name}</>,
    },
  ];
  const Consolecolumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Accessories",
      dataIndex: "accessories",
      key: "accessories",
    },
    {
      title: "Connectivity",
      dataIndex: "connectivity",
      key: "connectivity",
    },
    {
      title: "Warranty Status",
      dataIndex: "warranty_status",
      key: "warranty_status",
    },
    {
      title: "Battery Life",
      dataIndex: "battery_life",
      key: "battery_life",
    },
  ];

  return (
    <div className=" mx-auto p-6">
      <div className="flex justify-end mb-6">
        <DeleteButton onDelete={() => deleteProduct()} />
        {/* <button className="bg-red-700 px-6 py-2 rounded-xl cursor-pointer shadow-lg text-white fonr-bold">
          Delete
        </button> */}
      </div>
      <Card className="shadow-lg h-fit">
        <div className="grid py-4 h-fit grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-[500px] bg-black">
            {product?.product_images?.length ? (
              <Carousel
                className="h-[500px]"
                showThumbs={false}
                infiniteLoop
                autoPlay
              >
                {product.product_images.map((img, index) => (
                  <div
                    key={index}
                    className="h-[500px] flex justify-center items-center"
                  >
                    <Image
                      src={img.image_url.startsWith('http') ? img.image_url : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${img.image_url}`}
                      alt={product.name}
                      width={500}
                      height={300}
                      className="object-cover w-full h-full rounded-lg"
                      onError={(e) => {
                        // @ts-ignore
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Text type="secondary">No Image Available</Text>
            )}
          </div>

          <div className="space-y-4">
            <Text type="secondary">
              Posted At:{" "}
              {new Date(product?.created_at || "").toLocaleDateString()}
            </Text>

            <Title level={2}>{product.name}</Title>

            <br />
            <Text>{product.description || "No description available"}</Text>
            <br />
            <Title level={2} className="text-red-500">
              AED {product.price}
            </Title>
            <Text strong>Stock: {product.stock} units left</Text>
            <br />
            <div className="flex justify-between">
              <div className="space-y-2 basis-1/2  shadow-lg p-4 items-start ">
                <h1 className="text-black text-center w-full font-bold text-xl">
                  General Details
                </h1>

                <Text strong>Category: </Text>
                <Badge
                  color="blue"
                  text={product.categories?.name || "Uncategorized"}
                />
                <br />
                <Text strong>Condition: </Text>
                <Badge
                  color="green"
                  text={
                    product.condition_product_conditionTocondition?.name ||
                    "N/A"
                  }
                />
                <br />
                <Text strong>Location: </Text>
                <Badge
                  color="purple"
                  text={
                    product.location_product_locationTolocation?.name ||
                    "Unknown"
                  }
                />
                <br />
                <Text strong>Brands: </Text>
                <Badge
                  color="purple"
                  text={product.brands?.name || "Unknown"}
                />
                {product.brands?.name == "other" && (
                  <>
                    <br />
                    <Text strong>Other Brand Name: </Text>
                    <Badge
                      color="purple"
                      text={product.other_brand_name || "Unknown"}
                    />
                  </>
                )}
                <br />
                <Text strong>Model: </Text>
                <Badge
                  color="purple"
                  text={product.models?.name || "Unknown"}
                />
                <br />
              </div>
              <div className="flex grow flex-col shadow-lg p-4 items-center gap-1">
                <h1 className="text-black font-bold text-xl">Seller Details</h1>
                {product.is_store_product == true ? (
                  <>
                    <Text>Gamergizmo</Text>
                  </>
                ) : (
                  <>
                    {product.users?.profile && (
                      <Image
                        src={product?.users?.profile}
                        alt={product.users.username}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                    )}
                    {product.users?.username && (
                      <Text>
                        Username: {product.users?.username || "Unknown"}
                      </Text>
                    )}
                    {product.users?.first_name && (
                      <Text>
                        Name:{" "}
                        {product.users?.first_name +
                          " " +
                          product.users?.last_name || "Unknown"}
                      </Text>
                    )}
                    <Text>Email: {product.users?.email || "Unknown"}</Text>
                    {product.users?.gender && (
                      <Text>Gender: {product.users?.gender || "Unknown"}</Text>
                    )}
                    {product.users?.phone && (
                      <Text>Phone: {product.users?.phone || "Unknown"}</Text>
                    )}
                    {product?.users?.created_at && (
                      <Text>
                        Joined On:{" "}
                        {FormatDate(product.users.created_at) || "Unknown"}
                      </Text>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* <Button type="primary" danger block>
              Delete Product
            </Button> */}
          </div>
          <div className="w-[200%]">
            <Table
              columns={
                product.category_id == 4
                  ? Consolecolumns
                  : product.category_id == 2
                    ? Desktopcolumns
                    : columns
              }
              dataSource={
                product.category_id == 4
                  ? product.gaming_console
                  : product.category_id == 2
                    ? product.personal_computers
                    : product.laptops
              }
              pagination={false}
              className="overflow-x-auto"
              scroll={{ x: "auto" }}
            />
          </div>
        </div>
        <Title level={4} className="mt-6">
          Customer Reviews
        </Title>

        <div className=" max-h-[400px] overflow-y-scroll">
          {product.product_reviews && product.product_reviews.length > 0 ? (
            <div>
              {product.product_reviews.map((review, index) => (
                <div key={index} className="border-b pb-2 mb-2">
                  <Text>{review.comments}</Text>
                  <br />
                  <Text className="text-yellow-500">
                    Rating: {review.ratings} ⭐
                  </Text>
                  {review.users?.profile && (
                    <Image
                      src={`https://backend.gamergizmo.com/${review.users.profile}`}
                      alt={review.users.username}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                  )}
                  <Text type="secondary">
                    By {review.users?.username || "Anonymous"} at{" "}
                    {FormatDate(review.created_at)}
                  </Text>
                </div>
              ))}
            </div>
          ) : (
            <p className="mb-4 text-red-700">None</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
