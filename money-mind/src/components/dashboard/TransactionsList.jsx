import { useContext, useState } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";

export const TransactionsList = () => {
  const { transactions = [] } = useContext(FinanceContext);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // 🔥 FILTER LOGIC
  const filteredTransactions = transactions
    .filter((tx) => {
      if (filter === "income") return tx.type === "income";
      if (filter === "expense") return tx.type === "expense";
      return true;
    })
    .filter((tx) =>
      tx.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Recent Transactions
        </h2>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 text-xs">

          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full transition ${
              filter === "all"
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`px-3 py-1 rounded-full transition ${
              filter === "income"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            Income
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`px-3 py-1 rounded-full transition ${
              filter === "expense"
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            Expenses
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white outline-none"
        />
      </div>

      {/* EMPTY STATE */}
      {filteredTransactions.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          No transactions found
        </p>
      ) : (
        <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">

          {/* HEADER TABLE */}
          <div className="grid grid-cols-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-300">
            <p>NAME</p>
            <p>DATE</p>
            <p className="text-right">AMOUNT</p>
          </div>

          {/* LIST */}
          {filteredTransactions.map((tx, index) => (
            <div
              key={index}
              className={`
                grid grid-cols-3 px-4 py-3 text-sm items-center
                border-t border-gray-100 dark:border-gray-800
                transition hover:scale-[1.01] duration-200

                ${
                  tx.type === "income"
                    ? "bg-green-50 dark:bg-green-900/10"
                    : "bg-red-50 dark:bg-red-900/10"
                }
              `}
            >

              {/* NAME + ICON */}
              <div className="flex items-center gap-2">
                {tx.type === "income" ? (
                  <ArrowUpRight className="text-green-600" size={16} />
                ) : (
                  <ArrowDownRight className="text-red-500" size={16} />
                )}

                <p className="font-medium text-gray-800 dark:text-white">
                  {tx.title}
                </p>
              </div>

              {/* DATE */}
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {tx.date}
              </p>

              {/* AMOUNT */}
              <p
                className={`text-right font-semibold ${
                  tx.type === "income"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}
                KES {tx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};