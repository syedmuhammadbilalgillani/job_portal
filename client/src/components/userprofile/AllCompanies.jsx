import React, { useState } from "react";
import { useCompanyJob } from "../../context/CompanyJobContext";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../Modal/Modal";

function AllCompanies() {
  const {
    companiesAdmin,
    fetchJobsAdmin,
    fetchgetAuthenticatedUserJobsPost,
    fetchAllCompaniesAdmin,
  } = useCompanyJob();
  const [editingJob, setEditingJob] = useState(null);
  const [updateJobModal, setUpdateJobModal] = useState(false);
  const token = Cookies.get("AUTH_TOKEN");
  const [formData, setFormData] = useState({
    approvalStatus: "",
  });
  const apiUrl = import.meta.env.VITE_API_KEY;

  const handleUpdateJobModalOpen = () => setUpdateJobModal(true);
  const handleUpdateJobModalClose = () => setUpdateJobModal(false);

  const handleEditClick = (company) => {
    setEditingJob(company);
    setFormData({ approvalStatus: company.approvalStatus });
    handleUpdateJobModalOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${apiUrl}/company/updateCompany/${editingJob._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingJob(null);
      handleUpdateJobModalClose();
      fetchJobsAdmin(token);
      fetchAllCompaniesAdmin(token);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/company/deleteCompany/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchgetAuthenticatedUserJobsPost(token);
      fetchAllCompaniesAdmin(token);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      <main>
        {companiesAdmin?.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs available at the moment.
          </p>
        ) : (
          companiesAdmin?.map((company, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white shadow-custom m-10 overflow-hidden"
            >
              <p className="text-green-400 text-xl font-semibold pb-2">
                {company?.companyName || "Company Name"}
              </p>
              <div className="flex items-center mb-4 gap-5">
                <img
                  src={company?.companyLogo || "default-logo.png"}
                  alt="Company Logo"
                  className="p-4 inline-block border shadow-custom rounded-2xl size-20"
                />
                <div className="flex justify-between w-full flex-wrap">
                  <h2 className="text-2xl sm-to-xs:text-lg font-bold text-gray-900 mb-1">
                    {company?.companyIndustry || "Company Industry"}
                  </h2>
                  <h2 className="text-2xl sm-to-xs:text-lg font-bold text-gray-900 mb-1">
                    {company?._id || "Company ID"}
                  </h2>
                </div>
              </div>
              <div className="mb-4 text-gray-700">
                <p>
                  <span className="font-semibold">Created By:</span>{" "}
                  {company?.createdBy || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Approval Status:</span>{" "}
                  {company?.approvalStatus || "Pending"}
                </p>
              </div>
              <div className="flex mt-4">
                <button
                  onClick={() => handleEditClick(company)}
                  className="btn-black px-6 rounded-lg py-2"
                >
                  Edit Approval Status
                </button>
                <button
                  onClick={() => handleDelete(company._id)}
                  className="btn-red px-6 ml-4 rounded-lg py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </main>
      <Modal isOpen={updateJobModal} onClose={handleUpdateJobModalClose}>
        {editingJob && (
          <div className="p-10">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-scroll">
              <h2 className="text-2xl font-bold mb-4">Approval Status</h2>
              <form className="space-y-4">
                <select
                  name="approvalStatus"
                  value={formData.approvalStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="w-full px-4 py-2 btn-green text-white font-semibold rounded-md"
                >
                  Update Approval Status
                </button>
              </form>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default AllCompanies;
