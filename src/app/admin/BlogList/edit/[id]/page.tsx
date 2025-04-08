// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import axios from "axios";
// import { Input, Button, message } from "antd";

// const EditBlog = () => {
//   const router = useRouter();
//   const { id } = useParams(); // Get the dynamic blog ID from the URL
//   const [blog, setBlog] = useState({
//     title: "",
//     description: "",
//     tags: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch the existing blog details
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getOne?id=${id}`
//         );
//         setBlog({
//           title: response.data.title,
//           description: response.data.content,
//           tags: response.data.tags,
//         });
//       } catch (error) {
//         message.error("Failed to fetch blog details.");
//         console.error("Error fetching blog:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchBlog();
//   }, [id]);

//   // Handle input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setBlog((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission (Updating the blog)
//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       await axios.put(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/update?id=${id}`,
//         blog
//       );
//       message.success("Blog updated successfully!");
//       router.push("/BlogList"); // Redirect back to the list
//     } catch (error) {
//       console.error("Error updating blog:", error);
//       message.error("Failed to update blog.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
//       <Input
//         name="title"
//         placeholder="Title"
//         value={blog.title}
//         onChange={handleChange}
//         className="mb-4"
//       />
//       <Input.TextArea
//         name="description"
//         placeholder="Description"
//         value={blog.description}
//         onChange={handleChange}
//         className="mb-4"
//         rows={4}
//       />
//       <Input
//         name="tags"
//         placeholder="Tags (comma separated)"
//         value={blog.tags}
//         onChange={handleChange}
//         className="mb-4"
//       />
//       <Button type="primary" onClick={handleUpdate} loading={loading}>
//         Update Blog
//       </Button>
//     </div>
//   );
// };

// export default EditBlog;
// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import dynamic from "next/dynamic";
// import { Input, Tag } from "antd";
// import axios from "axios";
// import toast from "react-hot-toast";
// import CustomLoader from "@/components/CustomLoader";

// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// interface TagType {
//   id: number;
//   value: string;
// }

// interface FormState {
//   title: string;
//   tags: TagType[];
//   description: string;
//   image: File | null;
// }

