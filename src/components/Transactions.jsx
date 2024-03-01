import React from 'react'

export const Transactions = ({transaction}) => {
  return (
    <div className='flex rounded-xl justify-between items-center p-5 shadow-xl border-slate-300 border-2'>
       <div className='flex flex-col gap-3'>
            <h1 className='text-l font-bold '>{transaction.title}</h1>
            <p className='text-sm text-gray-500'>{transaction.description}</p>
       </div>
        <div>
            <p className='text-xl font-bold'>{transaction.amount}</p>
        </div>
    </div>

  )
}
