import React from "react";
import UploadImageInGallery from "../components/GalleryComponents/UploadImageInGallery";
import GetGalleryImages from "../components/GalleryComponents/GetGalleryImages";
import { useGallery } from "../context/GalleryContext";
import Loader from "../components/Loader/Loader";
function Gallery() {
  const { loading } = useGallery();

  return (
    <>
      <section className="max-w-[90%] mx-auto p-10 space-y-10 min-h-dvh">
        <UploadImageInGallery />
        <GetGalleryImages />
      </section>
    </>
  );
}

export default Gallery;
