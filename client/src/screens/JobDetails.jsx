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

function JobDetails() {
  const { id } = useParams();

  const { companies } = useCompanyJob();
  const [job, setJob] = useState(null);
  const { role, isAuthenticated } = useAuth();
  const { applyForJob } = useJobApplicationContext();
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

  const getCompanyLogo = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyLogo : "Unknown";
  };

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyName : "Unknown";
  };

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/job/readJob/${id}`
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
        `http://localhost:3000/api/v1/job/updateJob/${id}`,
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
      <main
        className="bg-[#FDF8F3] px-[5%] py-[10%] space-y-10"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        {(role === "admin" || role === "jobSeeker") && (
          <div className="">
            <p className="mb-6 gray uppercase">
              upload image in gallery and copy path for handle image in
              texteditor
            </p>
            <Link to="/gallery" className="btn-black px-10 py-5 rounded-xl">
              Gallery
            </Link>
          </div>
        )}

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
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="form-input"
                      />
                      <input
                        type="text"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        placeholder="jobDescription"
                        className=""
                      />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="location"
                        className=""
                      />
                      <input
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
                      <img src={getCompanyLogo(job.companyLogo)} alt="" />
                    </div>
                    <div className="flex flex-col justify-between items-start h-full py-1">
                      <p className="text-green-400 text-xl font-semibold">
                        {getCompanyName(job.companyLogo)}
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: job.jobPostDescription,
                  }}
                />
                <div className="flex gap-5 mt-4">
                  {role === "admin" && (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="btn-green px-12 py-5 font-semibold rounded-lg mt-4"
                    >
                      Edit Job
                    </button>
                  )}
                  {isAuthenticated ? (
                    <button
                      onClick={() => applyForJob(job._id)}
                      className="btn-black px-12 py-5 font-semibold rounded-lg "
                    >
                      Apply now
                    </button>
                  ) : (
                    <Link
                      className="btn-black px-12 py-5 font-semibold rounded-lg "
                      to="/login"
                    >
                      {" "}
                      Apply now
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="col-span-1 md-to-xs:col-span-full h-fit p-[5%] space-y-3 bg-white shadow-custom rounded-xl px-5 sticky top-10">
            <h2 className="font-semibold text-4xl">Interested in this job ?</h2>
            <p className="gray text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>

            {isAuthenticated ? (
              <button
                onClick={() => applyForJob(job._id)}
                className="btn-black px-12 py-5 font-semibold rounded-lg"
              >
                Apply now
              </button>
            ) : (
              <button className="btn-black font-semibold rounded-lg py-5">
                <Link to="/login" className="px-12  ">
                  {" "}
                  Apply now
                </Link>
              </button>
            )}
          </div>
        </section>
      </main>
      <JobPageBanner />
    </>
  );
}

export default JobDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Loader from "../components/Loader/Loader";
// import axios from "axios";
// import { useCompanyJob } from "../context/CompanyJobContext";
// import moment from "moment";
// import JobPageBanner from "../components/jobpagebanner/JobPageBanner";
// function JobDetails() {
//   const { id } = useParams();
//   const { companies } = useCompanyJob();
//   const [job, setJob] = useState(null);

//   const getCompanyLogo = (companyId) => {
//     const company = companies.find((company) => company._id === companyId);
//     return company ? company.companyLogo : "Unknown";
//   };

//   const getCompanyName = (companyId) => {
//     const company = companies.find((company) => company._id === companyId);
//     return company ? company.companyName : "Unknown";
//   };

//   useEffect(() => {
//     const fetchJobById = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/v1/job/readJob/${id}`
//         );

//         setJob(response.data);
//       } catch (error) {
//         console.error("Error fetching company:", error);
//       }
//     };

//     fetchJobById();
//   }, [id]);
//   if (!job) {
//     return <Loader />;
//   }
//   const formatDate = (dateString) => {
//     return moment(dateString).fromNow();
//   };
//   return (
//     <>
//       <main
//         className="bg-[#FDF8F3] px-[5%] py-[10%]"
//         data-aos="fade-up"
//         data-aos-delay="50"
//         data-aos-duration="1000"
//       >
//         <section className="grid grid-cols-3  gap-5">
//           <div className="col-span-2  bg-white shadow-custom rounded-xl p-6">
//             <div className="flex justify-between">
//               <div className="flex justify-center items-center gap-8">
//                 <div className="p-4 inline-block border shadow-custom rounded-2xl">
//                   <img src={getCompanyLogo(job.companyLogo)} alt="" />
//                 </div>
//                 <div className="flex flex-col justify-between items-start h-full py-1">
//                   <p className="text-green-400 text-xl font-semibold">
//                     {getCompanyName(job.companyLogo)}
//                   </p>
//                   <h1 className="font-semibold text-3xl">{job.title}</h1>
//                   <h3 className="gray bg-gray-200 w-fit  px-4 text-sm py-1.5 rounded-md">
//                     {job.jobCategory}
//                   </h3>
//                 </div>
//               </div>
//               <div className="gray font-medium - tracking-wider uppercase">
//                 {formatDate(job.postedDate)}
//               </div>
//             </div>
//             <hr className="my-10" />
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: job.jobPostDescription,
//               }}
//             />
//             <button className="btn-green px-12 py-5 font-semibold rounded-lg mt-4 ">
//               Apply now
//             </button>
//           </div>

//           <div className="col-span-1 h-fit p-[5%] space-y-3 bg-white shadow-custom rounded-xl px-5 sticky top-10">
//             <h2 className="font-semibold text-4xl">Interested in this job ?</h2>
//             <p className="gray text-lg">
//               {" "}
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//               Suspendisse varius enim in eros elementum tristique.
//             </p>
//             <button className="btn-black px-12 py-5 font-semibold rounded-lg ">
//               Apply now
//             </button>
//           </div>
//         </section>
//       </main>
//       <JobPageBanner></JobPageBanner>
//     </>
//   );
// }

// export default JobDetails;
