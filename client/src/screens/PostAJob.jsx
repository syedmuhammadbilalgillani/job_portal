import { React, Suspense, useContext, useEffect, useState } from "react";

import CompanyAndJob from "../components/companyAndJobForm/CompanyAndJob";

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Gallery from "./Gallery";

function PostAJob() {
  const { role } = useAuth();
  const [isGalleryBtn, setIsGalleryBtn] = useState(false);
  return (
    <>
      <div
        className="grid grid-cols-3 gap-5 max-w-full px-20 sm-to-xs:p-[5%] fixed md-to-xs:static top-0 bg-white"
        id="Contact"
      >
        <div className="col-span-1 md-to-xs:col-span-full py-20 relative min-h-fit ">
          {!isGalleryBtn ? (
            <>
              <div className="">
                <Link to="/">
                  <i className="fa-duotone fa-2xl fa-solid fa-arrow-left"></i>
                </Link>
              </div>
              {(role === "admin" || role === "jobSeeker") && (
                <div className="">
                  {/* <p className="mb-6 gray uppercase">
                upload image in gallery and copy path for handle image in
                texteditor
              </p> */}
                  <button
                    // to="/gallery"
                    // target="_blank"
                    // query={{ test: this.props.test }}
                    className="btn-black px-10 absolute bottom-10  py-5 rounded-xl"
                    onClick={() => setIsGalleryBtn(true)}
                  >
                    Gallery
                  </button>
                </div>
              )}
              <div className="py-5 sm-to-xs:space-y-5 mb-10">
                <h1 className=" text-[3.5rem] sm-to-xs:text-5xl  leading-none font-bold ">
                  Find your next talent today
                </h1>
                <p className="text-lg gray mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique.
                </p>
              </div>
            </>
          ) : (
            <Gallery
              isGalleryBtn={isGalleryBtn}
              setIsGalleryBtn={setIsGalleryBtn}
            />
          )}
        </div>
        <div className="col-span-2  md-to-xs:col-span-full ">
          {/* <ContactAndCompany /> */}
          <CompanyAndJob />
        </div>
      </div>
    </>
  );
}

export default PostAJob;
