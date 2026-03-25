import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Analytics = () => {
  const { transactions } = useContext(FinanceContext);

  // 🧠 Regrouper par date
  const groupedByDate = transactions.reduce((acc, tx) => {
    const date = tx.date;

    if (!acc[date]) {
      acc[date] = { date, income: 0, expense: 0 };
    }

    if (tx.type === "income") {
      acc[date].income += tx.amount;
    } else {
      acc[date].expense += tx.amount;
    }

    return acc;
  }, {});

  const lineData = Object.values(groupedByDate);

  // 🧠 Total income vs expense
  const totals = transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") {
        acc.income += tx.amount;
      } else {
        acc.expense += tx.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const barData = [
    { name: "Income", value: totals.income },
    { name: "Expense", value: totals.expense },
  ];

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-semibold">Analytics</h1>

      {/* 📈 Line Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
        <h2 className="mb-4 font-semibold">Spending Over Time</h2>

        <LineChart width={500} height={300} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#22C55E" />
          <Line type="monotone" dataKey="expense" stroke="#EF4444" />
        </LineChart>
      </div>

      {/* 📊 Bar Chart */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm">
        <h2 className="mb-4 font-semibold">Income vs Expense</h2>

        <BarChart width={500} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22C55E" />
        </BarChart>
      </div>

    </div>
  );
};

export default Analytics;