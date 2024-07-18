import React, { useEffect, useState } from "react";
import axios from "axios";

const ContentComponent = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/contact&Company/content"
        ); // Replace with your actual API endpoint
        setContent(response.data); // Assuming response.data is an array of content items
      } catch (err) {
        console.error(err);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      {content.map((item, index) => (
        <h1
          className="max-w-[80%] bg-gray-600"
          key={index}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      ))}
    </div>
  );
};

export default ContentComponent;
