import React, { useEffect, useState } from "react";
import axios from "axios";

const ElementBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [content, setContent] = useState("");
  const [classes, setClasses] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [inlineStyles, setInlineStyles] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [altText, setAltText] = useState("");
  const [page, setPage] = useState(null);

  const generateElements = (page) =>
    page.map((item) => (
      <React.Fragment key={item.id}>
        {item.type === "img" ? (
          <img
            src={item.imgSrc}
            alt={item.altText}
            className={item.classes} // Ensure item.classes contains valid Tailwind classes
            style={parseInlineStyles(item.inlineStyles)}
          />
        ) : (
          React.createElement(
            item.type,
            {
              className: item.classes, // This should be a valid string of Tailwind classes
              style: parseInlineStyles(item.inlineStyles),
            },
            item.content,
            item.children && item.children.length > 0
              ? generateElements(item.children)
              : null
          )
        )}
      </React.Fragment>
    ));

  const parseInlineStyles = (styles) => {
    if (!styles) return {};
    return styles.split(";").reduce((acc, style) => {
      const [key, value] = style.split(":");
      if (key && value) {
        const camelCaseKey = key
          .trim()
          .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc[camelCaseKey] = value.trim();
      }
      return acc;
    }, {});
  };

  const findElementById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      const found = findElementById(item.children, id);
      if (found) return found;
    }
    return null;
  };

  const selectElement = (id) => {
    setSelectedElementId(id);
    const selectedElement = findElementById(elements, id);
    if (selectedElement) {
      setContent(selectedElement.content || "");
      setClasses(selectedElement.classes || "");
      setInlineStyles(selectedElement.inlineStyles || "");
      setImgSrc(selectedElement.imgSrc || "");
      setAltText(selectedElement.altText || "");
    }
  };

  const addElement = (type, parentId) => {
    const newElement = {
      id: Date.now(),
      type,
      children: [],
      content: "",
      classes: "",
      inlineStyles: "",
      imgSrc: "", // Initialize imgSrc for images
      altText: "", // Initialize altText for images
    };

    const addChildToParent = (items) =>
      items.map((item) => {
        if (item.id === parentId) item.children.push(newElement);
        else item.children = addChildToParent(item.children);
        return item;
      });

    setElements(
      parentId ? addChildToParent(elements) : [...elements, newElement]
    );
    setSelectedElementId(newElement.id);
  };

  const removeElement = (id) => {
    const removeFromParent = (items) =>
      items
        .filter((item) => item.id !== id)
        .map((item) => {
          item.children = removeFromParent(item.children);
          return item;
        });
    setElements(removeFromParent(elements));
    setSelectedElementId(null);
    setContent("");
    setClasses("");
  };

  const updateContent = () => {
    if (selectedElementId) {
      const updateElementContent = (items) =>
        items.map((item) => {
          if (item.id === selectedElementId) {
            item.content = content;
            item.classes = classes;
            item.inlineStyles = inlineStyles;
            if (item.type === "img") {
              item.imgSrc = imgSrc;
              item.altText = altText;
            }
          } else {
            item.children = updateElementContent(item.children);
          }
          return item;
        });
      setElements(updateElementContent(elements));
    }
  };

  const applyStyle = (style) => {
    if (selectedElementId) {
      const updateElementStyle = (items) =>
        items.map((item) => {
          if (item.id === selectedElementId) {
            item.classes = `${item.classes} ${style}`.trim();
          } else {
            item.children = updateElementStyle(item.children);
          }
          return item;
        });
      setElements(updateElementStyle(elements));
    }
  };

  const handleAddElement = (type) => {
    addElement(type, selectedElementId);
  };

  const renderCustomHTML = () => {
    return <div dangerouslySetInnerHTML={{ __html: htmlCode }} />;
  };

  const downloadJsonFile = () => {
    const dataStr = JSON.stringify(elements, null, 2); // Convert elements state to JSON
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "elements.json"; // File name
    a.click();
    URL.revokeObjectURL(url); // Clean up
  };

  const downloadTextFile = () => {
    const dataStr = elements
      .map((element) => JSON.stringify(element))
      .join("\n");
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "elements.txt"; // File name
    a.click();
    URL.revokeObjectURL(url); // Clean up
  };

  const fetchPage = async () => {
    try {
      const response = await axios.get(
        `https://bettertalentserver.vercel.app/api/v1/cv/get-pages`
      );
      setPage(response.data);
    } catch (error) {
      console.error("Error fetching page:", error);
    }
  };
  const savePageToDB = async () => {
    try {
      const response = await axios.post(
        "https://bettertalentserver.vercel.app/api/v1/cv/save-page",
        {
          elements,
          htmlCode,
        }
      );
      console.log(response.data.message);
      if (response.status === 200) {
        alert(response.data.message);
        fetchPage();
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page");
    }
  };
  const DeteleById = async (_id) => {
    try {
      const response = await axios.delete(
        `https://bettertalentserver.vercel.app/api/v1/cv/delete/${_id}`
      );
      // console.log(response.data.message);
      if (response.status === 200) {
        console.log(response.data.message);
        fetchPage();
      }
    } catch (error) {
      console.error("Error saving page:", error);
      alert("Failed to save page");
    }
  };
  useEffect(() => {
    fetchPage();
  }, []);

  return (
    <>
      <main className="h-dvh max-w-full  fixed bg-white top-0 z-[8888] ">
        <section className="grid grid-cols-12 overflow-hidden h-full">
          <div className="col-span-2 w-full  h-dvh overflow-scroll">
            <div className=" grid grid-cols-2 gap-2 p-2">
              {[
                "main",
                "section",
                "nav",
                "div",
                "span",
                "p",
                "ul",
                "ol",
                "li",
                "button",
                "img", // Add img tag here
              ].map((type) => (
                <button
                  key={type}
                  className="bg-blue-gray-600  py-2 rounded hover:bg-blue-gray-400 uppercase font-semibold text-white"
                  onClick={() => handleAddElement(type)}
                >
                  {type}
                </button>
              ))}
              <div className="space-y-2 col-span-full">
                <button
                  className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-200 w-full"
                  onClick={downloadJsonFile}
                >
                  Export as JSON
                </button>
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200 w-full"
                  onClick={downloadTextFile}
                >
                  Export as Text
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-10  h-full space-y-2   p-2 overflow-scroll">
            <div className="grid grid-cols-2 gap-2">
              <StyleSection applyStyle={applyStyle} />

              {selectedElementId && (
                <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter element text"
                    className="border border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-gray-500 "
                  />

                  <input
                    type="text"
                    value={classes}
                    // disabled
                    onChange={(e) => setClasses(e.target.value)}
                    placeholder="Enter element classes  /  Don't use custom tailwind classes use dropdown classes only"
                    className="border border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-gray-500 "
                  />

                  <input
                    type="text"
                    value={inlineStyles}
                    onChange={(e) => setInlineStyles(e.target.value)}
                    placeholder="Enter inline styles (e.g., color: red; background: yellow;)"
                    className="border border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-gray-500 "
                  />

                  {selectedElementId &&
                    findElementById(elements, selectedElementId)?.type ===
                      "img" && (
                      <>
                        <input
                          type="text"
                          value={imgSrc}
                          onChange={(e) => setImgSrc(e.target.value)}
                          placeholder="Enter image source URL"
                          className="border border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-gray-500 "
                        />

                        <input
                          type="text"
                          value={altText}
                          onChange={(e) => setAltText(e.target.value)}
                          placeholder="Enter alt text for image"
                          className="border border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-gray-500 "
                        />
                      </>
                    )}

                  <div className="flex justify-between">
                    <button
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                      onClick={updateContent}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                      onClick={() => removeElement(selectedElementId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={savePageToDB}
              className="btn-black uppercase px-4 py-2 rounded"
            >
              Save Page to db
            </button>
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1 overflow-auto">
              <ElementTree
                elements={elements}
                onSelectElement={selectElement}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg flex-1 overflow-auto col-span-full">
              <div className="border">
                <LivePreview elements={elements} />
              </div>
            </div>
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg overflow-auto col-span-full">
              <PreviewHTML elements={elements} />
            </div>
            <div>
              {page?.map((singlePage) => (
                <div key={singlePage._id}>
                  {generateElements(singlePage.elements)}
                  <button
                    className="bg-red-200 px-6 py-2 rounded-xl uppercase text-white my-2"
                    onClick={() => DeteleById(singlePage?._id)}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-4">
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                placeholder="Enter custom HTML code"
                className="border border-gray-300 px-4 py-2 rounded-lg w-full h-32 focus:ring-2 focus:ring-indigo-500"
              />
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 w-full"
                onClick={() => {}}
              >
                Preview Custom HTML
              </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Custom HTML Preview
              </h3>
              {renderCustomHTML()}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const ElementTree = ({ elements, onSelectElement }) => (
  <ul className="list-disc pl-5 w-full">
    {elements.map((element) => (
      <li key={element.id} className="mb-2">
        <span
          onClick={() => onSelectElement(element.id)}
          className={`cursor-pointer text-blue-500 hover:underline ${
            element.content ? "bg-yellow-100" : ""
          }`}
        >
          {element.type}
        </span>
        {element.children.length > 0 && (
          <div className="mt-2 ml-4">
            <ElementTree
              elements={element.children}
              onSelectElement={onSelectElement}
            />
          </div>
        )}
      </li>
    ))}
  </ul>
);

const StyleSection = ({ applyStyle }) => {
  const [selectedStyle, setSelectedStyle] = useState({
    width: "",
    height: "",
    text: "",
    bg: "",
    border: "",
    layout: "",
    grid: "",
    col: "",
  });

  const categories = {
    // none: [],

    width: [
      "w-0", // Width 0
      "w-px", // Width 1px
      "w-0.5", // Width 0.125rem (2px)
      "w-1", // Width 0.25rem (4px)
      "w-1.5", // Width 0.375rem (6px)
      "w-2", // Width 0.5rem (8px)
      "w-2.5", // Width 0.625rem (10px)
      "w-3", // Width 0.75rem (12px)
      "w-3.5", // Width 0.875rem (14px)
      "w-4", // Width 1rem (16px)
      "w-5", // Width 1.25rem (20px)
      "w-6", // Width 1.5rem (24px)
      "w-7", // Width 1.75rem (28px)
      "w-8", // Width 2rem (32px)
      "w-9", // Width 2.25rem (36px)
      "w-10", // Width 2.5rem (40px)
      "w-11", // Width 2.75rem (44px)
      "w-12", // Width 3rem (48px)
      "w-14", // Width 3.5rem (56px)
      "w-16", // Width 4rem (64px)
      "w-20", // Width 5rem (80px)
      "w-24", // Width 6rem (96px)
      "w-28", // Width 7rem (112px)
      "w-32", // Width 8rem (128px)
      "w-36", // Width 9rem (144px)
      "w-40", // Width 10rem (160px)
      "w-44", // Width 11rem (176px)
      "w-48", // Width 12rem (192px)
      "w-52", // Width 13rem (208px)
      "w-56", // Width 14rem (224px)
      "w-60", // Width 15rem (240px)
      "w-64", // Width 16rem (256px)
      "w-72", // Width 18rem (288px)
      "w-80", // Width 20rem (320px)
      "w-96", // Width 24rem (384px)
      "w-1/2", // 50% width
      "w-1/3", // 33.333% width
      "w-1/4", // 25% width
      "w-1/5", // 20% width
      "w-1/6", // 16.667% width
      "w-1/12", // 8.333% width
      "w-full", // 100% width
      "w-auto", // Auto width
      "w-screen", // 100vw
      "max-w-xs", // Max width 20rem
      "max-w-sm", // Max width 24rem
      "max-w-md", // Max width 28rem
      "max-w-lg", // Max width 32rem
      "max-w-xl", // Max width 36rem
      "max-w-2xl", // Max width 42rem
      "max-w-3xl", // Max width 48rem
      "max-w-4xl", // Max width 56rem
      "max-w-5xl", // Max width 64rem
      "max-w-6xl", // Max width 72rem
      "max-w-full", // Max width 100%
      "max-w-screen-sm", // Max width 640px
      "max-w-screen-md", // Max width 768px
      "max-w-screen-lg", // Max width 1024px
      "max-w-screen-xl", // Max width 1280px
      "min-w-0", // Min width 0
      "min-w-full", // Min width 100%
      "min-w-screen-sm", // Min width 640px
      "min-w-screen-md", // Min width 768px
      "min-w-screen-lg", // Min width 1024px
      "min-w-screen-xl", // Min width 1280px
    ],
    height: [
      "h-0",
      "h-px",
      "h-0.5",
      "h-1",
      "h-1.5",
      "h-2",
      "h-2.5",
      "h-3",
      "h-3.5",
      "h-4",
      "h-5",
      "h-6",
      "h-7",
      "h-8",
      "h-9",
      "h-10",
      "h-11",
      "h-12",
      "h-14",
      "h-16",
      "h-20",
      "h-24",
      "h-28",
      "h-32",
      "h-36",
      "h-40",
      "h-44",
      "h-48",
      "h-52",
      "h-56",
      "h-60",
      "h-64",
      "h-72",
      "h-80",
      "h-96",
      "h-1/2",
      "h-1/3",
      "h-1/4",
      "h-1/5",
      "h-1/6",
      "h-1/12",
      "h-full",
      "h-auto",
      "h-screen",
      "min-h-0",
      "min-h-full",
      "min-h-screen",
      "max-h-0",
      "max-h-px",
      "max-h-0.5",
      "max-h-1",
      "max-h-1.5",
      "max-h-2",
      "max-h-2.5",
      "max-h-3",
      "max-h-3.5",
      "max-h-4",
      "max-h-5",
      "max-h-6",
      "max-h-7",
      "max-h-8",
      "max-h-9",
      "max-h-10",
      "max-h-11",
      "max-h-12",
      "max-h-14",
      "max-h-16",
      "max-h-20",
      "max-h-24",
      "max-h-28",
      "max-h-32",
      "max-h-36",
      "max-h-40",
      "max-h-44",
      "max-h-48",
      "max-h-52",
      "max-h-56",
      "max-h-60",
      "max-h-64",
      "max-h-72",
      "max-h-80",
      "max-h-96",
      "max-h-xs",
      "max-h-sm",
      "max-h-md",
      "max-h-lg",
      "max-h-xl",
      "max-h-2xl",
      "max-h-3xl",
      "max-h-4xl",
      "max-h-5xl",
      "max-h-6xl",
      "max-h-full",
      "max-h-screen",
    ],
    margin: [
      // Margin
      "m-0", // Margin  0
      "m-1", // Margin  0.25rem
      "m-2", // Margin  0.5rem
      "m-3", // Margin  0.75rem
      "m-4", // Margin  1rem
      "m-5", // Margin  1.25rem
      "m-6", // Margin  1.5rem
      "m-8", // Margin  2rem
      "m-10", // Margin  2.5rem
      "m-12", // Margin  3rem
      "m-16", // Margin  4rem
      "m-20", // Margin  5rem
      "m-24", // Margin  6rem
      "m-32", // Margin  8rem
      "m-40", // Margin  10rem
      "m-48", // Margin  12rem
      "m-56", // Margin  14rem
      "m-64", // Margin  16rem
      "m-auto", // Auto margin
      // Margin Right
      "mr-0", // Margin right 0
      "mr-1", // Margin right 0.25rem
      "mr-2", // Margin right 0.5rem
      "mr-3", // Margin right 0.75rem
      "mr-4", // Margin right 1rem
      "mr-5", // Margin right 1.25rem
      "mr-6", // Margin right 1.5rem
      "mr-8", // Margin right 2rem
      "mr-10", // Margin right 2.5rem
      "mr-12", // Margin right 3rem
      "mr-16", // Margin right 4rem
      "mr-20", // Margin right 5rem
      "mr-24", // Margin right 6rem
      "mr-32", // Margin right 8rem
      "mr-40", // Margin right 10rem
      "mr-48", // Margin right 12rem
      "mr-56", // Margin right 14rem
      "mr-64", // Margin right 16rem
      "mr-auto", // Auto margin right
      // Margin Left
      "ml-0", // Margin left 0
      "ml-1", // Margin left 0.25rem
      "ml-2", // Margin left 0.5rem
      "ml-3", // Margin left 0.75rem
      "ml-4", // Margin left 1rem
      "ml-5", // Margin left 1.25rem
      "ml-6", // Margin left 1.5rem
      "ml-8", // Margin left 2rem
      "ml-10", // Margin left 2.5rem
      "ml-12", // Margin left 3rem
      "ml-16", // Margin left 4rem
      "ml-20", // Margin left 5rem
      "ml-24", // Margin left 6rem
      "ml-32", // Margin left 8rem
      "ml-40", // Margin left 10rem
      "ml-48", // Margin left 12rem
      "ml-56", // Margin left 14rem
      "ml-64", // Margin left 16rem
      "ml-auto", // Auto margin left
      // Margin Bottom
      "mb-0", // Margin bottom 0
      "mb-1", // Margin bottom 0.25rem
      "mb-2", // Margin bottom 0.5rem
      "mb-3", // Margin bottom 0.75rem
      "mb-4", // Margin bottom 1rem
      "mb-5", // Margin bottom 1.25rem
      "mb-6", // Margin bottom 1.5rem
      "mb-8", // Margin bottom 2rem
      "mb-10", // Margin bottom 2.5rem
      "mb-12", // Margin bottom 3rem
      "mb-16", // Margin bottom 4rem
      "mb-20", // Margin bottom 5rem
      "mb-24", // Margin bottom 6rem
      "mb-32", // Margin bottom 8rem
      "mb-40", // Margin bottom 10rem
      "mb-48", // Margin bottom 12rem
      "mb-56", // Margin bottom 14rem
      "mb-64", // Margin bottom 16rem
      "mb-auto", // Auto margin bottom
      // Margin Top
      "mt-0", // Margin top 0
      "mt-1", // Margin top 0.25rem
      "mt-2", // Margin top 0.5rem
      "mt-3", // Margin top 0.75rem
      "mt-4", // Margin top 1rem
      "mt-5", // Margin top 1.25rem
      "mt-6", // Margin top 1.5rem
      "mt-8", // Margin top 2rem
      "mt-10", // Margin top 2.5rem
      "mt-12", // Margin top 3rem
      "mt-16", // Margin top 4rem
      "mt-20", // Margin top 5rem
      "mt-24", // Margin top 6rem
      "mt-32", // Margin top 8rem
      "mt-40", // Margin top 10rem
      "mt-48", // Margin top 12rem
      "mt-56", // Margin top 14rem
      "mt-64", // Margin top 16rem
      "mt-auto", // Auto margin top
      // Margin X (Horizontal)
      "mx-0", // Margin X 0
      "mx-1", // Margin X 0.25rem
      "mx-2", // Margin X 0.5rem
      "mx-3", // Margin X 0.75rem
      "mx-4", // Margin X 1rem
      "mx-5", // Margin X 1.25rem
      "mx-6", // Margin X 1.5rem
      "mx-8", // Margin X 2rem
      "mx-10", // Margin X 2.5rem
      "mx-12", // Margin X 3rem
      "mx-16", // Margin X 4rem
      "mx-20", // Margin X 5rem
      "mx-24", // Margin X 6rem
      "mx-32", // Margin X 8rem
      "mx-40", // Margin X 10rem
      "mx-48", // Margin X 12rem
      "mx-56", // Margin X 14rem
      "mx-64", // Margin X 16rem
      "mx-auto", // Auto margin X
      // Margin Y (Vertical)
      "my-0", // Margin Y 0
      "my-1", // Margin Y 0.25rem
      "my-2", // Margin Y 0.5rem
      "my-3", // Margin Y 0.75rem
      "my-4", // Margin Y 1rem
      "my-5", // Margin Y 1.25rem
      "my-6", // Margin Y 1.5rem
      "my-8", // Margin Y 2rem
      "my-10", // Margin Y 2.5rem
      "my-12", // Margin Y 3rem
      "my-16", // Margin Y 4rem
      "my-20", // Margin Y 5rem
      "my-24", // Margin Y 6rem
      "my-32", // Margin Y 8rem
      "my-40", // Margin Y 10rem
      "my-48", // Margin Y 12rem
      "my-56", // Margin Y 14rem
      "my-64", // Margin Y 16rem
      "my-auto", // Auto margin Y
    ],
    padding: [
      // Margin
      "p-0", // padding  0
      "p-1", // padding  0.25rep
      "p-2", // padding  0.5rep
      "p-3", // padding  0.75rep
      "p-4", // padding  1rep
      "p-5", // padding  1.25rep
      "p-6", // padding  1.5rep
      "p-8", // padding  2rep
      "p-10", // padding  2.5rep
      "p-12", // padding  3rep
      "p-16", // padding  4rep
      "p-20", // padding  5rep
      "p-24", // padding  6rep
      "p-32", // padding  8rep
      "p-40", // padding  10rep
      "p-48", // padding  12rep
      "p-56", // padding  14rep
      "p-64", // padding  16rep
      "p-auto", // Auto padding
      // padding Right
      "pr-0", // padding right 0
      "pr-1", // padding right 0.25rep
      "pr-2", // padding right 0.5rep
      "pr-3", // padding right 0.75rep
      "pr-4", // padding right 1rep
      "pr-5", // padding right 1.25rep
      "pr-6", // padding right 1.5rep
      "pr-8", // padding right 2rep
      "pr-10", // padding right 2.5rep
      "pr-12", // padding right 3rep
      "pr-16", // padding right 4rep
      "pr-20", // padding right 5rep
      "pr-24", // padding right 6rep
      "pr-32", // padding right 8rep
      "pr-40", // padding right 10rep
      "pr-48", // padding right 12rep
      "pr-56", // padding right 14rep
      "pr-64", // padding right 16rep
      "pr-auto", // Auto padding right
      // padding Left
      "pl-0", // padding left 0
      "pl-1", // padding left 0.25rep
      "pl-2", // padding left 0.5rep
      "pl-3", // padding left 0.75rep
      "pl-4", // padding left 1rep
      "pl-5", // padding left 1.25rep
      "pl-6", // padding left 1.5rep
      "pl-8", // padding left 2rep
      "pl-10", // padding left 2.5rep
      "pl-12", // padding left 3rep
      "pl-16", // padding left 4rep
      "pl-20", // padding left 5rep
      "pl-24", // padding left 6rep
      "pl-32", // padding left 8rep
      "pl-40", // padding left 10rep
      "pl-48", // padding left 12rep
      "pl-56", // padding left 14rep
      "pl-64", // padding left 16rep
      "pl-auto", // Auto padding left
      // padding Bottop
      "pb-0", // padding bottop 0
      "pb-1", // padding bottop 0.25rep
      "pb-2", // padding bottop 0.5rep
      "pb-3", // padding bottop 0.75rep
      "pb-4", // padding bottop 1rep
      "pb-5", // padding bottop 1.25rep
      "pb-6", // padding bottop 1.5rep
      "pb-8", // padding bottop 2rep
      "pb-10", // padding bottop 2.5rep
      "pb-12", // padding bottop 3rep
      "pb-16", // padding bottop 4rep
      "pb-20", // padding bottop 5rep
      "pb-24", // padding bottop 6rep
      "pb-32", // padding bottop 8rep
      "pb-40", // padding bottop 10rep
      "pb-48", // padding bottop 12rep
      "pb-56", // padding bottop 14rep
      "pb-64", // padding bottop 16rep
      "pb-auto", // Auto padding bottop
      // padding Top
      "pt-0", // padding top 0
      "pt-1", // padding top 0.25rep
      "pt-2", // padding top 0.5rep
      "pt-3", // padding top 0.75rep
      "pt-4", // padding top 1rep
      "pt-5", // padding top 1.25rep
      "pt-6", // padding top 1.5rep
      "pt-8", // padding top 2rep
      "pt-10", // padding top 2.5rep
      "pt-12", // padding top 3rep
      "pt-16", // padding top 4rep
      "pt-20", // padding top 5rep
      "pt-24", // padding top 6rep
      "pt-32", // padding top 8rep
      "pt-40", // padding top 10rep
      "pt-48", // padding top 12rep
      "pt-56", // padding top 14rep
      "pt-64", // padding top 16rep
      "pt-auto", // Auto padding top
      // padding X (Horizontal)
      "px-0", // padding X 0
      "px-1", // padding X 0.25rep
      "px-2", // padding X 0.5rep
      "px-3", // padding X 0.75rep
      "px-4", // padding X 1rep
      "px-5", // padding X 1.25rep
      "px-6", // padding X 1.5rep
      "px-8", // padding X 2rep
      "px-10", // padding X 2.5rep
      "px-12", // padding X 3rep
      "px-16", // padding X 4rep
      "px-20", // padding X 5rep
      "px-24", // padding X 6rep
      "px-32", // padding X 8rep
      "px-40", // padding X 10rep
      "px-48", // padding X 12rep
      "px-56", // padding X 14rep
      "px-64", // padding X 16rep
      "px-auto", // Auto padding X
      // padding Y (Vertical)
      "py-0", // padding Y 0
      "py-1", // padding Y 0.25rep
      "py-2", // padding Y 0.5rep
      "py-3", // padding Y 0.75rep
      "py-4", // padding Y 1rep
      "py-5", // padding Y 1.25rep
      "py-6", // padding Y 1.5rep
      "py-8", // padding Y 2rep
      "py-10", // padding Y 2.5rep
      "py-12", // padding Y 3rep
      "py-16", // padding Y 4rep
      "py-20", // padding Y 5rep
      "py-24", // padding Y 6rep
      "py-32", // padding Y 8rep
      "py-40", // padding Y 10rep
      "py-48", // padding Y 12rep
      "py-56", // padding Y 14rep
      "py-64", // padding Y 16rep
      "py-auto", // Auto margin Y
    ],
    text: [
      "text-black",
      "text-white",
      "text-gray-50",
      "text-gray-100",
      "text-gray-200",
      "text-gray-300",
      "text-gray-400",
      "text-gray-500",
      "text-gray-600",
      "text-gray-700",
      "text-gray-800",
      "text-gray-900",
      "text-red-50",
      "text-red-100",
      "text-red-200",
      "text-red-300",
      "text-red-400",
      "text-red-500",
      "text-red-600",
      "text-red-700",
      "text-red-800",
      "text-red-900",
      "text-yellow-50",
      "text-yellow-100",
      "text-yellow-200",
      "text-yellow-300",
      "text-yellow-400",
      "text-yellow-500",
      "text-yellow-600",
      "text-yellow-700",
      "text-yellow-800",
      "text-yellow-900",
      "text-green-50",
      "text-green-100",
      "text-green-200",
      "text-green-300",
      "text-green-400",
      "text-green-500",
      "text-green-600",
      "text-green-700",
      "text-green-800",
      "text-green-900",
      "text-teal-50",
      "text-teal-100",
      "text-teal-200",
      "text-teal-300",
      "text-teal-400",
      "text-teal-500",
      "text-teal-600",
      "text-teal-700",
      "text-teal-800",
      "text-teal-900",
      "text-blue-50",
      "text-blue-100",
      "text-blue-200",
      "text-blue-300",
      "text-blue-400",
      "text-blue-500",
      "text-blue-600",
      "text-blue-700",
      "text-blue-800",
      "text-blue-900",
      "text-indigo-50",
      "text-indigo-100",
      "text-indigo-200",
      "text-indigo-300",
      "text-indigo-400",
      "text-indigo-500",
      "text-indigo-600",
      "text-indigo-700",
      "text-indigo-800",
      "text-indigo-900",
      "text-purple-50",
      "text-purple-100",
      "text-purple-200",
      "text-purple-300",
      "text-purple-400",
      "text-purple-500",
      "text-purple-600",
      "text-purple-700",
      "text-purple-800",
      "text-purple-900",
      "text-pink-50",
      "text-pink-100",
      "text-pink-200",
      "text-pink-300",
      "text-pink-400",
      "text-pink-500",
      "text-pink-600",
      "text-pink-700",
      "text-pink-800",
      "text-pink-900",
    ],
    bg: [
      "bg-black",
      "bg-white",
      "bg-gray-50",
      "bg-gray-100",
      "bg-gray-200",
      "bg-gray-300",
      "bg-gray-400",
      "bg-gray-500",
      "bg-gray-600",
      "bg-gray-700",
      "bg-gray-800",
      "bg-gray-900",
      "bg-red-50",
      "bg-red-100",
      "bg-red-200",
      "bg-red-300",
      "bg-red-400",
      "bg-red-500",
      "bg-red-600",
      "bg-red-700",
      "bg-red-800",
      "bg-red-900",
      "bg-yellow-50",
      "bg-yellow-100",
      "bg-yellow-200",
      "bg-yellow-300",
      "bg-yellow-400",
      "bg-yellow-500",
      "bg-yellow-600",
      "bg-yellow-700",
      "bg-yellow-800",
      "bg-yellow-900",
      "bg-green-50",
      "bg-green-100",
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
      "bg-green-700",
      "bg-green-800",
      "bg-green-900",
      "bg-teal-50",
      "bg-teal-100",
      "bg-teal-200",
      "bg-teal-300",
      "bg-teal-400",
      "bg-teal-500",
      "bg-teal-600",
      "bg-teal-700",
      "bg-teal-800",
      "bg-teal-900",
      "bg-blue-50",
      "bg-blue-100",
      "bg-blue-200",
      "bg-blue-300",
      "bg-blue-400",
      "bg-blue-500",
      "bg-blue-600",
      "bg-blue-700",
      "bg-blue-800",
      "bg-blue-900",
      "bg-indigo-50",
      "bg-indigo-100",
      "bg-indigo-200",
      "bg-indigo-300",
      "bg-indigo-400",
      "bg-indigo-500",
      "bg-indigo-600",
      "bg-indigo-700",
      "bg-indigo-800",
      "bg-indigo-900",
      "bg-purple-50",
      "bg-purple-100",
      "bg-purple-200",
      "bg-purple-300",
      "bg-purple-400",
      "bg-purple-500",
      "bg-purple-600",
      "bg-purple-700",
      "bg-purple-800",
      "bg-purple-900",
      "bg-pink-50",
      "bg-pink-100",
      "bg-pink-200",
      "bg-pink-300",
      "bg-pink-400",
      "bg-pink-500",
      "bg-pink-600",
      "bg-pink-700",
      "bg-pink-800",
      "bg-pink-900",
    ],
    border: [
      "border-black",
      "border-white",
      "border-gray-50",
      "border-gray-100",
      "border-gray-200",
      "border-gray-300",
      "border-gray-400",
      "border-gray-500",
      "border-gray-600",
      "border-gray-700",
      "border-gray-800",
      "border-gray-900",
      "border-red-50",
      "border-red-100",
      "border-red-200",
      "border-red-300",
      "border-red-400",
      "border-red-500",
      "border-red-600",
      "border-red-700",
      "border-red-800",
      "border-red-900",
      "border-yellow-50",
      "border-yellow-100",
      "border-yellow-200",
      "border-yellow-300",
      "border-yellow-400",
      "border-yellow-500",
      "border-yellow-600",
      "border-yellow-700",
      "border-yellow-800",
      "border-yellow-900",
      "border-green-50",
      "border-green-100",
      "border-green-200",
      "border-green-300",
      "border-green-400",
      "border-green-500",
      "border-green-600",
      "border-green-700",
      "border-green-800",
      "border-green-900",
      "border-teal-50",
      "border-teal-100",
      "border-teal-200",
      "border-teal-300",
      "border-teal-400",
      "border-teal-500",
      "border-teal-600",
      "border-teal-700",
      "border-teal-800",
      "border-teal-900",
      "border-blue-50",
      "border-blue-100",
      "border-blue-200",
      "border-blue-300",
      "border-blue-400",
      "border-blue-500",
      "border-blue-600",
      "border-blue-700",
      "border-blue-800",
      "border-blue-900",
      "border-indigo-50",
      "border-indigo-100",
      "border-indigo-200",
      "border-indigo-300",
      "border-indigo-400",
      "border-indigo-500",
      "border-indigo-600",
      "border-indigo-700",
      "border-indigo-800",
      "border-indigo-900",
      "border-purple-50",
      "border-purple-100",
      "border-purple-200",
      "border-purple-300",
      "border-purple-400",
      "border-purple-500",
      "border-purple-600",
      "border-purple-700",
      "border-purple-800",
      "border-purple-900",
      "border-pink-50",
      "border-pink-100",
      "border-pink-200",
      "border-pink-300",
      "border-pink-400",
      "border-pink-500",
      "border-pink-600",
      "border-pink-700",
      "border-pink-800",
      "border-pink-900",
    ],
    borderRadius: [
      "rounded-none",
      "rounded-sm",
      "rounded",
      "rounded-md",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-3xl",
      "rounded-full",
      "rounded-t-none",
      "rounded-r-none",
      "rounded-b-none",
      "rounded-l-none",
      "rounded-t-sm",
      "rounded-r-sm",
      "rounded-b-sm",
      "rounded-l-sm",
      "rounded-t",
      "rounded-r",
      "rounded-b",
      "rounded-l",
      "rounded-t-md",
      "rounded-r-md",
      "rounded-b-md",
      "rounded-l-md",
      "rounded-t-lg",
      "rounded-r-lg",
      "rounded-b-lg",
      "rounded-l-lg",
      "rounded-t-xl",
      "rounded-r-xl",
      "rounded-b-xl",
      "rounded-l-xl",
      "rounded-t-2xl",
      "rounded-r-2xl",
      "rounded-b-2xl",
      "rounded-l-2xl",
      "rounded-t-3xl",
      "rounded-r-3xl",
      "rounded-b-3xl",
      "rounded-l-3xl",
    ],
    layout: [
      "flex",
      "flex-col",
      "flex-row",
      "flex-wrap",
      "flex-nowrap",
      "flex-grow",
      "flex-shrink",
      "flex-auto",
      "flex-initial",
      "flex-none",
      "justify-start",
      "justify-center",
      "justify-end",
      "justify-between",
      "justify-around",
      "justify-evenly",
      "items-start",
      "items-center",
      "items-end",
      "items-baseline",
      "items-stretch",
      "content-start",
      "content-center",
      "content-end",
      "content-between",
      "content-around",
      "content-evenly",
      "self-auto",
      "self-start",
      "self-center",
      "self-end",
      "self-stretch",
    ],

    grid: [
      "grid",
      "grid-cols-1",
      "grid-cols-2",
      "grid-cols-3",
      "grid-cols-4",
      "grid-cols-5",
      "grid-cols-6",
      "grid-cols-7",
      "grid-cols-8",
      "grid-cols-9",
      "grid-cols-10",
      "grid-cols-11",
      "grid-cols-12",
      "grid-rows-1",
      "grid-rows-2",
      "grid-rows-3",
      "grid-rows-4",
      "grid-rows-5",
      "grid-rows-6",
      "grid-rows-7",
      "grid-rows-8",
      "grid-rows-9",
      "grid-rows-10",
      "grid-rows-11",
      "grid-rows-12",
    ],

    col: [
      "col-auto",
      "col-span-1",
      "col-span-2",
      "col-span-3",
      "col-span-4",
      "col-span-5",
      "col-span-6",
      "col-span-7",
      "col-span-8",
      "col-span-9",
      "col-span-10",
      "col-span-11",
      "col-span-12",
    ],
  };
  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStyle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    applyStyle(value);
  };
  return (
    <>
      <div className="p-4 bg-gray-200 rounded-md shadow-md flex gap-5 flex-wrap">
        {Object.entries(categories).map(([category, styles]) => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">
              {category.charAt(0).toUpperCase() + category.slice(1)} Styles
            </h3>
            <select
              name={category}
              value={selectedStyle}
              onChange={handleStyleChange}
              className="border px-2 py-1 rounded-md bg-white"
            >
              <option value="">Select {category} style</option>
              {styles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
        ))}
        {/* Example of applying selected styles */}
      </div>
      {/* <div
        className={`mt-4 p-4 ${selectedStyle.text} ${selectedStyle.bg} ${selectedStyle.border} ${selectedStyle.layout} ${selectedStyle.grid} 
        ${selectedStyle.col}
        ${selectedStyle.height}
        ${selectedStyle.width}
           ${selectedStyle.margin}
        ${selectedStyle.padding}
        
        `}
      >
        <p className="text-lg">
          This is a styled text block. Apply different styles using the
          dropdowns above.
        </p>
      </div> */}
    </>
  );
};

const PreviewHTML = ({ elements }) => {
  const generateHTML = (elements, depth = 0) => {
    const renderHTML = (element, depth) => {
      const indent = "  ".repeat(depth);
      const childrenHTML = element.children
        .map((child) => renderHTML(child, depth + 1))
        .join("\n");

      const classAttr = element.classes
        ? ` className="${element.classes}"`
        : "";
      const styleAttr = element.inlineStyles
        ? ` style="${parseInlineStyles(element.inlineStyles)}"`
        : "";
      const srcAttr =
        element.type === "img" && element.imgSrc
          ? ` src="${element.imgSrc} `
          : "";
      const altAttr =
        element.type === "img" && element.altText
          ? ` alt="${element.altText}"`
          : "";

      if (element.type === "img") {
        return `${indent}<${element.type}${classAttr}${styleAttr}${srcAttr}${altAttr} />`;
      }

      return `${indent}<${element.type}${classAttr}${styleAttr}>${
        element.content || ""
      }${childrenHTML ? `\n${childrenHTML}\n${indent}` : ""}</${element.type}>`;
    };

    const parseInlineStyles = (styles) => {
      if (!styles) return "";
      return styles
        .split(";")
        .map((style) => style.trim())
        .filter((style) => style.length > 0)
        .join("; ");
    };

    return elements.map((element) => renderHTML(element, depth)).join("\n");
  };

  const htmlContent = generateHTML(elements);

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-2">HTML Preview</h3>
      <pre className="bg-gray-200 p-4 rounded whitespace-pre-wrap">
        {htmlContent}
      </pre>
    </div>
  );
};

const LivePreview = ({ elements }) => {
  const generateElements = (page) =>
    page.map((item) => (
      <React.Fragment key={item.id}>
        {item.type === "img" ? (
          <img
            src={item.imgSrc}
            alt={item.altText}
            className={item.classes}
            style={parseInlineStyles(item.inlineStyles)}
          />
        ) : (
          React.createElement(
            item.type,
            {
              className: item.classes,
              style: parseInlineStyles(item.inlineStyles),
            },
            item.content,
            item.children.length > 0 ? generateElements(item.children) : null
          )
        )}
      </React.Fragment>
    ));

  const parseInlineStyles = (styles) => {
    if (!styles) return {};
    return styles.split(";").reduce((acc, style) => {
      const [key, value] = style.split(":");
      if (key && value) {
        const camelCaseKey = key
          .trim()
          .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        acc[camelCaseKey] = value.trim();
      }
      return acc;
    }, {});
  };

  return <div>{generateElements(elements)}</div>;
};

export default ElementBuilder;
