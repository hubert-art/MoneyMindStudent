import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  //  INIT SAFE depuis localStorage
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing transactions:", error);
      return [];
    }
  });

  const [balance, setBalance] = useState(0);

  // NORMALISATION D'UNE TRANSACTION
  const normalizeTransaction = (tx) => {
    return {
      ...tx,
      type: tx.type?.toLowerCase(),
      amount: Number(tx.amount || 0),
    };
  };

  // ➕ ADD TRANSACTION SAFE
  const addTransaction = (transaction) => {
    const cleanTransaction = normalizeTransaction(transaction);

    setTransactions((prev) => [
      ...prev,
      cleanTransaction,
    ]);
  };

  //  SAVE LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  //  CALCUL BALANCE SAFE
  useEffect(() => {
    const total = transactions.reduce((acc, tx) => {
      const amount = Number(tx.amount || 0);

      if (tx.type === "income") {
        return acc + amount;
      } else if (tx.type === "expense") {
        return acc - amount;
      }

      return acc;
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