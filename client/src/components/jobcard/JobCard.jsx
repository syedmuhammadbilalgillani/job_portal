import React from "react";
import mapicon from "../../assets/map-svg.svg";
import docicon from "../../assets/doc.svg";
import orgicon from "../../assets/amazon-logo.svg";

import { useCompanyJob } from "../../context/CompanyJobContext";
import { Link } from "react-router-dom";
function JobCard() {
  const { jobs, companies } = useCompanyJob();
  // console.log(item, "item");
  const getCompanyLogo = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyLogo : "Unknown";
  };
  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyName : "Unknown";
  };
  if (jobs.lenght === 0) return <h1>No Jobs Posted</h1>;
  return (
    <>
      {jobs.map((item, index) => (
        <div className="col-span-1 md-to-xs:col-span-full" key={item._id}>
          <div className="shadow-form rounded-2xl px-7 py-7">
            <div className="flex flex-wrap justify-between items-center pb-5 ">
              <h2 className="font-semibold text-[2.5rem]">{item.title}</h2>
              <span className="bg-green-200 gray px-6 py-3 rounded-md uppercase">
                {item.jobCategory}
              </span>
            </div>
            <p className="gray text-lg font-medium pb-5">
              {item.jobDescription}
            </p>
            <div className="pb-5 flex items-center gap-8 uppercase text-sm">
              <div className="flex flex-wrap items-center gap-4">
                <span>
                  <img loading="lazy" className="h-7" src={mapicon} alt="" />
                </span>
                <h6 className="gray font-medium uppercase">{item.location}</h6>
              </div>
              <div className="flex items-center flex-wrap gap-4">
                <span>
                  <img loading="lazy" className="h-7" src={docicon} alt="" />
                </span>
                <h6 className="gray font-medium uppercase">{item.jobType}</h6>
              </div>
              <div className="flex items-center flex-wrap gap-4">
                <span>
                  <img
                    loading="lazy"
                    className="h-7"
                    src={getCompanyLogo(item.companyId)}
                    alt=""
                  />
                </span>
                <h6 className="gray font-medium">
                  {getCompanyName(item.companyId)}
                </h6>
              </div>
            </div>
            <button className="btn-green py-3 rounded-lg">
              <Link
                className=" w-fit px-8 py-3 "
                to={`/job/${item._id}`}
                onClick={() => handleLinkClick(`companiesDetail`)} // Use company ID for dynamic URL
              >
                Read more
              </Link>
            </button>
          </div>
        </div>
      ))}

      <style>
        {`
          .shadow-form{
          box-shadow: 0 2px 20px rgba(19, 31, 24, .15);
          }
          `}
      </style>
    </>
  );
}

export default JobCard;
