import React from "react";
import mapicon from "../../assets/map-svg.svg";
import docicon from "../../assets/doc.svg";
import orgicon from "../../assets/amazon-logo.svg";
import { CardData } from "../../constants/JobCardData";
function JobCard() {
  // console.log(item, "item");
  return (
    <>
      {CardData.map((item, index) => (
        <div className="col-span-1 md-to-xs:col-span-full" key={index}>
          <div className="shadow-form rounded-2xl px-7 py-7">
            <div className="flex flex-wrap justify-between items-center pb-5 ">
              <h2 className="font-semibold text-[2.5rem]">{item.jobTitle}</h2>
              <span className="bg-green-200 gray px-6 py-3 rounded-md">
                {item.jobDepartment}
              </span>
            </div>
            <p className="gray text-lg font-medium pb-5">{item.jobDesc}</p>
            <div className="pb-5 flex items-center gap-8 uppercase text-sm">
              <div className="flex flex-wrap items-center gap-4">
                <span>
                  <img loading="lazy" className="h-7" src={mapicon} alt="" />
                </span>
                <h6 className="gray font-medium">{item.jobLocation}</h6>
              </div>
              <div className="flex items-center flex-wrap gap-4">
                <span>
                  <img loading="lazy" className="h-7" src={docicon} alt="" />
                </span>
                <h6 className="gray font-medium">{item.jobType}</h6>
              </div>
              <div className="flex items-center flex-wrap gap-4">
                <span>
                  <img loading="lazy" className="h-7" src={orgicon} alt="" />
                </span>
                <h6 className="gray font-medium">{item.jobCompany}</h6>
              </div>
            </div>
            <div className="pb-5">
              <button className="btn-green px-8 py-3 rounded-lg">
                Learn more
              </button>
            </div>
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
