import React from 'react';
import { filter } from '../assets';


const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#1D252A] flex items-center  justify-start ">
      <img src={filter} alt="Logo" className="h-[55px]" />
    </nav>
  );
};

export default Navbar;
