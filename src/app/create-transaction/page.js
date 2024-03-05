import { TransactionForm } from '@/components/TransactionForm';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

const Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='h-screen p-20'>
      <TransactionForm userId={session.user.id}/>
    </div>
  )
}

export default Page;