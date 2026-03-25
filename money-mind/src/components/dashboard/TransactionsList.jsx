import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

export const TransactionsList = () => {
  const { transactions } = useContext(FinanceContext);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      
      <h2 className="text-lg font-semibold mb-4">
        Recent Transactions
      </h2>

      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions yet</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx, index) => (
            <li
              key={index}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="text-sm text-gray-400">{tx.date}</p>
              </div>

              <p
                className={
                  tx.type === "income"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {tx.type === "income" ? "+" : "-"}KES {tx.amount}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};