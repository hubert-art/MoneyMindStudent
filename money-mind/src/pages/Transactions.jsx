import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const Transactions = () => {
  const { transactions, loading, removeTransaction } = useContext(FinanceContext);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-gray-400">Loading transactions…</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h1 className="text-xl font-semibold mb-4">All Transactions</h1>

      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions yet.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="text-sm text-gray-400">{formatDate(tx.date)}</p>
              </div>

              <div className="flex items-center gap-4">
                <p className={tx.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                  {tx.type === 'income' ? '+' : '-'}KES {Number(tx.amount).toLocaleString()}
                </p>

                <button
                  onClick={() => removeTransaction(tx.id)}
                  className="text-gray-300 hover:text-red-400 transition-colors text-sm"
                  title="Delete transaction"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transactions;