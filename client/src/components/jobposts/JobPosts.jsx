import React from "react";

import JobCard from "../jobcard/JobCard";
function JobPosts() {
  return (
    <>
      <section className="w-full my-20">
        <div className="py-20">
          <h1 className="text-7xl text-center font-bold mb-4">
            Our latest job offers
          </h1>
          <p className="text-center text-lg gray max-w-[50%] sm-to-xs:max-w-[90%] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5 mx-[5%]">
          <JobCard />
        </div>
      </section>
    </>
  );
}

export default JobPosts;
