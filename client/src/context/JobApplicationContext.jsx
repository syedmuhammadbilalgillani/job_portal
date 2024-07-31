import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// Create a context
const JobApplicationContext = createContext();

// Create a provider component
export const JobApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_KEY;

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
      console.log(response.data.message);
      setError(null);
    } catch (err) {
      // Handle error
      setError(err.response ? err.response.data.message : "Server error");
    }
  };

  // Function to get user's applied applications
  //   const getUserAppliedApplications = async () => {
  //     try {
  //       const response = await axios.get("/api/user-applications");
  //       setApplications(response.data);
  //       setError(null);
  //     } catch (err) {
  //       // Handle error
  //       setError(err.response ? err.response.data.message : "Server error");
  //     }
  //   };

  return (
    <JobApplicationContext.Provider
      value={{
        applications,
        error,
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
