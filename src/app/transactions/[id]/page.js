import { TransactionPageComponent } from '@/components/TransactionPageComponent'
import React from 'react'

const getTransactionsOfUser = async (id) => {
    try{
        const res = await fetch(`http://localhost:3000/api/transactions/${id}`, {
        cache: "no-store"
        })
        return res.json();
    }catch (error){
        console.log("Failed to get transactions", error)
    }
}

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


const TransactionPage = async ({params}) => {
  const transactionData = await getTransactionsOfUser(params.id);
  const transactions = transactionData.data;

  const userData = await getUser(params.id);
  const user = userData.data;

  return (
    <TransactionPageComponent transaction={transactions} user={user}/>
  )
}

export default TransactionPage;