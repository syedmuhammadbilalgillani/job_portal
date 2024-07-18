import React, { lazy, Suspense } from "react";
const Loader = lazy(() => import("../components/Loader/Loader"));
const AboutHero = lazy(() => import("../components/abouthero/AboutHero"));
const AboutPoster = lazy(() => import("../components/aboutposter/AboutPoster"));
const AboutPagePoster = lazy(() =>
  import("../components/aboutpageposter/AboutPagePoster")
);
const AboutCarousal = lazy(() =>
  import("../components/aboutcarousal/AboutCarousal")
);
const HomeHerosection = lazy(() =>
  import("../components/homeherosection/HomeHerosection")
);

const ContactUsBanner = lazy(() =>
  import("../components/contact-us-banner/ContactUsBanner")
);

function About() {
  return (
    <>
      <div id="About">
        <Suspense fallback={<Loader />}>
          <AboutHero />
          <AboutPoster />
          <ContactUsBanner>
            <div className="text-lg gray flex flex-col gap-10">
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
          </ContactUsBanner>
          <AboutPagePoster />
          <AboutCarousal />
          <HomeHerosection />
        </Suspense>
      </div>
    </>
  );
}

export default About;
