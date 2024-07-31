import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  startTransition,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useToast } from "../context/ToastContext/ToastContext";
import { useNavigate } from "react-router-dom";
import { useCompanyJob } from "./CompanyJobContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_KEY;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(null);
  const showToast = useToast();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userContactInfo, setUserContactInfo] = useState(null);
  const [allUserData, setAllUserData] = useState(null);
  const { fetchCompanyByIdForUser } = useCompanyJob();
  const checkTokenValidity = () => {
    const token = Cookies.get("AUTH_TOKEN");
    return token !== undefined;
  };

  const fetchRole = async (token) => {
    if (!token) {
      setRole(null);
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/user/checkUserRole`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(response.data.role);
    } catch (err) {
      setRole(null);
      console.error("Error fetching role:", err);
    }
  };

  const userProfile = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/user/userProfile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  const fetchUserContactInfo = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/user/userContactProfile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setUserContactInfo(data);
    } catch (error) {
      console.error("Error fetching user contact info:", error);
      throw error;
    }
  };

  const fetchAllUsersData = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/user/readAllUsers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setAllUserData(data);
    } catch (error) {
      console.error("Error fetching all users' data:", error);
      throw error;
    }
  };

  const registerUser = async (formData, selectedTab) => {
    setIsLoading(true);
    try {
      const endpoint =
        selectedTab === "Job Seeker"
          ? `${apiUrl}/user/jobSeekerRegistration`
          : `${apiUrl}/user/employerRegistration`;

      const response = await axios.post(endpoint, formData);
      const token = response.data.token;
      Cookies.set("AUTH_TOKEN", token, { expires: 1 });

      startTransition(async () => {
        setIsAuthenticated(true);
        await fetchRole(token);
        await userProfile(token);
        navigate("/profile");
      });

      showToast(response.data.message, "success");
    } catch (err) {
      showToast(
        err.response ? err.response.data.message : "Error during registration",
        "error"
      );
      console.error("Error during registration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (formData) => {
    setIsLoading(true);

    // Wait for 5 seconds before making the API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loginWithTimeout = async () => {
      const timeout = new Promise(
        (_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 10000) // 10 seconds timeout
      );

      const request = axios.post(`${apiUrl}/user/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      return Promise.race([request, timeout]);
    };

    try {
      const response = await loginWithTimeout();

      const token = response.data.token;
      Cookies.set("AUTH_TOKEN", token, { expires: 1 });

      startTransition(async () => {
        setIsAuthenticated(true);
        await fetchRole(token);
        await userProfile(token);
        await fetchUserContactInfo(token);
        await fetchCompanyByIdForUser(token);
        navigate("/");
      });

      showToast(response.data.message, "success");
    } catch (error) {
      if (error.message === "Request timed out") {
        showToast("Login request timed out. Please try again.", "error");
      } else {
        showToast(
          error.response?.data?.message || "An error occurred during login",
          "error"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  const logoutUser = async () => {
    setIsLoading(true);

    // Wait for 5 seconds before making the API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const response = await axios.post(`${apiUrl}/user/logout`);
      Cookies.remove("AUTH_TOKEN");

      startTransition(() => {
        setIsAuthenticated(false);
        setRole(null);
        setUserData(null);
        setAllUserData(null);
        navigate("/");
      });

      showToast(response.data.message, "success");
    } catch (error) {
      showToast(
        error.response?.data?.message || "An error occurred during logout",
        "error"
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthentication = () => {
    return checkTokenValidity();
  };

  const updateProfilePicture = async (formData) => {
    const token = Cookies.get("AUTH_TOKEN");
    if (!token) {
      showToast("No valid token found. Please log in.", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${apiUrl}/user/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData((prevUserData) => ({
        ...prevUserData,
        profilePicture: response.data.profilePicture,
      }));

      showToast(response.data.message, "success");
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      showToast(
        error.response
          ? error.response.data.message
          : "Error updating profile picture",
        "error"
      );
    }
  };

  const updateUserProfile = async (formData) => {
    const token = Cookies.get("AUTH_TOKEN");
    if (!token) {
      showToast("No valid token found. Please log in.", "error");
      return;
    }

    try {
      const response = await axios.put(`${apiUrl}/user/updateUser`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const updatedUser = response.data;
      setUserData(updatedUser);

      // Assuming contactInfo is part of the response data
      if (updatedUser.contactInfo) {
        setUserContactInfo(updatedUser.contactInfo);
      }
      userProfile(token);
      fetchUserContactInfo(token);
      showToast(response.data.message, "success");
    } catch (error) {
      console.error("Error updating user:", error);
      showToast(
        error.response ? error.response.data.message : "Error updating user",
        "error"
      );
    }
  };
  const updateUserPassword = async (formData) => {
    const token = Cookies.get("AUTH_TOKEN");
    if (!token) {
      showToast("No valid token found. Please log in.", "error");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/user/updateUserPassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = response.data;
      setUserData(updatedUser);

      // Assuming contactInfo is part of the response data
      if (updatedUser.contactInfo) {
        setUserContactInfo(updatedUser.contactInfo);
      }
      userProfile(token);
      fetchUserContactInfo(token);
      showToast(response.data.message, "success");
    } catch (error) {
      console.error("Error updating user:", error);
      showToast(
        error.response ? error.response.data.message : "Error updating user",
        "error"
      );
    }
  };
  const deleteUserById = async (userId) => {
    const token = Cookies.get("AUTH_TOKEN");
    if (!token) {
      showToast("No valid token found. Please log in.", "error");
      return;
    }

    try {
      const response = await axios.delete(
        `${apiUrl}/user/deleteUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      await fetchAllUsersData(token);
      showToast(response.data.message, "success");
    } catch (error) {
      console.error("Error updating user:", error);
      showToast(
        error.response ? error.response.data.message : "Error updating user",
        "error"
      );
    }
  };

  useEffect(() => {
    const tokenValid = checkTokenValidity();
    setIsAuthenticated(tokenValid);
    if (tokenValid) {
      const token = Cookies.get("AUTH_TOKEN");
      fetchRole(token);
      userProfile(token);
      fetchUserContactInfo(token);
      fetchCompanyByIdForUser(token);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (role === "admin" && isAuthenticated) {
      const token = Cookies.get("AUTH_TOKEN");
      fetchAllUsersData(token);
    }
  }, [role, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        setIsLoading,
        role,
        fetchRole,
        registerUser,
        loginUser,
        logoutUser,
        checkAuthentication,
        userProfile,
        userData,
        setUserData,
        fetchAllUsersData,
        allUserData,
        setAllUserData,
        userContactInfo,
        setUserContactInfo,
        updateProfilePicture,
        updateUserProfile,
        updateUserPassword,
        deleteUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
