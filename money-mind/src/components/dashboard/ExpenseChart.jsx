import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

export const ExpenseChart = () => {
  const { transactions } = useContext(FinanceContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  let data;
  let COLORS;

  if (income === 0 && expense > 0) {
    data = [{ name: "Expense (No Income)", value: expense }];
    COLORS = ["#EF4444"];
  } else if (expense > income) {
    data = [
      { name: "Income (Fully Spent)", value: income },
      { name: "Overspent", value: expense - income },
    ];
    COLORS = ["#F97316", "#EF4444"];
  } else {
    data = [
      { name: "Expense", value: expense },
      { name: "Remaining", value: income - expense },
    ];
    COLORS = ["#EF4444", "#22C55E"];
  }

  if (income === 0 && expense === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Income Usage</h2>
        <p className="text-gray-400 text-sm">Add transactions to see your chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Income Usage
      </h2>

      <PieChart width={420} height={260} margin={{ left: 20, right: 20 }}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={80}
          label={({ name, value }) => `${name}: ${Number(value).toLocaleString()}`}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => Number(value).toLocaleString()} />
        <Legend />
      </PieChart>
    </div>
  );
};