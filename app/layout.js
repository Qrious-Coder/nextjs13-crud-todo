'use client'
import '@/styles/globals.css';
import { Provider as ReduxProvider } from "react-redux";
import Provider from "@/components/Provider";
import store from '@/redux/store';
import Nav from "@/components/Nav";
import React from "react";
import { usePathname } from 'next/navigation';
import { metadata } from "@/utils/metadata";

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <html lang={'en'}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
      <Provider>
        <ReduxProvider store={store}>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            { pathname !== '/entry' && <Nav/> }
            {children}
          </main>
        </ReduxProvider>
      </Provider>
      </body>
    </html>)
}

export default RootLayout;
