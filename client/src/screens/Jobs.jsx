import React, { lazy } from "react";
const JobsPosts = lazy(() => import("../components/jobposts/JobPosts"));
const JobPageBanner = lazy(() =>
  import("../components/jobpagebanner/JobPageBanner")
);
function Jobs() {
  return (
    <>
      <JobsPosts />
      <JobPageBanner />
    </>
  );
}

export default Jobs;
