import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useCompanyJob } from "../context/CompanyJobContext";
import moment from "moment";
import JobPageBanner from "../components/jobpagebanner/JobPageBanner";
import JoditEditor from "jodit-react";
import { useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";
import { useJobApplicationContext } from "../context/JobApplicationContext";
import { useToast } from "../context/ToastContext/ToastContext";
import Input from "../components/Input/Input";
import TextAreaInput from "../components/Input/TextAreaInput";

function JobDetails() {
  const { id } = useParams();
  const showToast = useToast();
  const { fetchCompanies, companies } = useCompanyJob();
  // const { fetchCompanies } = useCompanyJob();
  const [job, setJob] = useState(null);
  const { role, isAuthenticated } = useAuth();
  const { CVExists, applyForJob } = useJobApplicationContext();
  const [formData, setFormData] = useState({
    title: "",
    jobCategory: "",
    jobDescription: "",
    jobPostDescription: "",
    companyLogo: "",
    location: "",
    salary: 0,
    jobType: "Full-time",
    requirements: [],
    responsibilities: [],
    lastDateToApply: "",
    contactEmail: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCVFormVisible, setIsCVFormVisible] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);
  // const companies = [
  //   {
  //     _id: "67c9d59d82a113e01946a2fa",
  //     createdBy: "67c9d54a82a113e01946a279",
  //     companyName: "Apple",
  //     companyIndustry: "Velez Ward Traders",
  //     companyWebsite: "https://www.loquna.com",
  //     linkedinPage: "https://www.volojenyliboc.org.au",
  //     companyLogo:
  //       "https://cdn.prod.website-files.com/66277a0e9303f0424cbe9fa6/664703387d3dd83b53b48a85_Apple%20Logo.svg",
  //     numberOfEmployees: 202,
  //     companyDescription: "Enim fugiat ad optio",
  //     companyPostDescription: "",
  //     approvalStatus: "approved",
  //     createdAt: "2025-03-06T17:04:29.213Z",
  //     updatedAt: "2025-03-06T17:04:41.417Z",
  //     __v: 0,
  //   },
  // ];
  const getCompanyLogo = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyLogo : "Unknown";
  };
  // console.log(jobsAdmin);
  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyName : "Unknown";
  };

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const response = await axios.get(
          `https://bettertalentserver.vercel.app/api/v1/job/readJob/${id}`
        );
        setJob(response.data);
        setFormData({
          ...response.data,
          lastDateToApply: moment(response.data.lastDateToApply).format(
            "YYYY-MM-DD"
          ),
        });
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJobById();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoditChange = (value) => {
    setFormData({ ...formData, jobPostDescription: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://bettertalentserver.vercel.app/api/v1/job/updateJob/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
          },
        }
      );
      setJob(response.data);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  if (!job) {
    return <Loader />;
  }

  const formatDate = (dateString) => {
    return moment(dateString).fromNow();
  };

  return (
    <>
      {!isCVFormVisible ? (
        <main
          className="bg-[#FDF8F3] px-[5%] py-[10%] space-y-10 "
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
        >
          <section className="grid grid-cols-3 gap-5">
            <div className="col-span-2 md-to-xs:col-span-full bg-white shadow-custom rounded-xl p-6">
              {isEditMode ? (
                <form onSubmit={handleUpdate}>
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-8">
                      <div className="p-4 inline-block border shadow-custom rounded-2xl">
                        <img src={getCompanyLogo(job.companyLogo)} alt="" />
                      </div>
                      <div className="flex flex-col justify-between items-start h-full py-1">
                        <p className="text-green-400 text-xl font-semibold">
                          {getCompanyName(job.companyLogo)}
                        </p>
                        <Input
                          required={true}
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          placeholder="Title"
                          className="form-input"
                        />
                        <Input
                          required={true}
                          type="text"
                          name="jobDescription"
                          value={formData.jobDescription}
                          onChange={handleChange}
                          placeholder="jobDescription"
                          className=""
                        />
                        <Input
                          required={true}
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="location"
                          className=""
                        />
                        <Input
                          required={true}
                          type="text"
                          name="jobCategory"
                          value={formData.jobCategory}
                          onChange={handleChange}
                          placeholder="Job Category"
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="gray font-medium tracking-wider uppercase">
                      {formatDate(job.postedDate)}
                    </div>
                  </div>
                  <hr className="my-10" />
                  <div className="my-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Job Post Description:
                    </label>
                    <JoditEditor
                      value={formData.jobPostDescription}
                      onChange={handleJoditChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-green px-12 py-5 font-semibold rounded-lg mt-4"
                  >
                    Update Job
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditMode(false)}
                    className="btn-gray px-12 py-5 font-semibold rounded-lg mt-4"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex justify-between">
                    <div className="flex justify-center items-center gap-8">
                      <div className="p-4 inline-block border shadow-custom rounded-2xl">
                        <img src={getCompanyLogo(job.companyId)} alt="" />
                      </div>
                      <div className="flex flex-col justify-between items-start h-full py-1">
                        <p className="text-green-400 text-xl font-semibold">
                          {getCompanyName(job.companyId)}
                        </p>
                        <h1 className="font-semibold text-3xl">{job.title}</h1>
                        <h3 className="gray bg-gray-200 w-fit px-4 text-sm py-1.5 rounded-md">
                          {job.jobCategory}
                        </h3>
                      </div>
                    </div>
                    <div className="gray font-medium tracking-wider uppercase">
                      {formatDate(job.postedDate)}
                    </div>
                  </div>
                  <hr className="my-10" />

                  {/* Parent container for styled fields */}
                  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fas fa-map-marker-alt text-gray-600"></i>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fas fa-rupee-sign text-gray-600"></i>
                      <p className="text-sm text-gray-500">{job.salary}</p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fas fa-briefcase text-gray-600"></i>
                      <p className="text-sm text-gray-500">{job.jobType}</p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fas fa-calendar-alt text-gray-600"></i>
                      <p className="text-sm text-gray-500">
                        {job.lastDateToApply
                          ? formatDate(job.lastDateToApply)
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <i className="fas fa-envelope text-gray-600"></i>
                      <p className="text-sm text-gray-500">
                        {job.contactEmail}
                      </p>
                    </div>
                  </div>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: job.jobPostDescription,
                    }}
                    className="mt-6"
                  />

                  <div className="mt-4">
                    <h4 className="font-semibold text-lg">Requirements:</h4>
                    <ul className="list-disc list-inside">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="text-gray-500">
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-lg">Responsibilities:</h4>
                    <ul className="list-disc list-inside">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="text-gray-500">
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-5 mt-4">
                    {role === "admin" && (
                      <button
                        onClick={() => setIsEditMode(true)}
                        className="btn-green px-12 py-5 font-semibold rounded-lg mt-4"
                      >
                        Edit Job
                      </button>
                    )}
                    {/* {isAuthenticated ? (
                    role === "employer" ? (
                      <button
                        onClick={() => applyForJob(job._id)}
                        className="btn-black px-12 py-5 font-semibold rounded-lg"
                      >
                        Apply now
                      </button>
                    ) : (
                      <Link
                        className="btn-black px-12 py-5 font-semibold rounded-lg"
                        to="/"
                      >
                        Apply now
                      </Link>
                    )
                  ) : (
                    <Link
                      className="btn-black px-12 py-5 font-semibold rounded-lg"
                      to="/login"
                    >
                      Apply now
                    </Link>
                  )} */}
                  </div>
                </>
              )}
            </div>

            <div className="col-span-1 md-to-xs:col-span-full h-fit p-[5%] space-y-3 bg-white shadow-custom rounded-xl px-5 sticky top-10">
              <h2 className="font-semibold text-4xl">
                Interested in this job ?
              </h2>
              <p className="gray text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </p>

              {isAuthenticated ? (
                role === "employer" ? (
                  CVExists ? (
                    <button
                      onClick={() => applyForJob(job._id)}
                      className="btn-black px-12 py-5 font-semibold rounded-lg"
                    >
                      Apply now
                    </button>
                  ) : (
                    <button
                      className="btn-black px-12 py-5 font-semibold rounded-lg"
                      onClick={() => setIsCVFormVisible(true)}
                    >
                      Apply now
                    </button>
                  )
                ) : (
                  <button className="py-5">
                    <Link
                      style={{ marginTop: 5 }}
                      className="btn-black px-12 py-5  font-semibold rounded-lg"
                      to="/"
                      onClick={() =>
                        showToast("Plear login as an empolyer", "error")
                      }
                    >
                      Apply now
                    </Link>
                  </button>
                )
              ) : (
                <>
                  <button className="py-5">
                    <Link
                      className="btn-black px-12 py-5 font-semibold rounded-lg ml-1" // Adjust the `mt-*` class as needed
                      to="/login"
                      onClick={() => showToast("Please Login First", "error")}
                    >
                      Apply now
                    </Link>
                  </button>
                </>
              )}
            </div>
          </section>
        </main>
      ) : (
        <ResumeForm jobId={job._id} />
      )}

      <JobPageBanner />
    </>
  );
}

