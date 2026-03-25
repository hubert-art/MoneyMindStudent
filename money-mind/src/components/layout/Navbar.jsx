import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      
      <h3 className="font-semibold">MoneyMind Student</h3>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          {user?.email}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl2"
        >
          Logout
        </button>
      </div>

    </div>
  );
};