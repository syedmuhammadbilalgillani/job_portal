import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function Questions() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <section
        className="py-10"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <main className="p-[5%]">
          <Accordion
            className="max-w-[60%] sm-to-xs:max-w-full mx-auto"
            open={open === 1}
            icon={<Icon id={1} open={open} />}
          >
            <AccordionHeader
              className="text-black "
              onClick={() => handleOpen(1)}
            >
              What is Material Tailwind?
            </AccordionHeader>
            <AccordionBody className=" text-base gray">
              We&apos;re not always in the position that we want to be at.
              We&apos;re constantly growing. We&apos;re constantly making
              mistakes. We&apos;re constantly trying to express ourselves and
              actualize our dreams.
            </AccordionBody>
          </Accordion>
        </main>
        <div className="space-y-4">
          <h1 className="font-bold text-center text-5xl ">
            Still have questions?
          </h1>
          <p className="text-center gray text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex justify-center w-full">
            <Link to="/contact" className="btn-green  px-12 py-4 rounded-xl">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export default Questions;
