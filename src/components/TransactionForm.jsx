import { useState, useEffect } from "react";
import Summary from "./Summary";
import TransactionList from "./TransactionList";
import Chart from "./Chart";

const TransactionForm = () => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTransactionIndex, setCurrentTransactionIndex] = useState(null);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

//   to submit the transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new transaction object
    const newTransaction = { 
      type, 
      amount: parseFloat(amount), 
      category, 
      date: date || new Date().toLocaleDateString(), 
      description,
    };

    // Update the transactions array with the new transaction
    let updatedTransactions;
    if (isEditing) {
      updatedTransactions = transactions.map((transaction, index) =>
        index === currentTransactionIndex ? newTransaction : transaction
      );
      setIsEditing(false);
      setCurrentTransactionIndex(null);
    } else {
      updatedTransactions = [...transactions, newTransaction];
    }

    // Update the state and local storage
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    
    // Reset the form fields after submission
    setAmount(0);
    setCategory("");
    setDate("");
    setDescription("");
  };

//   to edit a transaction
  const handleEdit = (index) => {
    const transaction = transactions[index];
    setAmount(transaction.amount);
    setType(transaction.type);
    setCategory(transaction.category);
    setDate(transaction.date);
    setDescription(transaction.description);
    setIsEditing(true);
    setCurrentTransactionIndex(index);
  };

//   to delete a transaction
  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <div className="border p-3 rounded-md">
      {/* transaction form to enter the amount */}
      <form onSubmit={handleSubmit} className="space-y-2 p-2 border rounded-md">
        <div className="flex md:flex-row flex-col gap-2 items-center">
        <div className="flex flex-col w-full">
          <label htmlFor="type" className="font-semibold">Transaction Type</label>
          <select 
            id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="p-1 border rounded-md outline-none"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="amount" className="font-semibold">Enter Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-1 border rounded-md outline-none"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="category" className="font-semibold">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-1 border rounded-md outline-none"
            placeholder="e.g., Food, Rent"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="date" className="font-semibold">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-1 border rounded-md outline-none"
          />
        </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-1 border rounded-md outline-none"
            placeholder="Enter description"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="px-3 py-2 bg-black rounded text-white">
          {isEditing ? 'Update Transaction' : 'Enter'}
        </button>
      </form>
      <Summary transactions={transactions} />
      <Chart transactions={transactions} />
      <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TransactionForm;