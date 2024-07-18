import React, { useState, useEffect } from "react";
import "./Carousel.css";
import TeamCard from "../teamcard/TeamCard";

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  // Calculate the number of items visible based on the viewport width
  const getVisibleItems = () => {
    if (window.innerWidth <= 1535 && window.innerWidth >= 1200) {
      return 3; // 33.3% width per item for larger screens
    } else if (window.innerWidth <= 1200 && window.innerWidth >= 768) {
      return 2; // 50% width per item for medium screens
    } else if (window.innerWidth <= 768 && window.innerWidth >= 50) {
      return 1; // 50% width per item for medium screens
    } else {
      return 3; // 100% width per item for smaller screens
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevSlide = () => {
    const index =
      currentIndex === 0 ? slides.length - visibleItems : currentIndex - 1;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index =
      currentIndex === slides.length - visibleItems ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{
            transform: `translateX(${-currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {slides.map((data, index) => (
            <div
              className="carousel-item box-border"
              key={index}
              style={{ minWidth: `${100 / visibleItems}%` }}
            >
              <TeamCard data={data}></TeamCard>
            </div>
          ))}
        </div>
      </div>
      <div className="space-x-2 p-10 text-end">
        <button
          className="btn-green px-3.5 py-3 rounded-full hover:bg-gray-400"
          onClick={prevSlide}
        >
          <i className="fa-thin fa-angle-left fa-2xl text-white"></i>
        </button>
        <button
          className="btn-green px-3.5 py-3 rounded-full hover:bg-gray-400"
          onClick={nextSlide}
        >
          <i className="fa-thin fa-angle-right fa-2xl text-white"></i>
        </button>
      </div>
    </>
  );
};

export default Carousel;
