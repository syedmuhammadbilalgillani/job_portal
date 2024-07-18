import React from "react";

import { scrollToSection } from "../../constants/Scroll";
function ContactUsBanner({ children }) {
  const handleLinkClick = (id) => {
    setTimeout(() => scrollToSection(id, 2000), 100); // 2000ms = 2 seconds
  };
  return (
    <>
      <section
        className="footer-banner relative my-[10vh] overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="2000"
      >
        {children}
      </section>
    </>
  );
}

export default ContactUsBanner;
