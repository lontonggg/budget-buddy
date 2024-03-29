import { TransactionPageComponent } from '@/components/Transactions/TransactionPageComponent'
import React from 'react'
import { Header } from '@/components/Home/Header'

const getTransactionsOfUser = async (id) => {
    try{
        const res = await fetch(`${process.env.WEB_URL}/api/transactions/${id}`, {
        cache: "no-store"
        })
        return res.json();
    }catch (error){
        console.log("Failed to get transactions", error)
    }
}

const getUser = async (id) => {
  try{
    const res = await fetch(`${process.env.WEB_URL}/api/users/${id}`, {
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
    <div>
      <Header />
      <TransactionPageComponent transaction={transactions} user={user}/>
    </div>
  )
}

export default TransactionPage;