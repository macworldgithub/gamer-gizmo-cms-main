"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Input, Tag } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import CustomLoader from "@/components/CustomLoader";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface TagType {
  id: number;
  value: string;
}

interface FormState {
  title: string;
  tags: TagType[];
  description: string;
  image: File | null;
}

const AddBlogForm = () => {
  // @ts-ignore
  const token = localStorage.getItem("admin-x-token");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    title: "",
    tags: [],
    description: "",
    image: null,
  });

  const [inputTag, setInputTag] = useState<string>("");
  const editorRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim()) {
      e.preventDefault();
      if (!formData.tags.some((tag) => tag.value === inputTag.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, { id: Date.now(), value: inputTag.trim() }],
        }));
      }
      setInputTag("");
    }
  };

  const removeTag = (tagId: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.id !== tagId),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check if token exists
    if (!token) {
      toast.error("Authentication token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.description);
    formDataToSend.append("tags", formData.tags.map((e) => e.value).join(","));
    formDataToSend.append("admin_id", "24");
    if (formData.image) {
      formDataToSend.append("images", formData.image);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/create`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Blog created successfully!");
      console.log("Response:", response.data);

      // Clear the form
      setFormData({
        title: "",
        tags: [],
        description: "",
        image: null,
      });
      setInputTag("");
    } catch (error: any) {
      console.error("Error submitting form:", error);

      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired. Please log in again.");
        } else if (error.response.status === 400) {
          toast.error("Invalid blog data. Please check your input.");
        } else {
          toast.error("Something went wrong! Please try again.");
        }
      } else if (error.request) {
        toast.error("No response from server. Check your network connection.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100  flex  justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Add Blog</h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md shadow-sm p-4"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Tags</label>
          <div className="flex items-center gap-2 flex-wrap">
            {formData.tags.map((tag) => (
              <Tag
                key={tag.id}
                closable
                onClose={() => removeTag(tag.id)}
                className="text-sm bg-indigo-100"
              >
                {tag.value}
              </Tag>
            ))}
          </div>
          <Input
            type="text"
            value={inputTag}
            onChange={handleTagInput}
            onKeyPress={handleTagKeyPress}
            placeholder="Press Enter to add a tag"
            className="mt-2 p-4"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <JoditEditor
            ref={editorRef}
            value={formData.description}
            onBlur={(newContent) =>
              setFormData((prev) => ({ ...prev, description: newContent }))
            }
            config={{
              readonly: false,
              height: 250,
              enableDragAndDropFileToEditor: true,
              defaultActionOnPaste: "insert_clear_html",
              pasteHTMLActionList: [
                { value: "insert_clear_html", text: "Insert as clear HTML" },
                { value: "insert_paragraph", text: "Insert as paragraph" },
              ],
              askBeforePasteHTML: false,
              askBeforePasteFromWord: false,
              //@ts-ignore
              processPasteHTML: (html) => html,
            }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-1"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border-gray-300 rounded-md shadow-sm p-4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-custom-gradient text-white font-bold py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
      {loading && <CustomLoader />}
    </div>
  );
};

export default dynamic(() => Promise.resolve(AddBlogForm), { ssr: false });
