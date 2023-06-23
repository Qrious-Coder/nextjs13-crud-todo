'use client'
import React, { useState, useEffect } from "react";
import Clock from "@/components/Clock";
import { useRouter } from "next/navigation";
import Loading from '@/components/Loading';
import { homeLeftData } from "@/utils/homeData";
import {useSession} from "next-auth/react";
import RoundClock from "@/components/RoundClock";
import useWinWidth from "@/utils/useWinWidth";

const Page = () => {
  const [ isClient, setClient ] = useState(false);
  const screenWidth = useWinWidth();
  const { status } = useSession()
  const router = useRouter();

  useEffect(() => {
    setClient(true);

  }, []);

  const gotoEntryPage = () => {
    router.push('/entry')
  }

  const gotoTodoPage = () => {
    router.push('/todos')
  }

  const takeTour = () => {
    router.push('/todos')
  }

  if (!isClient || screenWidth === null) {
    return <Loading />
  }
  return (
    <section className={ screenWidth <1000
      ? 'page-container flex w-screen h-screen justify-center items-center my-auto'
      : 'page-container flex w-full h-screen items-center'}>
      <div className={ screenWidth <1000 ? "w-full text-center" : "w-1/2 pl-10"}>
        <div className="pl-10">
          { screenWidth < 1000 ? <RoundClock /> : <Clock />}
          <div className="mt-5">
            { status !== 'authenticated' ?
              (<>
                <button className="home_btn show_btn" onClick={ gotoEntryPage }>
                  Yes, show me!
                </button>
                <button className="home_btn" onClick={ takeTour }>
                  Take a tour
                </button>
              </>) :
              (<button  className="home_btn" onClick={ gotoTodoPage }>
                Open my Todo!
              </button>)
            }
          </div>
        </div>
      </div>
      {
        screenWidth >= 1000 && (
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
        )
      }
      <style jsx>{`
        @media (max-width: 1000px) {
          .page-container {
            width: 1000px;
            min-width: 1000px;
            height: 100vh;
          }
        }
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
