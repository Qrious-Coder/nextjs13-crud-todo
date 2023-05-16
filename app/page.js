'use client'
import Nav from '@/components/Nav'
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() =>{
    getSession().then((session) =>{
      if(session) {
        router.push('/todos')
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  if(isLoading) {
    return <p>Loading...</p>
  }
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