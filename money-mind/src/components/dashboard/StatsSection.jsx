import { TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

const StatCard = ({ title, amount, subtitle, bg, textColor, icon }) => {
  return (
    <div
      className="p-5 rounded-2xl shadow-sm flex flex-col gap-2 hover:shadow-md transition w-[32%]
                 dark:border dark:border-gray-800 dark:bg-gray-900"
      style={{ backgroundColor: bg }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {title}
        </p>
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {amount}
      </h3>

      <p className={`text-xs ${textColor}`}>
        {subtitle}
      </p>
    </div>
  );
};

export const StatsSection = ({ transactions = [] }) => {
  // 🔥 SAFE CALCULS
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + (t.amount || 0), 0);

  const savings = income - expenses;

  const formatKES = (value = 0) =>
    `KES ${value.toLocaleString()}`;

  return (
    // 🚨 ON GARDE TON FLEX + 3 ENFANTS SUR UNE LIGNE
    <div className="flex justify-between gap-3">

      <StatCard
        title="Income"
        amount={formatKES(income)}
        subtitle="Total income"
        bg="rgba(34,197,94,0.1)"   // 👈 inchangé
        textColor="text-green-600 dark:text-green-400"
        icon={<TrendingUp className="text-green-600 dark:text-green-400" size={18} />}
      />

      <StatCard
        title="Expenses"
        amount={formatKES(expenses)}
        subtitle="Total expenses"
        bg="rgba(239,68,68,0.1)"   // 👈 inchangé
        textColor="text-red-500 dark:text-red-400"
        icon={<TrendingDown className="text-red-500 dark:text-red-400" size={18} />}
      />

      <StatCard
        title="Savings"
        amount={formatKES(savings)}
        subtitle="Net savings"
        bg="rgba(59,130,246,0.1)"   // 👈 inchangé
        textColor="text-blue-600 dark:text-blue-400"
        icon={<PiggyBank className="text-blue-600 dark:text-blue-400" size={18} />}
      />

    </div>
  );
};