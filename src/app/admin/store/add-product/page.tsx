"use client";
import MoreSpecification from "@/components/stepperComponents/MoreSpecification";
import { useState, useEffect } from "react";
import axios from "axios";
import { Steps, Button } from "antd";
import CategoryStep from "@/components/stepperComponents/CategoryStep";
import DetailsStep from "@/components/stepperComponents/DetailsStep";
import SetPrice from "@/components/stepperComponents/SetPrice";
import { UploadFile } from "antd/lib";
import UploadImages from "@/components/stepperComponents/UploadImages";
import ReviewSection from "@/components/stepperComponents/ReviewSection";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const { Step } = Steps;

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}
interface Model {
  id: string;
  name: string;
}
interface ReviewSectionProps {
  selectCategory: { id: number; name: string };
  selectBrand: { id: number; name: string }; // Add this prop
  selectModel: { id: number; name: string };
  selectProcessorVariant: { id: number; name: string };
  selectProcessor: { id: number; name: string };
  selectLocation: { id: number; name: string };
  formData: Record<string, any>;
  price: string;
  quantity: string;
  fileList: UploadFile[];
  selectComponentCategory: string;
  selectGpu: { id: number; name: string };
  selectRam: { id: number; name: string };
  selectStoarge: { id: number; name: string };
  selectStorageType: { id: number; name: string };
  selectedCondition: { name: string };
}
const StepperForm: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [componentCategories, setComponentCategories] = useState([]);
  const [gpuData, setGpuData] = useState([]);
  const [storageTypeData, setStorageTypeData] = useState([]);
  const [ramData, setRamData] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ id: 2, name: "" });
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Brand | null>(null);
  const router = useRouter();

  // Fetch functions
  const fetchStorage = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/getStorage`
      );
      setStorageData(response?.data?.data || []);
      console.log(response?.data?.data, "My storage");
    } catch (err) {
      console.error("Failed to fetch storage.");
    }
  };

  const fetchStorageType = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/getStorageType`
      );
      setStorageTypeData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch storage type.");
    }
  };

  const fetchGPU = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/gpu/getAll`
      );
      setGpuData(response?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch GPU.");
    }
  };

  const fetchRam = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/ram/getAll`
      );
      setRamData(response?.data?.data || []);
      console.log(response?.data?.data, "here is my ram");
    } catch (err) {
      console.error("Failed to fetch RAM.");
    }
  };

  const [formData, setFormData] = useState<Record<string, any>>({
    processor: "",
    processor_type: "",
    ram: "",
    os: "",
    brand: "",
    model: "",
    storage: "",
    screenSize: "",
    screenResolution: "",
    weight: "",
    title: "",
    condition: "",
    description: "",
    graphics: "",
    ports: "",
    batteryLife: "",
    color: "",
    component_text: "",
    accessories: "",
    connectivity: "",
    warranty_status: "",
    location: "",
    otherBrandName: "",
  });
  const [selectedProcessorVariant, setSelectedProcessorVariant] = useState({
    id: 2,
    name: "",
  });
  const [selectedProcessor, setSelectedProcessor] = useState({
    id: 2,
    name: "",
  });
  const [selectedGpu, setSelectedGpu] = useState({ id: 2, name: "" });
  const [selectedRam, setSelectedRam] = useState<any>({ id: 2, name: "" });
  const [selectedStorage, setSelectedStorage] = useState({ id: 2, name: "" });
  const [selectedStorageType, setSelectedStorageType] = useState({
    id: 2,
    name: "",
  });
  const [selectedCondition, setSelectedCondition] = useState<any>({
    id: 2,
    name: "",
  });

  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const handleFormChange = (field: string, value: string) => {
    console.log("Updating formData:", field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleBrandSelect = (brand: Brand | null) => {
    setSelectedBrand(brand); // Update parent state
    handleFormChange("brand", brand?.id || ""); // Update formData
  };
  const handleModelSelect = (model: Model | null) => {
    console.log("Updating selectedModel:", model); // Debugging
    setSelectedModel(model); // Update parent state
    handleFormChange("model", model?.id || ""); // Update formData
  };
  useEffect(() => {
    fetchStorage();
    fetchStorageType();
    fetchGPU();
    fetchRam();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/getAll`
        );
        if (response?.data?.data) {
          setCategories(response?.data?.data);
        } else {
          setCategoryError("No categories found");
        }
      } catch (err) {
        setCategoryError("Failed to fetch categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    let formDataObject = new FormData();
    const adminData = localStorage.getItem("admin");
    //@ts-ignore
    const admin = JSON.parse(adminData);
    const userId = admin.id;

    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    formDataObject.append("user_id", userId);
    formDataObject.append("name", formData?.title);
    formDataObject.append("description", formData?.description);
    formDataObject.append("price", price.toString());
    formDataObject.append("stock", quantity.toString());
    formDataObject.append("is_store_product", "true");
    formDataObject.append("category_id", selectedCategory?.id.toString() || "");
    formDataObject.append("condition", selectedCondition.id.toString());
    formDataObject.append("location", selectedLocation.id.toString());
    formDataObject.append("is_published", "true");
    if (selectedBrand) {
      formDataObject.append("brand_id", selectedBrand.id);
    }
    formDataObject.append("otherBrandName", formData.otherBrandName);

    if (selectedModel) {
      formDataObject.append("model_id", selectedModel.id);
    }
    if (selectedCategory?.name === "Components") {
      formDataObject.append("component_type", formData?.component_text);

      formDataObject.append("text", formData.component_text);
    } else {
      formDataObject.append("ram", selectedRam.id.toString());
      formDataObject.append("processor", selectedProcessor?.id.toString());
      formDataObject.append(
        "processorVariant",
        selectedProcessorVariant.id.toString()
      );
      formDataObject.append("storage", selectedStorage.id.toString());
      formDataObject.append("storageType", selectedStorageType.id.toString());
      formDataObject.append("gpu", selectedGpu.id.toString());
      formDataObject.append("graphics", selectedGpu.id.toString());
      formDataObject.append("ports", formData.ports);
      formDataObject.append("battery_life", formData.batteryLife);
      formDataObject.append("warranty_status", formData.warrantyStatus);
      formDataObject.append("connectivity", formData.connectivity);
      formDataObject.append("accessories", formData.accessories);
      formDataObject.append("screen_size", formData.screenSize);
      formDataObject.append("weight", formData.weight);
      formDataObject.append("screen_resolution", formData.screenResolution);
      formDataObject.append("color", formData.color);
    }

    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formDataObject.append("images", file.originFileObj as Blob);
      });
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/createProduct`,
        formDataObject
      );
      if (response.status === 201) {
        toast.success("Product Added Successfully");
        router.push("/admin/store/product-list");
      }
    } catch (err) {
      toast.error("Error submitting form");
      console.error("Submission Error:", err);
    }
  };

  const next = () => {
    if (current === 0 && !selectedCategory) {
      setCategoryError("Please select a category");
      return;
    }

    if (current === 5) {
      handleSubmit();
      return;
    }

    setCategoryError(null);
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);
  console.log(selectedRam, "selectedRam");
  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[90%] mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg">
        <Steps current={current} className="mb-6">
          <Step title="Select Category" />
          <Step title="Product Details" />
          <Step title="More Specification" />
          <Step title="Set Price" />
          <Step title="Upload Images" />
          <Step title="Review Section" />
        </Steps>

        {current === 0 && (
          <CategoryStep
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loadingCategories={loadingCategories}
            categoryError={categoryError}
            next={next}
          />
        )}

        {current === 1 && (
          //@ts-ignore
          <DetailsStep
            setComponentCategories={setComponentCategories}
            selectedCategory={selectedCategory}
            handleFormChange={handleFormChange}
            formData={formData}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            onBrandSelect={handleBrandSelect}
            onSelectModel={handleModelSelect}
            setSelectedCondition={setSelectedCondition}
            selectedCondition={selectedCondition}
          />
        )}
        {current === 2 && (
          <MoreSpecification
            selectCategory={selectedCategory ?? undefined}
            //@ts-ignore
            formData={formData}
            handleFormChange={handleFormChange}
            //@ts-ignore
            setSelectedProcessorVariant={setSelectedProcessorVariant}
            selectProcessorVariant={selectedProcessorVariant}
            //@ts-ignore
            setSelectedProcessor={setSelectedProcessor}
            selectProcessor={selectedProcessor}
            selectGpu={selectedGpu}
            //@ts-ignore
            setSelectedGpu={setSelectedGpu}
            //@ts-ignore
            setSelectedRam={setSelectedRam}
            selectRam={selectedRam}
            selectStorage={selectedStorage}
            //@ts-ignore
            setSelectedStorage={setSelectedStorage}
            selectStorageType={selectedStorageType}
            //@ts-ignore
            setSelectedStorageType={setSelectedStorageType}
            componentCategories={componentCategories}
            setComponentCategories={setComponentCategories}
            //@ts-ignore
            gpuData={gpuData}
            //@ts-ignore
            storageTypeData={storageTypeData}
            //@ts-ignore
            ramData={ramData}
            //@ts-ignore
            storageData={storageData}
          />
        )}
        {current === 3 && (
          <SetPrice
            price={price}
            quantity={quantity}
            setPrice={setPrice}
            setQuantity={setQuantity}
          />
        )}
        {current === 4 && (
          <UploadImages fileList={fileList} setFileList={setFileList} />
        )}
        {current === 5 && (
          <ReviewSection
            //@ts-ignore
            selectCategory={selectedCategory ?? { id: 0, name: "" }}
            //@ts-ignore
            selectBrand={selectedBrand ?? { id: 0, name: "" }}
            //@ts-ignore
            selectModel={selectedModel ?? { id: 0, name: "" }}
            selectProcessorVariant={
              selectedProcessorVariant ?? { id: 0, name: "" }
            }
            selectProcessor={selectedProcessor ?? { id: 0, name: "" }}
            selectLocation={selectedLocation ?? { id: 0, name: "" }}
            selectedCondition={selectedCondition}
            formData={formData}
            price={price}
            quantity={quantity}
            fileList={fileList}
            selectComponentCategory={""}
            selectGpu={selectedGpu ?? { id: 0, name: "" }}
            selectRam={selectedRam ?? { id: 0, name: "" }}
            selectStoarge={selectedStorage ?? { id: 0, name: "" }}
            selectStorageType={selectedStorageType ?? { id: 0, name: "" }}
          />
        )}
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {current > 0 && (
            <Button onClick={prev} className="bg-gray-300">
              Previous
            </Button>
          )}

          <Button onClick={next} className="bg-blue-500 text-white">
            {current === 5 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(StepperForm), { ssr: false });
