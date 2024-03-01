import React from 'react'

export const Transactions = ({transaction}) => {
    const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
        transaction.amount,
      );
  return (
    <div className='flex rounded-xl justify-between items-center p-5 shadow-xl border-slate-300 border-2'>
       <div className='flex flex-col gap-3'>
            <h1 className='text-l font-bold '>{transaction.title}</h1>
            <p className='text-sm text-gray-500'>{transaction.description}</p>
       </div>
        <div>
            {transaction.type === "Income" ? (
                <p className='text-xl font-bold text-blue-500'>{formattedAmount}</p>
            ): (
                <p className='text-xl font-bold text-red-500'>{formattedAmount}</p>
            )}
        </div>
    </div>

  )
}
