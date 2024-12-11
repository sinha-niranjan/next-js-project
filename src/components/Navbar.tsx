"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold cursor-pointer">Ecommerce</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link href="/cart" className="hover:text-gray-200">
              Cart
            </Link>
            <Link href="/video" className="hover:text-gray-200">
              Video
            </Link>
            <Link href="/login" className="hover:text-gray-200">
              Login / Signup
            </Link>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <AiOutlineClose className="w-6 h-6" />
              ) : (
                <AiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/cart"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            href="/video"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Video
          </Link>
          <Link
            href="/login"
            className="block px-4 py-2 hover:bg-blue-800"
            onClick={() => setIsOpen(false)}
          >
            Login / Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
