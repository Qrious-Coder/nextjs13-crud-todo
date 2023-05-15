import React from 'react';
import Link from 'next/link'
import { useSession, signOut,signIn, signUp } from 'next-auth/react'

const Nav = () => {
  const { data } = useSession()
  console.log(`data:`, data)
  return (
    <div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {data?.user ? (

          <li className="nav-item">
            <span> Hello {session?.user?.email || "Unknown"} </span>
            <button className="btn btn-danger btn-sm" onClick={signOut}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" href="/entry">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/entry">
                <button onClick={() => signIn()}>Sign In</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;