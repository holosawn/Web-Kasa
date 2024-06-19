import React from "react";
import { useAuth } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const Authentication = ({ children }) => {

  const { user } = useAuth();
  const location = useLocation();
  if (!user.userCode) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default Authentication;
