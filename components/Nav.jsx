'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut as nextAuthSignOut, useSession } from 'next-auth/react';
import { FaCheckSquare } from 'react-icons/fa';
import { BsClipboardCheck, BsClipboardCheckFill } from 'react-icons/bs'
import { AiOutlineHome , AiTwotoneHome } from 'react-icons/ai'
import { removeToken } from "@/utils/token";
import Loading from '@/components/Loading';
import { usePathname, useRouter } from "next/navigation";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import useWinWidth from "@/utils/useWinWidth";

const commonClasses = {
  icon: "transition-all duration-300 transform hover:scale-110",
  btn: "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
  avatar: "flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-indigo-400 to-gray-900 text-white text-lg"
};

const Nav = () => {
  const { data: session, status } = useSession()
  const [ loading, setLoading ] = useState(true)
  const router = useRouter();
  const pathname = usePathname();
  const screenWidth = useWinWidth();

  useEffect(() => {
    if(status !== 'loading'){
      setLoading(false)
    }
  }, [status]);

  const signOut = async () => {
    console.log("signOut")
    await nextAuthSignOut();
    removeToken();
  };

  const handleTodoNav = () => {
    if(!session){
      alert('Register or login to view your Todos!');
      router.push('/entry');
    }else{
      router.push('/todos');
    }
  }

  const userName = session?.session?.user?.name || 'Unknown';
  const shortUserName = userName.length > 8 ? userName.substring(0, 8) + '...' : userName;
  const avatarLetter = userName[0].toUpperCase();

  if(loading) {
    return <Loading />
  }

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-90 shadow-md"
      style={{ minHeight: '8vh' }}
    >
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <FaCheckSquare className="text-3xl text-blue-600 transform rotate-[-10deg] -translate-y-1" />
          <div className="p-2">
            <h1 className="inline-block bg-gradient-to-l from-blue-600 via-green-500 to-indigo-400
            bg-clip-text text-3xl text-transparent">
              Nextjs TODO
            </h1>
          </div>
          { screenWidth > 1000 && (
            <ul className="flex space-x-2">
              <li>
                <Link href="/">
                  { pathname === '/' ?
                    <AiTwotoneHome className={`${commonClasses.icon} 
                    text-purple-600 hover:text-violet-600`} style={{fontSize: '36px'}}/>
                    : <AiOutlineHome className={`${commonClasses.icon} 
                    text-violet-700 hover:text-violet-900`} style={{fontSize: '36px'}}/>
                  }
                </Link>
              </li>
              <li onClick={ handleTodoNav }>
                { pathname === '/todos' ?
                  <BsClipboardCheckFill className={`${commonClasses.icon} 
                  text-purple-600 hover:text-violet-600 cursor-pointer`} style={{fontSize: '30px'}}/>
                  : <BsClipboardCheck className={`${commonClasses.icon} 
                  text-violet-700 hover:text-violet-900 cursor-pointer`} style={{fontSize: '30px'}}/>
                }
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {session?.authenticated ? (
            <div className="flex items-center space-x-4">
              <div className={commonClasses.avatar}>
                {avatarLetter}
              </div>
              {  screenWidth > 1000 && <span className="text-white">Hello, {shortUserName}</span>}
              <span onClick={ signOut }>
                <BiLogOut className={`${commonClasses.icon} text-lime-400 hover:text-lime-600`}
                          style={{fontSize: '36px'}}/>
              </span>
            </div>
          ) : (
            <Link href="/entry">
              <span>
                   <BiLogIn className={`${commonClasses.icon} text-lime-400 hover:text-lime-600`}
                            style={{fontSize: '36px'}}/>
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
