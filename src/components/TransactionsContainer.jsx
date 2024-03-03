"use client"


import { Transactions } from './Transactions'


export const TransactionsContainer = ({transactions}) => {

  return (
    <div className='bg-white h-max-screen w-10/12 rounded-2xl m-10 shadow-xl'>
        <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
        <div>Transactions</div>
          <div className='flex gap-2'>
              <input id="searchbar" name="searchbar" placeholder="Search Transactions" className='bg-indigo-200 rounded-md font-normal text-sm p-2'></input>
              <button className='text-sm font-normal bg-indigo-800 p-2 rounded-lg'>Search</button>
          </div>
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
