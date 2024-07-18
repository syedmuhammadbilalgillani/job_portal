import React from "react";

function ContactForm() {
  return (
    <>
      <div className="rounded-2xl bg-white h-full shadow-custom">
        <form action="" className="p-10 space-y-10 ">
          <div className="flex gap-5  sm-to-xs:flex-wrap ">
            <div className="w-full space-y-2">
              <label htmlFor="" className="font-bold">
                First Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 hover:border-green-200 focus:ring-green-500 focus:border-none"
                name=""
                id=""
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="" className="font-bold">
                Last Name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 hover:border-green-200 focus:ring-green-500 focus:border-none"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex gap-5 sm-to-xs:flex-wrap ">
            <div className="w-full space-y-2">
              <label htmlFor="" className="font-bold">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 hover:border-green-200 focus:ring-green-500 focus:border-none"
                name=""
                id=""
              />
            </div>
            <div className="w-full space-y-2">
              <label htmlFor="" className="font-bold">
                Phone Number
              </label>
              <input
                type="number"
                className="w-full rounded-lg border-gray-200 hover:border-green-200 focus:ring-green-500 focus:border-none"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="flex gap-5 sm-to-xs:flex-wrap ">
            <div className="w-full space-y-2">
              <label htmlFor="" className="font-bold">
                Message
              </label>
              <textarea
                rows={7}
                className="w-full rounded-xl border-gray-200 hover:border-green-200 focus:ring-green-500 focus:border-none"
                name=""
                id=""
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-green px-14 py-4 font-semibold rounded-xl text-white"
          >
            {" "}
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
