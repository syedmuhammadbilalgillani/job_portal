import { React, Suspense, useContext, useEffect } from "react";

import CompanyAndJob from "../components/companyAndJobForm/CompanyAndJob";

import { Link } from "react-router-dom";

function PostAJob() {
  return (
    <>
      <div
        className="grid grid-cols-3 gap-5 max-w-full px-20 sm-to-xs:p-[5%] fixed md-to-xs:static top-0 bg-white"
        id="Contact"
      >
        <div className="col-span-1 md-to-xs:col-span-full py-20 ">
          <Link to="/" className="absolute top-10 ">
            <i className="fa-duotone fa-2xl fa-solid fa-arrow-left"></i>
          </Link>
          <div className="py-5 sm-to-xs:space-y-5">
            <h1 className=" text-[3.5rem] sm-to-xs:text-5xl  leading-none font-bold ">
              Find your next talent today
            </h1>
            <p className="text-lg gray mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
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
