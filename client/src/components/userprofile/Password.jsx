import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Input from "../Input/Input";

function Password() {
  const { updateUserPassword, userData } = useAuth();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "confirmNewPassword") {
      setPasswordMatch(e.target.value === formData.newPassword);
    } else if (e.target.name === "newPassword") {
      setPasswordMatch(e.target.value === formData.confirmNewPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      alert("Passwords do not match");
      return;
    }
    try {
      await updateUserPassword({
        newPassword: formData.newPassword,
      });
    } catch (error) {
      // handle error
    }
  };

  return (
    <>
      <section className="min-h-dvh space-y-10 py-10 sm-to-xs:mx-5">
        <h1 className="gray text-3xl text-start font-bold">Change Password!</h1>
        <div className="p-10 shadow-custom rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            <Input
              name="newPassword"
              className="text-start max-w-[50%] sm-to-xs:max-w-full"
              label="New Password:"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <Input
              name="confirmNewPassword"
              className="text-start max-w-[50%] sm-to-xs:max-w-full"
              label="Confirm New Password:"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
            {!passwordMatch && (
              <p className="text-red-500">Passwords do not match</p>
            )}
            <button type="submit" className="btn-black px-5 py-2 rounded-lg">
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Password;
