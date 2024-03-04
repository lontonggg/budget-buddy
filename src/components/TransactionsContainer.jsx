"use client"

import SearchTransaction from './SearchTransaction';
import { Transactions } from './Transactions';
import { useEffect, useState } from 'react'

export const TransactionsContainer = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactionsOfUser = async () => {
        const res = await fetch(`http://localhost:3000/api/transactions?id=847f4959-cdab-419a-ae00-e7bcb675eee1`, {
          cache: "no-store"
          }
        )
        const transactionData = await res.json();
        const transaction = transactionData.data;
        setTransactions(transaction);
        console.log(transaction);
      }
     
      getTransactionsOfUser();
    }, [])

    

  return (
    <div className='bg-white h-max-screen w-10/12 rounded-2xl m-10 shadow-xl'>
        <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
        <div>Transactions</div>
          <SearchTransaction getSearchResults={(results) => setTransactions(results)} />
      </div>
        <div className='flex flex-col p-10 gap-4 h-[500px] overflow-y-scroll'>
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
