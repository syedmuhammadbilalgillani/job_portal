import React, { lazy, Suspense } from "react";
const ContactForm = lazy(() => import("../components/contacform/ContactForm"));
const Loader = lazy(() => import("../components/Loader/Loader"));
import logo1 from "../assets/general.svg";
import logo2 from "../assets/mail.svg";
import logo3 from "../assets/supportcontact.svg";
import Questions from "../components/questions/Questions";
function ContactUs() {
  const contactTeam = [
    { logo: logo1, title: "General Support", email: "general@support.com" },
    { logo: logo2, title: "Talent Support", email: "talent@support.com" },
    { logo: logo3, title: "Company Support", email: "company@support.com" },
  ];
  return (
    <>
      <div
        className="grid grid-cols-3 gap-5 max-w-full m-20 sm-to-xs:m-[10%]"
        id="Contact"
      >
        <div className="col-span-1 md-to-xs:col-span-full ">
          <div className="py-5 sm-to-xs:space-y-5">
            <h1 className=" text-[3.5rem] sm-to-xs:text-5xl  leading-none font-bold ">
              A specific question ? Contact our team
            </h1>
            <p className="text-lg gray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
        </div>
        <div className="col-span-2   md-to-xs:col-span-full">
          <Suspense fallback={<Loader />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
      <h1 className="text-4xl font-semibold text-center mb-4">
        Contact our team directly
      </h1>
      <p className="max-w-[50%] mx-auto gray text-lg text-center mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        varius enim in eros elementum tristique.
      </p>
      <div className="grid grid-cols-3 m-[5%] gap-5 ">
        {contactTeam.map((item, index) => (
          <div className="col-span-1 md-to-xs:col-span-full" key={index}>
            <div className="flex items-center shadow-custom justify-center gap-5 p-10 rounded-2xl ">
              <img loading="lazy" className="h-20" src={item.logo} alt="" />
              <div>
                <h1 className="font-bold text-lg">{item.title}</h1>
                <p className="text-green-400 font-semibold">{item.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Questions />
    </>
  );
}

export default ContactUs;
