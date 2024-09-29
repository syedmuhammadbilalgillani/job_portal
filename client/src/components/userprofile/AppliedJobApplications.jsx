import React, { useState, useEffect, useContext } from "react";
import { useJobApplicationContext } from "../../context/JobApplicationContext";
import defUser from "../../assets/man.png";
import { useToast } from "../../context/ToastContext/ToastContext";
import { useAuth } from "../../context/AuthContext";
import Cookies from "js-cookie";
import { CompanyContext } from "../../context/CompanyContext";

function AppliedJobApplications() {
  const {
    applicationsJobSeeker,
    updateJobApplicationStatus,
    getJobApplicationsForMyPostedJobs,
  } = useJobApplicationContext();
  const { company } = useContext(CompanyContext);
  const { role, isAuthenticated } = useAuth();
  const showToast = useToast();
  if (company) {
    useEffect(() => {
      if (role === "jobSeeker" && isAuthenticated) {
        const token = Cookies.get("AUTH_TOKEN");
        getJobApplicationsForMyPostedJobs(token);
      }
    }, [role, isAuthenticated, getJobApplicationsForMyPostedJobs]);
  }

  const handleStatusChange = async (id, status) => {
    try {
      const data = await updateJobApplicationStatus(id, status);
      showToast(data.message, "success");
    } catch (error) {
      showToast("Failed to update status", "error");
    }
  };

  const [showCV, setShowCV] = useState({}); // State to manage CV visibility for individual applications

  const handleShowCV = (id) => {
    setShowCV((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {applicationsJobSeeker.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applicationsJobSeeker.map((app, index) => (
          <div
            key={`${app._id}-${index}`}
            className="bg-white shadow-custom rounded-xl p-4 mb-4"
          >
            <div className="flex items-center mb-4">
              <img
                src={app?.applicant?.profilePicture || defUser}
                alt={app?.applicant?.name || "User"}
                className="w-16 h-16 rounded-full mr-4 object-contain"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {app?.applicant?.name || "Unknown Name"}
                </h2>
                <p className="text-sm text-gray-500">
                  {app?.applicant?.email || "No Email Provided"}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-md font-medium">
                Job Title: {app?.job?.title || "No Title"}
              </h3>
              <p className="text-sm text-gray-500">
                Location: {app?.job?.location || "No Location"}
              </p>
            </div>
            <div className="mb-4">
              <span className="text-sm font-medium">Status: </span>
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm ${
                  app?.status === "Applied"
                    ? "bg-blue-200 text-blue-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {app?.status || "Unknown Status"}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Application Date:{" "}
              {app?.applicationDate
                ? new Date(app.applicationDate).toLocaleString()
                : "No Date"}
            </div>
            <div className="flex gap-4 mt-3">
              <select
                value={app?.status || ""}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-transparent"
              >
                <option value="Applied">Applied</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Offer Extended">Offer Extended</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <button
              onClick={() => handleShowCV(app._id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {showCV[app._id] ? "Hide CV" : "Show CV"}
            </button>
            {showCV[app._id] && (
              <div className="mt-4 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
                <h4 className="text-3xl font-bold mb-6 text-gray-900">
                  CV Details
                </h4>

                {/* Personal Info */}
                <div className="mb-8">
                  <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
                    Personal Information
                  </h5>
                  <p className="text-lg mb-2">
                    <strong className="text-gray-700">Name:</strong>{" "}
                    {app?.cv?.personalInfo?.name || "No Name Provided"}
                  </p>
                  <p className="text-lg mb-2">
                    <strong className="text-gray-700">Email:</strong>{" "}
                    {app?.cv?.personalInfo?.email || "No Email Provided"}
                  </p>
                  <p className="text-lg mb-2">
                    <strong className="text-gray-700">Phone:</strong>{" "}
                    {app?.cv?.personalInfo?.phone || "No Phone Number Provided"}
                  </p>
                  <p className="text-lg mb-2">
                    <strong className="text-gray-700">Address:</strong>{" "}
                    {app?.cv?.personalInfo?.address || "No Address Provided"}
                  </p>
                  <p className="text-lg mb-2">
                    <strong className="text-gray-700">LinkedIn:</strong>{" "}
                    {app?.cv?.personalInfo?.linkedin ? (
                      <a
                        href={app.cv.personalInfo.linkedin}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {app.cv.personalInfo.linkedin}
                      </a>
                    ) : (
                      "No LinkedIn Provided"
                    )}
                  </p>
                  <p className="text-lg mb-2">
                    <strong className="text-gray-700">GitHub:</strong>{" "}
                    {app?.cv?.personalInfo?.github ? (
                      <a
                        href={app.cv.personalInfo.github}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {app.cv.personalInfo.github}
                      </a>
                    ) : (
                      "No GitHub Provided"
                    )}
                  </p>
                </div>

                {/* Education */}
                <div className="mb-8">
                  <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
                    Education
                  </h5>
                  {app?.cv?.education?.length > 0 ? (
                    <ul className="list-disc list-inside text-lg text-gray-800">
                      {app.cv.education.map((edu) => (
                        <li key={edu._id} className="mb-2">
                          <strong className="text-gray-800">
                            {edu.institution}
                          </strong>{" "}
                          - {edu.degree} in {edu.fieldOfStudy} ({edu.startYear}{" "}
                          - {edu.endYear})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">
                      No Education Information Provided
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
                    Experience
                  </h5>
                  {app?.cv?.experience?.length > 0 ? (
                    <ul className="list-disc list-inside text-lg text-gray-800">
                      {app.cv.experience.map((exp) => (
                        <li key={exp._id} className="mb-4">
                          <strong className="text-gray-800">
                            {exp.company}
                          </strong>{" "}
                          - {exp.position} (
                          {new Date(exp.startDate).toLocaleDateString()} -{" "}
                          {new Date(exp.endDate).toLocaleDateString()})
                          <p className="ml-4 text-gray-600">
                            Responsibilities: {exp.responsibilities}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">
                      No Experience Information Provided
                    </p>
                  )}
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
                    Skills
                  </h5>
                  {app?.cv?.skills?.length > 0 ? (
                    <ul className="list-disc list-inside text-lg text-gray-800">
                      {app.cv.skills.map((skill, index) => (
                        <li key={index} className="mb-1">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No Skills Provided</p>
                  )}
                </div>

                {/* Projects */}
                <div className="mb-8">
                  <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
                    Projects
                  </h5>
                  {app?.cv?.projects?.length > 0 ? (
                    <ul className="list-disc list-inside text-lg text-gray-800">
                      {app.cv.projects.map((project) => (
                        <li key={project._id} className="mb-4">
                          <strong className="text-gray-800">
                            {project.title}
                          </strong>
                          <p className="text-gray-600">{project.description}</p>
                          <a
                            href={project.link}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Project
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No Projects Provided</p>
                  )}
                </div>

                {/* Certifications */}
                <div>
                  <h5 className="text-2xl font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">
                    Certifications
                  </h5>
                  {app?.cv?.certifications?.length > 0 ? (
                    <ul className="list-disc list-inside text-lg text-gray-800">
                      {app.cv.certifications.map((cert) => (
                        <li key={cert._id} className="mb-2">
                          <strong className="text-gray-800">
                            {cert.title}
                          </strong>{" "}
                          - {cert.institution} (
                          {new Date(cert.date).toLocaleDateString()})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No Certifications Provided</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AppliedJobApplications;
