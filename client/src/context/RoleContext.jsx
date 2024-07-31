import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
  startTransition,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const apiUrl = useMemo(() => import.meta.env.VITE_API_KEY, []); // Use environment variable for API URL
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const token = Cookies.get("AUTH_TOKEN"); //useMemo(() => Cookies.get("AUTH_TOKEN"), []);

  const fetchRole = async () => {
    if (!token) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/user/checkUserRole`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      startTransition(() => {
        setRole(response.data.role);
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching role");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRole();
  }, [apiUrl, token]);

  return (
    <RoleContext.Provider value={{ role, fetchRole, error, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
