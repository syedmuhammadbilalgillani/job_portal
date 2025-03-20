import React from "react";

function Draft() {
  return <div>Draft</div>;
}

export default Draft;

// import React, { useRef, useEffect } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// function Draft() {
//   const editorRef = useRef(null);

//   const log = () => {
//     if (editorRef.current) {
//       const content = editorRef.current.getContent();
//       console.log(content);
//       // Save content to local storage
//       localStorage.setItem("editorContent", content);
//     }
//   };

//   // Load content from local storage when the component mounts
//   useEffect(() => {
//     const savedContent = localStorage.getItem("editorContent");
//     if (savedContent && editorRef.current) {
//       editorRef.current.setContent(savedContent);
//     }
//   }, []);

//   return (
//     <>
//       <Editor
//         apiKey="5bgb4rskckiyizbxvw62dxfhzwhqkab8dbs2pqeqso354axa"
//         onInit={(_evt, editor) => (editorRef.current = editor)}
//         init={{
//           height: 800,
//           menubar: false,
//           plugins: [
//             "advlist",
//             "autolink",
//             "lists",
//             "link",
//             "image",
//             "charmap",
//             "preview",
//             "anchor",
//             "searchreplace",
//             "visualblocks",
//             "code",
//             "fullscreen",
//             "insertdatetime",
//             "media",
//             "table",
//             "code",
//             "help",
//             "wordcount",
//           ],
//           toolbar:
//             "undo redo | blocks | " +
//             "bold italic forecolor | alignleft aligncenter " +
//             "alignright alignjustify | bullist numlist outdent indent | " +
//             "removeformat | help | image",
//           images_file_types: "jpg,svg,webp,png,gif",
//           content_style:
//             "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//           automatic_uploads: true,
//           file_picker_types: "image",
//           file_picker_callback: function (cb, value, meta) {
//             let input = document.createElement("input");
//             input.setAttribute("type", "file");
//             input.setAttribute("accept", "image/*");
//             input.onchange = function () {
//               let file = this.files[0];

//               let reader = new FileReader();
//               reader.onload = function () {
//                 let id = "blobid" + new Date().getTime();
//                 let blobCache = editorRef.current.editorUpload.blobCache;
//                 let base64 = reader.result.split(",")[1];
//                 let blobInfo = blobCache.create(id, file, base64);
//                 blobCache.add(blobInfo);

//                 // Add the image with a custom class
//                 cb(blobInfo.blobUri(), { title: file.name });
//                 editorRef.current.insertContent(
//                   `<img src="${blobInfo.blobUri()}" class="rounded-xl" />`
//                 );
//               };
//               reader.readAsDataURL(file);
//             };

//             input.click();
//           },
//         }}
//       />
//       <button onClick={log}>Save to Local Storage</button>
//     </>
//   );
// }

// export default Draft;

// const PageBuilder = () => {
//   const [elements, setElements] = useState([]);
//   const [selectedElement, setSelectedElement] = useState(null); // Added selectedElement state

//   useEffect(() => {
//     // Retrieve elements from local storage on component mount
//     const savedElements = localStorage.getItem("pageBuilderElements");
//     if (savedElements) {
//       setElements(JSON.parse(savedElements));
//     }
//   }, []);

//   useEffect(() => {
//     // Save elements to local storage whenever they change
//     localStorage.setItem("pageBuilderElements", JSON.stringify(elements));
//   }, [elements]);

//   const addElement = (parentId = null) => {
//     const newElement = {
//       id: Date.now(),
//       parentId: parentId,
//       children: [],
//       classes: "",
//     };
//     if (parentId) {
//       setElements((prevElements) =>
//         prevElements.map((el) =>
//           el.id === parentId
//             ? { ...el, children: [...el.children, newElement] }
//             : el
//         )
//       );
//     } else {
//       setElements([...elements, newElement]);
//     }
//   };

//   const handleClassChange = (id, classes) => {
//     const updateElements = (els) =>
//       els.map((el) =>
//         el.id === id
//           ? { ...el, classes: classes }
//           : { ...el, children: updateElements(el.children) }
//       );
//     setElements(updateElements(elements));
//   };

//   return (
//     <div>
//       <button onClick={() => addElement()}>Add Element</button>
//       <div className="page-builder">
//         {elements.map((el) => (
//           <Element
//             key={el.id}
//             element={el}
//             onSelect={setSelectedElement}
//             selectedElement={selectedElement}
//             onClassChange={handleClassChange}
//             addElement={addElement}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Element = ({
//   element,
//   onSelect,
//   selectedElement,
//   onClassChange,
//   addElement,
// }) => {
//   const isSelected = selectedElement && selectedElement.id === element.id;

