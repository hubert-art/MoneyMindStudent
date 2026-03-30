import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { EllipsisVertical } from "lucide-react";

export const Navbar = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-950 shadow-sm border-b border-gray-100 dark:border-gray-800">

      {/* MOBILE MENU */}
      <button
        className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
        onClick={toggleSidebar}
      >
        <EllipsisVertical />
      </button>

      {/* BRAND */}
      <div className="flex items-center gap-2">
        
        {/* DESKTOP */}
        <h2 className="hidden md:block font-bold text-gray-800 dark:text-white text-lg">
          MoneyMind Student
        </h2>

        {/* MOBILE LOGO */}
        <img
          src="../../../public/mind'.png"
          alt="logo"
          className="block md:hidden w-20 h-15 object-contain"
        />
      </div>

      {/* USER */}
      <div className="flex items-center gap-4 pr-2">
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-300 sm:block">
          {user?.email}
        </span>
      </div>

    </div>
  );
};