"use client"

import React from 'react'
import { Transactions } from './Transactions'
import { TransactionsContainerHeader } from './TransactionsContainerHeader'

export const TransactionsLayout = ({user}) => {
  const transactions = user.transactions
  return (
    <div className='bg-white h-max-screen w-10/12 rounded-2xl m-10 shadow-xl'>
        <TransactionsContainerHeader />
        <div className='flex flex-col p-4 gap-4 h-[500px] overflow-y-scroll'>
            {transactions && transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <Transactions key={index} transaction={transaction}/>
              ))
            ) : (
              <p className="text-center text-2xl text-gray-500 mt-20">{"You don't have any transactions."}</p>
            )}
        </div>
    </div>
   
  )
}
