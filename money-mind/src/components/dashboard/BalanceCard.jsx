import { useContext, useState } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import { Eye, EyeOff, Lock, Handbag } from "lucide-react";

export const BalanceCard = () => {
  const { balance } = useContext(FinanceContext);

  const [showBalance, setShowBalance] = useState(true);

  // 👤 USER DYNAMIQUE (à remplacer selon ton auth system)
  const userName = localStorage.getItem("userName") || "User";

  return (
    <div
      className="
        w-full text-left p-6 shadow-sm
        bg-[#e4edfd6e]
        dark:bg-gray-900
        border border-transparent dark:border-gray-800
      "
      style={{
        borderRadius: "15px",
      }}
    >

      {/* USER INFO */}
      <div className="text-left">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Hello {userName}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          Nice to see you again! Analyze for a positive outcome!
        </p>
      </div>

      {/* BALANCE TITLE */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-left">
        Balance amount:
      </p>

      {/* BALANCE ROW */}
      <div className="flex items-center justify-between mt-2 w-full h-12 p-5 rounded-full bg-[#f9fafb46] dark:bg-gray-800">

        {/* LEFT */}
        <div className="flex items-center gap-2">

          <span className="text-gray-600 dark:text-gray-300">
            {showBalance ? <Handbag /> : <Lock />}
          </span>

          <h1 className="text-2xl font-bold text-green-400">
            {showBalance
              ? `KES ${balance.toLocaleString()}`
              : "KES •••••••"}
          </h1>

        </div>

        {/* RIGHT */}
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
        >
          {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>

      </div>
    </div>
  );
};