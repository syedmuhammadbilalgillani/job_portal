// CompanyDetail.js

import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const CompanyDetail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const apiUrl = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchCompanyById = async () => {
      try {
        const response = await axios.get(`${apiUrl}/company/readCompany/${id}`);

        setCompany(response?.data);
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    fetchCompanyById();
  }, [id]);

  if (!company) {
    return <Loader />;
  }
  const numberOfEmployees = company.numberOfEmployees;
  const formattedNumber = numberOfEmployees.toLocaleString();
  return (
    <>
      <main className="w-full p-[12%]" id="companiesDetail">
        <div className="bg-white">
          <div className="flex gap-5 p-6">
            <img
              src={company.companyLogo}
              className="shadow-custom p-5 rounded-2xl size-36"
              alt=""
            />
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl font-bold">{company.companyName}</h1>
              <div className="gray bg-gray-200 w-fit  px-4 text-sm py-1.5 rounded-md">
                {company.companyIndustry}
              </div>
              <p className="gray font-medium text-lg">
                {formattedNumber}+ employees
              </p>
              <div className=" flex  items-center gap-5 text-2xl">
                <a
                  href={company.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-sharp-duotone fa-solid fa-globe-pointer hover:text-green-400"></i>
                </a>

                <a
                  href={company.linkedinPage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-linkedin hover:text-green-400"></i>
                </a>
              </div>
            </div>
          </div>

          <hr />

          <div className="px-6 py-10">
            <div
              dangerouslySetInnerHTML={{
                __html: company.companyPostDescription,
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default CompanyDetail;
