import React from "react";
import Status from "../status/Status";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../constants/Scroll";

function AboutHero() {
  const handleLinkClick = (id) => {
    setTimeout(() => scrollToSection(id, 2000), 100); // 2000ms = 2 seconds
  };
  return (
    <>
      <section
        className="p-[3%] relative"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div className="about-banner p-24 sm-to-xs:p-7 overflow-hidden">
          <div className=" max-w-[50%] md-to-xs:max-w-full">
            <h1 className="font-bold text-[4.5rem] sm-to-xs:text-[3rem]   leading-none mb-4">
              A team of experts dedicated to your needs
            </h1>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare.
            </p>
            <div className="flex flex-wrap gap-4 font-semibold ">
              <Link to="/contact" className="px-14 py-5 rounded-lg btn-red">
                Contact us
              </Link>
              <button
                onClick={() => handleLinkClick("AboutPoster")}
                className="px-14 py-5 rounded-lg btn-black"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
        <Status></Status>
      </section>
    </>
  );
}

export default AboutHero;
