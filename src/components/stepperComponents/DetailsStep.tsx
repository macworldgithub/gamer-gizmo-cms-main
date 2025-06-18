import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import axios from "axios";
import CategorySelection from "../../../public/CategorySelection";

const { TextArea } = Input;
const { Option } = Select;

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

interface Location {
  id: string;
  name: string;
}

interface Condition {
  id: string;
  name: string;
}

interface DetailsStepProps {
  selectedCategory: Category | null;
  setComponentCategories: any;
  formData: any;
  handleFormChange: any;
  setSelectedLocation: any;
  selectedLocation: any;
  setSelectedBrand: (brand: Brand | null) => void;
  onBrandSelect: (brand: Brand | null) => void;
  setSelectedModel: (model: Model | null) => void;
  onSelectModel: (model: Model | null) => void;
  setSelectedCondition: (model: any) => void;
  selectedCondition: any;
}

const DetailsStep: React.FC<DetailsStepProps> = ({
  selectedCategory,
  setComponentCategories,
  formData,
  handleFormChange,
  selectedLocation,
  setSelectedLocation,
  onBrandSelect,
  setSelectedModel,
  onSelectModel,
  setSelectedCondition,
  selectedCondition,
}) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  // Fetch Brands when Category changes
  useEffect(() => {
    const fetchBrands = async () => {
      if (!selectedCategory) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/brands/getAll?category=${selectedCategory.id}`
        );
        setBrands(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, [selectedCategory]);

  // Fetch Models when Brand changes
  useEffect(() => {
    const fetchModels = async () => {
      if (!selectedBrand) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/models/getAll?brand=${selectedBrand.id}`
        );
        setModels(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, [selectedBrand]);

  // Fetch Locations on Mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/location/getAll`
        );
        console.log(response?.data?.data, "my locations");

        setLocations(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Fetch Conditions on Mount
  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/conditions/getAll`
        );
        setConditions(response?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch conditions.");
      }
    };

    fetchConditions();
  }, []);

  const fetchComponentCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/component-category/getAll`
      );

      if (response?.data) {
        setComponentCategories(response?.data?.data);
        console.log(response?.data?.data, "here is my data");
      } else {
        console.error("Unexpected API response structure:", response);
        throw new Error("Unexpected API response");
      }
    } catch (error) {
      console.error("Error occurred while fetching categories:", error);
    } finally {
      console.log("Fetch operation completed.");
    }
  };

  useEffect(() => {
    fetchComponentCategories();
  }, [CategorySelection]);

  const handleBrandSelect = (value: string) => {
    const brand = brands.find((brand) => brand.id === value) || null;
    setSelectedBrand(brand);
    onBrandSelect(brand);
  };

  const handleModelSelect = (value: string) => {
    const model = models.find((model) => model.id === value) || null;
    onSelectModel(model);
  };
  const handleSelectedLocation = (e: any) => {
    console.log("Selected Location:", e); // Debugging
    setSelectedLocation(e); // Update parent state
    handleFormChange("location", e?.id || ""); // Update formData
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
      {/* Title Input */}
      <label className="block text-gray-700 mb-1">Title</label>
      <Input
        placeholder="Enter title"
        className="mb-4"
        value={formData?.title}
        onChange={(e) => handleFormChange("title", e.target.value)}
      />

      {/* Description Input */}
      <label className="block text-gray-700 mb-1">Description</label>
      <TextArea
        placeholder="Enter description"
        rows={4}
        className="mb-4"
        value={formData.description || ""}
        onChange={(e) => handleFormChange("description", e.target.value)}
      />

      {/* Only show brand and model for non-Components categories */}
      {selectedCategory?.name !== "Components" && (
        <>
          <label className="block text-gray-700 mb-1">Brand</label>
          <Select
            placeholder="Select Brand"
            className="w-full mb-4"
            onChange={handleBrandSelect}
          >
            {brands.map((brand) => (
              <Option key={brand.id} value={brand.id}>
                {brand.name}
              </Option>
            ))}
          </Select>
          {/* Model Dropdown */}
          <label className="block text-gray-700 mb-1">Model</label>
          <Select
            placeholder="Select Model"
            className="w-full mb-4"
            disabled={!selectedBrand}
            onChange={handleModelSelect}
          >
            {models.map((model) => (
              <Option key={model.id} value={model.id}>
                {model.name}
              </Option>
            ))}
          </Select>
        </>
      )}

      {/* Location Dropdown */}
      <label className="block text-gray-700 mb-1">Location</label>
      <Select
        value={selectedLocation?.name}
        onChange={(value) => {
          const location = locations?.find((loc) => loc?.id === value);
          handleSelectedLocation(location);
        }}
        placeholder="Select Location"
        className="w-full mb-4"
      >
        {locations.map((location) => (
          <Option key={location.id} value={location.id}>
            {location.name}
          </Option>
        ))}
      </Select>

      {/* Condition Dropdown */}
      <label className="block text-gray-700 mb-1">Condition</label>
      <Select
        placeholder="Select Condition"
        className="w-full mb-4"
        value={selectedCondition?.id}
        onChange={(value) => {
          const condition = conditions.find((cond) => cond.id === value) || null;
          setSelectedCondition(condition);
          handleFormChange("condition", condition?.id || ""); // Also update formData
        }}
      >
        {conditions.map((condition) => (
          <Option key={condition.id} value={condition.id}>
            {condition.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DetailsStep;
