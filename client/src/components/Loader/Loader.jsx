import React from "react";
import "./Loader.css";
function Loader() {
  return (
    <>
      <main className="h-screen w-full flex justify-center items-center bg-white">
        <div className="loader"></div>
      </main>
      <style>
        {`
            /* HTML: <div class="loader"></div> */

            `}
      </style>
    </>
  );
}

export default Loader;
