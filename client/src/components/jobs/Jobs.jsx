import React, { useState } from "react";

import JobCard from "../jobcard/JobCard";

function Jobs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <>
      <main
        className=" p-[5%]"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
      >
        <h1 className="text-6xl font-bold text-center">
          Our latest job offers
        </h1>
        <p className="text-lg text-center gray p-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse{" "}
          <br />
          varius enim in eros elementum tristique.
        </p>
        <div className="grid grid-cols-7 gap-5">
          <div className="col-span-5 space-y-10 sm-to-xs:col-span-full">
            <JobCard></JobCard>
          </div>
          <div className="col-span-2  sm-to-xs:col-span-full ">
            {" "}
            <div className=" mx-auto bg-white p-6 rounded-2xl shadow-form sticky top-12">
              <h2 className="text-3xl font-semibold mb-1">
                Can't find anything ?
              </h2>
              <p className="mb-4 gray text-lg">We'll get back to you.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 ">
                  <label
                    htmlFor="fullName"
                    className="block text-black font-bold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="mb-4 ">
                  <label htmlFor="email" className="block text-black font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className=" btn-black text-white py-2 px-6 font-semibold rounded-lg hover:bg-gray-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <style>
        {`
          .shadow-form{
          box-shadow: 0 2px 20px rgba(19, 31, 24, .15);
          }
          `}
      </style>
    </>
  );
}

export default Jobs;
