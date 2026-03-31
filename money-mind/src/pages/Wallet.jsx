import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Wallet = () => {
  const { balance, addTransaction } = useContext(FinanceContext);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) return;

    addTransaction({
      title: "Wallet Update",
      amount: Number(amount),
      type,
      date: new Date().toISOString().split("T")[0],
      category: "Wallet",
    });

    setAmount("");
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Wallet</h1>

      {/* Balance Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
        <h2 className="text-lg">Current Balance</h2>
        <p className="text-3xl font-bold mt-2">
          Kesh {balance.toFixed(2)}
        </p>
      </div>

      {/* Add Money / Expense */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow">
        <h2 className="mb-4 font-semibold">Update Wallet</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
          >
            <option value="income">Add Money</option>
            <option value="expense">Remove Money</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl"
          >
            Update Wallet
          </button>

        </form>
      </div>

    </div>
  );
};

export default Wallet;