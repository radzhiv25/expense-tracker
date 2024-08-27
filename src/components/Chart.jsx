import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ transactions }) => {
  // Filter and map the transactions to separate income and expense datasets
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  const incomeData = {
    labels: incomeTransactions.map(t => t.date),
    datasets: [
      {
        label: 'Income',
        data: incomeTransactions.map(t => t.amount),
        fill: false,
        borderColor: '#34D399', // Green color for income
        backgroundColor: '#34D399',
        tension: 0.1,
      },
    ],
  };

  const expenseData = {
    labels: expenseTransactions.map(t => t.date),
    datasets: [
      {
        label: 'Expense',
        data: expenseTransactions.map(t => t.amount),
        fill: false,
        borderColor: '#F87171', // Red color for expenses
        backgroundColor: '#F87171',
        tension: 0.1,
      },
    ],
  };

  // Combine both datasets into one chart
  const data = {
    labels: transactions.map(t => t.date),
    datasets: [
      ...incomeData.datasets,
      ...expenseData.datasets,
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='mt-5 p-2 border rounded-md'>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;