import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useToast } from "../../context/ToastContext/ToastContext";
import Input from "../Input/Input";
function ContactAndCompany({ placeholder }) {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const editor = useRef(null);
  const [companyDescription, setContent] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyName: "",
    companyIndustry: "",
    companyWebsite: "",
    linkedinPage: "",
    companyLogo: "", // Assuming this will be handled separately (e.g., file upload)
    numberOfEmployees: "",
  });
  const config = useMemo(
    () => ({
      controls: {
        font: {
          list: {
            "Figtree, sans-serif": "Figtree",
          },
        },
        mobileView: {
          list: [
            { value: 320, title: "iPhone 5" },
            { value: 360, title: "iPhone 6" },
            { value: 768, title: "iPad" },
          ],
        },
      },
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
      enableDragAndDropFileToEditor: true,
      height: 300,
      //   uploader: {
      //     insertImageAsBase64URI: true,
      //   },
      spellcheck: true,
    }),
    [placeholder]
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataWithDescription = {
        ...formData,
        companyDescription: companyDescription,
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/createContactAndCompany/create",
        formDataWithDescription
      );
      const { data } = response;
      console.log(data.message); // Log the response for debugging

      // Check if the response contains a success message
      if (data.message) {
        showToast(data.message, "success");
      } else {
        showToast("Contact and Company created successfully", "success");
      }
    } catch (err) {
      showToast(
        err.response
          ? err.response.data.message
          : "Error creating contact and company",
        "error"
      );
      console.error("Error creating contact and company:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="overflow-scroll h-dvh md-to-xs:h-auto p-10 sm-to-xs:p-5">
        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-10  shadow-custom rounded-2xl  "
        >
          <div className="flex gap-5  sm-to-xs:flex-wrap ">
            <Input
              name="fullName"
              label="First Name"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required={true}
            />

            <Input
              name="email"
              label="Email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required={true}
            />
          </div>
          <div className="flex gap-5 sm-to-xs:flex-wrap ">
            <Input
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required={true}
            />
            <Input
              name="phoneNumber"
              label="Phone Number"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              required={true}
            />
          </div>
          <hr />
          <div className="flex gap-5  sm-to-xs:flex-wrap ">
            <Input
              name="companyName"
              label="Company Name"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              required={true}
            />
            <Input
              name="companyIndustry"
              label="Company Industry"
              type="text"
              value={formData.companyIndustry}
              onChange={handleChange}
              placeholder="Company Industry"
              required={true}
            />
          </div>
          <div className="flex gap-5  sm-to-xs:flex-wrap ">
            <Input
              name="companyWebsite"
              label="Company Website"
              type="text"
              value={formData.companyWebsite}
              onChange={handleChange}
              placeholder="Company Website"
              required={true}
            />
            <Input
              name="linkedinPage"
              label="LinkedIn Page"
              type="text"
              value={formData.linkedinPage}
              onChange={handleChange}
              placeholder="LinkedIn Page (Optional)"
              required={false}
            />
          </div>
          <div className="flex gap-5  sm-to-xs:flex-wrap ">
            <Input
              name="companyLogo"
              label="Company Logo"
              type="text"
              value={formData.companyLogo}
              onChange={handleChange}
              placeholder="Company Logo (Optional)"
              required={true}
            />
            <Input
              name="numberOfEmployees"
              label="Number of Employees"
              type="text"
              value={formData.numberOfEmployees}
              onChange={handleChange}
              placeholder="Number of Employees"
              required={true}
            />
          </div>
          <div className="w-full overflow-hidden  space-y-4">
            <label htmlFor="" className="font-bold">
              Company Description
            </label>
            <JoditEditor
              className=""
              ref={editor}
              value={companyDescription}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
          </div>

          <button
            type="submit"
            className="btn-green px-14 py-4 font-semibold rounded-xl text-white"
          >
            {" "}
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
      <style>
        {`
            main {
            overflow: hidden; /* This hides scroll bars on the main */
          }

          /* For WebKit (Chrome, Safari, etc.) */
          main::-webkit-scrollbar {
            display: none; /* Hide scrollbar */
          }

          /* For Firefox */
          main  {
            scrollbar-width: none; /* Hide scrollbar */
          }
            `}
      </style>
    </>
  );
}

export default ContactAndCompany;
