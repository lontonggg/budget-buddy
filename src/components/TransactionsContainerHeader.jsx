import React from 'react'

export const TransactionsContainerHeader = () => {
  return (
    <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
        <div>Transactions</div>
        <div className='flex gap-2'>
            <input placeholder="Search Transactions" className='bg-indigo-200 rounded-md font-normal text-sm p-2'></input>
            <button className='text-sm font-normal bg-indigo-800 p-2 rounded-lg'>Search</button>
        </div>
    </div>
  )
}
