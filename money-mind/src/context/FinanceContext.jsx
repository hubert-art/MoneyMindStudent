import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
  const saved = localStorage.getItem("transactions");
  return saved ? JSON.parse(saved) : [];
  });
  const [balance, setBalance] = useState(0);
  
  useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);

  // ➕ Ajouter une transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  // 🧠 Calcul automatique du balance
  useEffect(() => {
    const total = transactions.reduce((acc, tx) => {
      if (tx.type === "income") {
        return acc + tx.amount;
      } else {
        return acc - tx.amount;
      }
    }, 0);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBalance(total);
  }, [transactions]);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        balance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};