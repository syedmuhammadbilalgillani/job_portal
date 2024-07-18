import React from "react";
import flower from "../../assets/flower.svg";

import flowersecbadge from "../../assets/flow-sec-badge.svg";
function JobBanner() {
  return (
    <>
      <main
        className="p-[5%]"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div className="rounded-2xl  bg-[#FFD2E8] relative h-[60vh]">
          <img
            loading="lazy"
            src={flowersecbadge}
            className="h-32 sm-to-xs:h-16 rotate-12 absolute badge"
            alt=""
          />
          <img
            loading="lazy"
            src={flower}
            className="absolute right-0 h-full"
            alt=""
          />
          <img
            loading="lazy"
            src={flower}
            className="absolute left-0 h-full scale-x-[-1]"
            alt=""
          />
          <div className="flex flex-col  h-full justify-center items-center *:z-10 text-center">
            <h1 className="font-bold text-[max(4vw,1.3rem)] ">
              Ready to become a Better Talent ?
            </h1>
            <p className="text-lg xs:text-sm gray py-5 max-w-[420px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
            <div>
              <button className="btn-red px-14 sm-to-xs:px-10 sm-to-xs:py-4 py-6 rounded-xl text-lg xs:text-sm1 font-semibold">
                Join us now
              </button>
            </div>
          </div>
        </div>
      </main>
      <style>
        {`
          .badge{
      margin-left: auto;
      margin-right: auto;
      top: -10%;
      bottom: auto;
      left: 0%;
      right: 0%;}`}
      </style>
    </>
  );
}

export default JobBanner;
