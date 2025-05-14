
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect based on role
  if (user?.role === "student") {
    return <Navigate to="/student/dashboard" replace />;
  } else if (user?.role === "instructor") {
    return <Navigate to="/instructor/dashboard" replace />;
  }
  
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    </div>
  );
};

export default Dashboard;
