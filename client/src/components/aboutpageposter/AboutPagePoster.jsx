import React from "react";
import leafes from "../../assets/leafes.svg";
import handshake from "../../assets/hand-shake.svg";
import handinheart from "../../assets/handinheart.svg";
import aboutpageline from "../../assets/aboutpageline.svg";
function AboutPagePoster() {
  return (
    <>
      <section
        className="p-[6%] bg-[#fdf8f3] space-y-12 relative"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <img
          loading="lazy"
          src={aboutpageline}
          className="absolute right-0  w-[50%] md-to-xs:w-full z-0"
          alt=""
        />
        <div className="grid grid-cols-2 relative *:z-10">
          <div className="col-span-1 md-to-xs:col-span-full ">
            <h1 className="text-5xl font-bold">
              Empowering growth through innovation
            </h1>
          </div>
          <div className="col-span-1 md-to-xs:col-span-full gray ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </div>
        </div>
        <div className="grid grid-cols-3 relative *:z-10">
          <div className="col-span-1 md-to-xs:col-span-full space-y-5 ">
            <img loading="lazy" className="h-20" src={leafes} alt="" />
            <h3 className="text-3xl font-semibold">Inspiration</h3>
            <p className="gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>
          </div>
          <div className="col-span-1 md-to-xs:col-span-full space-y-5 ">
            <img loading="lazy" className="h-20" src={handshake} alt="" />
            <h3 className="text-3xl font-semibold">Collaboration</h3>
            <p className="gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>
          </div>
          <div className="col-span-1 md-to-xs:col-span-full space-y-5 ">
            <img loading="lazy" className="h-20" src={handinheart} alt="" />
            <h3 className="text-3xl font-semibold">Empathy</h3>
            <p className="gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPagePoster;
