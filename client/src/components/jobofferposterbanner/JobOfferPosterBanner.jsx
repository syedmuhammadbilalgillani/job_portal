import React from "react";
import left from "../../assets/jobofferposterbannerleft.jpg";
import rightarrow from "../../assets/right-arrow.svg";
import rightbadge from "../../assets/right-side-job-poster-badge.svg";
import rightimage from "../../assets/right-side-job-poster-small-card.svg";
import { Link } from "react-router-dom";
import partner1 from "../../assets/partner1.jpeg";
import partner2 from "../../assets/partner2.jpeg";
import partner3 from "../../assets/partner3.jpeg";
import partner4 from "../../assets/partner4.jpeg";
import partner5 from "../../assets/partner5.jpeg";
function jobOfferPosterBanner() {
  const partner = {
    1: partner1,
    2: partner2,
    3: partner3,
    4: partner4,
    5: partner5,
  };
  return (
    <>
      <section
        className="px-[5%] bg-white overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        // data-aos-anchor-placement="bottom-bottom"
      >
        <div className="grid grid-cols-2 gap-7">
          <div className="col-span-1 md-to-xs:col-span-full">
            <h1 className="text-6xl font-bold">Key features of our approach</h1>
          </div>
          <div className="col-span-1 md-to-xs:col-span-full">
            <p className="gray flex items-end h-full text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3  gap-5 py-20 h-full ">
          <div className="col-span-1  md-to-xs:col-span-full flex flex-col gap-5">
            <div className="bg-skin px-7 py-5 rounded-xl">
              <h3 className="font-semibold text-4xl py-5">
                Connect with opportunities
              </h3>
              <p className="gray text-lg font-medium py-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius.
              </p>
              <img loading="lazy" src={left} className="rounded-xl" alt="" />
            </div>
            <Link
              to="postJobOffer"
              className="btn-pink flex justify-between items-end hover:shadow-lg w-full text-start p-5 rounded-xl text-3xl font-semibold"
            >
              <div>
                Unlock your potential <br />
                <span className="text-[#ff3838]">now</span>
              </div>
            </Link>
          </div>
          <div className="col-span-2 space-y-5   md-to-xs:col-span-full h-full">
            <div className="right-job-poster py-5 space-y-14">
              <div className="flex justify-end w-full">
                <img
                  loading="lazy"
                  src={rightbadge}
                  className=" p-5 h-[8rem]"
                  alt=""
                />
              </div>
              <div className="grid grid-cols-2">
                <h1 className="text-4xl col-span-1 md-to-xs:col-span-full p-3">
                  Transforming candidates into leaders
                </h1>
                <p className="col-span-1 md-to-xs:col-span-full p-3 text-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 ">
              <div className="col-span-1 md-to-xs:col-span-full">
                <div className="bg-dark-green rounded-xl p-5 flex flex-col gap-5 text-white">
                  <h1 className="font-semibold text-3xl   ">
                    Partnering with leading companies.
                  </h1>
                  <p className="font-medium text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse varius.
                  </p>
                  <div className="mt-5 space-y-2">
                    <h5 className="uppercase text-[#4ede79] font-semibold">
                      partners
                    </h5>
                    <div className="flex">
                      {Object.keys(partner).map((key) => (
                        <img
                          loading="lazy"
                          className="h-10 rounded-[100%]"
                          key={key}
                          src={partner[key]}
                          alt=""
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 md-to-xs:col-span-full">
                <div className="bg-[#4ede79] rounded-xl">
                  <img
                    loading="lazy"
                    src={rightimage}
                    alt=""
                    className="w-full "
                  />
                  <h2 className="text-white text-3xl p-6 text-center font-semibold">
                    Stay ahead of the curve with our insights.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default jobOfferPosterBanner;
