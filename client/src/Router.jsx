import React, { lazy, Suspense } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary.jsx";
import ErrorPage from "./screens/ErrorPage.jsx";

// contexts
import { ToastProvider } from "./context/ToastContext/ToastContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { GalleryProvider } from "./context/GalleryContext.jsx";
import { CompanyProvider } from "./context/CompanyContext.jsx";
import { RoleProvider } from "./context/RoleContext.jsx";
import { CompanyJobProvider } from "./context/CompanyJobContext.jsx";
import { JobApplicationProvider } from "./context/JobApplicationContext.jsx";

// pages
const App = lazy(() => import("./App.jsx"));
// import App from "./App.jsx";
const Home = lazy(() => import("./screens/Home.jsx"));
const About = lazy(() => import("./screens/About.jsx"));
const Jobs = lazy(() => import("./screens/Jobs.jsx"));
const Companies = lazy(() => import("./screens/Companies.jsx"));
const CompaniesDetail = lazy(() => import("./screens/CompaniesDetail.jsx"));
const JobDetails = lazy(() => import("./screens/JobDetails.jsx"));
const Blogs = lazy(() => import("./screens/Blogs.jsx"));
const ContactUs = lazy(() => import("./screens/ContactUs.jsx"));
const Draft = lazy(() => import("./screens/Draft.jsx"));
const PostAJob = lazy(() => import("./screens/PostAJob.jsx"));
const Login = lazy(() => import("./screens/Login.jsx"));
const Profile = lazy(() => import("./screens/Profile.jsx"));
const Gallery = lazy(() => import("./screens/Gallery.jsx"));
const Forget = lazy(() => import("./components/forget/Forget.jsx"));

const Loader = lazy(() => import("./components/Loader/Loader.jsx"));

// Component to handle protected routes
const ProtectedRoute = ({ children }) => {
  const { checkAuthentication, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />; // Or any loading indicator
  }

  if (!checkAuthentication()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
const IsLoggedInPrivate = ({ children }) => {
  const { checkAuthentication, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />; // Or any loading indicator
  }

  if (checkAuthentication()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const clientRoutes = [
  { path: "", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/companies", element: <Companies /> },
  { path: "/companies/:id", element: <CompaniesDetail /> },
  { path: "/job/:id", element: <JobDetails /> },
  { path: "blogs", element: <Blogs /> },
  { path: "/contact", element: <ContactUs /> },
  { path: "/forget", element: <Forget /> },
];

const protectedRoutes = [
  { path: "/postJobOffer", element: <PostAJob /> },
  { path: "/draft", element: <Draft /> },
  { path: "/profile", element: <Profile /> },
  { path: "/gallery", element: <Gallery /> },
];
const IsLoggedInPrivateRoutes = [{ path: "/login", element: <Login /> }];

// Components

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <ErrorBoundary>
          <ToastProvider>
            <RoleProvider>
              <CompanyJobProvider>
                <AuthProvider>
                  <CompanyProvider>
                    <GalleryProvider>
                      <JobApplicationProvider>
                        <App />
                      </JobApplicationProvider>
                    </GalleryProvider>
                  </CompanyProvider>
                </AuthProvider>
              </CompanyJobProvider>
            </RoleProvider>
          </ToastProvider>
        </ErrorBoundary>
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      ...clientRoutes.map((route) => ({
        path: route.path,
        element: <Suspense fallback={<Loader />}>{route.element}</Suspense>,
        errorElement: <ErrorPage />,
      })),
      ...protectedRoutes.map((route) => ({
        path: route.path,
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute>{route.element}</ProtectedRoute>
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      })),
      ...IsLoggedInPrivateRoutes.map((route) => ({
        path: route.path,
        element: (
          <Suspense fallback={<Loader />}>
            <IsLoggedInPrivate>{route.element}</IsLoggedInPrivate>
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      })),
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

// for testing loader

// const Home = lazy(() => {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve(import("./screens/Home")), 3000); // Set timeout to 3000ms (3 seconds)
//     });
// });
