import React from 'react';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const user = Cookie.get('token');
  const navigate = useNavigate();
  const logout = () => {
    Cookie.remove('token');
     navigate('/login') 
  }

  return (
    <nav className='w-full fixed top-0 bg-teal-500 text-white flex justify-between p-4 z-10'>
      <div className='font-extrabold tex-xl'>logo</div>
      <div className='font-extrabold tex-xl flex gap-x-3'>
        {/* {user && <Link to='/login'>Login</Link>} */}
        <div className="cursor-pointer"onClick={logout}>{user ? 'Logout' : 'Login'}</div>
      </div>
    </nav>
    
  )
}

export default NavBar