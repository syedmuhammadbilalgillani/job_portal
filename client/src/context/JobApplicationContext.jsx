import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "./ToastContext/ToastContext";

// Create a context
const JobApplicationContext = createContext();

// Create a provider component
export const JobApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [applicationsJobSeeker, setApplicationsJobSeeker] = useState([]);
  const [CVExists, setCVExists] = useState(null);

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
      showToast(response.data.message, "success");
      getUserAppliedApplications(token);
    } catch (err) {
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
    } catch (err) {
      showToast(err?.response?.data.message, "error");
    }
  };
  const checkCVExists = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/cv/checkCVExists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.exists) {
        setCVExists(true);
        // console.log("CV found successfully!");
        // console.log(CVExists);
      } else {
        setCVExists(false);
        // console.log("No cv associated with your account.");
      }
      // setCVExists(response.data);
    } catch (err) {
      showToast(err?.response?.data.message, "error");
    }
  };
  // console.log(CVExists);

  const getJobApplicationsForMyPostedJobs = async (token) => {
    try {
      const response = await axios.get(
        `${apiUrl}/jobApplication/getJobApplicationsForMyPostedJobs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplicationsJobSeeker(response.data);
    } catch (err) {
      showToast(err?.response?.data.message, "error");
    }
  };

  const updateJobApplicationStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${apiUrl}/jobApplication/updateJobApplicationStatus/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showToast(response.data.message, "success");
      getJobApplicationsForMyPostedJobs(token); // Refresh applications after status update
      return response.data;
    } catch (error) {
      console.error("Error updating job application status:", error);
      showToast("Failed to update status", "error");
      throw error;
    }
  };

  const filterAndSortApplications = async (status, sortBy) => {
    try {
      const response = await axios.get(
        `${apiUrl}/jobApplication/applications/filter`,
        {
          params: { status, sortBy },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplicationsJobSeeker(response.data);
    } catch (err) {
      showToast(err?.response?.data.message, "error");
    }
  };

  return (
    <JobApplicationContext.Provider
      value={{
        applications,
        applicationsJobSeeker,
        getUserAppliedApplications,
        getJobApplicationsForMyPostedJobs,
        applyForJob,
        updateJobApplicationStatus,
        filterAndSortApplications,
        checkCVExists,
        CVExists,
      }}
    >
      {children}
    </JobApplicationContext.Provider>
  );
};

// Custom hook to use the JobApplicationContext
export const useJobApplicationContext = () => useContext(JobApplicationContext);
