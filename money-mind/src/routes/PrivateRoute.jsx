// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export const PrivateRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // ⏳ attendre auth
  if (loading) return null;

  // ❌ pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ connecté
  return children;
};