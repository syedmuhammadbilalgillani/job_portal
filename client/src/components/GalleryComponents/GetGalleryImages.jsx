import React, { useEffect, useState } from "react";
import { useGallery } from "../../context/GalleryContext";
import Loader from "../Loader/Loader";
import { CopyToClipboard } from "react-copy-to-clipboard"; // Make sure to install this package
import { useLocation } from "react-router-dom";

const GetGalleryImages = () => {
  const { getImages, deleteImages, deleteAllImages, gallery, loading } =
    useGallery();
  const [selectedImages, setSelectedImages] = useState([]);
  const location = useLocation();
  const fetchImages = async () => {
    try {
      await getImages();
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSelectImage = (publicId) => {
    // console.log("Toggling selection for:", publicId);
    setSelectedImages((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  const handleDeleteImages = async () => {
    // console.log("Deleting images with public IDs:", selectedImages);
    try {
      await deleteImages(selectedImages);
      setSelectedImages([]); // Clear selection after deletion
    } catch (err) {
      console.error("Error deleting images:", err);
    }
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };
  if (loading)
    return (
      <>
        <div className="h-dvh w-full fixed top-0 left-0">
          <Loader />
        </div>
      </>
    );
  return (
    <div className=" bg-gray-100 rounded-2xl shadow-custom p-10 sm-to-xs:p-5 overflow-scroll col-span-2">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-fit">
        <button
          disabled={gallery.length === 0}
          onClick={deleteAllImages}
          className={`py-2 px-6 rounded-lg shadow-md focus:outline-none transition duration-300 ${
            gallery.length === 0
              ? "bg-gray-400  cursor-not-allowed text-white"
              : "bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
          }`}
        >
          Delete All
        </button>

        <button
          onClick={handleDeleteImages}
          disabled={selectedImages.length === 0}
          className={`py-2 px-6 rounded-lg shadow-md focus:outline-none transition duration-300 ${
            selectedImages.length === 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "btn-black"
          }`}
        >
          Delete Selected Images
        </button>
      </div>

      <div
        className={`grid ${
          location.pathname === "/postJobOffer" ? "grid-cols-1" : "grid-cols-3"
        }  md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-6 h-full`}
      >
        {gallery.length === 0 ? (
          <p className="col-span-full text-center font-bold text-lg uppercase text-gray-400 p-10">
            No images available
          </p>
        ) : (
          gallery.map((image) => {
            const imagePublicId = image.publicId.replace("user_gallery/", ""); // Adjust for display
            return (
              <div
                key={image._id}
                className="relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2">
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(imagePublicId)}
                    onChange={() => handleSelectImage(imagePublicId)}
                    className="form-checkbox rounded-full p-3"
                  />
                </div>
                <div className="absolute bottom-2 left-2 flex items-center bg-gray-800 text-white text-xs px-2 py-1 rounded-lg space-x-2">
                  <p className="truncate w-10">{image.url}</p>
                  <CopyToClipboard
                    text={image.url}
                    onCopy={() => alert("URL copied to clipboard!")}
                  >
                    <button className="bg-blue-500 hover:bg-blue-600  rounded-md px-3 py-1 transition duration-300">
                      Copy Url
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GetGalleryImages;
