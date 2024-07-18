import React from "react";
import logo from "../../assets/logo.svg";

import facebook from "../../assets/facebook.svg";
import linden from "../../assets/linden.svg";
import mail from "../../assets/mail.svg";
import { Link } from "react-router-dom";
import { scrollToSection } from "../../constants/Scroll";
function Footer() {
  const footerLinks = [
    {
      col: {
        title: "Quick Links",
        links: [
          { name: "Home", path: "/", id: "Home" },
          { name: "About Us", path: "/about", id: "About" },
          { name: "Blogs", path: "/careers", id: "Blogs" },
          { name: "Jobs", path: "/jobs", id: "Jobs" },
          { name: "Contact", path: "/contact", id: "Contact" },
        ],
      },
    },
  ];
  const handleLinkClick = (id) => {
    setTimeout(() => scrollToSection(id, 2000), 100); // 2000ms = 2 seconds
  };

  return (
    <>
      <div className="p-[5%] bg-[#fdf8f3]">
        <div className="grid gap-5 grid-cols-3">
          <div className="col-span-1 md-to-xs:col-span-full space-y-5">
            <div>
              <img
                loading="lazy"
                src={logo}
                className="max-w-[350px] w-full"
                alt="Logo"
              />
            </div>
            <p className="text-lg text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>
            <div className="flex h-11 justify-between">
              <span>
                <img
                  loading="lazy"
                  src={facebook}
                  className="h-full"
                  alt="Facebook"
                />
              </span>
              <span>
                <img
                  loading="lazy"
                  src={linden}
                  className="h-full"
                  alt="LinkedIn"
                />
              </span>
              <span>
                <img loading="lazy" src={mail} className="h-full" alt="Mail" />
              </span>
            </div>
          </div>
          <div className="col-span-1 md-to-xs:col-span-full space-y-5">
            {footerLinks.map((column, index) => (
              <div
                key={index}
                className="mx-auto max-w-[30%] md-to-xs:max-w-full"
              >
                <h4 className="text-2xl font-bold">{column.col.title}</h4>

                <ul className="space-y-5 mt-10">
                  {column.col.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className="gray text-lg hover:text-green-400 font-semibold"
                    >
                      <Link
                        to={link.path}
                        onClick={() => handleLinkClick(`${link.id}`)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="col-span-1 md-to-xs:col-span-full space-y-5">
            <h4 className="text-2xl font-bold">Contact Us</h4>
            <div className="space-y-5 mt-10 text-lg gray ">
              <p className="">
                <strong>Address:</strong> 1234 Street Name, City, State, 12345
              </p>
              <p className="">
                <strong>Phone:</strong> (123) 456-7890
              </p>
              <p className="">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@example.com"
                  className="text-blue-600 hover:underline"
                >
                  info@example.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <h3 className="pt-5 space-y-5 pb-10 text-sm">
          <hr />
          <p>
            Copyright © Better Talent | Design by We-R. | Powered by Webflow
          </p>
        </h3>
      </div>
    </>
  );
}

export default Footer;
{
  /* <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom">
</div> */
}
