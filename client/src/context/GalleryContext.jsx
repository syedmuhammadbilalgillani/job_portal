import axios from "axios";
import Cookies from "js-cookie";
import React, {
  createContext,
  startTransition,
  useContext,
  useMemo,
  useState,
} from "react";
import { useToast } from "../context/ToastContext/ToastContext";

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const apiUrl = useMemo(() => import.meta.env.VITE_API_KEY, []);
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true); // State to track login status
  const showToast = useToast();
  const token = Cookies.get("AUTH_TOKEN"); //useMemo(() => Cookies.get("AUTH_TOKEN"), []);

  const checkLoggedIn = () => {
    if (!token) {
      setLoggedIn(false);
      showToast("User not logged in.", "error");
      return false;
    }
    setLoggedIn(true);
    return true;
  };

  const getImages = async () => {
    if (!checkLoggedIn()) return; // Check if user is logged in

    setLoading(true);

    try {
      const response = await axios.get(
        `${apiUrl}/gallery/readAllGalleryImages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      startTransition(() => {
        setGallery(response.data.gallery); // Set gallery data
      });

      return response.data.gallery;
    } catch (err) {
      showToast(
        err.response?.data?.message || "Error fetching images",
        "error"
      ); // Handle error
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (files) => {
    if (!checkLoggedIn()) return; // Check if user is logged in

    setLoading(true);

    const formData = new FormData();
    const fileArray = Array.from(files); // Convert FileList to array
    fileArray.forEach((file) => formData.append("images", file)); // Append files

    try {
      const response = await axios.post(
        `${apiUrl}/gallery/uploadImageInGallery`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast(response.data.message, "success"); // Set API success message
      await getImages(); // Refresh gallery after upload
      return response.data.message;
    } catch (err) {
      showToast(
        err.response?.data?.message || "Error uploading images",
        "error"
      ); // Handle error
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteImages = async (publicIds) => {
    if (!checkLoggedIn()) return; // Check if user is logged in

    setLoading(true);

    try {
      const response = await axios.delete(
        `${apiUrl}/gallery/deleteSelectedImage`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { publicIds },
        }
      );

      showToast(response.data.message, "success"); // Set API success message
      await getImages(); // Refresh gallery after deletion
    } catch (err) {
      showToast(
        err.response?.data?.message || "Error deleting images",
        "error"
      ); // Handle error
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAllImages = async () => {
    if (!checkLoggedIn()) return; // Check if user is logged in

    setLoading(true);

    try {
      const response = await axios.delete(
        `${apiUrl}/gallery/deleteAllGalleryImages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast(response.data.message, "success"); // Set API success message
      await getImages(); // Refresh gallery after deletion
    } catch (err) {
      showToast(
        err.response?.data?.message || "Error deleting images",
        "error"
      ); // Handle error
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        uploadImages,
        getImages,
        deleteImages,
        deleteAllImages,
        loading,
        gallery,
        loggedIn, // Provide loggedIn status
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => useContext(GalleryContext);
