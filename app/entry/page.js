'use client'
import EntryForm from "@/components/EntryForm";
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

const EntryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() =>{
    getSession().then((session) =>{
      if(session) {
        router.push('/todos')
      } else {
        setIsLoading(false)
        router.push('/entry')
      }
    })
  }, [router])

  if(isLoading) {
    return <p>Loading...</p>
  }
  return <EntryForm />
};

export default EntryPage;