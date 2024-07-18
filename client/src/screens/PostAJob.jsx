import { lazy, React } from "react";
// import logo1 from "../assets/general.svg";
// import logo2 from "../assets/mail.svg";
// import logo3 from "../assets/supportcontact.svg";
// import Questions from "../components/questions/Questions";
const ContactAndCompany = lazy(() =>
  import("../components/contactAndCompany/ContactAndCompany")
);
import { Link } from "react-router-dom";
function PostAJob() {
  // const contactTeam = [
  //   { logo: logo1, title: "General Support", email: "general@support.com" },
  //   { logo: logo2, title: "Talent Support", email: "talent@support.com" },
  //   { logo: logo3, title: "Company Support", email: "company@support.com" },
  // ];
  return (
    <>
      <div
        className="grid grid-cols-3 gap-5 max-w-full px-20 sm-to-xs:p-[5%] fixed md-to-xs:static top-0 bg-white"
        id="Contact"
      >
        <div className="col-span-1 md-to-xs:col-span-full py-20 ">
          <Link to="/" className="absolute top-10">
            <i className="fa-duotone fa-2xl fa-solid fa-arrow-left"></i>
          </Link>
          <div className="py-5 sm-to-xs:space-y-5">
            <h1 className=" text-[3.5rem] sm-to-xs:text-5xl  leading-none font-bold ">
              Find your next talent today
            </h1>
            <p className="text-lg gray mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
        </div>
        <div className="col-span-2   md-to-xs:col-span-full ">
          <ContactAndCompany />
        </div>
      </div>
    </>
  );
}

export default PostAJob;
