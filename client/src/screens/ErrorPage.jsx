import React from "react";
import error404 from "../assets/eror404.svg";
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <>
      <main className="h-dvh flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <img src={error404} alt="error404" className="h-52" />
          <h1 className="font-bold text-5xl">Oops...</h1>
          <p className="gray text-lg">
            Something went wrong. Please try again.
          </p>
          <Link className="btn-green px-5 py-4 rounded-lg" to="/">
            go back to Home
          </Link>
        </div>
      </main>
    </>
  );
}

export default ErrorPage;
