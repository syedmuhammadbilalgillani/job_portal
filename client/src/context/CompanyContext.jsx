import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "../context/ToastContext/ToastContext";
import { useNavigate } from "react-router-dom";
import { useCompanyJob } from "./CompanyJobContext";
const CompanyContext = createContext();

const CompanyProvider = ({ children }) => {
  const apiUrl = useMemo(() => import.meta.env.VITE_API_KEY, []);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const token = Cookies.get("AUTH_TOKEN");
  const showToast = useToast();
  const { userCompany } = useCompanyJob();
  const navigate = useNavigate();
  const fetchCompany = useCallback(async () => {
    if (!token) {
      setCompany(null);
      setLoading(false);
      setMessage("User not logged in.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/company/checkUserCompany`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.exists) {
        setCompany(true);
        setMessage("Company found successfully!");
      } else {
        setCompany(false);
        setMessage("No company associated with your account.");
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, token]);

  // New function to update company data

  const updateCompany = async (companyData) => {
    const token = Cookies.get("AUTH_TOKEN");
    if (!token) {
      showToast("No valid token found. Please log in.", "error");
      return;
    }

    try {
      const response = await axios.put(
        `${apiUrl}/company/updateCompanyInfo`,
        { companyData }, // Wrap companyData in an object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Update successful:", response.data);
      showToast(response.data.message, "success");
      navigate(`/companies/${userCompany._id}`);
    } catch (error) {
      console.error("Error updating company:", error);
      const errorMessage =
        error.response?.data?.message || "Error updating company";
      showToast(errorMessage, "error");
    }
  };

  return (
    <CompanyContext.Provider
      value={{ company, loading, error, message, fetchCompany, updateCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyContext, CompanyProvider };
