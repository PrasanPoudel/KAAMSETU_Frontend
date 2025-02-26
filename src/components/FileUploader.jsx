import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file type. Only PDFs and images are allowed.");
      return;
    }

    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setError("");

    if (onFileUpload) {
      onFileUpload(uploadedFile);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full h-[250px] border-2 border-dashed p-5 rounded-md cursor-pointer ${
        isDragActive ? "border-sky-600 bg-sky-100" : "border-gray-200"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-sky-600">Drop the file here...</p>
      ) : (
        <p className="text-gray-500">Drag & drop a file here, or click to select one</p>
      )}
      {file && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>Selected File:</strong> {file.name}
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default FileUploader;
