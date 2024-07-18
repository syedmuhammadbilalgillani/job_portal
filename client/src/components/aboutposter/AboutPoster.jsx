import React from "react";
import aboutsec1img from "../../assets/about-sec1.png";
function AboutPoster() {
  return (
    <>
      <section
        id="AboutPoster"
        className="p-[5%]"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1 md-to-xs:col-span-full">
            <img loading="lazy" src={aboutsec1img} alt="" />
          </div>
          <div className="col-span-1 md-to-xs:col-span-full">
            <div className="flex flex-col justify-center h-full space-y-12">
              <h1 className="text-5xl font-bold ">
                Unlocking your potential benefits
              </h1>
              <p className="gray text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="gray text-lg">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPoster;
