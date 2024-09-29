import React from "react";
import UploadImageInGallery from "../components/GalleryComponents/UploadImageInGallery";
import GetGalleryImages from "../components/GalleryComponents/GetGalleryImages";
import { useGallery } from "../context/GalleryContext";
import Loader from "../components/Loader/Loader";
function Gallery({ isGalleryBtn, setIsGalleryBtn }) {
  const { loading } = useGallery();

  return (
    <>
      <section className="mx-[5vw] py-10 space-y-10 min-h-dvh     fixed md-to-xs:static top-0 bg-white">
        {isGalleryBtn && (
          <button onClick={() => setIsGalleryBtn(false)}>
            <i className="fa-duotone fa-2xl fa-solid fa-arrow-left"></i>
          </button>
        )}
        <div className="grid grid-cols-3 md-to-xs:grid-cols-1  gap-5">
          <UploadImageInGallery />
          <GetGalleryImages />
        </div>
      </section>
    </>
  );
}

export default Gallery;
