import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
const HomeHerosection = lazy(() =>
  import("../components/homeherosection/HomeHerosection.jsx")
);
const Status = lazy(() => import("../components/status/Status"));
const JobOfferPosterBanner = lazy(() =>
  import("../components/jobofferposterbanner/JobOfferPosterBanner")
);
const ContactUsBanner = lazy(() =>
  import("../components/contact-us-banner/ContactUsBanner")
);
const Jobs = lazy(() => import("../components/jobs/Jobs"));
const JobBanner = lazy(() => import("../components/jobbanner/JobBanner"));
const BlogCard = lazy(() => import("../components/blogcard/BlogCard"));
const Questions = lazy(() => import("../components/questions/Questions"));
const ContactUsBannerFooter = lazy(() =>
  import("../components/contactusbannerfooter/ContactUsBannerFooter")
);
import footerbadge from "../assets/footer-badge.svg";

function Home() {
  return (
    <>
      <div id="Home">
        <HomeHerosection />
        <Status />
        <JobOfferPosterBanner />
        <ContactUsBanner>
          <h1 className="text-5xl font-bold">
            Transform your business with our solutions
          </h1>
          <p className="text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor.
          </p>
          <p className="text-lg text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
          <div className="flex flex-wrap gap-5">
            <Link
              to="/contact"
              className="font-semibold text-white px-10 rounded-xl py-4 btn-green"
            >
              Contact us
            </Link>
            <Link
              to="/postJobOffer"
              className="font-semibold text-white px-10 rounded-xl py-4 btn-black"
            >
              Post a job
            </Link>
          </div>
        </ContactUsBanner>
        <Jobs />
        <JobBanner />
        <BlogCard />
        <Questions />
        <ContactUsBannerFooter>
          <div className="p-20 sm-to-xs:p-14 max-w-[50%] md-to-xs:max-w-full space-y-5">
            <h1 className="text-[max(4.5vw,2.5rem)] leading-tight font-bold ">
              Find your dream job in less than a week
            </h1>
            <p className="gray text-xl sm-to-xs:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare.
            </p>
            <div className="flex flex-wrap gap-5">
              <Link
                to="/contact"
                className="px-14 sm-to-xs:px-8 py-4 btn-red text-lg font-semibold rounded-lg"
              >
                Contact us
              </Link>
              <Link
                to="/about"
                onClick={() => handleLinkClick("About")}
                className="px-14 sm-to-xs:px-8 py-4 btn-black text-lg font-semibold rounded-lg"
              >
                Learn more
              </Link>
              <button></button>
            </div>
          </div>
          <div>
            <img
              loading="lazy"
              src={footerbadge}
              className="absolute sm-to-xs:h-40 right-[40%] top-[10vw] left-[50vw] sm-to-xs:top-[50rem]"
              alt=""
            />
          </div>
        </ContactUsBannerFooter>
      </div>
    </>
  );
}

export default Home;
