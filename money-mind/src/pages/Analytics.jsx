import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Analytics = () => {
  const { transactions } = useContext(FinanceContext);
  const [filter, setFilter] = useState("all");

  const filterTransactions = () => {
    const now = new Date();

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      if (filter === "today") {
        return txDate.toDateString() === now.toDateString();
      }

      if (filter === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return txDate >= weekAgo;
      }

      if (filter === "month") {
        return (
          txDate.getMonth() === now.getMonth() &&
          txDate.getFullYear() === now.getFullYear()
        );
      }

      return true;
    });
  };

  const filtered = filterTransactions();

  const groupedByDate = filtered.reduce((acc, tx) => {
    const date = tx.date;

    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }

    if (tx.type === "income") acc[date].income += tx.amount;
    else acc[date].expense += tx.amount;

    return acc;
  }, {});

  const lineData = Object.values(groupedByDate);

  const totals = filtered.reduce(
    (acc, tx) => {
      if (tx.type === "income") acc.income += tx.amount;
      else acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const barData = [
    { name: "Income", value: totals.income },
    { name: "Expense", value: totals.expense },
  ];

  const categoryData = filtered
    .filter((tx) => tx.type === "expense")
    .reduce((acc, tx) => {
      const cat = tx.category || "Other";

      if (!acc[cat]) {
        acc[cat] = { name: cat, value: 0 };
      }

      acc[cat].value += tx.amount;
      return acc;
    }, {});

  const pieData = Object.values(categoryData);

  const COLORS = ["#22C55E", "#EF4444", "#3B82F6", "#F59E0B", "#8B5CF6"];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Analytics
      </h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3">

        {["all", "today", "week", "month"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-4 py-2 rounded-full text-sm transition
              ${
                filter === f
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              }
            `}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LINE CHART */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">

        <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">
          Spending Over Time
        </h2>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.2} />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="income" stroke="#22C55E" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BAR CHART */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">

        <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">
          Income vs Expense
        </h2>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" opacity={0.2} />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" fill="#22C55E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 UPDATED PIE CHART (PREMIUM DONUT STYLE) */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">

        <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">
          Expenses by Category
        </h2>

        <div className="w-full h-[320px] flex items-center justify-center">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}     
                outerRadius={110}    
                paddingAngle={5}    
                cornerRadius={8}   
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              {/* TOOLTIP DARK */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              {/* LEGEND CLEAN */}
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => (
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    {value}
                  </span>
                )}
              />

            </PieChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
};

export default Analytics;