/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { loading, token } = useSelector((state) => state.auth);
  console.log(
    "Token in Redux:",
    useSelector((state) => state.auth.token)
  );
  useEffect(() => {
    if (!loading && !token) {
      navigate("/authentication/sign-in");
    }
  }, [token, loading, navigate]);

  // Show loader if authentication status is still loading
  if (loading) {
    // return <Loader loading background="#2ecc71" loaderColor="#3498db" />;
    return <div>Loading...</div>;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
