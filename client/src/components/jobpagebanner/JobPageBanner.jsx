import React from "react";

function JobPageBanner() {
  return (
    <>
      <section id="JobPageBanner">
        <div className="px-16 sm-to-xs:px-8 py-20 space-y-5">
          <h1 className="text-[3.5rem] leading-none font-bold max-w-[60%] md-to-xs:max-w-full">
            Be the first to know about our new job offers
          </h1>
          <p className="text-lg gray max-w-[40%] md-to-xs:max-w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
          <div className="relative bg-blue-gray-200 inline top-6">
            <input
              type="text"
              placeholder="Enter you email"
              className="border-green-200 rounded-lg text-lg gray py-5 focus:ring-green-500 focus:border-none  max-w-[35%] md-to-xs:max-w-full w-full "
            />
            <button className="btn-green absolute right-3  -top-3  px-7 py-2  rounded-lg">
              Subscribe
            </button>
          </div>
          <p className="gray py-5">
            Join 9,500+ users already on the newsletter.
          </p>
        </div>
      </section>
    </>
  );
}

export default JobPageBanner;
