"use client"

import SearchTransaction from './SearchTransaction';
import { Transactions } from './Transactions';
import { useEffect, useState } from 'react'

export const TransactionsContainer = ({userId}) => {
  const [transactions, setTransactions] = useState([]);
  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    const getTransactionsOfUser = async () => {
        const res = await fetch(`http://localhost:3000/api/transactions?id=${userId}`, {
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
    <div className='bg-white h-max-screen h-5/6 w-screen rounded-2xl shadow-xl'>
        <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
        <div>Transactions</div>
          <SearchTransaction getSearchResults={(results) => setTransactions(results)} searchFound={(isFound) => setIsFound(isFound)} userId={userId} />
      </div>
        <div className='flex flex-col p-10 gap-4 h-max-screen h-5/6 overflow-y-scroll'>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <Transactions key={index} transaction={transaction}/>
            ))
          ) : (
            isFound ? (
              <p className="text-center text-2xl text-gray-500 mt-20">{"You don't have any transactions."}</p>
            ) : (
              <p className="text-center text-2xl text-gray-500 mt-20">Transactions not found.</p>
            )
          )}
        </div>
    </div>
  )
}
