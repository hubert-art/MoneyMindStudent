import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [balance, setBalance] = useState(0);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // 💾 sauvegarde
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // 🧠 calcul balance
  useEffect(() => {
    const total = transactions.reduce((acc, tx) => {
      return tx.type === "income"
        ? acc + tx.amount
        : acc - tx.amount;
    }, 0);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBalance(total);
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, balance }}
    >
      {children}
    </FinanceContext.Provider>
  );
};