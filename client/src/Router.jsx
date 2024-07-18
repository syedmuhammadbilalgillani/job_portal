import React, { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

// pages
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./screens/Home.jsx"));
const About = lazy(() => import("./screens/About.jsx"));
const Jobs = lazy(() => import("./screens/Jobs.jsx"));
const Companies = lazy(() => import("./screens/Companies.jsx"));
const CompaniesDetail = lazy(() => import("./screens/CompaniesDetail.jsx"));
const Blogs = lazy(() => import("./screens/Blogs.jsx"));
const ContactUs = lazy(() => import("./screens/ContactUs.jsx"));
const Draft = lazy(() => import("./screens/Draft.jsx"));
const PostAJob = lazy(() => import("./screens/PostAJob.jsx"));
const Login = lazy(() => import("./screens/Login.jsx"));
const ErrorPage = lazy(() => import("./screens/ErrorPage.jsx"));
// const AdminPanel = lazy(() => import("./screens/AdminPanel.jsx"));
const clientRoutes = [
  { path: "", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "jobs", element: <Jobs /> },
  { path: "companies", element: <Companies /> },
  { path: "/companies/:id", element: <CompaniesDetail /> },
  { path: "blogs", element: <Blogs /> },
  { path: "contact", element: <ContactUs /> },
  { path: "draft", element: <Draft /> },
  { path: "postJobOffer", element: <PostAJob /> },
  { path: "login", element: <Login /> },
];
// const adminRoutes = [
//   { path: "", element: <Home /> },
//   { path: "/about", element: <About /> },
//   { path: "jobs", element: <Jobs /> },
//   { path: "companies", element: <Companies /> },
//   { path: "/companies/:id", element: <CompaniesDetail /> },
//   { path: "blogs", element: <Blogs /> },
//   { path: "contact", element: <ContactUs /> },
//   { path: "draft", element: <Draft /> },
//   { path: "postajob", element: <PostAJob /> },
// ];
// Components
const Loader = lazy(() => import("./components/Loader/Loader.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      ...clientRoutes.map((route) => ({
        path: route.path,
        element: (
          <React.Suspense fallback={<Loader />}>{route.element}</React.Suspense>
        ),
        errorElement: <ErrorPage />,
      })),
      // ...adminRoutes.map((route) => ({
      //   path: route.path,
      //   element: (
      //     <React.Suspense fallback={<Loader />}>{route.element}</React.Suspense>
      //   ),
      // })),
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

// import React from 'react'
// import AddProduct from './Pages/AddProduct';
// import Read from './Pages/Read';
// import ReadById from './Pages/ReadById';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './Components/Sidebar/Sidebar';

// function Router() {
//     return (
//         <>
//             <Router>
//                 <Sidebar></Sidebar>
//                 <Routes>
//                     {/* Use 'element' prop to render components, not 'component' */}
//                     <Route path="/" element={<Read />} exact />
//                     <Route path="/products/:productId" element={<ReadById />} />
//                     <Route path="/AddProduct" element={<AddProduct />} />
//                 </Routes>
//             </Router>
//         </>
//     )
// }

// export default Router
