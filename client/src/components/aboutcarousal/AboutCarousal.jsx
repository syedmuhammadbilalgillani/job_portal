import React from "react";
import Carousal from "../carousal/Carousal";
import aboutimg1 from "../../assets/about-card.jpeg";
import aboutimg2 from "../../assets/aboutcard2.jpeg";
import aboutimg3 from "../../assets/aboutcard3.jpeg";
import aboutimg4 from "../../assets/aboutcard4.jpeg";
function AboutCarousal() {
  const CardData = [
    {
      img: aboutimg1,
      name: "Sarah Johnsan",
      designation: "marketing specialist",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      img: aboutimg2,
      name: "Sarah Johnsan",
      designation: "marketing specialist",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      img: aboutimg3,
      name: "Sarah Johnsan",
      designation: "marketing specialist",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
    {
      img: aboutimg4,
      name: "Sarah Johnsan",
      designation: "marketing specialist",
      des: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    },
  ];

  return (
    <>
      <section
        className="my-3"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <Carousal slides={CardData}></Carousal>
      </section>
    </>
  );
}

export default AboutCarousal;
