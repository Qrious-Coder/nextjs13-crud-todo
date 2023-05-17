'use client'
import '@/styles/globals.css';
import { Provider as ReduxProvider } from "react-redux";
import Provider from "@/components/Provider";
import store from '@/redux/store';

export const metadata = {
  title: 'NextCRUD',
  description: 'Create a full functional CRUD app with Next.js'
}

const RootLayout= ({children}) => (
  <html lang={'en'}>
  <body>
    <Provider>
      <ReduxProvider store={store}>
      <div className='main'>
        <div className='gradient'/>
      </div>

        <main className='app'>
          { children }
        </main>
      </ReduxProvider>
    </Provider>
  </body>
  </html>)


export default RootLayout
