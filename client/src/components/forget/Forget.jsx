import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { useToast } from "../../context/ToastContext/ToastContext";
import Loader from "../Loader/Loader";
// import Modal from "../Modal/Modal";
// import { Spinner } from "../../Pages/Registration";
// import { useToast } from "../../context/ToastContext/ToastContext";

const Forget = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(0); // 0: Initial, 1: OTP Sent, 2: OTP Verified
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_KEY;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "otp":
        setOTP(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (action) => {
    setIsLoading(true);
    try {
      let endpoint = "";
      let message = "";
      switch (action) {
        case "generateOTP":
          endpoint = `${apiUrl}/user/generateAndSendOTP`;
          message = `OTP generated successfully`;
          break;
        case `verifyOTP`:
          endpoint = `${apiUrl}/user/verifyOtpForPassword`;
          message = `OTP verified successfully`;
          break;
        case `updatePassword`:
          endpoint = `${apiUrl}/user/updatePassword`;
          message = `Password updated successfully`;
          break;
        default:
          break;
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast(message, "success");
        if (action === "generateOTP") setStep(1);
        else if (action === "verifyOTP") setStep(2);
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error(error);
      showToast(
        `Failed to ${
          action === "generateOTP"
            ? "generate"
            : action === "verifyOTP"
            ? "verify"
            : "update"
        } OTP ,`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // // <Modal isOpen={isOpen} onClose={onClose}>

    <div className="space-y-5  ">
      <Input
        className=""
        type={step === 2 ? "password" : "text"}
        name={step === 2 ? "newPassword" : step === 1 ? "otp" : "email"}
        placeholder={
          step === 0 ? "Email" : step === 1 ? "Enter OTP" : "New Password"
        }
        value={step === 0 ? email : step === 1 ? otp : newPassword}
        onChange={handleInputChange}
      />
      <button
        onClick={() =>
          handleSubmit(
            step === 0
              ? "generateOTP"
              : step === 1
              ? "verifyOTP"
              : "updatePassword"
          )
        }
        type="submit"
        disabled={isLoading}
        className="uppercase white-btn px-2 py-2  w-full btn-black rounded-lg "
      >
        {isLoading ? (
          <Spinner />
        ) : step === 0 ? (
          "Generate OTP"
        ) : step === 1 ? (
          "Verify OTP"
        ) : (
          "Update Password"
        )}
      </button>
    </div>

    // {/* </Modal> */}
  );
};

export default Forget;
export function Spinner() {
  return (
    <span role="status">
      <svg
        aria-hidden="true"
        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-black dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </span>
  );
}
