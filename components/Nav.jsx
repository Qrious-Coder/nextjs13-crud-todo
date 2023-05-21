import React from 'react';
import Link from 'next/link';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { FaCheckSquare } from 'react-icons/fa';
import { removeToken} from "@/utils/token";

const Nav = ({ session }) => {
  const signOut = async () => {
    removeToken();
    await nextAuthSignOut();
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-90 shadow-md">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <FaCheckSquare className="text-white text-3xl transform rotate-[-10deg] -translate-y-1" />
          <span className="text-white text-xl font-bold">Nextjs TODO</span>
          <ul className="flex space-x-4 text-white">
            <li>Today</li>
            <li>Yesterday</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {session?.authenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-white">Hello, {session?.session?.user?.name || 'Unknown'}</span>
              <button
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md"
                href="/entry">
                Register
              </Link>
              <Link
                className="bg-gradient-to-r from-red-800 to-red-600 text-white px-4 py-2 rounded-md"
                href="/entry">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
