import React from 'react';
import Sidebar from "../components/sideBar"
import Chatbot from './Chatbot';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-[#1B203F] text-white">
      <Sidebar />
      <div className="flex-grow overflow-y-auto p-8">
      <div className="p-8 bg-[#1B203F] text-white font-[Poppins]">
      {/* Header */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#2C325C] p-6 rounded-2xl shadow-md col-span-3 min-h-[250px]">
          <h2 className="text-2xl mb-4">Your Financial Dashboard</h2>
          <p className="mb-4">Welcome back Daniel</p>
          <div className="flex gap-2">
            <button className="bg-[#2C325C] text-white py-2 px-4 rounded-md">12M</button>
            <button className="bg-white text-[#1B203F] py-2 px-4 rounded-md">1M</button>
            <button className="bg-[#2C325C] text-white py-2 px-4 rounded-md">1W</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[20fr_16fr] gap-5 mt-4">
        {/* Left Section */}
        <div className="flex flex-col gap-4">
          {/* Spending Overview */}
          <div className="bg-[#2C325C] p-6 rounded-2xl shadow-md h-100">
            <h3 className="text-lg mb-4">My Spending on All Credit Cards for November</h3>
            <div className="flex items-center gap-8">
              <div className="w-36 h-36 rounded-full flex items-center justify-center text-2xl bg-gradient-to-tr from-[#7c3aed] via-[#10b981] to-[#3b82f6]">
                $6,000
              </div>
              <ul className="space-y-2">
                <li><span className="inline-block w-2.5 h-2.5 rounded-full bg-[#7c3aed] mr-2"></span>Entertainment - $1,500/$2,000</li>
                <li><span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10b981] mr-2"></span>Food - $1,000/$1,500</li>
                <li><span className="inline-block w-2.5 h-2.5 rounded-full bg-[#3b82f6] mr-2"></span>Rent - $2,500/$2,500</li>
              </ul>
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
    <div className='fixed bottom-6 right-6 z-50'>
    <Chatbot/>
    </div>
    </div>
  );
};

export default Dashboard;
