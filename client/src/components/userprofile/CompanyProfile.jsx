import React, { useContext, useEffect, useState } from "react";
import { useCompanyJob } from "../../context/CompanyJobContext";
import { CompanyContext } from "../../context/CompanyContext";
import { Link } from "react-router-dom";

function CompanyProfile() {
  const { userCompany } = useCompanyJob();
  const { company, fetchCompany, updateCompany } = useContext(CompanyContext); // Added updateCompany
  const [isEditing, setIsEditing] = useState(false); // State to handle edit mode

  useEffect(() => {
    fetchCompany(); // Fetch company data when the component mounts
  }, [fetchCompany]);

  const numberOfEmployees = userCompany?.numberOfEmployees;
  const formattedNumber = numberOfEmployees?.toLocaleString();

  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit edit mode
  };

  return (
    <>
      {isEditing ? (
        <EditCompanyProfile
          company={userCompany}
          onCancel={handleCancelEdit}
          onUpdate={(companyData) => {
            updateCompany(companyData); // Update company data
            setIsEditing(false); // Exit edit mode
          }}
        />
      ) : (
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
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="uppercase btn-black px-5 py-2 rounded-lg text-white font-semibold"
                  >
                    Edit Profile
                  </button>
                )}

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
      )}
    </>
  );
}

export default CompanyProfile;
import JoditEditor from "jodit-react"; // Import Jodit Editor

export const EditCompanyProfile = ({ company, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState({
    companyName: company?.companyName || "",
    companyIndustry: company?.companyIndustry || "",
    numberOfEmployees: company?.numberOfEmployees || "",
    companyPostDescription: company?.companyPostDescription || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (newDescription) => {
    setFormData((prev) => ({
      ...prev,
      companyPostDescription: newDescription,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onUpdate(formData); // Call the onUpdate function passed as a prop
  };

  return (
    <section className="min-h-dvh space-y-10 py-10 sm-to-xs:mx-5">
      <h1 className="gray text-3xl text-start font-bold">
        Edit Company Profile
      </h1>
      <form onSubmit={handleSubmit} className="p-5 shadow-custom rounded-2xl">
        <div className="flex flex-col gap-5 p-6">
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Company Name"
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="companyIndustry"
            value={formData.companyIndustry}
            onChange={handleChange}
            placeholder="Company Industry"
            className="border p-2 rounded-lg"
          />
          <input
            type="number"
            name="numberOfEmployees"
            value={formData.numberOfEmployees}
            onChange={handleChange}
            placeholder="Number of Employees"
            className="border p-2 rounded-lg"
          />
          <JoditEditor
            value={formData.companyPostDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex justify-end gap-5 p-6">
          <button
            type="button"
            onClick={onCancel}
            className="btn-gray px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-black px-5 py-2 rounded-lg text-white"
          >
            Update
          </button>
        </div>
      </form>
    </section>
  );
};
