'use client';

import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from 'next/image';

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((result: any) => {
        if (result.event === "success") {
            onChange(result.info.secure_url); // Set the uploaded image URL in the parent component state
        }
    }, [onChange]);

    return (
        <div>
            <CldUploadWidget
                uploadPreset="rbredugq" // Ensure this preset exists in your Cloudinary account
                options={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
                    sources: ['local', 'camera'], // Allow local and camera uploads
                    resourceType: 'image', // Upload only images
                }}
                onUpload={handleUpload} // Handle upload result
            >
                {({ open }) => (
                    <div
                        onClick={() => open()} // Trigger upload widget
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer p-4 hover:border-gray-500"
                    >
                        <TbPhotoPlus size={50} className="text-gray-500" />
                        {value ? (
                            <div className="mt-4">
                                <Image src={value} alt="Uploaded Image" width={500} height={192} className="rounded-lg" />
                            </div>
                        ) : (
                            <div className="text-gray-500 mt-4">Click to upload an image</div>
                        )}
                    </div>
                )}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
