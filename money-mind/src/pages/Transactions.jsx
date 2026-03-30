import { useContext, useState, useMemo } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Search } from "lucide-react";

const Transactions = () => {
  const { transactions = [] } = useContext(FinanceContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // FILTER + SEARCH (optimized)
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        if (filter === "income") return tx.type === "income";
        if (filter === "expense") return tx.type === "expense";
        return true;
      })
      .filter((tx) =>
        tx.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [transactions, filter, search]);

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All Transactions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage and track all your financial activity
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">

        {/* SEARCH */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transaction..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm outline-none text-gray-800 dark:text-white"
          />
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex gap-2 text-xs">

          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full ${
              filter === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 dark:bg-gray-800 dark:text-white"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`px-3 py-1 rounded-full ${
              filter === "income"
                ? "bg-green-500 text-white"
                : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            Income
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`px-3 py-1 rounded-full ${
              filter === "expense"
                ? "bg-red-500 text-white"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            Expenses
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

        {/* HEADER ROW */}
        <div className="grid grid-cols-3 bg-gray-100 dark:bg-gray-800 px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300">
          <p>NAME</p>
          <p>DATE</p>
          <p className="text-right">AMOUNT</p>
        </div>

        {/* EMPTY STATE */}
        {filteredTransactions.length === 0 ? (
          <p className="p-4 text-gray-400 text-sm">No transactions found</p>
        ) : (
          filteredTransactions.map((tx, index) => (
            <div
              key={index}
              className={`
                grid grid-cols-3 px-4 py-3 text-sm items-center
                border-t border-gray-100 dark:border-gray-800
                transition hover:scale-[1.01]
                ${
                  tx.type === "income"
                    ? "bg-green-50 dark:bg-green-900/10"
                    : "bg-red-50 dark:bg-red-900/10"
                }
              `}
            >

              {/* NAME */}
              <p className="font-medium text-gray-800 dark:text-white">
                {tx.title}
              </p>

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
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;