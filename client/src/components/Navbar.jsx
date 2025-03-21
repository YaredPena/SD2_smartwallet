import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [isActive, setIsActive] = useState('Transactions');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUserId) {
      fetchUserName(storedUserId);
    }
  }, []);

  const fetchUserName = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getUser/${id}`);
      setUserName(response.data.name || 'User');
    } catch (err) {
      setUserName('User');
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('transactions')) setIsActive('Transactions');
    if (path.includes('dashboard')) setIsActive('Dashboard');
    if (path.includes('wallet')) setIsActive('Wallet');
  }, [window.location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('linkToken');
    navigate('/');
  };

  return (
    <div className="sidebar w-60 bg-[#2c325c] text-white p-6">
      <div className="top mb-8">
        <div className={`logo text-2xl font-semibold hover:text-[#3a70a2] ${isActive ==='/' ? 'text-white' : ''}`}>
            <a href="/">SmartWallet</a>
        </div>
      </div>

      <div className="user flex items-center mb-8">
        <img src="pfp.jpg" alt="profile picture" className="user-img w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-sm">User</p>
        </div>
      </div>

      <ul className="space-y-4">
        <li>
            <NavLink
            to="/dashboard"
            className={`transition-colors duration-300 hover:text-[#3a70a2] ${isActive === 'HomePage' ? 'text-[#3a70a2]' : ''}`}
            onClick={() => setIsActive('Dashboard')}
            >
            Dashboard
            </NavLink>
        </li>
        <li>
            <NavLink
            to="/transactions"
            className={`transition-colors duration-300 hover:text-[#3a70a2] ${isActive === 'Transactions' ? 'text-[#3a70a2]' : ''}`}
            onClick={() => setIsActive('Transactions')}
            >
            Transactions
            </NavLink>
        </li>
        <li>
            <NavLink
            to="/wallet"
            className={`transition-colors duration-300 hover:text-[#3a70a2] ${isActive === 'Wallet' ? 'text-[#3a70a2]' : ''}`}
            onClick={() => setIsActive('Wallet')}
            >
            Wallet
            </NavLink>
        </li>
        <li>
            <NavLink
            to="/advisor"
            className={`transition-colors duration-300 hover:text-[#3a70a2] ${isActive === 'Advisor' ? 'text-[#3a70a2]' : ''}`}
            onClick={() => setIsActive('Advisor')}
            >
            Advisor
            </NavLink>
        </li>
        <li>
            <NavLink
            to="/budgeting"
            className={`transition-colors duration-300 hover:text-[#3a70a2] ${isActive === 'Budgeting' ? 'text-[#3a70a2]' : ''}`}
            onClick={() => setIsActive('Budgeting')}
            >
            Budgeting
            </NavLink>
        </li>
        <li>
            <NavLink
            to="/bills"
            className={`transition-colors duration-300 hover:text-[#3a70a2] ${isActive === 'Bills' ? 'text-[#3a70a2]' : ''}`}
            onClick={() => setIsActive('Bills')}
            >
            Bills
            </NavLink>
        </li>
        <li>
            <button
            onClick={handleLogout}
            className="transition-colors duration-300 hover:text-red-500 text-white"
            >
            Logout
            </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;