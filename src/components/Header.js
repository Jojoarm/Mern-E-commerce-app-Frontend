import React from 'react';
import Logo from './Logo';
import { BsSearch } from 'react-icons/bs';
import { FaCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className="h-16 shadow-md bg-white">
        <div className="h-full container mx-auto flex items-center px-4 justify-between">
          <div className="">
            <Link to={'/'}>
              <Logo w={90} h={50} />
            </Link>
          </div>
          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full outline-none"
            />
            <div className="text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white">
              <BsSearch />
            </div>
          </div>

          <div className="flex items-center gap-7">
            <div className="text-2xl cursor-pointer">
              <FaCircleUser />
            </div>
            <div className="text-2xl cursor-pointer relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">0</p>
              </div>
            </div>
            <div>
              <Link
                to={'/login'}
                className="px-2 py-1 bg-black rounded-full text-white hover:bg-gray-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
