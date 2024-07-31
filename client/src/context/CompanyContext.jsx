import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  startTransition,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { useAuth } from "./AuthContext";

const CompanyContext = createContext();

const CompanyProvider = ({ children }) => {
  const apiUrl = useMemo(() => import.meta.env.VITE_API_KEY, []);
  const [company, setCompany] = useState(null); // null, true, or false
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  // const { role } = useAuth();
  const token = Cookies.get("AUTH_TOKEN"); //useMemo(() => Cookies.get("AUTH_TOKEN"), []);

  const fetchCompany = useCallback(async () => {
    if (!token) {
      // If there's no token, set company to null and loading to false
      setCompany(null);
      setLoading(false);
      setMessage("User not logged in.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await axios.get(`${apiUrl}/company/checkUserCompany`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the API response
      startTransition(() => {
        if (response.data.exists) {
          setCompany(true);
          setMessage("Company found successfully!");
        } else {
          setCompany(false);
          setMessage("No company associated with your account.");
        }
      });
    } catch (err) {
      setError(err.response ? err.response.data.error : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, token]);

  // useEffect(() => {
  //   fetchCompany();
  // }, [fetchCompany]);
  // console.log(company, "valuye");
  return (
    <CompanyContext.Provider
      value={{ company, loading, error, message, fetchCompany }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export { CompanyContext, CompanyProvider };
