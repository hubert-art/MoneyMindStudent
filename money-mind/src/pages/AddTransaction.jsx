import { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const AddTransaction = () => {
  const { addTransaction } = useContext(FinanceContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  // 🎉 SUCCESS MESSAGE STATE
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toLocaleDateString(),
    };

    addTransaction(newTransaction);

    // reset form
    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("");

    // 🎉 show success message
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md max-w-lg border border-transparent dark:border-gray-800">

      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Add Transaction
      </h2>

      {/* 🎉 SUCCESS MESSAGE */}
      {success && (
        <div className="mb-4 px-4 py-2 rounded-lg bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm">
          Transaction successfully added
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="text"
          placeholder="Category (Food, Transport...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 w-full transition"
        >
          Add Transaction
        </button>

      </form>
    </div>
  );
};

export default AddTransaction;