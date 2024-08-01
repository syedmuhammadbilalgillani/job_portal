import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "./ToastContext/ToastContext";
// Create a context
const JobApplicationContext = createContext();

// Create a provider component
export const JobApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);

  const apiUrl = import.meta.env.VITE_API_KEY;
  const showToast = useToast();

  const token = Cookies.get("AUTH_TOKEN");
  // Function to apply for a job
  const applyForJob = async (jobId) => {
    try {
      const response = await axios.post(
        `${apiUrl}/jobApplication/applyJob`,
        { jobId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Handle successful application submission
      showToast(response.data.message, "success");
      getUserAppliedApplications(token);
    } catch (err) {
      // Handle error
      showToast(err?.response?.data.message, "error");
    }
  };

  // Function to get user's applied applications
  const getUserAppliedApplications = async (token) => {
    try {
      const response = await axios.get(
        `${apiUrl}/jobApplication/GetUserAppliedApplications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(response.data);
      // console.log(response.data);
      // showToast(response.data.message, "success");
    } catch (err) {
      // Handle error
      showToast(err?.response?.data.message, "error");
    }
  };

  return (
    <JobApplicationContext.Provider
      value={{
        applications,
        getUserAppliedApplications,

        applyForJob,
        // getUserAppliedApplications,
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
};

// Custom hook to use the JobApplicationContext
export const useJobApplicationContext = () => useContext(JobApplicationContext);
