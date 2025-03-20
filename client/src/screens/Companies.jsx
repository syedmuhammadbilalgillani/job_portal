import React, { lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import JobPageBanner from "../components/jobpagebanner/JobPageBanner";
import { scrollToSection } from "../constants/Scroll";
import { useCompanyJob } from "../context/CompanyJobContext";

const Loader = lazy(() => import("../components/Loader/Loader"));
// import big from "../assets/background large.png";

const Companies = () => {
  const { fetchCompanies, companies, readMore } = useCompanyJob();
  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleLinkClick = (id) => {
    setTimeout(() => scrollToSection(id, 500), 100); // 2000ms = 2 seconds
  };
  // ... existing code ...
  if (companies.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mb-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">
          No Company Details Available
        </h2>
        <p className="text-gray-600 max-w-md">
          There are currently no partner companies to display. Please check back
          later for updates.
        </p>
      </div>
    );
  // ... existing code ...
  return (
    <>
      <div className=" flex flex-col justify-center items-center text-center py-[10%]">
        <div className="space-y-6 flex flex-col justify-center items-center">
          <h1 className="text-7xl xs:text-6xl font-bold">
            Our partner companies
          </h1>
          <p className="text-xl max-w-[50%]  sm-to-xs:max-w-full text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique
          </p>
          <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-2 p-[8%] gap-6">
            {companies.map((company) => (
              <div
                className="col-span-1 md:col-span-1 sm-to-xs:col-span-full"
                key={company._id}
              >
                <div className="p-10 sm-to-xs:p-5 border rounded-xl shadow-lg space-y-5">
                  <div className="flex flex-wrap items-center gap-10">
                    <div className="img flex justify-center">
                      <img
                        loading="lazy"
                        src={company.companyLogo} // Accessing companyLogo directly from company object
                        alt={`${company.companyName} Logo`}
                        className="p-3 h-16 rounded-xl shadow-custom"
                      />
                    </div>
                    <h3 className="text-3xl font-semibold">
                      {company.companyName}{" "}
                      {/* Accessing companyName directly from company object */}
                    </h3>
                  </div>
                  <p className="text-lg gray text-start">
                    {company.companyDescription}
                  </p>{" "}
                  {/* Accessing companyDesc directly from company object */}
                  <Link
                    to={`/companies/${company._id}`}
                    onClick={() => handleLinkClick(`companiesDetail`)} // Use company ID for dynamic URL
                    className={`text-white bg-black w-full rounded-xl hover:bg-gray-900 px-5 py-3 hover:-translate-y-1 transition-all duration-200 block text-center ${!readMore && "hidden"}`}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* ))} */}
      </div>

      <JobPageBanner />

      <style>
        {`
            
            .shadow-custom {
                box-shadow: 0px 0px 9px 1px rgba(114, 114, 114, 0.75);
                -webkit-box-shadow: 0px 0px 9px 1px rgba(114, 114, 114, 0.75);
                -moz-box-shadow: 0px 0px 9px 1px rgba(114, 114, 114, 0.75);
            }`}
      </style>
    </>
  );
};

export default Companies;
