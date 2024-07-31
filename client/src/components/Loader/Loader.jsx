import React from "react";
import "./Loader.css";
function Loader() {
  return (
    <>
      <main className="h-dvh w-dvw fixed z-[9999] flex justify-center items-center bg-white">
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
