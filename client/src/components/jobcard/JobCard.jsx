import React from "react";
import docicon from "../../assets/doc.svg";
import mapicon from "../../assets/map-svg.svg";

import { Link } from "react-router-dom";
function JobCard() {
  // const { jobs, companies } = useCompanyJob();
  // const { companies } = useCompanyJob();
  const companies = [
    {
      _id: "67c9d59d82a113e01946a2fa",
      createdBy: "67c9d54a82a113e01946a279",
      companyName: "Apple",
      companyIndustry: "Velez Ward Traders",
      companyWebsite: "https://www.loquna.com",
      linkedinPage: "https://www.volojenyliboc.org.au",
      companyLogo:
        "https://cdn.prod.website-files.com/66277a0e9303f0424cbe9fa6/664703387d3dd83b53b48a85_Apple%20Logo.svg",
      numberOfEmployees: 202,
      companyDescription: "Enim fugiat ad optio",
      companyPostDescription: "",
      approvalStatus: "approved",
      createdAt: "2025-03-06T17:04:29.213Z",
      updatedAt: "2025-03-06T17:04:41.417Z",
      __v: 0,
    },
  ];
  // console.log(item, "item");
  const getCompanyLogo = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyLogo : "Unknown";
  };
  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company._id === companyId);
    return company ? company.companyName : "Unknown";
  };
  // if (jobs.lenght === 0) return <h1>No Jobs Posted</h1>;
  const dummyJobs = [
    {
      _id: "67c9d66882a113e01946a331",
      title: "Senior Engineer",
      jobCategory: "Development",
      jobDescription:
        "Join Amazon's team and contribute to the development of advanced technologies.",
      jobPostDescription:
        '<p>Join Amazon\'s team and contribute to the development of advanced technologies. Design and implement machine learning algorithms for perception, prediction, and decision-making of applications.</p><p><br></p><ol><li style="margin-left: 30px;">Competitive salary</li><li style="margin-left: 30px;">Stock options</li><li style="margin-left: 30px;">Health insurance</li><li style="margin-left: 30px;">Employee discounts</li><li style="margin-left: 30px;">Opportunities to work on cutting-edge technologies.</li></ol><p><br></p><p>Are you passionate about harnessing the power of machine learning to solve complex problems and drive innovation? Join our team of machine learning engineers where you\'ll apply your expertise in algorithm development, model training, and deployment to build scalable and efficient machine learning solutions. As a machine learning engineer, you\'ll collaborate with data scientists and software engineers to gather and preprocess data, train models, and integrate them into production systems. You\'ll continuously evaluate model performance, optimize algorithms, and explore new techniques to drive innovation in machine learning applications across our organization. From natural language processing to computer vision, you\'ll have the opportunity to work on a diverse range of projects that push the boundaries of AI technology and drive business impact.</p>',
      companyId: "67c9d59d82a113e01946a2fa",
      location: "New York",
      salary: null,
      jobType: "Part-time",
      requirements: [""],
      responsibilities: [""],
      lastDateToApply: null,
      contactEmail: "",
      approvalStatus: "approved",
      postedDate: "2025-03-06T17:07:52.791Z",
      __v: 0,
    },
    {
      _id: "67c9dc79e6c891e26996e7b0",
      title: "UX/UI Designer",
      jobCategory: "Design",
      jobDescription:
        "Exciting opportunity for a talented UX/UI Designer to join Apple's renowned design team in Cupertino, California.\n\n",
      jobPostDescription:
        '<p>Be part of Apple\'s design team and create intuitive user experiences for our range of products and services. Collaborate with cross-functional teams to conceptualize, design, and implement innovative solutions that elevate the Apple brand.</p><p><br></p><ul><li style="margin-left: 20px;">Competitive salary</li><li style="margin-left: 20px;">Employee stock purchase plan</li><li style="margin-left: 20px;">Health and wellness programs</li><li style="margin-left: 20px;">Product discounts</li><li style="margin-left: 20px;">Generous vacation time.</li><li>Are you a creative thinker with a passion for crafting user-centered design solutions that delight and inspire? As a UI/UX designer, you\'ll join our team of talented designers to create intuitive and visually stunning user interfaces for our digital products. Leveraging your expertise in user experience design principles, you\'ll collaborate closely with product managers, developers, and stakeholders to understand user needs, define design requirements, and translate them into elegant and user-friendly interfaces. From wireframes to prototypes, you\'ll iteratively design and refine solutions, incorporating feedback and user insights to deliver exceptional experiences that elevate our products above the competition.</li></ul>',
      companyId: "67c9d59d82a113e01946a2fa",
      location: "California",
      salary: null,
      jobType: "Full-time",
      requirements: ["1 year experience"],
      responsibilities: ["Design Logo and Website UI "],
      lastDateToApply: "2025-03-28T00:00:00.000Z",
      contactEmail: "wemeqiq@mailinator.com",
      approvalStatus: "approved",
      postedDate: "2025-03-06T17:33:45.205Z",
      __v: 0,
    },
  ];
  return (
    <>
      {dummyJobs.map((item) => (
        <div className="col-span-1 md-to-xs:col-span-full" key={item._id}>
          <div className="shadow-form rounded-2xl px-7 py-7">
            <div className="flex flex-wrap justify-between items-center pb-5 ">
              <h2 className="font-semibold text-[2.5rem]">{item.title}</h2>
              <span className="bg-green-200 gray px-6 py-3 rounded-md uppercase">
                {item.jobCategory}
              </span>
            </div>
            <p className="gray text-lg font-medium pb-5">
              {item.jobDescription}
            </p>
            <div className="pb-5 flex items-center gap-8 uppercase text-sm">
              <div className="flex flex-wrap items-center gap-4">
                <span>
                  <img loading="lazy" className="h-7" src={mapicon} alt="" />
                </span>
                <h6 className="gray font-medium uppercase">{item.location}</h6>
              </div>
              <div className="flex items-center flex-wrap gap-4">
                <span>
                  <img loading="lazy" className="h-7" src={docicon} alt="" />
                </span>
                <h6 className="gray font-medium uppercase">{item.jobType}</h6>
              </div>
              <div className="flex items-center flex-wrap gap-4">
                <span>
                  <img
                    loading="lazy"
                    className="h-7"
                    src={getCompanyLogo(item.companyId)}
                    alt=""
                  />
                </span>
                <h6 className="gray font-medium">
                  {getCompanyName(item.companyId)}
                </h6>
              </div>
            </div>
            <button className="btn-green py-3 rounded-lg">
              <Link
                className=" w-fit px-8 py-3 "
                to={`/job/${item._id}`}
                // onClick={() => handleLinkClick(`companiesDetail`)} // Use company ID for dynamic URL
              >
                Read more
              </Link>
            </button>
          </div>
        </div>
      ))}

      <style>
        {`
          .shadow-form{
          box-shadow: 0 2px 20px rgba(19, 31, 24, .15);
          }
          `}
      </style>
    </>
  );
}

export default JobCard;
