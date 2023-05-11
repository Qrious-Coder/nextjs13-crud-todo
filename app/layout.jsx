'use client'
import '@/styles/globals.css';
import Nav from '@/components/nav'
import { Provider } from "react-redux";
import store from '@/redux/store';

//ref: https://github.com/SeijiV13/next-app-tutorial/blob/master/store/blog/reducer.js
//https://github.com/chinmaykarmokar/next-redux-ts-integrations/blob/development/src/state/actions/index.ts
export const metadata = {
  title: 'NextCRUD',
  description: 'Create a full functional CRUD app with Next.js'
}

const RootLayout= ({children}) => {

return(
  <html>
    <body>
      <div className='main'>
        <div className='gradient'/>
      </div>
      <Provider store={store}>
        <main className='app'>
          <Nav />
          { children }
        </main>
      </Provider>
    </body>
  </html>)
}

export default RootLayout