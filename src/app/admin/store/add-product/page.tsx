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
  const [selectedComponentCategory, setSelectedComponentCategory] = useState<string>("");
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
    componentType: "",
    accessoryDetails: "",
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
  // const [selectedCondition, setSelectedCondition] = useState<any>({
  //   id: 2,
  //   name: "",
  // });
  const [selectedCondition, setSelectedCondition] = useState<any>(null);
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
  const getSteps = () => {
    const baseSteps = [
      { title: 'Category Selection' },
      { title: 'Product Details' },
      { title: 'Set Price' },
      { title: 'Upload Images' },
      { title: 'Review & Publish' }
    ];

    // Insert More Specifications after Product Details for Components/Accessories
    if (selectedCategory?.name === 'Components' || selectedCategory?.name === 'Accessories') {
      baseSteps.splice(2, 0, { title: 'More Specifications' });
    }

    return baseSteps;
  };

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

    // Handle brand_id and model_id based on category
    if (selectedCategory?.name === "Components") {
      if (formData.componentType) {
        formDataObject.append("component_type", selectedComponentCategory);
        formDataObject.append("text", "");
      } else if (formData.accessoryDetails) {
        formDataObject.append("component_type", "0"); // Pass 0 for accessories
        formDataObject.append("text", formData.accessoryDetails);
      }
      // Set brand_id and model_id to 0 for Components
      formDataObject.append("brand_id", "0");
      formDataObject.append("model_id", "0");
    } else {
      if (selectedBrand) {
        formDataObject.append("brand_id", selectedBrand.id);
      }
      if (selectedModel) {
        formDataObject.append("model_id", selectedModel.id);
      }
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

    formDataObject.append("otherBrandName", formData.otherBrandName);

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

  const [steps, setSteps] = useState(getSteps());

  // Update steps when category changes
  useEffect(() => {
    setSteps(getSteps());
  }, [selectedCategory]);

  const next = () => {
    if (current === 0 && !selectedCategory) {
      setCategoryError("Please select a category");
      return;
    }

    if (current === steps.length - 1) {
      handleSubmit();
      return;
    }

    setCategoryError(null);
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };


  const getCurrentStepContent = () => {
    // Adjusted step indices to account for dynamic steps
    let adjustedIndex = current;
    const hasSpecStep = selectedCategory?.name === 'Components' || selectedCategory?.name === 'Accessories';

    // Map the current step to the correct component
    if (hasSpecStep) {
      switch (current) {
        case 0: return (
          <CategoryStep
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loadingCategories={loadingCategories}
            categoryError={categoryError}
            next={next}
          />
        );
        case 1: return (
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
        );
        case 2: return (
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
            setSelectedGpu={setSelectedGpu}
            setSelectedRam={setSelectedRam}
            selectRam={selectedRam}
            selectStorage={selectedStorage}
            setSelectedStorage={setSelectedStorage}
            selectStorageType={selectedStorageType}
            setSelectedStorageType={setSelectedStorageType}
            componentCategories={componentCategories}
            setSelectedComponentCategory={setSelectedComponentCategory}
            gpuData={gpuData}
            storageTypeData={storageTypeData}
            ramData={ramData}
            storageData={storageData}
          />
        );
        case 3: return (
          <SetPrice
            price={price}
            quantity={quantity}
            setPrice={setPrice}
            setQuantity={setQuantity}
          />
        );
        case 4: return (
          <UploadImages fileList={fileList} setFileList={setFileList} />
        );
        case 5: return (
          <ReviewSection
            //@ts-ignore
            selectCategory={selectedCategory ?? { id: 0, name: "" }}
            //@ts-ignore
            selectBrand={selectedBrand ?? { id: 0, name: "" }}
            //@ts-ignore
            selectModel={selectedModel ?? { id: 0, name: "" }}
            selectProcessorVariant={selectedProcessorVariant ?? { id: 0, name: "" }}
            selectProcessor={selectedProcessor ?? { id: 0, name: "" }}
            selectLocation={selectedLocation ?? { id: 0, name: "" }}
            selectedCondition={selectedCondition}
            formData={formData}
            price={price}
            quantity={quantity}
            fileList={fileList}
            selectComponentCategory={formData.componentType || ""}
            selectGpu={selectedGpu ?? { id: 0, name: "" }}
            selectRam={selectedRam ?? { id: 0, name: "" }}
            selectStoarge={selectedStorage ?? { id: 0, name: "" }}
            selectStorageType={selectedStorageType ?? { id: 0, name: "" }}
          />
        );
        default: return null;
      }
    } else {
      switch (current) {
        case 0: return (
          <CategoryStep
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loadingCategories={loadingCategories}
            categoryError={categoryError}
            next={next}
          />
        );
        case 1: return (
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
        );
        case 2: return (
          <SetPrice
            price={price}
            quantity={quantity}
            setPrice={setPrice}
            setQuantity={setQuantity}
          />
        );
        case 3: return (
          <UploadImages fileList={fileList} setFileList={setFileList} />
        );
        case 4: return (
          <ReviewSection
            //@ts-ignore
            selectCategory={selectedCategory ?? { id: 0, name: "" }}
            //@ts-ignore
            selectBrand={selectedBrand ?? { id: 0, name: "" }}
            //@ts-ignore
            selectModel={selectedModel ?? { id: 0, name: "" }}
            selectProcessorVariant={selectedProcessorVariant ?? { id: 0, name: "" }}
            selectProcessor={selectedProcessor ?? { id: 0, name: "" }}
            selectLocation={selectedLocation ?? { id: 0, name: "" }}
            selectedCondition={selectedCondition}
            formData={formData}
            price={price}
            quantity={quantity}
            fileList={fileList}
            selectComponentCategory={formData.componentType || ""}
            selectGpu={selectedGpu ?? { id: 0, name: "" }}
            selectRam={selectedRam ?? { id: 0, name: "" }}
            selectStoarge={selectedStorage ?? { id: 0, name: "" }}
            selectStorageType={selectedStorageType ?? { id: 0, name: "" }}
          />
        );
        default: return null;
      }
    }
  };
  return (

    <div className="flex justify-center items-center w-full">
      <div className="w-[90%] mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg">
        <Steps current={current} className="mb-6 custom-steps" responsive={false}>
          {steps.map((step, index) => (
            <Step
              key={index}
              title={<span>{step.title.split(' ')[0]}<br />{step.title.split(' ')[1]}</span>}
            />
          ))}
        </Steps>

        {getCurrentStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {current > 0 && (
            <Button onClick={prev} className="bg-gray-300">
              Previous
            </Button>
          )}

          <Button
            onClick={next}
            className="bg-blue-500 text-white"
            type="primary"
          >
            {current === steps.length - 1 ? "Publish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(StepperForm), { ssr: false });
