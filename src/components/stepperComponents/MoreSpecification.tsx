import { Form, Select, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Define types for fetched data
interface ProcessorVariant {
  id: number;
  name: string;
}

interface Processor {
  id: number;
  name: string;
}

interface Specification {
  id: number;
  name: string;
}

// Define props for the component
interface Category {
  name: string;
}

interface MoreSpecificationProps {
  selectCategory?: Category | null;
  componentCategories: any;
  setSelectedComponentCategory: (id: string) => void;
  gpuData: any[];
  storageTypeData: any[];
  ramData: any[];
  storageData: any[];
  formData: {
    screenSize: string;
    screenResolution: string;
    weight: string;
    graphics: string;
    ports: string;
    batteryLife: string;
    color: string;
    accessories?: string;
    connectivity?: string;
    warrantyStatus?: string;
    componentType?: string;
    componentDetails?: string;
    accessoryDetails?: string;
  };

  handleFormChange: (
    field: keyof MoreSpecificationProps["formData"],
    value: string
  ) => void;

  setSelectedProcessorVariant: (variant: ProcessorVariant | null) => void;
  selectProcessorVariant?: ProcessorVariant | null;

  setSelectedProcessor: (processor: Processor | null) => void;
  selectProcessor?: Processor | null;

  // gpuData: Specification[];
  // storageTypeData: Specification[];
  // ramData: Specification[];
  // storageData: Specification[];

  selectGpu?: Specification;
  setSelectedGpu: (gpu: Specification) => void;

  selectRam?: Specification;
  setSelectedRam: (ram: Specification) => void;

  selectStorage?: Specification;
  setSelectedStorage: (storage: Specification) => void;

  selectStorageType?: Specification;
  setSelectedStorageType: (storageType: Specification) => void;
}

const { Option } = Select;

const MoreSpecification: React.FC<MoreSpecificationProps> = ({
  selectCategory,
  componentCategories,
  setSelectedComponentCategory,
  formData,
  handleFormChange,
  setSelectedProcessorVariant,
  selectProcessorVariant,
  setSelectedProcessor,
  selectProcessor,
  gpuData,
  storageTypeData,
  ramData,
  storageData,
  selectGpu,
  setSelectedGpu,
  setSelectedRam,
  selectRam,
  selectStorage,
  setSelectedStorage,

  selectStorageType,
  setSelectedStorageType,
}) => {
  const [processorVariantData, setProcessorVariantData] = useState<
    ProcessorVariant[]
  >([]);
  const [processorData, setProcessorData] = useState<Processor[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  const fetchProcessorVariants = async () => {
    try {
      const response = await axios.get<{ data: ProcessorVariant[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessorVariant`
      );
      setProcessorVariantData(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch processor variants.");
    }
  };

  const fetchProcessor = async () => {
    if (!selectProcessorVariant) return;
    try {
      const response = await axios.get<{ data: Processor[] }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessor?variant=${selectProcessorVariant.id}`
      );
      setProcessorData(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch processors.");
    }
  };

  useEffect(() => {
    fetchProcessorVariants();
  }, []);

  useEffect(() => {
    fetchProcessor();
  }, [selectProcessorVariant]);

  return (
    <Form layout="vertical">
      {/* For Laptops, Desktops, Gaming PCs */}
      {["Desktops", "Gaming PCs"].includes(selectCategory?.name || "") && (
        <>
          <Form.Item label="Processor Variant">
            <Select
              value={selectProcessorVariant?.id}
              onChange={(value) =>
                setSelectedProcessorVariant(
                  processorVariantData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Processor Variant"
            >
              {processorVariantData.map((item, i) => (
                <Option key={i + 1} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Processor">
            <Select
              value={selectProcessor?.id}
              onChange={(value) =>
                setSelectedProcessor(
                  processorData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Processor"
            >
              {processorData.map((item, i) => (
                <Option key={i + 1} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Graphics">
            <Input
              value={formData.graphics}
              onChange={(e) => handleFormChange("graphics", e.target.value)}
              placeholder="Enter Graphics Details"
            />
          </Form.Item>

          <Form.Item label="Ports">
            <Input
              value={formData.ports}
              onChange={(e) => handleFormChange("ports", e.target.value)}
              placeholder="Enter Ports Details"
            />
          </Form.Item>

          {/* GPU Selection */}
          <Form.Item label="GPU">
            <Select
              value={selectGpu?.id}
              onChange={(value) =>
                setSelectedGpu(gpuData.find((item) => item.id === value)!)
              }
              placeholder="Select GPU"
              allowClear
            >
              {gpuData.map((gpu, i) => (
                <Option key={i + 1} value={gpu.id}>
                  {gpu.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Storage Selection */}
          <Form.Item label="Storage">
            <Select
              value={selectStorage?.id}
              onChange={(value) =>
                setSelectedStorage(
                  storageData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Storage"
              allowClear
            >
              {storageData?.map((storage, i) => (
                <Option key={i + 1} value={storage.id}>
                  {storage?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Storage Type Selection */}
          <Form.Item label="Storage Type">
            <Select
              value={selectStorageType?.id}
              onChange={(value) =>
                setSelectedStorageType(
                  storageTypeData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Storage Type"
              allowClear
            >
              {storageTypeData.map((type, i) => (
                <Option key={i + 1} value={type.id}>
                  {type?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* RAM Selection */}
          <Form.Item label="RAM">
            <Select
              value={selectRam?.id}
              onChange={(value) =>
                setSelectedRam(ramData.find((item) => item.id === value)!)
              }
              placeholder="Select RAM"
              allowClear
            >
              {ramData.map((ram, i) => (
                <Option key={i + 1} value={ram.id}>
                  {ram?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}
      {["Laptops"].includes(selectCategory?.name || "") && (
        <>
          <Form.Item label="Processor Variant">
            <Select
              value={selectProcessorVariant?.id}
              onChange={(value) =>
                setSelectedProcessorVariant(
                  processorVariantData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Processor Variant"
            >
              {processorVariantData.map((item, i) => (
                <Option key={i + 1} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Processor">
            <Select
              value={selectProcessor?.id}
              onChange={(value) =>
                setSelectedProcessor(
                  processorData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Processor"
            >
              {processorData.map((item, i) => (
                <Option key={i + 1} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* <Form.Item label="GPU">
            <Select
              value={selectGpu?.id}
              onChange={(value) =>
                setSelectedGpu(gpuData.find((item) => item.id === value)!)
              }
              placeholder="Select GPU"
            >
              {gpuData.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item> */}

          <Form.Item label="Screen Size">
            <Input
              value={formData.screenSize}
              onChange={(e) => handleFormChange("screenSize", e.target.value)}
              placeholder="Enter Screen Size"
            />
          </Form.Item>

          <Form.Item label="Screen Resolution">
            <Input
              value={formData.screenResolution}
              onChange={(e) =>
                handleFormChange("screenResolution", e.target.value)
              }
              placeholder="Enter Screen Resolution"
            />
          </Form.Item>

          <Form.Item label="Weight">
            <Input
              value={formData.weight}
              onChange={(e) => handleFormChange("weight", e.target.value)}
              placeholder="Enter Weight"
            />
          </Form.Item>

          <Form.Item label="Graphics">
            <Input
              value={formData.graphics}
              onChange={(e) => handleFormChange("graphics", e.target.value)}
              placeholder="Enter Graphics Details"
            />
          </Form.Item>

          <Form.Item label="Ports">
            <Input
              value={formData.ports}
              onChange={(e) => handleFormChange("ports", e.target.value)}
              placeholder="Enter Ports Details"
            />
          </Form.Item>

          <Form.Item label="Battery Life">
            <Input
              value={formData.batteryLife}
              onChange={(e) => handleFormChange("batteryLife", e.target.value)}
              placeholder="Enter Battery Life"
            />
          </Form.Item>

          <Form.Item label="Color">
            <Input
              value={formData.color}
              onChange={(e) => handleFormChange("color", e.target.value)}
              placeholder="Enter Color"
            />
          </Form.Item>
          {/* GPU Selection */}
          <Form.Item label="GPU">
            <Select
              value={selectGpu?.id}
              onChange={(value) =>
                setSelectedGpu(gpuData.find((item) => item.id === value)!)
              }
              placeholder="Select GPU"
              allowClear
            >
              {gpuData.map((gpu, i) => (
                <Option key={i + 1} value={gpu.id}>
                  {gpu.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Storage Selection */}
          <Form.Item label="Storage">
            <Select
              value={selectStorage?.id}
              onChange={(value) =>
                setSelectedStorage(
                  storageData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Storage"
              allowClear
            >
              {storageData?.map((storage, i) => (
                <Option key={i + 1} value={storage.id}>
                  {storage?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Storage Type Selection */}
          <Form.Item label="Storage Type">
            <Select
              value={selectStorageType?.id}
              onChange={(value) =>
                setSelectedStorageType(
                  storageTypeData.find((item) => item.id === value)!
                )
              }
              placeholder="Select Storage Type"
              allowClear
            >
              {storageTypeData.map((type, i) => (
                <Option key={i + 1} value={type.id}>
                  {type?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* RAM Selection */}
          <Form.Item label="RAM">
            <Select
              value={selectRam?.id}
              onChange={(value) =>
                setSelectedRam(ramData.find((item) => item.id === value)!)
              }
              placeholder="Select RAM"
              allowClear
            >
              {ramData.map((ram, i) => (
                <Option key={i + 1} value={ram.id}>
                  {ram?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}

      {/* For Gaming Consoles */}
      {selectCategory?.name === "Gaming Consoles" && (
        <>
          <Form.Item label="Accessories">
            <Input
              value={formData.accessories}
              onChange={(e) => handleFormChange("accessories", e.target.value)}
              placeholder="Enter Accessories"
            />
          </Form.Item>

          <Form.Item label="Connectivity">
            <Input
              value={formData.connectivity}
              onChange={(e) => handleFormChange("connectivity", e.target.value)}
              placeholder="Enter Connectivity"
            />
          </Form.Item>

          <Form.Item label="Warranty Status">
            <Input
              value={formData.warrantyStatus}
              onChange={(e) =>
                handleFormChange("warrantyStatus", e.target.value)
              }
              placeholder="Enter Warranty Status"
            />
          </Form.Item>
          <Form.Item label="Battery Life">
            <Input
              value={formData.batteryLife}
              onChange={(e) => handleFormChange("batteryLife", e.target.value)}
              placeholder="Enter Battery Life"
            />
          </Form.Item>
        </>
      )}

      {/* For Components and Accessories */}
      {selectCategory?.name === "Components" && (
        <>
          <Form.Item label="Select Type" required>
            <Select
              value={selectedSubCategory}
              onChange={(value) => {
                setSelectedSubCategory(value);
                // Reset component type when switching subcategory
                handleFormChange("componentType", "");
              }}
              placeholder="Choose Component or Accessory"
            >
              <Select.Option value="components">Components</Select.Option>
              <Select.Option value="accessories">Accessories</Select.Option>
            </Select>
          </Form.Item>

          {selectedSubCategory === "components" && (
            <Form.Item label="Component Type" required>
              <Select
                value={formData.componentType}
                onChange={(value, option: any) => {
                  handleFormChange("componentType", value); // Store name for UI/display
                  setSelectedComponentCategory(option.key); // Store ID for backend
                }}
                placeholder="Select Component Type"
              >
                {componentCategories &&
                  componentCategories.length > 0 &&
                  componentCategories.map((e: any) => (
                    <Select.Option key={e.id} value={e.name}>
                      {e.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          )}

          {selectedSubCategory === "accessories" && (
            <Form.Item label="Accessory Details" required>
              <Input.TextArea
                //@ts-ignore
                value={formData?.accessoryDetails}
                //@ts-ignore
                onChange={(e) => handleFormChange("accessoryDetails", e.target.value)}
                placeholder="Enter Accessory Details"
                rows={4}
              />
            </Form.Item>
          )}
        </>
      )}
    </Form>
  );
};

export default MoreSpecification;
