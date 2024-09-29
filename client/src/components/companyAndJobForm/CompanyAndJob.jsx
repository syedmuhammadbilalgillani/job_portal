import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCompanyJob } from "../../context/CompanyJobContext";
import Input from "../Input/Input";
import TextAreaInput from "../Input/TextAreaInput";
import JoditEditor from "jodit-react"; // Import JoditEditor
import { CompanyContext } from "../../context/CompanyContext";
import { useToast } from "../../context/ToastContext/ToastContext";

const CompanyJobForm = ({ placeholder }) => {
  const { createCompany, createJob, loading, error } = useCompanyJob();
  const { company, fetchCompany } = useContext(CompanyContext); // Fetch company from context

  const showToast = useToast();
  useEffect(() => {
    fetchCompany(); // Fetch company data when the component mounts
  }, [fetchCompany]);

  const editor = useRef(null);
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    companyIndustry: "",
    companyWebsite: "",
    linkedinPage: "",
    companyLogo: "",
    numberOfEmployees: "",
    companyDescription: "",
    companyPostDescription: "",
  });

  const [job, setJob] = useState({
    title: "",
    jobCategory: "",
    jobDescription: "",
    jobPostDescription: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    requirements: [],
    responsibilities: [],
    lastDateToApply: "",
    contactEmail: "",
  });

  const initialJobState = {
    title: "",
    jobCategory: "",
    jobDescription: "",
    jobPostDescription: "",
    location: "",
    salary: "",
    jobType: "Full-time",
    requirements: [],
    responsibilities: [],
    lastDateToApply: "",
    contactEmail: "",
  };

  const handleSubmit = async (e, isCompany) => {
    e.preventDefault();
    try {
      const response = isCompany
        ? await createCompany(companyForm)
        : await createJob(job);

      // console.log(response.message);
      if (isCompany) {
        showToast(response.message, "success");
        fetchCompany();
      } else {
        showToast(response.message, "success");
        setJob(initialJobState); // Reset job form fields
        fetchCompany();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e, setState) => {
    const { name, value } = e.target;
    const arrayValue = value.split("\n").filter((item) => item.trim() !== "");
    setState((prevState) => ({
      ...prevState,
      [name]: arrayValue,
    }));
  };

  const handleJoditChange = (value, name, setState) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const config = useMemo(
    () => ({
      controls: {
        font: {
          list: {
            "Figtree, sans-serif": "Figtree",
          },
        },
        mobileView: {
          list: [
            { value: 320, title: "iPhone 5" },
            { value: 360, title: "iPhone 6" },
            { value: 768, title: "iPad" },
          ],
        },
      },
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typing...",
      enableDragAndDropFileToEditor: true,
      height: 500,
      spellcheck: true,
    }),
    [placeholder]
  );

  const renderJobForm = () => (
    <>
      <h2 className="text-center font-bold text-5xl">Job Form</h2>
      <div className="flex gap-5 sm-to-xs:flex-wrap ">
        <Input
          name="title"
          label="Job Title :"
          type="text"
          value={job.title}
          onChange={(e) => handleInputChange(e, setJob)}
          placeholder="Job Title"
          required
        />
        <Input
          name="jobCategory"
          label="Job Category :"
          type="text"
          value={job.jobCategory}
          onChange={(e) => handleInputChange(e, setJob)}
          placeholder="Job Category"
          required
        />
      </div>
      <div className="flex gap-5 sm-to-xs:flex-wrap ">
        <TextAreaInput
          rows={6}
          name="jobDescription"
          label="Job Description :"
          type="text"
          value={job.jobDescription}
          onChange={(e) => handleInputChange(e, setJob)}
          placeholder="Job Description"
        />
      </div>
      <div className="flex gap-5 sm-to-xs:flex-wrap ">
        <Input
          name="location"
          label="Location :"
          type="text"
          value={job.location}
          onChange={(e) => handleInputChange(e, setJob)}
          placeholder="Location"
          required
        />
        <Input
          name="salary"
          label="Salary :"
          type="number"
          value={job.salary}
          onChange={(e) => handleInputChange(e, setJob)}
          placeholder="Salary"
        />
      </div>

      <div className="flex gap-5 sm-to-xs:flex-wrap ">
        <div className="w-full">
          <label
            htmlFor="jobType"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Job Type:
          </label>
          <select
            name="jobType"
            id="jobType"
            value={job.jobType}
            onChange={(e) => handleInputChange(e, setJob)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      </div>

      <div className="flex gap-5 sm-to-xs:flex-wrap ">
        <TextAreaInput
          name="requirements"
          label="Requirements :"
          value={job.requirements.join("\n")}
          onChange={(e) => handleTextAreaChange(e, setJob)}
          placeholder="Requirements"
          rows={3}
        />
        <TextAreaInput
          name="responsibilities"
          label="Responsibilities :"
          value={job.responsibilities.join("\n")}
          onChange={(e) => handleTextAreaChange(e, setJob)}
          placeholder="Responsibilities"
          rows={3}
        />
      </div>

      <div className="flex gap-5 sm-to-xs:flex-wrap ">
        <Input
          name="lastDateToApply"
          label="Last Date to Apply :"
          type="date"
          value={job.lastDateToApply}
          onChange={(e) => handleInputChange(e, setJob)}
          placeholder="Last Date to Apply"
        />
        <Input
          name="contactEmail"
          label="Contact Email :"
          type="email"
          value={job.contactEmail}
          onChange={(e) => handleInputChange(e, setJob)}
          placeholder="Contact Email"
        />
      </div>

      <div className="my-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Job Post Description:
        </label>
        <JoditEditor
          value={job.jobPostDescription}
          onChange={(value) =>
            handleJoditChange(value, "jobPostDescription", setJob)
          }
          ref={editor}
          config={config}
          tabIndex={1}
        />
      </div>
    </>
  );

  return (
    <>
      <main className="overflow-scroll h-dvh md-to-xs:h-auto p-10 sm-to-xs:p-5">
        <form
          onSubmit={(e) => handleSubmit(e, !company)}
          className="p-10 space-y-10 shadow-custom rounded-2xl"
        >
          {!company ? (
            <>
              <h2 className="text-center font-bold text-5xl">Company Form</h2>
              <div className="flex gap-5 sm-to-xs:flex-wrap ">
                <Input
                  name="companyName"
                  label="Company Name :"
                  type="text"
                  value={companyForm.companyName}
                  onChange={(e) => handleInputChange(e, setCompanyForm)}
                  placeholder="Company Name"
                  required
                />
                <Input
                  name="companyIndustry"
                  label="Company Industry :"
                  type="text"
                  value={companyForm.companyIndustry}
                  onChange={(e) => handleInputChange(e, setCompanyForm)}
                  placeholder="Company Industry"
                  required
                />
              </div>
              <div className="flex gap-5 sm-to-xs:flex-wrap ">
                <TextAreaInput
                  rows={6}
                  name="companyDescription"
                  label="Company Desc :"
                  type="text"
                  value={companyForm.companyDescription}
                  onChange={(e) => handleInputChange(e, setCompanyForm)}
                  placeholder="Company Description"
                />
              </div>
              <div className="flex gap-5 sm-to-xs:flex-wrap ">
                <Input
                  name="companyWebsite"
                  label="Company Website :"
                  type="url"
                  value={companyForm.companyWebsite}
                  onChange={(e) => handleInputChange(e, setCompanyForm)}
                  placeholder="Company Website"
                  required
                />
                <Input
                  name="linkedinPage"
                  label="LinkedIn Page :"
                  type="url"
                  value={companyForm.linkedinPage}
                  onChange={(e) => handleInputChange(e, setCompanyForm)}
                  placeholder="LinkedIn Page"
                />
              </div>
              <div className="flex gap-5 sm-to-xs:flex-wrap ">
                <Input
                  name="companyLogo"
                  label="Company Logo :"
                  type="text"
                  value={companyForm.companyLogo}
                  onChange={(e) => handleInputChange(e, setCompanyForm)}
                  placeholder="Company Logo"
                />
                <Input
                  name="numberOfEmployees"
                  label="Number of Employees :"
                  type="number"
                  value={companyForm.numberOfEmployees}
                  onChange={(e) => handleInputChange(e, setCompanyForm)}
                  placeholder="Number of Employees"
                  required
                />
              </div>

              <div className="my-4">
                <div className="my-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Company Description:
                  </label>
                  <JoditEditor
                    value={companyForm.companyPostDescription}
                    onChange={(value) =>
                      handleJoditChange(
                        value,
                        "companyPostDescription",
                        setCompanyForm
                      )
                    }
                    ref={editor}
                    config={config}
                    tabIndex={1}
                  />
                </div>
              </div>
            </>
          ) : (
            renderJobForm()
          )}
          {/* {renderJobForm()} */}
          <button
            type="submit"
            className="btn-green px-12 py-4 rounded-xl font-semibold"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </main>
      <style>
        {`
          main {
            overflow: hidden; /* This hides scroll bars on the main */
          }

          /* For WebKit (Chrome, Safari, etc.) */
          main::-webkit-scrollbar {
            display: none; /* Hide scrollbar */
          }

          /* For Firefox */
          main  {
            scrollbar-width: none; /* Hide scrollbar */
          }
        `}
      </style>
    </>
  );
};

export default CompanyJobForm;
