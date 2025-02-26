import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ onImageUpload , profilePicturePreview}) => {
  const [preview, setPreview] = useState(profilePicturePreview || null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
    setError("");

    if (onImageUpload) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-start">
      <div
        {...getRootProps()}
        className={`w-32 h-32 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden ${
          isDragActive ? "border-sky-600 bg-sky-100" : "border-gray-200"
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
        ) : (
          <p className="text-gray-500 text-center text-sm">Drag & drop or click to upload</p>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2 ml-2">{error}</p>}
    </div>
  );
};

export default ImageUploader;
