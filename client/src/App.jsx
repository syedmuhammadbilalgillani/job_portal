import React, { lazy, Suspense, useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";
import "flowbite";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollTopButton from "./constants/ScrollTopButton";
import Loader from "./components/Loader/Loader";

const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Footer = lazy(() => import("./components/footer/Footer"));
function App() {
  const location = useLocation();

  const pathsToHideNavbar = ["/postJobOffer", "/profile"]; // Add your specific paths here
  const pathsToHideFooter = ["/postJobOffer", "/gallery", "/profile"]; // Add your specific paths here

  const hideNavbar = pathsToHideNavbar.includes(location.pathname);
  const hideFooter = pathsToHideFooter.includes(location.pathname);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Suspense fallback={<Loader />}>
        {!hideNavbar && <Navbar />}
        <Outlet />
        {!hideFooter && <Footer />}
        <ScrollTopButton />
      </Suspense>
    </>
  );
}

export default App;
