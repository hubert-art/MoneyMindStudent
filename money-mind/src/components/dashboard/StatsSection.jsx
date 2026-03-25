const StatCard = ({ title, amount, change, color }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-semibold">{amount}</h3>
      <p className={`text-sm ${color}`}>{change}</p>
    </div>
  );
};

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard title="Income" amount="KES 12,000" change="+8%" color="text-green-500" />
      <StatCard title="Expenses" amount="KES 8,500" change="-3%" color="text-red-500" />
      <StatCard title="Savings" amount="KES 3,500" change="+5%" color="text-blue-500" />
    </div>
  );
};