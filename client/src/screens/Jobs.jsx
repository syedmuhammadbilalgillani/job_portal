import React, { lazy, useEffect } from "react";
import JobsPosts from "../components/jobposts/JobPosts";
import JobPageBanner from "../components/jobpagebanner/JobPageBanner";
import { useCompanyJob } from "../context/CompanyJobContext";

function Jobs() {
  const { fetchJobs } = useCompanyJob();
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <JobsPosts />
      <JobPageBanner />
    </>
  );
}

export default Jobs;
