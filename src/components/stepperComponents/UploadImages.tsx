// import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload } from "antd";
// import type { GetProp, UploadFile, UploadProps } from "antd";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const UploadImages = ({ setFileList, fileList }: any) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }

//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//   };

//   const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
//     setFileList(newFileList);

//   const uploadButton = (
//     <button style={{ border: 0, background: "none" }} type="button">
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );
//   return (
//     <div className="">
//       <Upload
//         listType="picture-card"
//         fileList={fileList}
//         accept=".png , .jpeg , .jpg"
//         className="flex "
//         onPreview={handlePreview}
//         onChange={handleChange}
//       >
//         {fileList.length >= 10 ? null : uploadButton}
//       </Upload>

//       {previewImage && (
//         <Image
//           wrapperStyle={{ display: "none" }}
//           preview={{
//             visible: previewOpen,
//             onVisibleChange: (visible) => setPreviewOpen(visible),
//             afterOpenChange: (visible) => !visible && setPreviewImage(""),
//           }}
//           src={previewImage}
//         />
//       )}
//     </div>
//   );
// };

// export default UploadImages;
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({ setFileList, fileList }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      try {
        file.preview = await getBase64(file.originFileObj as FileType);
      } catch (error) {
        console.error("Preview error:", error);
        message.error("Failed to generate preview");
        return;
      }
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const beforeUpload = (file: FileType) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }

    const isLtSize = file.size <= MAX_FILE_SIZE;
    if (!isLtSize) {
      message.error(`Image must be smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB!`);
      return Upload.LIST_IGNORE;
    }

    return false; // Return false to handle upload manually
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    // Filter out any files that might have errors
    const validFiles = newFileList.filter(file => !file.error);
    setFileList(validFiles);
  };

  const uploadButton = (
    <button
      style={{
        border: '1px dashed #d9d9d9',
        borderRadius: '8px',
        background: 'none',
        width: '100%',
        height: '100%'
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="upload-container">
      <Upload
        listType="picture-card"
        fileList={fileList}
        accept="image/png, image/jpeg, image/jpg"
        className="custom-upload"
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        multiple
      >
        {fileList.length >= 10 ? null : uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}

      <style jsx global>{`
        .custom-upload .ant-upload-list-item-container,
        .custom-upload .ant-upload-select {
          margin: 0 8px 8px 0;
          border-radius: 8px;
          border: 1px dashed #d9d9d9 !important;
        }
        .custom-upload .ant-upload-list-item-error {
          border-color: #d9d9d9 !important;
        }
        .custom-upload .ant-upload-list-item-actions a {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default UploadImages;