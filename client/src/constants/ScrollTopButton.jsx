import React, { useEffect, useState } from "react";

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top btn-green">
          <i className="fa-duotone fa-arrow-up fa-xl"></i>
        </button>
      )}

      <style>
        {`
          .scroll-to-top {
          position: fixed;
          bottom: 50px;
          right: 50px;
          border: none;
          padding: 16px 20px;
          border-radius: 50%;
          cursor: pointer;
        }`}
      </style>
    </>
  );
}

export default ScrollTopButton;
