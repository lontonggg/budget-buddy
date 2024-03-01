"use client"

import React from 'react'
import { Transactions } from './Transactions'

export const TransactionsLayout = ({user}) => {
  const transactions = user.transactions
  return (
    <div className='bg-white h-max-screen w-10/12 rounded-2xl m-10 shadow-xl'>
        <div className='bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
            Transactions
        </div>
        <div className='flex flex-col p-4 gap-4 h-[500px] overflow-y-scroll'>
            {transactions.map((transaction, index) => (
              <Transactions key={index} transaction={transaction}/>
            ))}
        </div>
    </div>
   
  )
}
