import { TransactionForm } from '@/components/TransactionForm';
import React from 'react'

const getUser = async () => {
  try{
    const res = await fetch(`http://localhost:3000/api/users/847f4959-cdab-419a-ae00-e7bcb675eee1`, {
      cache: "no-store"
    })
    return res.json();
  }catch (error){
    console.log("Failed to get user", error)
  }
}
  
const userData = await getUser();
const user = userData.data;

export default function Page({}) {
  return (
    <div className='h-screen p-20'>
      <TransactionForm user={user}/>
    </div>
  )
}
