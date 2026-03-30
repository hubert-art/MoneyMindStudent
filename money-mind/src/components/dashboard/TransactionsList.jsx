import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceContext';

const formatDate = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

export const TransactionsList = () => {
  const { transactions } = useContext(FinanceContext);

  // Show only the 5 most recent on the dashboard
  const recent = transactions.slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">

      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

      {recent.length === 0 ? (
        <p className="text-gray-400">No transactions yet</p>
      ) : (
        <ul className="space-y-3">
          {recent.map((tx) => (
            <li key={tx.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="text-sm text-gray-400">{formatDate(tx.date)}</p>
              </div>

              <p className={tx.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                {tx.type === 'income' ? '+' : '-'}KES {Number(tx.amount).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};