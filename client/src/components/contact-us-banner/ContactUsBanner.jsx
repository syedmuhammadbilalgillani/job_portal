import React from "react";
import contactpost from "../../assets/home-card.png";
import { useLocation } from "react-router-dom";

function ContactUsBanner({ children }) {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  return (
    <section
      className="p-[5%] overflow-hidden"
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <div className="grid grid-cols-2">
        <div
          className={`col-span-1 md-to-xs:col-span-full ${
            isAboutPage ? "hidden md-to-xs:block" : ""
          }`}
        >
          <img loading="lazy" src={contactpost} alt="Contact Us Banner" />
        </div>
        <div className="col-span-1 md-to-xs:col-span-full flex flex-col justify-center gap-9 h-full p-5">
          {children}
        </div>
        <div
          className={`col-span-1 md-to-xs:col-span-full ${
            isAboutPage ? "block md-to-xs:hidden" : "hidden"
          }`}
        >
          <img loading="lazy" src={contactpost} alt="Contact Us Banner" />
        </div>
      </div>
    </section>
  );
}

export default ContactUsBanner;
