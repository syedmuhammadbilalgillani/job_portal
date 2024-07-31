import React, { lazy } from "react";
import JobsPosts from "../components/jobposts/JobPosts";
import JobPageBanner from "../components/jobpagebanner/JobPageBanner";

function Jobs() {
  return (
    <>
      <JobsPosts />
      <JobPageBanner />
    </>
  );
}

export default Jobs;
