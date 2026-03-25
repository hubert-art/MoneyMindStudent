import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

export const BalanceCard = () => {
  const { balance } = useContext(FinanceContext);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md">
      
      <div className="flex justify-between items-center">
        <p className="text-sm opacity-80">Total Balance</p>
        <span>👁️</span>
      </div>

      <h1 className="text-3xl font-bold mt-4">
        KES {balance.toLocaleString()}
      </h1>

      <p className="text-sm mt-2 opacity-80">
        +12% from last month
      </p>

      <div className="flex gap-3 mt-6">
        <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-sm">
          Add Money
        </button>
        <button className="bg-blue-400 px-4 py-2 rounded-xl text-sm">
          Send
        </button>
      </div>
    </div>
  );
};