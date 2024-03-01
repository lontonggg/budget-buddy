import { TransactionForm } from '@/components/TransactionForm';
import React from 'react'

const getUser = async () => {
  try{
    const res = await fetch(`http://localhost:3000/api/users`, {
      cache: "no-store"
    })
    return res.json();
  }catch (error){
    console.log("Failed to get user", error)
  }
}

const { users } = await getUser();
const user = users[0]

export default function Page({}) {
  return (
    <div className='h-screen p-20'>
      <TransactionForm user={user}/>
    </div>
  )
}
