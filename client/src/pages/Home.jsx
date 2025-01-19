import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  }, []); 
  return (
    <div className="flex mt-14">
      {/* Sidebar */}
      <div className="w-1/5 fixed bg-gray-500 h-screen">
        <div className="mt-3">
          <Link to='/'>
            <div className="hover:bg-gray-600 py-2 px-4">
              <h1  className="text-white text-xl font-bold">Dashborad</h1>
            </div>
          </Link>
         <Link to='/account'>
          <div className="hover:bg-gray-600 py-2 px-4">
              <h1 to="/account" className="text-white text-xl font-bold">Account</h1>
            </div>
         </Link>
        <Link to='/statement'>
          <div className="hover:bg-gray-600 py-2 px-4">
            <h1 to="/statement" className="text-white text-xl font-bold">Statement</h1>
          </div>
        </Link>
        <Link to='/transfer'>
          <div className="hover:bg-gray-600 py-2 px-4">
            <h1 to="/transfer" className="text-white text-xl font-bold">Transfer</h1>
          </div>
        </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[20%] w-4/5 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
