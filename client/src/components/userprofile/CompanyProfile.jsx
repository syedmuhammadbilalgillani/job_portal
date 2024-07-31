import React, { useContext, useEffect } from "react";
import { useCompanyJob } from "../../context/CompanyJobContext";
import { CompanyContext } from "../../context/CompanyContext";
import { Link } from "react-router-dom";

function CompanyProfile() {
  const { userCompany } = useCompanyJob();
  const { company, fetchCompany } = useContext(CompanyContext); // Fetch company from context

  useEffect(() => {
    fetchCompany(); // Fetch company data when the component mounts
  }, [fetchCompany]);

  const numberOfEmployees = userCompany?.numberOfEmployees;
  const formattedNumber = numberOfEmployees?.toLocaleString();

  return (
    <>
      {company ? (
        <>
          <section className="min-h-dvh space-y-10 py-10 sm-to-xs:mx-5">
            <h1 className="gray text-3xl text-start font-bold">COMPANY!</h1>
            {userCompany?.approvalStatus === "rejected" ||
            userCompany?.approvalStatus === "pending" ? (
              <h1 className="uppercase bg-gray-400 inline-block px-5 py-2 rounded-lg font-semibold text-white cursor-not-allowed">
                {userCompany.approvalStatus}
              </h1>
            ) : null}

            <div className="p-5 shadow-custom rounded-2xl">
              <div className="flex gap-5 p-6">
                <img
                  src={userCompany?.companyLogo}
                  className="shadow-custom p-5 rounded-lg"
                  alt=""
                />
                <div className="flex flex-col gap-3">
                  <h1 className="text-5xl font-bold">
                    {userCompany?.companyName}
                  </h1>
                  <div className="gray bg-gray-200 w-fit px-4 text-sm py-1.5 rounded-md">
                    {userCompany?.companyIndustry}
                  </div>
                  <p className="gray font-medium text-lg">
                    {formattedNumber}+ employees
                  </p>
                </div>
              </div>
              <hr />
              <div className="px-6 py-10">
                <div
                  dangerouslySetInnerHTML={{
                    __html: userCompany?.companyPostDescription,
                  }}
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="uppercase text-[max(3vw,1.5rem)] gray font-semibold min-h-dvh flex flex-col justify-center items-center">
            {/* Ensure userCompany is properly handled */}
            <p>No company profile available.</p>
            <Link
              to="/postJobOffer"
              className="uppercase btn-black px-10 text-[max(1.3vw,1rem)] rounded-lg py-2 mt-5"
            >
              Post a company & first job
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default CompanyProfile;
