import React, { lazy, useState } from "react";
import loginImg from "../assets/login.jpg";

const Input = lazy(() => import("../components/Input/Input"));
function Login() {
  return (
    <>
      <main className="max-w-full">
        <div className="grid grid-cols-2 p-[10%] gap-10">
          <div className="col-span-1 md-to-xs:col-span-full">
            <img src={loginImg} className=" rounded-2xl max-h-dvh " alt="" />
          </div>
          <div className="col-span-1 md-to-xs:col-span-full">
            <section className="shadow-custom p-5 rounded-2xl">
              <LoginForm />
              <button>Signup?</button>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;

export const LoginForm = () => {
  const [isLoading, setisLoading] = useState(false);
  return (
    <>
      <h1 className="text-center p-5  font-bold text-4xl"> LOGIN HERE</h1>
      <form className="space-y-5">
        <Input
          name="fullName"
          label="Email"
          type="text"
          // value={formData.fullName}
          // onChange={handleChange}
          placeholder="xyz@gmail.com"
          required
        />
        <Input
          name="fullName"
          label="Password"
          type="text"
          // value={formData.fullName}
          // onChange={handleChange}
          placeholder="*******"
          required
        />
        <button className="btn-black w-full rounded-md py-2">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
};
