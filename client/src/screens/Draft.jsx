// src/App.js

import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";

const Draft = ({ placeholder }) => {
  const editor = useRef(null);
  const [companyDescription, setContent] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    companyIndustry: "",
    companyWebsite: "",
    linkedinPage: "",
    companyLogo: "", // Assuming this will be handled separately (e.g., file upload)
    numberOfEmployees: "",
  });
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
      enableDragAndDropFileToEditor: true,
      height: 450,
      uploader: {
        insertImageAsBase64URI: true,
      },

      spellcheck: true,
    }),
    [placeholder]
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithDescription = {
        ...formData,
        companyDescription: companyDescription, // Add companyDescription to formData
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/createContactAndCompany/create",
        formDataWithDescription
      );
      console.log(response.data); // Assuming you want to log the response
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error("Error creating contact and company:", error);
      // Handle error state or show error message to user
    }
  };

  return (
    <div className="Draft">
      <h1>Create Contact and Company</h1>
      <form className="hidden" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          name="companyIndustry"
          value={formData.companyIndustry}
          onChange={handleChange}
          placeholder="Company Industry"
          required
        />
        <input
          type="text"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          placeholder="Company Website"
          required
        />
        <input
          type="text"
          name="linkedinPage"
          value={formData.linkedinPage}
          onChange={handleChange}
          placeholder="LinkedIn Page (Optional)"
        />
        <input
          type="text"
          name="companyLogo"
          value={formData.companyLogo}
          onChange={handleChange}
          placeholder="company Logo (Optional)"
        />
        <input
          type="text"
          name="numberOfEmployees"
          value={formData.numberOfEmployees}
          onChange={handleChange}
          placeholder="Number of Employees"
          required
        />
        <JoditEditor
          className="hidden"
          ref={editor}
          value={companyDescription}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
        {/* Handle companyLogo separately, possibly with file upload */}
        {/* Add a file input or handle it using Cloudinary/multer */}

        <button type="submit">Create Contact and Company</button>
      </form>
    </div>
  );
};

export default Draft;

// import React, { useRef, useEffect, useState, useCallback } from "react";
// import JoditEditor from "jodit-react";

// const MyEditor = () => {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");

//   // Load content from local storage on component mount
//   useEffect(() => {
//     const savedContent = localStorage.getItem("editorContent");
//     if (savedContent) {
//       setContent(savedContent);
//     }
//   }, []);

//   const config = {
//     readonly: false,
//   };

//   const handleContentChange = useCallback((newContent) => {
//     setContent(newContent);
//     localStorage.setItem("editorContent", newContent);
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/contact&Company/saveContent",
//         { content }
//       );
//       if (response.status === 200) {
//         console.log("Content saved successfully!");
//         localStorage.removeItem("editorContent");
//       } else {
//         console.error("Failed to save content.");
//       }
//     } catch (error) {
//       console.error("An error occurred while saving the content:", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <JoditEditor
//           ref={editor}
//           value={content} // Ensure content is always a string
//           config={config}
//           onBlur={handleContentChange}
//           onChange={handleContentChange}
//         />
//         <button type="submit">Save Content</button>
//       </form>
//       <div>
//         <h2>Preview</h2>
//         <div dangerouslySetInnerHTML={{ __html: content }} />
//       </div>
//     </div>
//   );
// };

// export default MyEditor;

// import React, { useState, useRef, useMemo, useEffect } from "react";
// import JoditEditor from "jodit-react";
// import axios from "axios";

// const Draft = ({ placeholder }) => {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");
//   const [readContent, setReadContent] = useState([]);
//   const config = useMemo(
//     () => ({
//       readonly: false, // all options from https://xdsoft.net/jodit/docs/,
//       placeholder: placeholder || "Start typings...",
//       enableDragAndDropFileToEditor: true,
//       height: 450,
//       uploader: {
//         insertImageAsBase64URI: true,
//       },
//       spellcheck: true,
//     }),
//     [placeholder]
//   );

//   const fetchContent = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:3000/api/v1/contact&Company/content"
//       );
//       setReadContent(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/v1/contact&Company/saveContent",
//         { content }
//       );
//       if (response.status === 200) {
//         console.log("Content saved successfully!");
//         setContent("");
//         fetchContent();
//       } else {
//         console.error("Failed to save content.");
//       }
//     } catch (error) {
//       console.error("An error occurred while saving the content:", error);
//     }
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <JoditEditor
//           ref={editor}
//           value={content}
//           config={config}
//           tabIndex={1} // tabIndex of textarea
//           onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//           onChange={(newContent) => {}}
//         />
//         <button type="submit">Save Content</button>
//       </form>
//       <div>
//         {readContent.map((item, index) => (
//           <h1
//             className="max-w-[80%] bg-gray-600"
//             key={index}
//             dangerouslySetInnerHTML={{ __html: item.content }}
//           />
//         ))}
//       </div>
//     </>
//   );
// };
// export default Draft;
