import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react'

interface ImageUploadProps {
  setPhoto: (file: File | null) => void;
  currentPhoto: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setPhoto, currentPhoto }) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (currentPhoto) {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setPreviewUrl(result);
        }
      };
      reader.readAsDataURL(currentPhoto);
    } else {
      setPreviewUrl('');
    }
  }, [currentPhoto]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setPhoto(selectedFile);
  };

  return (
    <div className="flex justify-center items-center p-4">
      <label
        htmlFor="file-input"
        className="
          w-40 h-40 rounded-full bg-gray-600
          flex justify-center items-center
          cursor-pointer overflow-hidden relative
          shadow-lg hover:shadow-xl transition-shadow duration-300
        "
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-lg font-semibold"><Camera width={48} height={48} /></span>
        )}
      </label>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;