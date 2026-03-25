import { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const AddTransaction = () => {
  const { addTransaction } = useContext(FinanceContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      title,
      amount: Number(amount),
      type,
      date: new Date().toLocaleDateString(),
    };

    addTransaction(newTransaction);

    // reset form
    setTitle("");
    setAmount("");
    setType("expense");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
      <h2 className="text-xl font-semibold mb-4">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

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
    className="bg-primaryGreen text-lightText rounded-xl2 px-4 py-3 w-full"
  >
    Add Transaction
  </button>

</form>
    </div>
  );
};

export default AddTransaction;