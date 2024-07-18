import React, { useEffect, useRef } from "react";
import blogcard1 from "../../assets/blog-card1.jpeg";
import blogcard2 from "../../assets/blog-card2.jpeg";
import blogcard3 from "../../assets/blog-card3.jpeg";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

function BlogCard() {
  return (
    <>
      <main
        className="px-[5%]"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <div className="grid grid-cols-2 gap-7">
          <div className="col-span-1 md-to-xs:col-span-full">
            <h1 className="text-6xl font-bold">
              Latest insights from our experts
            </h1>
          </div>
          <div className="col-span-1 md-to-xs:col-span-full">
            <p className="gray flex items-end h-full text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 p-5 gap-5">
          <BlogCardUI />
        </div>
        <div className="flex w-full justify-center py-10">
          <button className="btn-black px-14 py-4 rounded-lg font-semibold text-lg ">
            <Link>See all</Link>
          </button>
        </div>
      </main>
    </>
  );
}

export default BlogCard;
export function BlogCardUI() {
  const blogCardData = [
    {
      blogimg: blogcard1,
      blogBadge: "Recruitment",
      blogTitle: "The Art of Remote Collaboration",
      blogDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      blogimg: blogcard2,
      blogBadge: "Recruitment",
      blogTitle: "Navigating the Digital Market",
      blogDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      blogimg: blogcard3,
      blogBadge: "Marketing",
      blogTitle: "Unlocking the1 Power of Data",
      blogDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];
  const containerRefs = useRef([]);

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
        { y: 0, opacity: 1, duration: 0.45, delay: index * 0.15 }
      );
    });
  }, []);
  return (
    <>
      {blogCardData.map((card, index) => (
        <div
          className="col-span-1 md-to-xs:col-span-full "
          key={index}
          ref={addToRefs}
        >
          <div className="card hover:border-none transition-all hover:translate-y-[-5px] p-5 rounded-2xl border border-gray-300">
            <div className="relative">
              <img
                loading="lazy"
                src={card.blogimg}
                className="rounded-2xl mb-4 max-h-52 w-full object-cover"
                alt=""
              />
              <p className="uppercase absolute bottom-3 right-3 bg-pink-300  px-[0.8vw] text-[2vh] py-[0.3vw] rounded-lg">
                {card.blogBadge}
              </p>
            </div>
            <h1 className="font-semibold text-2xl pb-4">{card.blogTitle}</h1>
            <p className="text-lg gray font-medium">{card.blogDesc}</p>
            <h5 className="text-red-600 font-semibold text-lg">Read more</h5>
          </div>
        </div>
      ))}
      <style>
        {`
            .card:hover {
               box-shadow: -1px 0px 16px -4px rgba(0,0,0,1);
            -webkit-box-shadow: -1px 0px 16px -4px rgba(0,0,0,1);
            -moz-box-shadow: -1px 0px 16px -4px rgba(0,0,0,1);!important;
            }
            `}
      </style>
    </>
  );
}
