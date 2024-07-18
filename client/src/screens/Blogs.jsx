import React, { lazy, Suspense } from "react";
const ContactUsBannerFooter = lazy(() =>
  import("../components/contactusbannerfooter/ContactUsBannerFooter")
);
const Loader = lazy(() => import("../components/Loader/Loader"));
import footerbadge from "../assets/footer-badge.svg";
import { BlogCardUI } from "../components/blogcard/BlogCard";
function Blogs() {
  return (
    <>
      <div className="space-y-6 flex flex-col justify-center items-center pt-[8%]">
        <h1 className="text-7xl xs:text-6xl font-bold">
          Our latest blog articles
        </h1>
        <p className="text-xl max-w-[50%] mx-auto  sm-to-xs:max-w-full text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-2 p-[5%] gap-6">
        <BlogCardUI />
      </div>
      <Suspense fallback={<Loader />}>
        <ContactUsBannerFooter>
          <div className="p-20 sm-to-xs:p-14 max-w-[50%] md-to-xs:max-w-full space-y-5">
            <h1 className="text-[max(4.5vw,2.5rem)] leading-tight font-bold ">
              Keep up to date with the latest recruitment news
            </h1>
            <p className="gray text-xl sm-to-xs:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare.
            </p>
            <div className="relative bg-blue-gray-200 inline top-6">
              <input
                type="text"
                placeholder="Enter you email"
                className="border-green-200 rounded-lg text-lg gray py-5 focus:ring-green-500 focus:border-none  md-to-xs:max-w-full w-full "
              />
              <button className="btn-green absolute right-3  -top-3  px-7 py-2  rounded-lg">
                Subscribe
              </button>
            </div>
            <p className="gray py-5">
              Join 9,500+ users already on the newsletter.
            </p>
          </div>
          <div>
            <img
              loading="lazy"
              src={footerbadge}
              className="absolute sm-to-xs:h-40 right-[40%] top-[10vw] left-[50vw] sm-to-xs:top-[50rem] rotate-12"
              alt=""
            />
          </div>
        </ContactUsBannerFooter>{" "}
      </Suspense>
    </>
  );
}

export default Blogs;
