import React from 'react';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className='mt-5'>
      <h3 className='text-lg font-semibold mb-3'>Transaction List</h3>
      <ul className='space-y-2'>
        {transactions.map((transaction, index) => (
          <li key={index} className='p-2 border rounded-md'>
            <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
              {transaction.type === 'income' ? 'Income' : 'Expense'}: ${transaction.amount.toFixed(2)}
            </span>
            <span className='ml-2 text-gray-500'>({transaction.date})</span>
            <div className='mt-1'>
              <span className='block text-gray-700'><strong>Category:</strong> {transaction.category}</span>
              <span className='block text-gray-700'><strong>Description:</strong> {transaction.description}</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => onEdit(index)} 
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button 
                onClick={() => onDelete(index)} 
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;