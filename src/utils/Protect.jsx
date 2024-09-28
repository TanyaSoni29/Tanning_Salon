/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, token, expirationTime, isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!loading) {
      const currentTime = Date.now();

      if (!isAuth || (expirationTime && currentTime > expirationTime)) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        dispatch(setIsAuth(false));
        navigate("/authentication/sign-in");
      }
    }
  }, [loading, expirationTime, isAuth, dispatch]);

  // Show loader if authentication status is still loading
  if (loading) {
    // return <Loader loading background="#2ecc71" loaderColor="#3498db" />;
    return <div>Loading...</div>;
  }

  // If authenticated, render children
  return isAuth ? children : <Navigate to="/authentication/sign-in" />;
};

export default ProtectedRoute;
