import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLinks } from "../../constants/NavLinks";

const MegaMenuNavbar = ({ isOpen }) => {
  const location = useLocation();

  return (
    <div className="bg-white rounded-lg absolute mt-5 shadow-lg">
      <div className={`flex gap-5 p-5 ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col gap-2">
          {NavLinks.row2.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`flex font-semibold hover:text-green-400 ${
                location.pathname === item.link ? "text-green-400" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {NavLinks.row3.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`flex font-semibold hover:text-green-400 ${
                location.pathname === item.link ? "text-green-400" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenuNavbar;
