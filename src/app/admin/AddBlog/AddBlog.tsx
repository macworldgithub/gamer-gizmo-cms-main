// "use client";
// import { useState, useRef } from "react";
// import dynamic from "next/dynamic";
// import { Input, Tag } from "antd";
// import axios from "axios";
// import toast from "react-hot-toast";
// import CustomLoader from "@/components/CustomLoader";
// import { useRouter } from "next/navigation";

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

// const AddBlogForm = () => {
//   // @ts-ignore
//   const token = localStorage.getItem("admin-x-token");
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState<FormState>({
//     title: "",
//     tags: [],
//     description: "",
//     image: null,
//   });
//   const router = useRouter();
//   const [inputTag, setInputTag] = useState<string>("");
//   const editorRef = useRef(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
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

//     // Check if token exists
//     if (!token) {
//       toast.error("Authentication token is missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const formDataToSend = new FormData();
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("content", formData.description);
//     formDataToSend.append("tags", formData.tags.map((e) => e.value).join(","));
//     formDataToSend.append("admin_id", "24");
//     if (formData.image) {
//       formDataToSend.append("images", formData.image);
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs/create`,
//         formDataToSend,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success("Blog created successfully!");
//       setTimeout(() => {
//         router.push("BlogList");
//       });

//       console.log("Response:", response.data);

//       // Clear the form
//       setFormData({
//         title: "",
//         tags: [],
//         description: "",
//         image: null,
//       });
//       setInputTag("");
//     } catch (error: any) {
//       console.error("Error submitting form:", error);

//       if (error.response) {
//         if (error.response.status === 401) {
//           toast.error("Session expired. Please log in again.");
//         } else if (error.response.status === 400) {
//           toast.error("Invalid blog data. Please check your input.");
//         } else {
//           toast.error("Something went wrong! Please try again.");
//         }
//       } else if (error.request) {
//         toast.error("No response from server. Check your network connection.");
//       } else {
//         toast.error("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100  flex  justify-center p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-full"
//       >
//         <h2 className="text-2xl font-bold mb-4">Add Blog</h2>

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
//             value={formData.title}
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
//             //@ts-ignore
//             ref={editorRef}
//             value={formData.description}
//             //@ts-ignore
//             onBlur={(newContent) =>
//               setFormData((prev) => ({ ...prev, description: newContent }))
//             }
//             config={{
//               readonly: false,
//               height: 250,
//               enableDragAndDropFileToEditor: true,
//               defaultActionOnPaste: "insert_clear_html",
//               askBeforePasteHTML: false,
//               askBeforePasteFromWord: false,
//               toolbar: true,
//               buttons: [
//                 "paragraph",
//                 "|",
//                 "bold",
//                 "italic",
//                 "underline",
//                 "|",
//                 "ul",
//                 "ol",
//                 "|",
//                 "font",
//                 "fontsize",
//                 "brush",
//                 "|",
//                 "table",
//                 "link",
//                 "|",
//                 "align",
//                 "undo",
//                 "redo",
//                 "|",
//                 "hr",
//                 "eraser",
//                 "|",
//                 "fullsize",
//                 "print",
//               ],
//               //@ts-ignore
//               style: `
//     h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
//     h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; }
//     h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; }
//     h4 { font-size: 1em; font-weight: bold; margin: 1.12em 0; }
//   `,
//             }}
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="image"
//             className="block text-gray-700 font-medium mb-1"
//           >
//             Image
//           </label>
//           <input
//             type="file"
//             id="image"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full border-gray-300 rounded-md shadow-sm p-4"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-custom-gradient text-white font-bold py-2 px-4 rounded-md"
//         >
//           Submit
//         </button>
//       </form>
//       {loading && <CustomLoader />}
//     </div>
//   );
// };

// export default dynamic(() => Promise.resolve(AddBlogForm), { ssr: false });
"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { Input, Tag } from "antd";
import CustomLoader from "@/components/CustomLoader";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [inputTag, setInputTag] = useState<string>("");
  const editorRef = useRef<any>(null);

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

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, description: content }));
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
      setTimeout(() => {
        router.push("BlogList");
      });

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
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={formData.description}
            onEditorChange={handleEditorChange}
            init={{
              height: 250,
              menubar: false,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "charmap",
                "fullscreen",
                "help",
                "image",
                "insertdatetime",
                "link",
                "lists",
                "media",
                "preview",
                "searchreplace",
                "table",
                "visualblocks",
                "emoticons",
                "wordcount",
              ],
              toolbar: `
      undo redo | styles | fontfamily fontsize fontsizeselect | 
      forecolor backcolor | bold italic underline strikethrough | 
      alignleft aligncenter alignright alignjustify | 
      bullist numlist outdent indent | link image media | 
      code preview fullscreen | emoticons | customButton
    `,
              content_style: `
      h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
      h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; }
      h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; }
      h4 { font-size: 1em; font-weight: bold; margin: 1.12em 0; }
      body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
    `,
              style_formats: [
                { title: "Heading 1", format: "h1" },
                { title: "Heading 2", format: "h2" },
                { title: "Heading 3", format: "h3" },
                { title: "Heading 4", format: "h4" },
                { title: "Paragraph", format: "p" },
                { title: "Blockquote", format: "blockquote" },
                { title: "Code", format: "code" },
              ],
              font_size_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
              font_family_formats: `
      Andale Mono=andale mono,times; 
      Arial=arial,helvetica,sans-serif; 
      Arial Black=arial black,avant garde; 
      Book Antiqua=book antiqua,palatino;
      Comic Sans MS=comic sans ms,sans-serif; 
      Courier New=courier new,courier;
      Georgia=georgia,palatino;
      Helvetica=helvetica;
      Impact=impact,chicago;
      Symbol=symbol;
      Tahoma=tahoma,arial,helvetica,sans-serif;
      Terminal=terminal,monaco;
      Times New Roman=times new roman,times;
      Trebuchet MS=trebuchet ms,geneva;
      Verdana=verdana,geneva;
      Webdings=webdings;
      Wingdings=wingdings,zapf dingbats
    `,
              block_formats:
                "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Code=code;Blockquote=blockquote",
              link_title: false,
              image_advtab: true,
              image_description: false,
              media_dimensions: false,
              paste_data_images: true,
              file_picker_types: "image media",
              automatic_uploads: true,

              // Custom button setup
              setup: (editor: any) => {
                // Add custom button
                editor.ui.registry.addButton("customButton", {
                  text: "Custom",
                  icon: "plus",
                  onAction: () => {
                    // Your custom button action
                    editor.insertContent(" Custom content inserted! ");
                  },
                });

                // You can add more custom buttons here
                editor.ui.registry.addButton("highlightButton", {
                  text: "Highlight",
                  icon: "highlight-bg-color",
                  onAction: () => {
                    editor.execCommand("HiliteColor", false, "#FFFF00");
                  },
                });
              },
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
