import React, { useState } from "react";
import { useGallery } from "../../context/GalleryContext";

const UploadImageInGallery = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { uploadImages, loading } = useGallery();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      // Convert FileList to Array
      const fileArray = Array.from(files);
      // Create image previews
      const imagePreviews = fileArray.map((file) => URL.createObjectURL(file));
      setSelectedImages(imagePreviews);
      // Update selectedFiles for upload
      setSelectedFiles(fileArray);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    try {
      const result = await uploadImages(selectedFiles);
      // Optionally clear selected files and images after upload
      setSelectedFiles([]);
      setSelectedImages([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <main className="p-6 w-fit bg-gray-100 rounded-xl shadow-custom flex gap-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex flex-col justify-between">
            <label htmlFor="file-upload" className="relative cursor-pointer">
              <i className="fa-duotone fa-solid fa-cloud-arrow-up cursor-pointer fa-2xl"></i>
            </label>

            <input
              type="file"
              multiple
              id="file-upload"
              hidden
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg py-3 px-5 text-sm file:border-0 file:bg-blue-600 file:text-white file:py-3 file:px-5 file:rounded-md file:cursor-pointer hover:file:bg-blue-700 transition-colors duration-300 ease-in-out"
            />
            <p className="text-xs text-gray-600 mt-2">
              Select multiple images to upload.
            </p>
          </div>
          <button
            type="submit"
            disabled={loading || selectedImages.length === 0}
            className={`py-3 px-6 rounded-lg text-white font-semibold focus:outline-none transition-colors duration-300 ease-in-out ${
              loading || selectedImages.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "btn-black"
            }`}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        <div>
          {selectedImages.length > 0 && (
            <div className="flex flex-wrap overflow-hidden">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`preview`}
                  className="w-12 h-12 object-cover rounded-md border border-gray-300 cursor-not-allowed"
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default UploadImageInGallery;
