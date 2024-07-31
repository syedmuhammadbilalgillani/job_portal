import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Input from "../Input/Input";
import TextAreaInput from "../Input/TextAreaInput";
import defaultUser from "../../assets/man.png";

function UserProfile() {
  const { userData, userContactInfo, updateProfilePicture, updateUserProfile } =
    useAuth();
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactInfo: { phoneNumber: "", address: "", city: "", state: "" },
  });
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData && userContactInfo) {
      setFormData({
        name: userData?.name,
        email: userData?.email,
        contactInfo: { ...userContactInfo },
      });
      setIsChanged(false);
    }
  }, [userData, userContactInfo]);

  useEffect(() => {
    const { name, email, contactInfo } = formData;
    const isFormChanged =
      name !== userData?.name ||
      email !== userData?.email ||
      contactInfo.phoneNumber !== userContactInfo?.phoneNumber ||
      contactInfo.address !== userContactInfo?.address ||
      contactInfo.city !== userContactInfo?.city ||
      contactInfo.state !== userContactInfo?.state;
    setIsChanged(isFormChanged);
  }, [formData, userData, userContactInfo]);

  const handleChange = (e, key, contact = false) => {
    const { value } = e.target;
    if (key === "phoneNumber" && isNaN(value)) return; // Ignore non-numeric input
    setFormData((prev) => ({
      ...prev,
      [contact ? "contactInfo" : key]: contact
        ? { ...prev.contactInfo, [key]: value }
        : value,
    }));
  };

  const handleUpdatePicture = async () => {
    if (newProfilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", newProfilePicture);
      await updateProfilePicture(formData);
      setNewProfilePicture(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(formData);

      setIsChanged(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const userInfo = [
    { label: "ID", value: userData?._id },
    { label: "Name", value: formData.name, key: "name" },
    { label: "Email", value: formData.email, key: "email" },
    {
      label: "Phone",
      value: formData.contactInfo.phoneNumber,
      key: "phoneNumber",
      contact: true,
    },
    {
      label: "City",
      value: formData.contactInfo.city,
      key: "city",
      contact: true,
    },
    {
      label: "State",
      value: formData.contactInfo.state,
      key: "state",
      contact: true,
    },
  ];

  return (
    <section className="min-h-dvh space-y-10 py-10 sm-to-xs:mx-5">
      <h1 className="gray text-3xl text-start font-bold">
        {userData?.role?.toUpperCase() || "User"} Profile!
      </h1>
      <form className="p-5 shadow-custom rounded-2xl" onSubmit={handleSubmit}>
        <div className="space-y-2 my-5">
          <div className="flex items-end">
            <img
              loading="lazy"
              src={userData?.profilePicture || defaultUser}
              className="size-32 object-contain rounded-full border-2 border-gray-400"
              alt="User"
            />
            <label
              htmlFor="profilePicture"
              className="cursor-pointer custom-tooltip-container"
              data-tooltip="update profile picture"
            >
              <i className="fa-duotone fa-solid fa-circle-plus fa-lg"></i>
            </label>
          </div>

          <input
            type="file"
            label="Profile Picture"
            onChange={(e) => setNewProfilePicture(e.target.files[0])}
            className="mb-2 hidden"
            id="profilePicture"
          />
          <button
            type="button"
            className={`btn-black text-xs font-semibold h-full px-3 py-2 rounded-lg uppercase m-auto ${
              !newProfilePicture ? "hidden" : ""
            }`}
            onClick={handleUpdatePicture}
            disabled={!newProfilePicture || loading}
          >
            {loading ? "Updating Picture..." : "Update Picture"}
          </button>
        </div>
        <div className="grid grid-cols-2 sm-to-xs:grid-cols-1 gap-6">
          {userInfo.map(({ label, value, key, contact }) => (
            <Input
              className="text-start"
              key={label}
              label={`${label}:`}
              type="text"
              value={value || ""}
              onChange={(e) => handleChange(e, key, contact)}
              disabled={label === "ID"}
            />
          ))}
          <TextAreaInput
            className="text-start col-span-full"
            rows={4}
            label={`Address:`}
            value={formData.contactInfo.address || ""}
            onChange={(e) => handleChange(e, "address", true)}
          />
        </div>

        <button
          type="submit"
          className={`btn-black text-xs font-semibold h-full px-3 py-2 rounded-lg uppercase m-auto ${
            !isChanged || loading ? "hidden" : ""
          }`}
          disabled={!isChanged || loading}
        >
          {loading ? "Updating Profile..." : "Update Profile"}
        </button>
      </form>
    </section>
  );
}

export default UserProfile;
