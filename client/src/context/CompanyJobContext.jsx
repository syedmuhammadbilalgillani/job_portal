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

const CompanyJobContext = createContext();

export const useCompanyJob = () => useContext(CompanyJobContext);

export const CompanyJobProvider = ({ children }) => {
  const apiUrl = useMemo(() => import.meta.env.VITE_API_KEY, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = Cookies.get("AUTH_TOKEN"); //useMemo(() => Cookies.get("AUTH_TOKEN"), []);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userCompany, setUserCompany] = useState(null);

  useEffect(() => {
    // Function to fetch all companies
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/company/readCompany`);

        startTransition(() => {
          setCompanies(response.data);
        });
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, [apiUrl]);

  useEffect(() => {
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

    fetchJobs();
  }, [apiUrl]);

  const createCompanyAndJob = async (company, job) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setLoading(false);
      setError("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/company/createCompanyAndJob`,
        { company, job },
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

  return (
    <CompanyJobContext.Provider
      value={{
        companies,
        setCompanies,
        jobs,
        setJobs,
        createCompanyAndJob,
        createJob,
        loading,
        error,
        fetchCompanyByIdForUser,
        userCompany,
        setUserCompany,
      }}
    >
      {children}
    </CompanyJobContext.Provider>
  );
};