export default JobDetails;

export function ResumeForm({ jobId }) {
  const apiUrl = import.meta.env.VITE_API_KEY;
  const token = Cookies.get("AUTH_TOKEN");
  const showToast = useToast();
  const [cvData, setCvData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
    },
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ],
    skills: [],
    projects: [
      {
        title: "",
        description: "",
        link: "",
      },
    ],
    certifications: [
      {
        title: "",
        institution: "",
        date: "",
      },
    ],
  });
  const { applyForJob } = useJobApplicationContext();
  const handleInputChange = (e, section, index = null, subField = null) => {
    const { name, value } = e.target;
    if (index !== null && subField !== null) {
      setCvData((prevState) => ({
        ...prevState,
        [section]: prevState[section].map((item, i) =>
          i === index ? { ...item, [subField]: value } : item
        ),
      }));
    } else {
      setCvData((prevState) => ({
        ...prevState,
        [section]: { ...prevState[section], [name]: value },
      }));
    }
  };

  const addNewEntry = (section) => {
    let newEntry;
    switch (section) {
      case "education":
        newEntry = {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startYear: "",
          endYear: "",
        };
        break;
      case "experience":
        newEntry = {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          responsibilities: "",
        };
        break;
      case "projects":
        newEntry = {
          title: "",
          description: "",
          link: "",
        };
        break;
      case "certifications":
        newEntry = {
          title: "",
          institution: "",
          date: "",
        };
        break;
      default:
        return;
    }
    setCvData((prevState) => ({
      ...prevState,
      [section]: [...prevState[section], newEntry],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/cv/createCV`, cvData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await applyForJob(jobId);
      showToast(response.data.message, "success");
    } catch (error) {
      showToast(error?.message, "error");
    }
  };

  return (
    <div className=" relative grid grid-cols-3 sm-to-xs:grid-cols-1 gap-5 max-w-[90vw] min-h-dvh mx-auto">
      <div className="col-span-1 md:col-span-3 py-20">
        <Link to="/" className="absolute top-10 left-10 ">
          <i className="fa-duotone fa-solid fa-angles-left fa-2xl"></i>
        </Link>
        <div className="py-5">
          <h1 className="text-4xl font-bold leading-none">
            Find Your Dream Job Today
          </h1>
          <p className="text-lg text-gray-600 mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
      </div>
      <div className="col-span-2 md:col-span-3 ">
        <form
          onSubmit={handleSubmit}
          className="shadow-custom p-[5%] m-[5%] rounded-3xl"
        >
          <h2 className="gray font-semibold text-3xl">Personal Information</h2>
          <div className="grid grid-cols-2 sm-to-xs:grid-cols-1 gap-4">
            <Input
              required={true}
              type="text"
              name="name"
              placeholder="Name"
              value={cvData.personalInfo.name}
              onChange={(e) => handleInputChange(e, "personalInfo")}
            />
            <Input
              required={true}
              type="email"
              name="email"
              placeholder="Email"
              value={cvData.personalInfo.email}
              onChange={(e) => handleInputChange(e, "personalInfo")}
            />
            <Input
              required={true}
              type="text"
              name="phone"
              placeholder="Phone"
              value={cvData.personalInfo.phone}
              onChange={(e) => handleInputChange(e, "personalInfo")}
            />
            <Input
              required={true}
              type="text"
              name="address"
              placeholder="Address"
              value={cvData.personalInfo.address}
              onChange={(e) => handleInputChange(e, "personalInfo")}
            />
            <Input
              required={true}
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={cvData.personalInfo.linkedin}
              onChange={(e) => handleInputChange(e, "personalInfo")}
            />
            <Input
              required={true}
              type="text"
              name="github"
              placeholder="GitHub"
              value={cvData.personalInfo.github}
              onChange={(e) => handleInputChange(e, "personalInfo")}
            />
            <div className="m-3 border-b border-b-gray-400 col-span-full" />
          </div>

          <h2 className="gray font-semibold text-3xl">Education</h2>
          {cvData.education.map((edu, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm-to-xs:grid-cols-1 gap-4"
            >
              <Input
                required={true}
                type="text"
                name="institution"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "institution")
                }
              />
              <Input
                required={true}
                type="text"
                name="degree"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "degree")
                }
              />
              <Input
                required={true}
                type="text"
                name="fieldOfStudy"
                placeholder="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "fieldOfStudy")
                }
              />
              <Input
                required={true}
                type="number"
                name="startYear"
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "startYear")
                }
              />
              <Input
                required={true}
                type="number"
                name="endYear"
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) =>
                  handleInputChange(e, "education", index, "endYear")
                }
              />
              <div className="m-3 border-b border-b-gray-400 col-span-full" />
            </div>
          ))}
          <button
            type="button"
            className="fa-duotone fa-solid fa-circle-plus fa-xl m-2 flex justify-center items-center w-full"
            onClick={() => addNewEntry("education")}
          ></button>
          <div className="m-3 border-b border-b-gray-400 col-span-full" />

          <h2 className="gray font-semibold text-3xl">Experience</h2>
          {cvData.experience.map((exp, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm-to-xs:grid-cols-1 gap-4"
            >
              <Input
                required={true}
                type="text"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "company")
                }
              />
              <Input
                required={true}
                type="text"
                name="position"
                placeholder="Position"
                value={exp.position}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "position")
                }
              />
              <Input
                required={true}
                type="date"
                name="startDate"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "startDate")
                }
              />
              <Input
                required={true}
                type="date"
                name="endDate"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "endDate")
                }
              />
              <TextAreaInput
                required={true}
                name="responsibilities"
                placeholder="Responsibilities"
                value={exp.responsibilities}
                onChange={(e) =>
                  handleInputChange(e, "experience", index, "responsibilities")
                }
                className="col-span-full"
              />
              <div className="m-3 border-b border-b-gray-400 col-span-full" />
            </div>
          ))}

          <button
            type="button"
            className="fa-duotone fa-solid fa-circle-plus fa-xl m-2 flex justify-center items-center w-full"
            onClick={() => addNewEntry("experience")}
          ></button>
          <div className="m-3 border-b border-b-gray-400 col-span-full" />

          <h2 className="gray font-semibold text-3xl">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              required={true}
              type="text"
              placeholder="Skills (comma-separated)"
              value={cvData.skills.join(", ")}
              onChange={(e) =>
                setCvData({
                  ...cvData,
                  skills: e.target.value
                    .split(", ")
                    .map((skill) => skill.trim()),
                })
              }
            />
            <div className="m-3 border-b border-b-gray-400 col-span-full" />
          </div>

          <h2 className="gray font-semibold text-3xl">Projects</h2>
          {cvData.projects.map((proj, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm-to-xs:grid-cols-1 gap-4"
            >
              <Input
                required={true}
                type="text"
                name="title"
                placeholder="Title"
                value={proj.title}
                onChange={(e) =>
                  handleInputChange(e, "projects", index, "title")
                }
              />
              <Input
                required={true}
                type="text"
                name="link"
                placeholder="Link"
                value={proj.link}
                onChange={(e) =>
                  handleInputChange(e, "projects", index, "link")
                }
              />
              <TextAreaInput
                required={true}
                name="description"
                className="col-span-full"
                placeholder="Description"
                value={proj.description}
                onChange={(e) =>
                  handleInputChange(e, "projects", index, "description")
                }
              />
              <div className="m-3 border-b border-b-gray-400 col-span-full" />
            </div>
          ))}
          <button
            type="button"
            className="fa-duotone fa-solid fa-circle-plus fa-xl m-2 flex justify-center items-center w-full"
            onClick={() => addNewEntry("projects")}
          ></button>
          <div className="m-3 border-b border-b-gray-400 col-span-full" />

          <h2 className="gray font-semibold text-3xl">Certifications</h2>
          {cvData.certifications.map((cert, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm-to-xs:grid-cols-1 gap-4"
            >
              <Input
                required={true}
                type="text"
                name="title"
                placeholder="Title"
                value={cert.title}
                onChange={(e) =>
                  handleInputChange(e, "certifications", index, "title")
                }
              />
              <Input
                required={true}
                type="text"
                name="institution"
                placeholder="Institution"
                value={cert.institution}
                onChange={(e) =>
                  handleInputChange(e, "certifications", index, "institution")
                }
              />
              <Input
                required={true}
                type="date"
                name="date"
                placeholder="Date"
                value={cert.date}
                onChange={(e) =>
                  handleInputChange(e, "certifications", index, "date")
                }
              />

              <div className="m-3 border-b border-b-gray-400 col-span-full" />
            </div>
          ))}
          <button
            type="button"
            className="fa-duotone fa-solid fa-circle-plus fa-xl m-2 flex justify-center items-center w-full"
            onClick={() => addNewEntry("certifications")}
          ></button>
          <div className="m-3 border-b border-b-gray-400 col-span-full" />

          <button
            type="submit"
            className="mt-4 p-2 btn-green w-full text-white rounded-lg"
          >
            Submit CV
          </button>
        </form>
      </div>
    </div>
  );
}
