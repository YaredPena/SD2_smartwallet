
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from "../components/sideBar"
import axios from 'axios';
import PieChart from './PieChart';


const Dashboard = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]); 

  // Fetch transactions from the server
  // utilized session storage to avoid re-fetching
  // and to avoid using the access token in the URL
  useEffect(() => {
    const storedAccessToken = sessionStorage.getItem('accessToken');
    if (storedAccessToken) {
      axios.post(`${import.meta.env.VITE_API_URL}/get_transactions`, {
        access_token: storedAccessToken,
      })
      .then((response) => {
        const { transactions } = response.data;
        setTransactions(transactions);
        setFilteredTransactions(transactions);
      })
      .catch(() => {
        console.log('Failed to fetch transactions');
      });
    }
  }, []);

  // filter by days/weeks/months utilize days for accurate and easy logic 

  const handleDayFilter = (days) => {
    const now = new Date();
    const pastDate = new Date();
    pastDate.setDate(now.getDate() - days); // subtract days from current date

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= pastDate && transactionDate <= now;
    });

    console.log(`Filtered for last ${days} days:`, filtered);
    setFilteredTransactions(filtered);
  };

  return (
    <div className="flex h-screen bg-[#1B203F] text-white">
      <Sidebar />
      <div className="flex-grow overflow-y-auto p-8">
      <div className="p-8 bg-[#1B203F]">
      {/* Header */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#2C325C] p-6 rounded-2xl shadow-md col-span-3 min-h-[250px]">
          <h2 className="text-2xl mb-4">Your Financial Dashboard</h2>
          <p className="mb-4">Welcome back Daniel</p> {/* need to fetch account user */}
          <div className="flex gap-2">
          {/* 12 month logic & 6 month logic may or may not work, so the filter below works */}
          <button
              onClick={() => handleDayFilter(14)} // filter last 2 weeks
              className="p-2 bg-[#3a3f66] text-white rounded-lg hover:bg-[#555a7c]"
            >
              2 week
            </button>
            <button
              onClick={() => handleDayFilter(30)} // filter last month
              className="p-2 bg-[#3a3f66] text-white rounded-lg hover:bg-[#555a7c]"
            >
              1 Month
            </button>
            <button
              onClick={() => handleDayFilter(90)} // filter last 3 months
              className="p-2 bg-[#3a3f66] text-white rounded-lg hover:bg-[#555a7c]"
            >
              3 Months
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[20fr_16fr] gap-1 mt-4">
        {/* Left Section */}
        <div className="flex flex-col gap-1">
          {/* Spending Overview */}
          <div className="bg-[#2C325C] p-6 rounded-2xl shadow-md h-100">
            <h3 className="text-lg mb-4">My Spending Overview</h3>
            <div className="flex items-center gap-1">
              <PieChart transactions={filteredTransactions} /> 
            </div>
          </div>

          {/* Improving Financial Habits */}
          <div className="bg-[#2C325C] p-6 rounded-2xl shadow-md h-100">
            <h3 className="text-lg mb-4">Improving Financial Habits</h3>
            <div className="grid grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-white text-[#1B203F] p-4 rounded-md text-center">
                  Food<br />$100/200<br /><small className="text-sm">15 days left</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-5">
          {/* Upcoming Bills */}
          <div className="bg-[#2C325C] p-6 h-65 rounded-2xl shadow-md">
            <h3 className="text-lg mb-4">Upcoming Bills</h3>
            <div className="mb-4 space-y-2">
              <div>Dec 1 - Rent - $1,111.00</div>
              <div>Jan 18 - Insurance - $1,111.00</div>
              <div>Jun 1 - Water - $1,111.00</div>
            </div>
            <p>Total Bills Due in Next 30 Days: <strong>$1,980.55</strong></p>
          </div>

          {/* My Cards */}
          <div className="bg-[#2C325C] p-6 h-70 rounded-2xl shadow-md">
            <h3 className="text-lg mb-4">My Cards</h3>
            <img src="your-chart-placeholder.png" alt="Bar Chart" className="w-full h-auto" />
          </div>

          {/* Spending Reduction Goals */}
          <div className="bg-[#2C325C] p-6 h-59 rounded-2xl shadow-md">
            <h3 className="text-lg mb-4">Spending Reduction Goals</h3>
            <p className="text-2xl mb-2"><strong>$3,000/$10,000</strong></p>
            <small className="text-gray-300 text-sm">
              Overall spending increased by 20%.<br />
              Weekly spending 2x more than last week.<br />
              Decrease entertainment spending by $100/month.
            </small>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
