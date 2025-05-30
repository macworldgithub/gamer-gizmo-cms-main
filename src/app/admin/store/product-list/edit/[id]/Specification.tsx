"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface SpecificationsFormProps {
  categoryId: number;
  adData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  token: string;
}

const SpecificationsForm: React.FC<SpecificationsFormProps> = ({
  categoryId,
  adData,
  handleChange,
  token,
}) => {
  const [processorVariantData, setProcessorVariantData] = useState<any[]>([]);
  const [processor, setProcessor] = useState<any[]>([]);
  const [componentCategories, setComponentCategories] = useState([]);

  useEffect(() => {
    fetchProcessorVariants();
    fetchProcessor();
    fetchComponentCategories();
  }, []);

  const fetchProcessorVariants = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessorVariant`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProcessorVariantData(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch processor variants.", error);
    }
  };

  const fetchProcessor = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/processor/getProcessor`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProcessor(response?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch processor.", error);
    }
  };

  const fetchComponentCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/component-category/getAll`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComponentCategories(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching component categories:", error);
    }
  };

  if (categoryId === 4 && adData?.gaming_console?.length > 0) {
    const gamingConsole = adData.gaming_console[0];
    return (
      <>
        <div className="flex flex-col">
          <label className="edit-label">Accessories</label>
          <input
            type="text"
            name="accessories"
            value={gamingConsole.accessories || ""}
            onChange={handleChange}
            placeholder="Accessories"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Battery Life</label>
          <input
            type="text"
            name="battery_life"
            value={gamingConsole.battery_life || ""}
            onChange={handleChange}
            placeholder="Battery Life"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Color</label>
          <input
            type="text"
            name="color"
            value={gamingConsole.color || ""}
            onChange={handleChange}
            placeholder="Color"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Connectivity</label>
          <input
            type="text"
            name="connectivity"
            value={gamingConsole.connectivity || ""}
            onChange={handleChange}
            placeholder="Connectivity"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Warranty Status</label>
          <input
            type="text"
            name="warranty_status"
            value={gamingConsole.warranty_status || ""}
            onChange={handleChange}
            placeholder="Warranty Status"
            className="edit-input"
            required
          />
        </div>
      </>
    );
  }

  if (categoryId === 2 && adData?.personal_computers?.length > 0) {
    const pc = adData.personal_computers[0];
    return (
      <>
        <div className="flex flex-col">
          <label className="edit-label">GPU</label>
          <input
            type="text"
            name="gpu"
            value={pc.gpu || ""}
            onChange={handleChange}
            placeholder="GPU"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">GPU Brand</label>
          <input
            type="text"
            name="gpu_brand"
            value={pc.gpu_personal_computers_gpuTogpu?.name || ""}
            onChange={handleChange}
            placeholder="GPU Brand"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Graphics</label>
          <input
            type="text"
            name="graphics"
            value={pc.graphics || ""}
            onChange={handleChange}
            placeholder="Graphics"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Ports</label>
          <input
            type="text"
            name="ports"
            value={pc.ports || ""}
            onChange={handleChange}
            placeholder="Ports"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Processor</label>
          <input
            type="text"
            name="processor"
            value={pc.processors?.name || ""}
            onChange={handleChange}
            placeholder="Processor"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Processor Variant</label>
          <select
            name="processor_variant"
            value={
              pc
                .processor_variant_personal_computers_processor_variantToprocessor_variant
                ?.name || ""
            }
            //@ts-ignore
            onChange={handleChange}
            className="edit-input"
            required
          >
            {processorVariantData.map((variant) => (
              <option key={variant.id} value={variant.name}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="edit-label">RAM</label>
          <input
            type="text"
            name="ram"
            value={pc.ram_personal_computers_ramToram?.name || ""}
            onChange={handleChange}
            placeholder="RAM"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Storage</label>
          <input
            type="text"
            name="storage"
            value={pc.storage_personal_computers_storageTostorage?.name || ""}
            onChange={handleChange}
            placeholder="Storage"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Storage Type</label>
          <input
            type="text"
            name="storage_type"
            value={
              pc.storage_type_personal_computers_storage_typeTostorage_type
                ?.name || ""
            }
            onChange={handleChange}
            placeholder="Storage Type"
            className="edit-input"
            required
          />
        </div>
      </>
    );
  }
  if (categoryId === 1 && adData?.laptops?.length > 0) {
    const laptop = adData.laptops[0];
    return (
      <>
        <div className="flex flex-col">
          <label className="edit-label">Battery Life</label>
          <input
            type="text"
            name="battery_life"
            value={laptop.battery_life || ""}
            onChange={handleChange}
            placeholder="Battery Life"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Color</label>
          <input
            type="text"
            name="color"
            value={laptop.color || ""}
            onChange={handleChange}
            placeholder="Color"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">GPU</label>
          <input
            type="text"
            name="gpu"
            value={laptop.gpu || ""}
            onChange={handleChange}
            placeholder="GPU"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">GPU Brand</label>
          <input
            type="text"
            name="gpu_brand"
            value={laptop.gpu_laptops_gpuTogpu?.name || ""}
            onChange={handleChange}
            placeholder="GPU Brand"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Graphics</label>
          <input
            type="text"
            name="graphics"
            value={laptop.graphics || ""}
            onChange={handleChange}
            placeholder="Graphics"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Ports</label>
          <input
            type="text"
            name="ports"
            value={laptop.ports || ""}
            onChange={handleChange}
            placeholder="Ports"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Processor</label>
          <select
            name="processor"
            value={adData.processor || ""}
            //@ts-ignore
            onChange={handleChange}
            className="edit-input"
            required
          >
            <option value="">Select Processor</option>
            {processor.map((variant) => (
              <option key={variant.id} value={variant.name}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Processor Variant</label>
          <select
            name="processor_variant"
            value={adData.processor_variant || ""}
            //@ts-ignore
            onChange={handleChange}
            className="edit-input"
            required
          >
            <option value="">Select Processor Variant</option>
            {processorVariantData.map((variant) => (
              <option key={variant.id} value={variant.name}>
                {variant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="edit-label">RAM</label>
          <input
            type="text"
            name="ram"
            value={laptop.ram_laptops_ramToram?.name || ""}
            onChange={handleChange}
            placeholder="RAM"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Screen Resolution</label>
          <input
            type="text"
            name="screen_resolution"
            value={laptop.screen_resolution || ""}
            onChange={handleChange}
            placeholder="Screen Resolution"
            className="edit-input"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="edit-label">Screen Size</label>
          <input
            type="text"
            name="screen_size"
            value={laptop.screen_size || ""}
            onChange={handleChange}
            placeholder="Screen Size"
            className="edit-input"
            required
          />
        </div>
      </>
    );
  }

  if (categoryId === 3 && adData?.components?.length > 0) {
    const component = adData.components[0];
    const isAccessory = component.text && !component.component_type;

    return (
      <>
        {!isAccessory ? (
          <div className="flex flex-col">
            <label className="edit-label">Component Type</label>
            <select
              name="component_type"
              value={component.component_type || ""}
              onChange={(e) => {
                const updatedComponents = [{
                  id: component.id,
                  product_id: adData.id,
                  component_type: parseInt(e.target.value),
                  text: "",
                  component_type_components_component_typeTocomponent_type: componentCategories.find(
                    (cat: any) => cat.id === parseInt(e.target.value)
                  )
                }];
                adData.components = updatedComponents;
              }}
              className="edit-input"
              required
            >
              <option value="">Select Component Type</option>
              {componentCategories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex flex-col mt-4">
            <label className="edit-label">Accessory Details</label>
            <textarea
              name="text"
              value={component.text || ""}
              onChange={(e) => {
                const updatedComponents = [{
                  id: component.id,
                  product_id: adData.id,
                  component_type: 0,
                  text: e.target.value
                }];
                adData.components = updatedComponents;
              }}
              placeholder="Enter accessory details"
              className="edit-input"
              rows={4}
              required
            />
          </div>
        )}
      </>
    );
  }

  return null;
};

export default SpecificationsForm;
