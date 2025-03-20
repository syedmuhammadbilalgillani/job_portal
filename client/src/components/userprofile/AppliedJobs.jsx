import React, { useEffect, useState } from "react";
import { useJobApplicationContext } from "../../context/JobApplicationContext";
import { Link } from "react-router-dom";
import { useCompanyJob } from "../../context/CompanyJobContext";
import axios from "axios";
import Cookies from "js-cookie";
import Modal from "../Modal/Modal";

function AppliedJobs() {
  const { applications, getUserAppliedApplications } =
    useJobApplicationContext();
  const { fetchCompanies, companies } = useCompanyJob();
  const token = Cookies.get("AUTH_TOKEN");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    fetchCompanies();
  }, []);

  const openModal = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://bettertalentserver.vercel.app/api/v1/jobApplication/deleteJobApplicationById/${deleteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getUserAppliedApplications(token);
      closeModal();
    } catch (error) {
      console.error("Error deleting job application:", error);
    }
  };

  const getCompanyLogo = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyLogo : "Unknown";
  };

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyName : "Unknown";
  };

  return (
    <>
      <main className="min-h-dvh space-y-10 py-10 sm-to-xs:mx-5 px-2">
        <h1 className="gray text-3xl text-start font-bold">Applied Jobs!</h1>

        {applications.length > 0 ? (
          applications.map((application, index) => (
            <section className="p-10 shadow-custom rounded-2xl" key={index}>
              <div className="flex gap-5 justify-between">
                <Link to={`/job/${application.job._id}`} className="flex gap-7">
                  <div className="p-4 inline-block border shadow-custom rounded-2xl">
                    <img
                      src={getCompanyLogo(application.job.companyId)}
                      className="size-12"
                      alt=""
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-semibold text-gray-800">
                      {application.job.title}
                    </p>
                    <p className="font-medium text-sm text-gray-600">
                      <strong className="text-gray-800 mr-2">
                        <i className="fa-duotone text-lg fa-solid fa-location-dot"></i>
                      </strong>{" "}
                      {application.job.location}
                    </p>
                    <p className="font-medium text-sm text-gray-600">
                      <strong className="text-gray-800 mr-2">
                        <i className="fa-duotone text-lg fa-solid fa-file-invoice"></i>
                      </strong>{" "}
                      {application.job.jobType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      <strong>Date Applied: </strong>
                      {new Date(application.applicationDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                    <p
                      className={`text-xs ${
                        application.status === "Approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <strong>Status: </strong>
                      {application.status}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => openModal(application._id)}
                  className="custom-tooltip-container"
                  data-tooltip="Delete application"
                >
                  <i className="fa-duotone fa-solid fa-trash-can fa-lg hover:text-gray-700"></i>
                </button>
              </div>
            </section>
          ))
        ) : (
          <section className="p-10 shadow-custom rounded-2xl">
            <p className="text-xl gray uppercase text-center">
              No applications found.
            </p>
          </section>
        )}
      </main>

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="p-6 bg-white text-center ">
          <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
          <p className="mb-6 gray   ">
            Are you sure you want to delete this job application?
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="btn-red text-white px-4 py-2 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              className="btn-black text-white px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AppliedJobs;
