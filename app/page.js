'use client'
import Nav from '@/components/Nav'
import {useSession} from "next-auth/react";
const Page = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading session...</div>;
  }
  return (<section className='w-full flex-center flex-col'>
    <Nav session ={ session }/>
    <div className="content">
      <h1>How are you gonna use your 24 hours?</h1>
      <p className='desc text-center'>
        Sign in to save and track your todos
      </p>
    </div>
  </section>)
}

export default Page