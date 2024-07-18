import React from "react";
import bannerline from "../../assets/banner-line.svg";
import herobadge from "../../assets/hero-badge.svg";
import { Link, useLocation } from "react-router-dom";
import { scrollToSection } from "../../constants/Scroll";
function HomeHerosection() {
  const location = useLocation();
  const isAbout = location.pathname === "/about";
  const handleLinkClick = (id) => {
    setTimeout(() => scrollToSection(id, 2000), 100); // 2000ms = 2 seconds
  };

  return (
    <>
      <main
        id="hero-section"
        className="relative overflow-hidden "
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div className="absolute right-0 bottom-0 -z-0 md-to-xs:w-full">
          <img
            loading="lazy"
            src={herobadge}
            alt=""
            className={`-rotate-12 ${isAbout && "hidden"}`}
          />
          <img
            loading="lazy"
            src={bannerline}
            className="md-to-xs:w-[80vw] w-[40vw] float-end"
            alt=""
          />
        </div>
        <div className="flex flex-col  mt-[max(15vw,8rem)]  h-full gap-5 mx-20 sm:mx-3 xs:mx-3 *:z-[1]">
          <h1 className="font-bold text-[max(4.9vw,3.5rem)] leading-none max-w-[60%]">
            {isAbout ? (
              <div>Ready to find your dream job ?</div>
            ) : (
              <div> Find the right talent for your company</div>
            )}
          </h1>
          <p className="text-lg  max-w-[45%]">
            {isAbout ? (
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique.
              </span>
            ) : (
              <span>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor.
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-4 font-semibold ">
            <Link
              className="px-14 py-5 rounded-lg btn-green"
              to={isAbout ? "/jobs" : "/contact"}
            >
              {isAbout ? <span>Job offers</span> : <span> Contact Us</span>}
            </Link>
            <Link
              className="px-14 py-5 rounded-lg btn-black"
              to={isAbout && "/contact"}
              onClick={isAbout ? null : () => handleLinkClick("homeshift")}
            >
              {isAbout ? <span>Contact us</span> : <span>Learn more </span>}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomeHerosection;
