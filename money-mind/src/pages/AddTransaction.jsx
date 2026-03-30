import { useState, useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const AddTransaction = () => {
  const { addTransaction } = useContext(FinanceContext);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // ISO date string (YYYY-MM-DD) as required by backend
      const today = new Date().toISOString().split('T')[0];

      await addTransaction({
        title,
        amount: Number(amount),
        type,
        date: today,
      });

      setSuccess('Transaction added!');
      setTitle('');
      setAmount('');
      setType('expense');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        'Failed to add transaction.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-inputBg rounded-xl2 px-4 py-3 outline-none"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-inputBg rounded-xl2 px-4 py-3 outline-none"
          min="0.01"
          step="0.01"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-inputBg rounded-xl2 px-4 py-3 outline-none"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-primaryGreen text-lightText rounded-xl2 px-4 py-3 w-full disabled:opacity-60"
        >
          {loading ? 'Adding…' : 'Add Transaction'}
        </button>

      </form>
    </div>
  );
};

export default AddTransaction;