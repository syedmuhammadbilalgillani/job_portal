import React, { useState } from "react";
import { useCompanyJob } from "../../context/CompanyJobContext";
import axios from "axios";
import JoditEditor from "jodit-react";
import Cookies from "js-cookie";
import Modal from "../Modal/Modal";

function AllJobs() {
  const {
    jobsAdmin,
    companies,
    fetchgetAuthenticatedUserJobsPost,
    fetchJobsAdmin,
  } = useCompanyJob();
  const [editingJob, setEditingJob] = useState(null);
  const token = Cookies.get("AUTH_TOKEN");
  const [updateJobModal, setUpdateJobModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    jobCategory: "",
    jobDescription: "",
    jobPostDescription: "",
    location: "",
    salary: "",
    jobType: "",
    approvalStatus: "",
    requirements: "",
    responsibilities: "",
    contactEmail: "",
  });

  const handleUpdateJobModalOpen = () => {
    setUpdateJobModal(true);
  };

  const handleUpdateJobModalClose = () => {
    setUpdateJobModal(false);
  };

  const getCompanyLogo = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyLogo : "Unknown";
  };

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyName : "Unknown";
  };

  const handleEditClick = (job) => {
    handleUpdateJobModalOpen(true);
    setEditingJob(job);
    setFormData({
      title: job.title,
      jobCategory: job.jobCategory,
      jobDescription: job.jobDescription,
      jobPostDescription: job.jobPostDescription,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      approvalStatus: job.approvalStatus,
      requirements: job.requirements.join(", "),
      responsibilities: job.responsibilities.join(", "),
      contactEmail: job.contactEmail,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://bettertalentserver.vercel.app/api/v1/job/updateJob/${editingJob._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingJob(null);
      handleUpdateJobModalClose();
      fetchJobsAdmin(token);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };
  const handledelete = async (id) => {
    try {
      await axios.delete(
        `https://bettertalentserver.vercel.app/api/v1/job/deleteJobById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchJobsAdmin(token);
      //   setEditingJob(null);
      //   handleUpdateJobModalClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <>
      <main>
        {jobsAdmin?.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs available at the moment.
          </p>
        ) : (
          jobsAdmin?.map((job, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white shadow-custom m-10 overflow-hidden"
            >
              <p className="text-green-400 text-xl font-semibold pb-2">
                {getCompanyName(job?.companyId) || "Company Name"}
              </p>
              <div className="flex items-center mb-4 gap-5">
                <img
                  src={getCompanyLogo(job.companyId) || "default-logo.png"}
                  alt="Company Logo"
                  className="p-4 inline-block border shadow-custom rounded-2xl size-20"
                />

                <div className="flex justify-between w-full flex-wrap">
                  <h2 className="text-2xl sm-to-xs:text-lg font-bold text-gray-900 mb-1">
                    {job?.title || "Job Title"}
                  </h2>
                  <h2 className="text-2xl sm-to-xs:text-lg font-bold text-gray-900 mb-1">
                    {job?._id || "Job Title"}
                  </h2>
                </div>
              </div>
              <p className="bg-gray-200 w-fit px-4 text-sm py-1.5 rounded-md mb-4">
                {job?.jobCategory || "Job Category"}
              </p>
              {/* <div className="mb-4 text-gray-700">
              <p className="mb-2">{job?.jobDescription || "Job Description"}</p>
              <p
                className="mb-2"
                dangerouslySetInnerHTML={{
                  __html: job.jobPostDescription || "Job Post Description",
                }}
              />
            </div> */}
              {/* <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {job?.location || "Location"}
              </p>
              <p>
                <span className="font-semibold">Salary:</span>{" "}
                {job?.salary || "Salary"}
              </p>
              <p>
                <span className="font-semibold">Type:</span>{" "}
                {job?.jobType || "Job Type"}
              </p>
              <p>
                <span className="font-semibold">Requirements:</span>{" "}
                {job?.requirements?.join(", ") || "Requirements"}
              </p>
              <p>
                <span className="font-semibold">Responsibilities:</span>{" "}
                {job?.responsibilities?.join(", ") || "Responsibilities"}
              </p>
              <p>
                <span className="font-semibold">Posted Date:</span>{" "}
                {job?.postedDate
                  ? new Date(job.postedDate).toLocaleDateString()
                  : "Posted Date"}
              </p>
              <p>
                <span className="font-semibold">Last Date to Apply:</span>{" "}
                {job?.lastDateToApply
                  ? new Date(job.lastDateToApply).toLocaleDateString()
                  : "Last Date to Apply"}
              </p>
              <p className="overflow-scroll">
                <span className="font-semibold ">Contact Email:</span>{" "}
                {job?.contactEmail || "Contact Email"}
              </p>
            </div> */}
              <p className="uppercase gray">
                <strong className="text-black ">Approval Status:</strong>{" "}
                {job?.approvalStatus || "Approval Status"}
              </p>
              <button
                onClick={() => handleEditClick(job)}
                className="mt-4 btn-black px-6 rounded-lg py-2"
              >
                Edit Approval Status
              </button>
              <button
                onClick={() => handledelete(job._id)}
                className="mt-4 btn-red px-6 ml-4 rounded-lg py-2"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </main>
      <Modal isOpen={updateJobModal} onClose={handleUpdateJobModalClose}>
        {editingJob && (
          <div className="p-10">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-scroll ">
              <h2 className="text-2xl font-bold mb-4">Approval Status</h2>
              <form className="space-y-4">
                {/* <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="jobCategory"
                  value={formData.jobCategory}
                  onChange={handleInputChange}
                  placeholder="Job Category"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <JoditEditor
                  value={formData.jobPostDescription}
                  onChange={(newContent) =>
                    setFormData({ ...formData, jobPostDescription: newContent })
                  }
                />
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Job Post Description"
                  className="w-full px-4 py-2 border rounded-md"
                ></textarea>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="Salary"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  placeholder="Job Type"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Requirements"
                  className="w-full px-4 py-2 border rounded-md"
                />
                <input
                  type="text"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  placeholder="Responsibilities"
                  className="w-full px-4 py-2 border rounded-md"
                /> */}
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

                {/* <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="Contact Email"
                  className="w-full px-4 py-2 border rounded-md"
                /> */}
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="w-full px-4 py-2 btn-green text-white font-semibold rounded-md btn-green"
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

export default AllJobs;
