import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-5 flex flex-col">
      
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <img
          src="../../../public/moneyMind.png"
          alt="MoneyMind Logo"
          className="h-40 object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Dashboard
        </Link>
        <Link to="/add" className="text-gray-700 hover:text-blue-500">
          Add Transaction
        </Link>
        <Link to="/transactions" className="text-gray-700 hover:text-blue-500">
          Transactions
        </Link>

        <Link to="/analytics" className="text-gray-700 hover:text-blue-500">
          Analytics
        </Link>

        <Link to="/wallet" className="text-gray-700 hover:text-blue-500">
          Wallet
        </Link>

        <Link to="/settings" className="text-gray-700 hover:text-blue-500">
          Settings
        </Link>
      </nav>

      {/* Bottom */}
      <div className="mt-auto text-sm text-gray-400">
        © 2026 MoneyMind
      </div>
    </div>
  );
};