import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  startTransition,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "./ToastContext/ToastContext";
import { data } from "../constants/Companies";

const CompanyJobContext = createContext();

export const useCompanyJob = () => useContext(CompanyJobContext);

export const CompanyJobProvider = ({ children }) => {
  const apiUrl = useMemo(() => import.meta.env.VITE_API_KEY, []);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  const [error, setError] = useState(null);
  const token = Cookies.get("AUTH_TOKEN"); //useMemo(() => Cookies.get("AUTH_TOKEN"), []);
  const [companies, setCompanies] = useState([]);
  const [companiesAdmin, setCompaniesAdmin] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobsAdmin, setJobsAdmin] = useState([]);
  const [userCompany, setUserCompany] = useState(null);
  const [isAuthenticatedUserJobs, setIsAuthenticatedUserJobs] = useState(null);
  const [readMore, setReadMore] = useState(false);
  // Function to fetch all companies

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/company/readCompany`);

      startTransition(() => {
        if (response.data.length === 0) {
          setCompanies(data);
          setReadMore(false);
        } else {
          setCompanies(response.data);
          setReadMore(true);
        }
      });
      // console.log(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };
  // useEffect(() => {
  //   fetchCompanies();
  // }, [apiUrl]);

  // Function to fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${apiUrl}/job/readJobs`);

      startTransition(() => {
        setJobs(response.data);
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  // useEffect(() => {
  //   fetchJobs();
  // }, [apiUrl]);

  const createCompany = async (company) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setLoading(false);
      setError("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/company/createCompany`,
        { company },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // showToast(response.data.message, "success");
      return response.data;
    } catch (err) {
      showToast(
        err.response
          ? (err.response.data.message, "error")
          : (err.message, "error")
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (job) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setLoading(false);
      setError("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/job/createJob`,
        { job },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const fetchCompanyByIdForUser = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/company/readCompanyForUser`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        setUserCompany("Company Not Found");
      } else {
        const data = response.data;
        setUserCompany(data);
      }
    } catch (error) {
      console.error("Error fetching user's company data:", error);
      // Optionally handle error in state
    }
  };
  const fetchgetAuthenticatedUserJobsPost = async (token) => {
    try {
      const response = await axios.get(
        `${apiUrl}/job/getAuthenticatedUserJobsPost`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log(response.data);

      const data = response.data;
      setIsAuthenticatedUserJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching user's company data:", error);
      // Optionally handle error in state
    }
  };
  const fetchJobsAdmin = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/job/readJobsAdmin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      startTransition(() => {
        setJobsAdmin(response.data);
      });
      // console.log(jobsAdmin);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  const fetchAllCompaniesAdmin = async (token) => {
    try {
      const response = await axios.get(
        `${apiUrl}/company/getAllCompaniesAdmin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      startTransition(() => {
        setCompaniesAdmin(response.data);
      });
      // console.log(jobsAdmin);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  // console.log(jobsAdmin);
  return (
    <CompanyJobContext.Provider
      value={{
        fetchCompanies,
        companies,
        readMore,
        setCompanies,
        fetchJobs,
        jobs,
        setJobs,
        createCompany,
        createJob,
        loading,
        error,
        fetchCompanyByIdForUser,
        userCompany,
        setUserCompany,
        fetchgetAuthenticatedUserJobsPost,
        isAuthenticatedUserJobs,
        setIsAuthenticatedUserJobs,
        fetchJobsAdmin,
        jobsAdmin,
        fetchAllCompaniesAdmin,
        companiesAdmin,
      }}
    >
      {children}
    </CompanyJobContext.Provider>
  );
};
