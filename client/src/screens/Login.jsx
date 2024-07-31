import React, { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { useToast } from "../context/ToastContext/ToastContext";
import { useAuth } from "../context/AuthContext";

import Input from "../components/Input/Input";
import TextAreaInput from "../components/Input/TextAreaInput";

import loginImg from "../assets/login.jpg";
import Forget from "../components/forget/Forget";

function Login() {
  const [registerPage, setRegisterPage] = useState(false);
  const [isForgetComponent, setIsForgetComponent] = useState(false);
  let page;
  if (registerPage) {
    page = (
      <RegisterForm
        setRegisterPage={setRegisterPage}
        setIsForgetComponent={setIsForgetComponent}
      />
    );
  } else if (isForgetComponent) {
    page = <Forget />;
  } else {
    page = <LoginForm setIsForgetComponent={setIsForgetComponent} />;
  }
  return (
    <>
      <main className="max-w-full">
        <div className="grid grid-cols-2 p-[10%] gap-10">
          <div className=" col-span-1 md-to-xs:hidden">
            <img
              src={loginImg}
              className=" rounded-2xl max-h-dvh w-full "
              alt=""
            />
          </div>
          <div className="col-span-1 md-to-xs:col-span-full">
            <section className="shadow-custom p-5 rounded-2xl">
              {page}

              {!registerPage && !isForgetComponent && (
                <h3 className="gray text-center p-5">
                  Do not have an account?{" "}
                  <button
                    className="text-black"
                    onClick={() => {
                      setRegisterPage(true);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Signup
                  </button>
                </h3>
              )}
              {!registerPage && isForgetComponent && (
                <div
                  className="gray text-center pb-5 mt-5"
                  onClick={() => {
                    setRegisterPage(false);
                    setIsForgetComponent(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Return to{" "}
                  <span className="cursor-pointer text-black">Login?</span>
                </div>
              )}
            </section>
          </div>
          <div className="md-to-xs:col-span-full hidden md-to-xs:flex">
            <img
              src={loginImg}
              className=" rounded-2xl max-h-dvh w-full "
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  );
}

export const LoginForm = ({ setIsForgetComponent }) => {
  const { loginUser, isLoading } = useAuth();
  const showToast = useToast();
  // const [isForgetComponent, setIsForgetComponent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
    } catch (err) {
      showToast(err.response ? err.response.data.message : "Error", "error");
      console.error("Error:", err);
    }
  };

  return (
    <>
      <h1 className="text-center p-5 font-bold text-[max(2.5vw,1.2rem)]">
        WELCOME
      </h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="xyz@gmail.com"
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="*******"
          required
        />
        <button className="uppercase btn-black w-full rounded-md py-2">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsForgetComponent(true)}
        className="bg-gray-400 text-white hover:bg-gray-300 hover:text-black transition-all w-full rounded-md py-1.5 mt-4"
      >
        Forget Password
      </button>
    </>
  );
};

const FormFields = ({ formData, handleChange }) => (
  <>
    <div className="flex gap-5 sm-to-xs:flex-wrap">
      <Input
        name="name"
        label="Name :"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="John"
        required
      />
      <Input
        name="email"
        label="Email :"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@gmail.com"
        required
      />
    </div>
    <div className="flex gap-5 sm-to-xs:flex-wrap">
      <Input
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="*******"
        required
      />
      <Input
        name="phoneNumber"
        label="Phone Number :"
        type="text"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="1234567890"
        required
      />
    </div>
    <TextAreaInput
      name="address"
      label="Address :"
      value={formData.address}
      onChange={handleChange}
      placeholder="Enter address"
      rows={3}
      required
    />
    <div className="flex gap-5 sm-to-xs:flex-wrap">
      <Input
        name="city"
        label="City :"
        type="text"
        value={formData.city}
        onChange={handleChange}
        placeholder="xyz..."
        required
      />
      <Input
        name="state"
        label="State :"
        type="text"
        value={formData.state}
        onChange={handleChange}
        placeholder="xyz ..."
        required
      />
    </div>
  </>
);

export const RegisterForm = ({ setRegisterPage, setIsForgetComponent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Employer");
  const showToast = useToast();
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(formData, selectedTab);
    } catch (err) {
      showToast(
        err.response ? err.response.data.message : "Error processing request",
        "error"
      );
      console.error("Error processing request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Tabs
        selectedIndex={selectedTab === "Employer" ? 0 : 1}
        onSelect={(index) =>
          setSelectedTab(index === 0 ? "Employer" : "Job Seeker")
        }
      >
        <TabList className="flex flex-wrap justify-between gray font-bold border-2 p-3 rounded-lg">
          <Tab className="cursor-pointer hover:text-black">Employer</Tab>
          <Tab className="cursor-pointer hover:text-black">Job Seeker</Tab>
        </TabList>
        {["Employer", "Job Seeker"].map((tab) => (
          <TabPanel key={tab}>
            <h1 className="text-center py-9 font-bold text-4xl">
              {tab} Sign Up
            </h1>
            <form onSubmit={handleSubmit} className="space-y-5 mb-5">
              <FormFields formData={formData} handleChange={handleChange} />
              <button
                type="submit"
                className="uppercase btn-black w-full rounded-md py-2"
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </form>
            <div
              className="gray text-center pb-5"
              onClick={() => {
                setRegisterPage(false);
                setIsForgetComponent(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Return to{" "}
              <span className="cursor-pointer text-black">Login?</span>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
};

export default Login;
