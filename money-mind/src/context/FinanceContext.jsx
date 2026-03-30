import { createContext, useState, useEffect, useContext } from 'react';
import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from '../services/api';
import { AuthContext } from './AuthContext';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch transactions whenever user changes
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setBalance(0);
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const { data } = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);

  // Recalculate balance whenever transactions change
  useEffect(() => {
    const total = transactions.reduce((acc, tx) => {
      const amount = Number(tx.amount);
      return tx.type === 'income' ? acc + amount : acc - amount;
    }, 0);
    setBalance(total);
  }, [transactions]);

  // Add transaction
  const addTransaction = async (transaction) => {
    const { data } = await createTransaction(transaction);
    setTransactions((prev) => [data, ...prev]);
  };

  // Delete transaction 
  const removeTransaction = async (id) => {
    await deleteTransaction(id);
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{ transactions, balance, loading, addTransaction, removeTransaction }}
    >
      {children}
    </FinanceContext.Provider>
  );
};