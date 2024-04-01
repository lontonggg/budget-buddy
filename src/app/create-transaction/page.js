import { TransactionForm } from '@/components/Transactions/TransactionForm';
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth';

const Page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <TransactionForm userId={session.user.id}/>
    </>
  )
}

export default Page;