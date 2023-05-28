'use client'
import '@/styles/globals.css';
import { Provider as ReduxProvider } from "react-redux";
import Provider from "@/components/Provider";
import store from '@/redux/store';
import Nav from "@/components/Nav";
import React from "react";
import { usePathname } from 'next/navigation';

export const metadata = {
  title: 'NextCRUD',
  description: 'Create a full functional CRUD app with Next.js'
}

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <html lang={'en'}>
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
