import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='w-full fixed top-0 bg-teal-500 text-white flex justify-between p-4 z-10'>
      <div className='font-extrabold tex-xl'>logo</div>
      <div className='font-extrabold tex-xl'>
        <Link to='/login'>User</Link>
      </div>
    </nav>
    
  )
}

export default NavBar