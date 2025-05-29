import { useEffect, useState } from "react";
import { Upload, Image, GetProp, UploadProps, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const UploadImages = ({ setFileList, fileList, adData }: any) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const maxImages = 5; // Maximum number of images allowed

    useEffect(() => {
        setFileList(fileList);
    }, [fileList, setFileList]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file?.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(0, maxImages)); // Ensure fileList never exceeds maxImages
    };

    const uploadButton = (
        <button
            style={{ border: 0, background: "none" }}
            type="button"
            disabled={fileList.length >= maxImages} // Disable button when limit reached
        >
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <div>
            <Upload
                listType="picture-card"
                fileList={fileList}
                accept=".png,.jpeg,.jpg"
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false} // Prevent auto upload
                maxCount={maxImages} // Limit to 5 images
            >
                {fileList.length >= maxImages ? null : uploadButton}
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
        </div>
    );
};

export default UploadImages; 