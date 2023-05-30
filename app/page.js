'use client'
import Clock from "@/components/Clock";
import React from "react";
import {useRouter} from "next/navigation";
import { GiCuckooClock } from 'react-icons/gi';

const Page = () => {
  const router = useRouter()

  const gotoEntryPage = () => {
    router.push('/entry') // replace entryPageLink with actual path
  }

  const gotoDemoPage = () => {
    router.push('demoPageLink') // replace demoPageLink with actual path
  }

  return (
    <section className='flex w-full h-screen items-center'>
      <div className="w-1/2">
        <div className="pl-10">
          <Clock />
          <div className="mt-5">
            <button className="home_btn show_btn" onClick={gotoEntryPage}>
              Yes, show me!
            </button>
            <button
              className="home_btn"
              onClick={gotoDemoPage}
            >
              Take a tour
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <GiCuckooClock size={450} color={'#8b5cf6'}/>
      </div>
      <style jsx>{`
        .home_btn {
          --b: 3px;   /* border thickness */
          --s: .45em; /* size of the corner */
          --color: #bef264;
          padding: calc(.5em + var(--s)) calc(.9em + var(--s));
          color: var(--color);
          --_p: var(--s);
          background:
            conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
            var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
          transition: .3s linear, color 0s, background-color 0s;
          outline: var(--b) solid #0000;
          outline-offset: .6em;
          font-size: 16px;
          border: 0;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }
        
        .home_btn:hover,
        .home_btn:focus-visible{
          --_p: 0px;
          outline-color: var(--color);
          outline-offset: .05em;
        }
        
        .home_btn:active {
          background: var(--color);
          color: #d9f99d;
        }
      `}</style>
    </section>
  )
}

export default Page
