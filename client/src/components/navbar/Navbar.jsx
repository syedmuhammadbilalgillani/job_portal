import React, { useState, useRef, useEffect, useContext } from "react";
import navLogo from "../../assets/logo.svg";
import cart from "../../assets/cart.svg";
import MegaMenuNavbar from "../megeMenuNavbar/MegaMenuNavbar";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NavLinks } from "../../constants/NavLinks";
import classNames from "classnames";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";
import defaultUser from "../../assets/man.png";
function Navbar() {
  const location = useLocation();
  const { logoutUser, isAuthenticated, isLoading, role, userData } = useAuth();
  const [menuState, setMenuState] = useState({
    isMenuOpen: false,
    isToggleMenuOpen: false,
  });
  const menuRef = useRef(null);
  const toggleMenuRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuState((prev) => ({ ...prev, isMenuOpen: !prev.isMenuOpen }));
  };

  const handleToggleMenu = () => {
    setMenuState((prev) => ({
      ...prev,
      isToggleMenuOpen: !prev.isToggleMenuOpen,
    }));
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuState((prev) => ({ ...prev, isMenuOpen: false }));
    }
    if (
      toggleMenuRef.current &&
      !toggleMenuRef.current.contains(event.target)
    ) {
      setMenuState((prev) => ({ ...prev, isToggleMenuOpen: false }));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navClasses = classNames(
    "py-1 px-[8%] w-full flex justify-between gap-2 items-center",
    {
      "absolute top-0 bg-transparent z-[999]": location.pathname === "/",
      "bg-white relative z-[999]": location.pathname !== "/",
      "bg-[#EFF1EE]": menuState.isToggleMenuOpen && location.pathname === "/",
    }
  );

  const toggleMenuClasses = classNames(
    "hidden xs:flex sm:flex md:flex top-0 z-[2] h-full",
    {
      "md:translate-y-0 xs:translate-y-0 sm:translate-y-0":
        menuState.isToggleMenuOpen,
      "md:translate-y-[-200%] sm:translate-y-[-200%] xs:translate-y-[-200%]":
        !menuState.isToggleMenuOpen,
    },
    "md:bg-white md:flex-col md:w-full md:absolute md:left-0 md:top-20 md:text-2xl md:items-start md:p-5 md:rounded-b-xl md:transition-all md:duration-500 md:shadow-lg",
    "sm:bg-white sm:flex-col sm:w-full sm:absolute sm:left-0 sm:top-20 sm:text-2xl sm:items-start sm:p-5 sm:rounded-b-xl sm:shadow-lg sm:transition-all sm:duration-500",
    "xs:bg-white xs:flex-col xs:w-full xs:absolute xs:left-0 xs:top-20 xs:text-2xl xs:items-start xs:p-5 xs:rounded-b-xl xs:shadow-lg xs:transition-all xs:duration-500"
  );
  // console.log(role);
  return (
    <>
      {/* for logout loading */}
      {isLoading && <Loader />}
      {/* end */}

      <nav>
        <div className={navClasses}>
          <NavLink to="/">
            <img
              loading="lazy"
              src={navLogo}
              alt="Navigation Logo"
              className="h-20 sm-to-xs:h-12"
            />
          </NavLink>

          <div className="flex gap-5 sm:hidden xs:hidden md:hidden">
            {/* <div ref={menuRef}>
              {menuState.isMenuOpen ? (
                <div className="font-semibold hover:text-green-400 cursor-pointer">
                  Pages
                </div>
              ) : (
                <button
                  onClick={handleMenuToggle}
                  className="font-semibold hover:text-green-400"
                >
                  Pages
                </button>
              )}
              <MegaMenuNavbar isOpen={menuState.isMenuOpen} />
            </div> */}
            {NavLinks.row1.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={classNames(
                  "flex font-semibold hover:text-green-400",
                  {
                    "text-green-400": location.pathname === item.link,
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center h-full gap-5">
            {/* {(role === "jobSeeker" || role === "admin") && ( */}

            <Link
              to={`${
                (location.pathname === "/jobs" && role === "jobSeeker") ||
                role === "admin"
                  ? "/postJobOffer"
                  : "/jobs"
              }`}
              className={`font-semibold text-white btn-black px-3 py-3 rounded-md sm-to-xs:text-xs text-sm ${
                (location.pathname === "/jobs" && role === null) ||
                role === "employer"
                  ? "hidden"
                  : ""
              } `}
            >
              {`${
                (location.pathname === "/jobs" && role === "jobSeeker") ||
                role === "admin"
                  ? "Post Job"
                  : "Browse Jobs"
              }`}
            </Link>
            {/* // )} */}

            <div className="flex gap-1 items-center">
              {/* <img loading="lazy" src={cart} alt="Cart" className="h-6" />
              <h1 className="font-semibold text-white btn-green rounded-full px-2 py-1 text-xs">
                0
              </h1> */}
              {!isAuthenticated && (
                <Link
                  to="login"
                  className="custom-tooltip-container  "
                  data-tooltip="Login Here"
                >
                  <i className="fa-xl fa-duotone fa-solid fa-user-plus "></i>
                </Link>
              )}

              {isAuthenticated && (
                <>
                  <button
                    className="custom-tooltip-container"
                    data-tooltip="Logout"
                    onClick={() => logoutUser()}
                  >
                    <i className="fa-duotone fa-solid fa-right-from-bracket fa-xl"></i>
                  </button>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link
                    to="/profile"
                    className="custom-tooltip-container"
                    data-tooltip="Profile"
                  >
                    {userData?.profilePicture ? (
                      <img
                        loading="lazy"
                        src={userData.profilePicture}
                        className="size-12  rounded-full  object-contain "
                        alt="Profile"
                      />
                    ) : (
                      <img
                        loading="lazy"
                        src={defaultUser}
                        className="size-12 rounded-full"
                        alt="Default User"
                      />
                    )}
                  </Link>
                </>
              )}

              <button
                className="hidden md:contents sm:contents xs:contents"
                onClick={handleToggleMenu}
              >
                {menuState.isToggleMenuOpen ? (
                  <div
                    className="fa-duotone fa-xl fa-circle-xmark"
                    style={{
                      "--fa-primary-color": "#000000",
                      "--fa-secondary-color": "#000000",
                    }}
                  ></div>
                ) : (
                  <i
                    className="fa-duotone fa-xl fa-bars"
                    style={{
                      "--fa-primary-color": "#000000",
                      "--fa-secondary-color": "#000000",
                    }}
                  ></i>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className={toggleMenuClasses} ref={toggleMenuRef}>
          <div ref={menuRef}>
            {/* <button
              onClick={handleMenuToggle}
              className="font-semibold hover:text-green-400"
            >
              Pages
            </button> */}
            <MegaMenuNavbar isOpen={menuState.isMenuOpen} />
          </div>
          {NavLinks.row1.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={classNames("flex font-semibold hover:text-green-400", {
                "text-green-400": location.pathname === item.link,
              })}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
