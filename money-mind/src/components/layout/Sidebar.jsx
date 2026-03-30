import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  LogOut,
  Cog,
  Wallet,
  ChartBar,
  ScanBarcode,
  LayersPlus,
  LayoutDashboard,
} from "lucide-react";

export const Sidebar = ({ closeSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `p-2 rounded-xl transition flex items-center justify-between gap-[10px]
    ${
      isActive
        ? "bg-green-500 text-white"
        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-950 shadow-md p-5 flex flex-col border-r border-gray-100 dark:border-gray-800">

      {/* Close button (mobile only) */}
      <button
        className="md:hidden mb-4 self-end text-xl text-gray-700 dark:text-gray-300"
        onClick={closeSidebar}
      >
        ✕
      </button>

      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <img
          src="../../../public/mind'.png"
          alt="MoneyMind Logo"
          className="h-30 object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 m-2">

        <NavLink to="/" end className={linkClass}>
          <span>Dashboard</span>
          <LayoutDashboard size={18} />
        </NavLink>

        <NavLink to="/add" className={linkClass}>
          <span>Add Transaction</span>
          <LayersPlus size={18} />
        </NavLink>

        <NavLink to="/transactions" className={linkClass}>
          <span>Transactions</span>
          <ScanBarcode size={18} />
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <span>Analytics</span>
          <ChartBar size={18} />
        </NavLink>

        <NavLink to="/wallet" className={linkClass}>
          <span>Wallet</span>
          <Wallet size={18} />
        </NavLink>

      </nav>

      {/* Bottom */}
      <div className="mt-auto text-sm m-2 flex flex-col gap-4">

        <NavLink to="/settings" className={linkClass}>
          <span>Settings</span>
          <Cog size={18} />
        </NavLink>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center justify-between gap-[10px] transition"
        >
          <span>Logout</span>
          <LogOut size={18} />
        </button>

        <p className="text-gray-400 dark:text-gray-500 text-xs text-center">
          © 2026 MoneyMind Student
        </p>
      </div>
    </div>
  );
};