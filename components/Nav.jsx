import React, { useEffect } from 'react';
import Link from 'next/link';
import {signOut as nextAuthSignOut, useSession} from 'next-auth/react';
import { FaCheckSquare } from 'react-icons/fa';
import {removeToken, saveAccessToken, getAccessToken} from "@/utils/token";
import {useRouter} from "next/navigation";
import Loading from '@/components/Loading'

const Nav = () => {
  const router = useRouter();
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!session && status !== 'loading') {
      router.push('/');
    } else {
      saveAccessToken(session?.session.accessToken);
      router.push('/todos');
    }
  }, [session, status]);


  if(status === 'loading') {
    return <Loading />
  }
  const signOut = async () => {
    await nextAuthSignOut();
    removeToken();
    router.push('/entry')
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-90 shadow-md">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <FaCheckSquare className="text-3xl text-blue-600 transform rotate-[-10deg] -translate-y-1" />
          <div className="p-2">
            <h1 className="inline-block bg-gradient-to-l from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-3xl text-transparent">
              Nextjs TODO
            </h1>
          </div>
          <ul className="flex space-x-4 text-white">
            <li>Home</li>
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
