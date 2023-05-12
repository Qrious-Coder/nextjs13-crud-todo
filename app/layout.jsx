'use client'
import '@/styles/globals.css';
import Nav from '@/components/nav'
import { Provider } from "react-redux";
import store from '@/redux/store';

export const metadata = {
  title: 'NextCRUD',
  description: 'Create a full functional CRUD app with Next.js'
}

const RootLayout= ({children}) => (
  <html>
    <body>
      <div className='main'>
        <div className='gradient'/>
      </div>
      <Provider store={store}>
        <main className='app'>
          { children }
        </main>
      </Provider>
    </body>
  </html>)


export default RootLayout