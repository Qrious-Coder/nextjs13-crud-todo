'use client'
import EntryForm from "@/components/EntryForm";
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';

const EntryPage = () => {
  const { status } = useSession()

  if(status === 'loading') {
    return <Loading />
  }
  return <EntryForm />
};

export default EntryPage;