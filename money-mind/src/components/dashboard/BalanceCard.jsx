import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';
import { useNavigate } from 'react-router-dom';

export const BalanceCard = () => {
  const { balance } = useContext(FinanceContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-md">

      <div className="flex justify-between items-center">
        <p className="text-sm opacity-80">Total Balance</p>
        <span>👁️</span>
      </div>

      <h1 className="text-3xl font-bold mt-4">
        KES {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h1>

      <p className="text-sm mt-2 opacity-70">
        {balance >= 0 ? 'You are in the green 🎉' : 'Expenses exceed income ⚠️'}
      </p>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate('/add')}
          className="bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          + Add Money
        </button>
        <button
          onClick={() => navigate('/add')}
          className="bg-blue-400 hover:bg-blue-300 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};