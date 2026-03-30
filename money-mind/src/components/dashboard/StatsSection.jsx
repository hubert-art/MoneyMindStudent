import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';

const StatCard = ({ title, amount, subtitle, color }) => {
  const formattedAmount = amount < 0 
    ? `-KES ${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `KES ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-semibold">{formattedAmount}</h3>
      <p className={`text-sm ${color}`}>{subtitle}</p>
    </div>
  );
};

export const StatsSection = () => {
  const { transactions } = useContext(FinanceContext);

  const { income, expenses } = transactions.reduce(
    (acc, tx) => {
      const amount = Number(tx.amount);
      if (tx.type === 'income') acc.income += amount;
      else acc.expenses += amount;
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const savings = income - expenses;

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        title="Income"
        amount={income}
        subtitle={income > 0 ? 'Total received' : 'No income yet'}
        color="text-green-500"
      />
      <StatCard
        title="Expenses"
        amount={expenses}
        subtitle={expenses > 0 ? 'Total spent' : 'No expenses yet'}
        color="text-red-500"
      />
      <StatCard
        title="Savings"
        amount={savings}
        subtitle={savings < 0 ? 'Overspent' : 'Available to save'}
        color={savings >= 0 ? 'text-blue-500' : 'text-red-500'}
      />
    </div>
  );
};