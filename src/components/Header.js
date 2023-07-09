import React, { useState } from "react";
import {Link } from 'react-router-dom';

// import icons
import Logo from '../img/Logo.svg';
import CS from '../img/CSupport.svg';

import {PiShoppingCartSimple, PiHeart, PiUser} from 'react-icons/pi';

// import components
import SearchBar from "./SearchBar";

const Header = () => {
  // const [isActive, setIsActive] = useState(false);

  return (
    <header className="">
      <section className="my-5 container mx-auto">
        <nav className="flex flex-row-reverse">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Link to={'/about'}>
                About Us
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </section>
      <section
        className="py-2 container mx-auto"
      // className={`${
      //   isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      // } fixed w-full z-10 transition-all`}
      >
        <div className="container mx-auto flex items-center justify-between h-full">
          {/* Logo */}
          <Link to={'/'}>
            <img className="w-[200px] block" src={Logo} alt="logo" />
          </Link>
          {/* </Link> */}
          {/* Search Bar */}
          <SearchBar />
          {/* Customer Support */}
          <div className="flex items-center justify-center gap-3">
            <img className="w-10" src={CS} alt="customer support 24-7" />
            <div>
              <p>Customer</p>
              <a href="#">123456789</a>
            </div>
          </div>
          {/* Personal Space */}
          <nav className="cursor-pointer flex">
            <ul className="flex justify-center items-center gap-5">
              <li className="relative">
                <PiUser className="text-3xl" />
                {/* <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] rounded-full text-white flex justify-center items-center">
                </div> */}
              </li>
              <li className="relative">
                <PiHeart className="text-3xl" />
                <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] rounded-full text-white flex justify-center items-center">
                  {/* {itemAmount} */}0
                </div>
              </li>
              <li className="relative">
                <PiShoppingCartSimple className="text-3xl" />
                <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[18px] rounded-full text-white flex justify-center items-center">
                  {/* {itemAmount} */}0
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </header>
  );
};

export default Header;
