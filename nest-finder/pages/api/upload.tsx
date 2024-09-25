// ImageUpload.tsx
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
    const handleUpload = useCallback((result: { event: string, info: { secure_url: string } }) => {
        if (result.event === "success") {
            onChange(result.info.secure_url);
        }
    }, [onChange]);

    return (
        <div onClick={() => { }}>
            <CldUploadWidget
                uploadPreset="rbredugq" // Make sure this preset exists in your Cloudinary dashboard
                options={{
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Using environment variable
                    sources: ['local', 'camera'],
                    resourceType: 'image',
                }}
                onSuccess={handleUpload}
                style={{
                    width: '100%',
                    height: '30px',
                    border: '2px dashed gray',
                    borderRadius: '5px',
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '8px 12px',
                    cursor: 'pointer'
                }}
            >
                {({ open }) => (
                    <div onClick={() => open()} className="upload-trigger">
                        <TbPhotoPlus size={50} />
                        {value ? (
                            <Image src={value} alt="Uploaded" width={500} height={192} className="w-full h-48 object-cover rounded mb-2" />
                        ) : (
                            <div className="font-semibold">Click to upload an image</div>
                        )}
                    </div>
                )}
            </CldUploadWidget>
        </div>
    );
};

export default ImageUpload;
