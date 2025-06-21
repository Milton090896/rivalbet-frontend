import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/rivalbet-logo.png'; // ajuste para o nome do seu arquivo PNG

const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md flex items-center fixed top-0 w-full z-50">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="RivalBet Logo" className="h-10 w-auto" />
      </Link>
    </header>
  );
};

export default Navbar;