// const EditBlogForm = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const blogId = searchParams.get("id"); // Get blog ID from URL
//   const token = localStorage.getItem("admin-x-token");

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<FormState>({
//     title: "",
//     tags: [],
//     description: "",
//     image: null,
//   });

//   const [inputTag, setInputTag] = useState<string>("");
//   const editorRef = useRef(null);

//   // Fetch the existing blog data
//   useEffect(() => {
//     if (!blogId) return;

//     const fetchBlogData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getSingleBlogsDetails${blogId}`
//           // {
//           //   headers: { Authorization: `Bearer ${token}` },
//           // }
//         );

//         const blogData = response?.data;
//         setFormData({
//           title: blogData.title,
//           tags: blogData.tags.map((tag: string, index: number) => ({
//             id: index,
//             value: tag,
//           })),
//           description: blogData.content,
//           image: null, // Existing image is not handled here
//         });
//       } catch (error) {
//         toast.error("Failed to load blog data");
//         console.error("Error fetching blog data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogData();
//   }, [blogId, token]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
//   };

//   const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputTag(e.target.value);
//   };

//   const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && inputTag.trim()) {
//       e.preventDefault();
//       if (!formData.tags.some((tag) => tag.value === inputTag.trim())) {
//         setFormData((prev) => ({
//           ...prev,
//           tags: [...prev.tags, { id: Date.now(), value: inputTag.trim() }],
//         }));
//       }
//       setInputTag("");
//     }
//   };

//   const removeTag = (tagId: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((tag) => tag.id !== tagId),
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData({ ...formData, image: e.target.files[0] });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("content", formData.description);
//     formDataToSend.append("tags", formData.tags.map((e) => e.value).join(","));
//     formDataToSend.append("admin_id", "24");

//     if (formData.image) {
//       formDataToSend.append("image", formData.image);
//     }

//     try {
//       await axios.put(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/update/${blogId}`,
//         formDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Blog updated successfully");
//       router.push("/blogs"); // Redirect to blog list after update
//     } catch (error) {
//       toast.error("Failed to update blog");
//       console.error("Error updating blog:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 flex justify-center p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-full"
//       >
//         <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

//         <div className="mb-4">
//           <label
//             htmlFor="title"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData?.title}
//             onChange={handleInputChange}
//             className="w-full border-gray-300 rounded-md shadow-sm p-4"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">Tags</label>
//           <div className="flex items-center gap-2 flex-wrap">
//             {formData.tags.map((tag) => (
//               <Tag
//                 key={tag.id}
//                 closable
//                 onClose={() => removeTag(tag.id)}
//                 className="text-sm bg-indigo-100"
//               >
//                 {tag.value}
//               </Tag>
//             ))}
//           </div>
//           <Input
//             type="text"
//             value={inputTag}
//             onChange={handleTagInput}
//             onKeyPress={handleTagKeyPress}
//             placeholder="Press Enter to add a tag"
//             className="mt-2 p-4"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="description"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Description
//           </label>
//           <JoditEditor
//             ref={editorRef}
//             value={formData.description}
//             onBlur={(newContent) =>
//               setFormData((prev) => ({ ...prev, description: newContent }))
//             }
//             config={{ readonly: false, height: 250 }}
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="image"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             onChange={handleImageChange}
//             className="w-full border-gray-300 rounded-md shadow-sm p-4"
//           />
//           {formData.image && (
//             <p className="text-sm text-gray-500">
//               Selected file: {formData.image.name}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-custom-gradient text-white font-bold py-2 px-4 rounded-md"
//         >
//           Update Blog
//         </button>
//       </form>

//       {loading && <CustomLoader />}
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(EditBlogForm), { ssr: false });
"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import JoditEditor from "jodit-react";
import { Input, Tag } from "antd";
import axios from "axios";
import CustomLoader from "@/components/CustomLoader";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

// Define types for the blog data
interface BlogData {
  title: string;
  tags: { id: string; value: string }[];
  description: string;
  image: File | string | null;
}

interface EditBlogPageProps {
  blogId: string;
}

const EditBlogPage: React.FC<EditBlogPageProps> = () => {
  const { id } = useParams();
  console.log(id, "blogId from params");
  const [formData, setFormData] = useState<BlogData>({
    title: "",
    tags: [],
    description: "",
    image: null,
  });
  const [inputTag, setInputTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //@ts-expect-error
  const editorRef = useRef<JoditEditor>(null);

  const token = localStorage.getItem("admin-x-token");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/getSingleBlogsDetails`,
          {
            params: { id: id },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const blogData = response?.data?.data;

        if (!blogData) {
          toast.error("Blog data is missing. Please try again.");
          return;
        }

        // Map API data to form state
        setFormData({
          title: blogData?.title || "",
          tags: blogData?.tags
            ? blogData.tags
                .split(",")
                .map((tag: string) => ({ id: tag, value: tag }))
            : [],
          description: blogData.content || "",
          image: blogData.images || "",
        });
      } catch (error) {
        console.error("Error fetching blog details:", error);
        toast.error("Failed to fetch blog details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [token, id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputTag(e.target.value);
  };

  const handleTagKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputTag.trim()) {
      const newTag = { id: inputTag, value: inputTag };
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      setInputTag("");
      e.preventDefault();
    }
  };

  const removeTag = (tagId: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.id !== tagId),
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleUpdate = async () => {
    if (!id) {
      toast.error("Blog ID is missing.");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      //@ts-ignore
      formDataToSend.append("id", id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.description);
      formDataToSend.append(
        "tags",
        formData.tags.map((tag) => tag.value).join(",")
      ); // Convert tags array to comma-separated string

      if (formData.image && typeof formData.image !== "string") {
        formDataToSend.append("images", formData.image);
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/update`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center p-4">
      <form className="bg-white p-6 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

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
            onBlur={(newContent: string) =>
              setFormData((prev) => ({ ...prev, description: newContent }))
            }
            config={{
              readonly: false,
              height: 250,
              enableDragAndDropFileToEditor: true,
              defaultActionOnPaste: "insert_clear_html",
              askBeforePasteHTML: false,
              askBeforePasteFromWord: false,
            }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-medium mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full border-gray-300 rounded-md shadow-sm p-4"
          />
          {formData.image && typeof formData.image === "string" && (
            <p className="text-sm text-gray-500">
              Current image: {formData.image}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => handleUpdate()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md bg-custom-gradient"
        >
          Update Blog
        </button>
      </form>

      {loading && <CustomLoader />}
    </div>
  );
};

export default EditBlogPage;
