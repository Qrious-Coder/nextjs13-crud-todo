import '@/styles/globals.css';
import Nav from '@/components/nav'

export const metadata = {
  title: 'NextCRUD',
  description: 'Create a full functional CRUD app with Next.js'
}

const RootLayout= ({children}) => (
  <html>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient'/>
        </div>

        <main className='app'>
          <Nav />
          { children }
        </main>
      </Provider>
    </body>
  </html>
)

export default RootLayout