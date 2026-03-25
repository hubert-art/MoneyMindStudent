
// import { Routes, Route } from "react-router-dom";
// import { Layout } from "../components/layout/Layout";

// // Pages
// import Dashboard from "../pages/Dashboard";
// import AddTransaction from "../pages/AddTransaction";
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";

// // (tu ajouteras les autres plus tard)
// import Transactions from "../pages/Transactions";
// import Analytics from "../pages/Analytics";
// import Wallet from "../pages/Wallet";
// import Settings from "../pages/Settings";

// export const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       {/* Dashboard */}
//       <Route
//         path="/"
//         element={
//           <Layout>
//             <Dashboard />
//           </Layout>
//         }
//       />

//       {/* Add Transaction */}
//       <Route
//         path="/add"
//         element={
//           <Layout>
//             <AddTransaction />
//           </Layout>
//         }
//       />

//       {/* Transactions */}
//       <Route
//         path="/transactions"
//         element={
//           <Layout>
//             <Transactions />
//           </Layout>
//         }
//       />

//       {/* Analytics */}
//       <Route
//         path="/analytics"
//         element={
//           <Layout>
//             <Analytics />
//           </Layout>
//         }
//       />

//       {/* Wallet */}
//       <Route
//         path="/wallet"
//         element={
//           <Layout>
//             <Wallet />
//           </Layout>
//         }
//       />

//       {/* Settings */}
//       <Route
//         path="/settings"
//         element={
//           <Layout>
//             <Settings />
//           </Layout>
//         }
//       />

//     </Routes>
//   );
// };

import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { PrivateRoute } from "./PrivateRoute";

// Pages
import Dashboard from "../pages/Dashboard";
import AddTransaction from "../pages/AddTransaction";
import Transactions from "../pages/Transactions";
import Analytics from "../pages/Analytics";
import Wallet from "../pages/Wallet";
import Settings from "../pages/Settings";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const AppRoutes = ({ darkMode, setDarkMode }) => {
  return (
    <Routes>

      {/* 🔐 Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🏠 Protected routes */}
      <Route
        path="/"
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

      {/* <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Layout>
              <Settings />
            </Layout>
          </PrivateRoute>
        }
      /> */}
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