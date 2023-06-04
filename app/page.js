'use client'
import React, { useState, useEffect } from "react";
import Clock from "@/components/Clock";
import { useRouter } from "next/navigation";
import Loading from '@/components/Loading';
import { homeLeftData } from "@/utils/homeData";

const Page = () => {
  const [isClient, setClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setClient(true);
  }, []);

  const gotoEntryPage = () => {
    router.push('/entry')
  }

  const takeTour = () => {
    alert('Sorry! This feature is still under development')
    // router.push('demoPageLink') //Todo: create demo link
  }
  if (!isClient) {
    return <Loading />
  }

  return (
    <section className='flex w-full h-screen items-center'>
      <div className="w-1/2">
        <div className="pl-10">
          <Clock />
          <div className="mt-5">
            <button className="home_btn show_btn" onClick={ gotoEntryPage }>
              Yes, show me!
            </button>
            <button
              className="home_btn"
              onClick={ takeTour }
            >
              Take a tour
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 text-green-400 flex justify-center items-center relative">
        { homeLeftData.map((item, idx) => (
          <div key={ idx }
               className={ item.position }
               style={{ top: item.top,
                 left: item.left,
                 animationName: item.animation,
                 animationDuration: '2s',
                 animationIterationCount: 'infinite'}}>
              { item.icon }
          </div>
        ))}
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

        @keyframes bounce1 {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        @keyframes bounce2 {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        @keyframes bounce3 {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

export default Page
