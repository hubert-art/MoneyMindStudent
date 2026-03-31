import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { Layout } from "../components/layout/Layout";
import { PrivateRoute } from "./PrivateRoute";

// Pages
import Dashboard from "../pages/Dahsboard";
import AddTransaction from "../pages/AddTransaction";
import Transactions from "../pages/Transactions";
import Analytics from "../pages/Analytics";
import Wallet from "../pages/Wallet";
import Settings from "../pages/Settings";
import GetStarted from "../pages/GetStarted";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

export const AppRoutes = ({ darkMode, setDarkMode }) => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>

      {/* 🟢 LANDING */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/dashboard" /> : <GetStarted />
        }
      />

      {/*  AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/add"
        element={
          <PrivateRoute>
            <Layout>
              <AddTransaction />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Layout>
              <Transactions />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Layout>
              <Analytics />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/wallet"
        element={
          <PrivateRoute>
            <Layout>
              <Wallet />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <Layout>
            <Settings darkMode={darkMode} setDarkMode={setDarkMode} />
          </Layout>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
};