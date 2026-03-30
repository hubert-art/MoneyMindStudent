import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useContext, useMemo } from "react";
import { FinanceContext } from "../../context/FinanceContext";

export const ExpenseChart = () => {
  const { transactions = [] } = useContext(FinanceContext);

  // ⚡ PERFORMANCE
  const { income, expense } = useMemo(() => {
    const incomeTotal = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    const expenseTotal = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + (t.amount || 0), 0);

    return {
      income: incomeTotal,
      expense: expenseTotal,
    };
  }, [transactions]);

  const data = useMemo(
    () => [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ],
    [income, expense]
  );

  const COLORS = ["#22C55E", "#EF4444"];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">

      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Income vs Expense
      </h2>

      {/* CHART */}
      <div className="w-full h-[260px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={4}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            {/* TOOLTIP DARK MODE */}
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                backgroundColor: "var(--tooltip-bg)",
                color: "var(--tooltip-text)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-6 mt-4 text-sm">

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <p className="text-gray-600 dark:text-gray-300">Income</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <p className="text-gray-600 dark:text-gray-300">Expense</p>
        </div>

      </div>
    </div>
  );
};