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
    // Updated handleUpload function with correct types
const handleUpload = useCallback((result: any) => {
    if (result.event === 'success') {
      const secureUrl = result.info?.secure_url; // Using optional chaining to avoid undefined errors
      if (secureUrl) {
        onChange(secureUrl);
        console.log('Image uploaded successfully:', secureUrl);
      } else {
        console.error('Upload failed, no secure URL found in the result.');
      }
    } else {
      console.error('Upload event was not a success:', result);
    }
  }, [onChange]);
  
      

    return (
        <div>
            <CldUploadWidget
  uploadPreset="rbredugq" // Make sure this preset exists in your Cloudinary dashboard
  options={{
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // Using environment variable
    sources: ['local', 'camera'],
    resourceType: 'image', // Upload only images
  }}
  onUpload={handleUpload} // Using handleUpload for the correct upload callback
>
  {({ open }) => (
    <div onClick={() => open()} className="upload-trigger">
      <TbPhotoPlus size={50} />
      {value ? (
        <Image
          src={value}
          alt="Uploaded"
          width={500}
          height={192}
          className="w-full h-48 object-cover rounded mb-2"
        />
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
