import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import './TransactionCharts.css'; // Import custom CSS
import Navbar from '../components/Navbar';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const TransactionCharts = () => {
  const data = {
    transaction_history: [
      { date: "2024-11-01", num_transactions: 3, total_value_usd: 150.50 },
      { date: "2024-11-02", num_transactions: 5, total_value_usd: 450.75 },
      { date: "2024-11-03", num_transactions: 4, total_value_usd: 320.40 },
      { date: "2024-11-04", num_transactions: 2, total_value_usd: 180.00 },
      { date: "2024-11-05", num_transactions: 6, total_value_usd: 540.00 },
      { date: "2024-11-06", num_transactions: 3, total_value_usd: 210.25 },
      { date: "2024-11-07", num_transactions: 7, total_value_usd: 600.60 },
      { date: "2024-11-08", num_transactions: 4, total_value_usd: 380.10 },
      { date: "2024-11-09", num_transactions: 5, total_value_usd: 525.50 },
      { date: "2024-11-10", num_transactions: 2, total_value_usd: 160.00 }
    ]
  };

  // Extract data for the charts
  const dates = data.transaction_history.map(item => item.date);
  const numTransactions = data.transaction_history.map(item => item.num_transactions);
  const totalValueUSD = data.transaction_history.map(item => item.total_value_usd);

  // Bar chart configuration
  const barData = {
    labels: dates,
    datasets: [
      {
        label: 'Number of Transactions',
        data: numTransactions,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }
    ]
  };

  // Line chart configuration
  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Total Value (USD)',
        data: totalValueUSD,
        fill: false,
        borderColor: '#ff6384',
        borderWidth: 2,
        tension: 0.3,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Roboto', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: 'Transaction Insights',
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: 'bold',
        },
        color: '#ffffff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#cccccc',
          font: {
            family: "'Roboto', sans-serif",
          },
        },
      },
      y: {
        ticks: {
          color: '#cccccc',
          font: {
            family: "'Roboto', sans-serif",
          },
        },
      },
    },
  };

  return (
    <>
    <Navbar />
    <div className="min-h-full w-full px-4 pt-8 flex flex-col justify-center"> 
      <div className="chart-wrapper">
        <div className="chart-box">
          <h3>Daily Transactions</h3>
          <Bar data={barData} options={options} />
        </div>
        <div className="chart-box">
          <h3>Transaction Value Trends</h3>
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
    </>
  );
};

export default TransactionCharts;
