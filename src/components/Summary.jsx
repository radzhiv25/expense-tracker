import React, { useEffect, useState } from 'react';

const Summary = ({ transactions }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

//   to maintain the total income, total expense, and balance
  useEffect(() => {
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expense = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  return (
    <div className='mt-5 p-2 flex md:flex-row flex-col justify-between border rounded-md'>
      <p className="text-lg font-semibold">Total Income: <span className="text-green-600">₹{totalIncome.toFixed(2)}</span></p>
      <p className="text-lg font-semibold">Total Expense: <span className="text-red-600">₹{totalExpense.toFixed(2)}</span></p>
      <p className="text-lg font-semibold">Balance: <span className={`font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>₹{balance.toFixed(2)}</span></p>
    </div>
  );
};

export default Summary;