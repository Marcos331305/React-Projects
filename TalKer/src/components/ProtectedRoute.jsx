import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // Initially null to show loading
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true); // Set isAuth to true if a user is logged in
      } else {
        setIsAuth(false); // Set to false if no user is logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [auth]);

  // Show loading while authentication is being checked
  if (isAuth === null) {
    return <Loading message={'Loading user DATA, please wait...'} />; // Replace with a spinner if desired
  }

  // If authenticated, show children; otherwise, redirect
  return isAuth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
