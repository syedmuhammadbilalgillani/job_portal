import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";

const JobPageBanner = lazy(() =>
  import("../components/jobpagebanner/JobPageBanner")
);

const Loader = lazy(() => import("../components/Loader/Loader"));
import { Link } from "react-router-dom";
import { scrollToSection } from "../constants/Scroll";
// import big from "../assets/background large.png";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Function to fetch all companies
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/company/readCompany"
        );

        setCompanies(response.data);
        // console.log(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);
  const handleLinkClick = (id) => {
    setTimeout(() => scrollToSection(id, 500), 100); // 2000ms = 2 seconds
  };
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi magni officia tempora.
                  </p>{" "}
                  {/* Accessing companyDesc directly from company object */}
                  <Link
                    to={`/companies/${company._id}`}
                    onClick={() => handleLinkClick(`companiesDetail`)} // Use company ID for dynamic URL
                    className="text-white bg-black w-full rounded-xl hover:bg-gray-900 px-5 py-3 hover:-translate-y-1 transition-all duration-200 block text-center"
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
      <Suspense fallback={<Loader />}>
        <JobPageBanner />
      </Suspense>
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
