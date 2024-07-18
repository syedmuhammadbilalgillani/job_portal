import React, { lazy, useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
import "flowbite";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTopButton from "./constants/ScrollTopButton";
import { ToastProvider } from "./context/ToastContext/ToastContext";

const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Footer = lazy(() => import("./components/footer/Footer"));
function App() {
  const location = useLocation();

  const pathsToHideNavbar = ["/postJobOffer"]; // Add your specific paths here
  const pathsToHideFooter = ["/postJobOffer"]; // Add your specific paths here

  const hideNavbar = pathsToHideNavbar.includes(location.pathname);
  const hideFooter = pathsToHideFooter.includes(location.pathname);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <ToastProvider>
        {!hideNavbar && <Navbar />}
        <Outlet />
        {!hideFooter && <Footer />}
        <ScrollTopButton />
      </ToastProvider>
    </>
  );
}

export default App;
