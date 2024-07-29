import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "../pages/UnAuthorizedPage";
import { useAuth } from "../contexts/AuthContext";

const Authorization = ({ allowedRoles }) => {
  const {loggedIn, user} = useAuth()
  const location = useLocation();


  if (loggedIn) {

    // If access is restricted with roles
    if (allowedRoles) {
      
      const isAllowed = allowedRoles.some(role => role === user.role)
      return isAllowed ? <Outlet /> : <Unauthorized />;
    }
    else{
      return  <Outlet />;
    }
  }
  else{
    return <Navigate to='/login' state={{ path: location.pathname }} replace />;
  }
};

export default Authorization;
