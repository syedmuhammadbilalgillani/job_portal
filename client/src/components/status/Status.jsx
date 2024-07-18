import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";

function Status() {
  const containerRefs = useRef([]);
  const location = useLocation();
  const addToRefs = (el) => {
    if (el && !containerRefs.current.includes(el)) {
      containerRefs.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();
    containerRefs.current.forEach((container, index) => {
      tl.fromTo(
        container,
        { y: -500, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: index * 0.2 }
      );
    });
  }, []); // Removed isInView from dependency array to run only once on mount

  return (
    <>
      <section id="homeshift">
        <div
          className={`grid grid-cols-3 px-[5%] bg-white  py-[5%] overflow-hidden ${
            location.pathname === "/about"
              ? "box-shadow rounded-2xl mx-[9%] relative -top-20"
              : ""
          }`}
        >
          <div
            ref={addToRefs}
            className="col-span-1 xs:col-span-full sm:col-span-full border border-transparent border-r-gray-300 xs:border-b-gray-300 xs:border-r-transparent sm:border-r-transparent sm:border-b-gray-300 text-center p-10"
          >
            <h2 className="font-bold text-6xl">
              <CountUp start={0} end={100} duration={5} suffix="%" />
            </h2>
            <p className="gray text-lg">satisfied customers</p>
          </div>
          <div
            ref={addToRefs}
            className="col-span-1 xs:col-span-full sm:col-span-full border border-transparent border-r-gray-300 xs:border-b-gray-300 xs:border-r-transparent sm:border-r-transparent sm:border-b-gray-300 text-center p-10"
          >
            <h2 className="font-bold text-6xl">
              <CountUp start={0} end={20} duration={10} suffix="M" />
            </h2>
            <p className="gray text-lg">in sales by 2023</p>
          </div>
          <div
            ref={addToRefs}
            className="col-span-1 xs:col-span-full sm:col-span-full text-center p-10"
          >
            <h2 className="font-bold text-6xl">
              <CountUp start={0} end={50} duration={10} prefix="+" />
            </h2>
            <p className="gray text-lg">
              <span>
                <CountUp start={0} end={50} duration={10} prefix="+" />
              </span>{" "}
              employees worldwide
            </p>
          </div>
        </div>
      </section>
      <style>
        {`
       .box-shadow{
        box-shadow: 0px 0px 8px 3px rgba(101,93,93,0.75);
        -webkit-box-shadow: 0px 0px 8px 3px rgba(101,93,93,0.75);
        -moz-box-shadow: 0px 0px 8px 3px rgba(101,93,93,0.75);
       }
       `}
      </style>
    </>
  );
}

export default Status;
