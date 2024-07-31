// import React, { lazy } from "react";
// const ErrorPage = lazy(() => import("./screens/ErrorPage.jsx"));

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     console.error("ErrorBoundary caught an error", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return <ErrorPage />;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
import React from "react";
import ErrorPage from "./screens/ErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, shouldReload: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      shouldReload: !window.sessionStorage.getItem("errorReloaded"),
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.hasError && this.state.shouldReload) {
      // Mark that the error has been handled and reload the page
      window.sessionStorage.setItem("errorReloaded", "true");
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