//   return (
//     <div
//       className={`element ${isSelected ? "border-2 border-blue-500" : ""} ${
//         element.classes
//       }`}
//       onClick={() => onSelect(element)}
//     >
//       <p>Element ID: {element.id}</p>
//       <input
//         type="text"
//         placeholder="Add Tailwind classes"
//         value={element.classes}
//         onChange={(e) => onClassChange(element.id, e.target.value)}
//       />
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           addElement(element.id);
//         }}
//       >
//         Add Child Element
//       </button>
//       {element.children.length > 0 && (
//         <div className="children ml-4">
//           {element.children.map((child) => (
//             <Element
//               key={child.id}
//               element={child}
//               onSelect={onSelect}
//               selectedElement={selectedElement}
//               onClassChange={onClassChange}
//               addElement={addElement}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const PageBuilder = () => {
//   const [elements, setElements] = useState([]);

//   useEffect(() => {
//     // Load elements from database on component mount
//     axios.get("https://bettertalentserver.vercel.app/api/v1/cv/").then((response) => {
//       setElements(response.data);
//     });
//   }, []);

//   const addElement = () => {
//     const newElement = { id: uuidv4(), type: "div", styles: "" };
//     setElements([...elements, newElement]);
//   };

//   const handleStyleChange = (id, style) => {
//     const updatedElements = elements.map((element) =>
//       element.id === id ? { ...element, styles: style } : element
//     );
//     setElements(updatedElements);
//   };

//   const saveElements = () => {
//     axios
//       .post("https://bettertalentserver.vercel.app/api/v1/cv/", elements)
//       .then((response) => {
//         console.log("Elements saved successfully");
//       });
//   };

//   return (
//     <div>
//       <button onClick={addElement}>Add Element</button>
//       {elements.map((element) => (
//         <div key={element.id} className={element.styles}>
//           <input
//             type="text"
//             value={element.styles}
//             onChange={(e) => handleStyleChange(element.id, e.target.value)}
//             placeholder="Enter Tailwind classes"
//           />
//         </div>
//       ))}
//       <button onClick={saveElements}>Save Elements</button>
//     </div>
//   );
// };

// export default PageBuilder;

// import React, { useMemo, useRef, useState } from "react";
// import axios from "axios";
// import JoditEditor from "jodit-react";

// const Draft = ({ placeholder }) => {
//   const editor = useRef(null);
//   const [companyDescription, setContent] = useState("");
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     companyName: "",
//     companyIndustry: "",
//     companyWebsite: "",
//     linkedinPage: "",
//     companyLogo: "", // Assuming this will be handled separately (e.g., file upload)
//     numberOfEmployees: "",
//   });
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
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formDataWithDescription = {
//         ...formData,
//         companyDescription: companyDescription, // Add companyDescription to formData
//       };

//       const response = await axios.post(
//         "https://bettertalentserver.vercel.app/api/v1/createContactAndCompany/create",
//         formDataWithDescription
//       );
//       console.log(response.data); // Assuming you want to log the response
//       // Optionally, you can redirect or show a success message here
//     } catch (error) {
//       console.error("Error creating contact and company:", error);
//       // Handle error state or show error message to user
//     }
//   };

//   return (
//     <div className="Draft">
//       <h1>Create Contact and Company</h1>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur maxime
//       optio, ipsum, animi excepturi quisquam culpa laboriosam ea est saepe
//       dolorum molestiae explicabo eius accusantium ipsam inventore iusto
//       consequatur facilis!
//       <form className="hidden" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="fullName"
//           value={formData.fullName}
//           onChange={handleChange}
//           placeholder="Full Name"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <input
//           type="text"
//           name="companyName"
//           value={formData.companyName}
//           onChange={handleChange}
//           placeholder="Company Name"
//           required
//         />
//         <input
//           type="text"
//           name="companyIndustry"
//           value={formData.companyIndustry}
//           onChange={handleChange}
//           placeholder="Company Industry"
//           required
//         />
//         <input
//           type="text"
//           name="companyWebsite"
//           value={formData.companyWebsite}
//           onChange={handleChange}
//           placeholder="Company Website"
//           required
//         />
//         <input
//           type="text"
//           name="linkedinPage"
//           value={formData.linkedinPage}
//           onChange={handleChange}
//           placeholder="LinkedIn Page (Optional)"
//         />
//         <input
//           type="text"
//           name="companyLogo"
//           value={formData.companyLogo}
//           onChange={handleChange}
//           placeholder="company Logo (Optional)"
//         />
//         <input
//           type="text"
//           name="numberOfEmployees"
//           value={formData.numberOfEmployees}
//           onChange={handleChange}
//           placeholder="Number of Employees"
//           required
//         />
//         <JoditEditor
//           className="hidden"
//           ref={editor}
//           value={companyDescription}
//           config={config}
//           tabIndex={1} // tabIndex of textarea
//           onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
//           onChange={(newContent) => {}}
//         />
//         {/* Handle companyLogo separately, possibly with file upload */}
//         {/* Add a file input or handle it using Cloudinary/multer */}

//         <button type="submit">Create Contact and Company</button>
//       </form>
//     </div>
//   );
// };

// export default Draft;

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
//         "https://bettertalentserver.vercel.app/api/v1/contact&Company/saveContent",
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
//         "https://bettertalentserver.vercel.app/api/v1/contact&Company/content"
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
//         "https://bettertalentserver.vercel.app/api/v1/contact&Company/saveContent",
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
// export default Draft
