import React from "react";

import JobCard from "../jobcard/JobCard";
import { useCompanyJob } from "../../context/CompanyJobContext";

function JobPosts() {
  const { jobs } = useCompanyJob();

  if (jobs.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <h2 className="text-2xl font-semibold mb-2">No Jobs Available</h2>
      <p className="text-gray-600 max-w-md">There are currently no job listings to display. Please check back later for new opportunities.</p>
    </div>
  );
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
