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
        <div className="flex items-center">
          <FaCheckSquare className="text-3xl text-blue-600 transform rotate-[-10deg] -translate-y-1" />
          <div class="p-2">
            <h1 class="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-3xl text-transparent">
              Nextjs TODO
            </h1>
          </div>
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
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2
                overflow-hidden text-sm font-medium
                text-gray-900 rounded-lg group
                bg-gradient-to-br
                from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4
                focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={() => signOut()}
              >
                <span
                  className="nav_btn_gradient_span">
                   Logout
                </span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/entry">
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2
                    overflow-hidden text-sm font-medium
                    text-gray-900 rounded-lg group
                    bg-gradient-to-br
                    from-purple-600 to-blue-500
                    group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4
                    focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                <span
                  className="nav_btn_gradient_span">
                      Register
                </span>
                </button>

              </Link>
              <Link
                className="nav_btn_signIn"
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
