import React from 'react'
import Link from 'next/link';
export const Transactions = ({transaction}) => {
    const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
        transaction.amount,
      );

    const link = "/transactions/" + transaction.id
  return (
    
    <Link href={link}>
        <div className='relative flex bg-transparent rounded-xl justify-between items-center p-5 shadow-xl border-slate-300 border-2 hover:opacity-80 hover:scale-105 transition-transform duration-300'>
            <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold '>{transaction.title}</h1>
                    <p className='text-sm text-gray-500'>{transaction.description}</p>
                    <div className='text-sm bg-indigo-500 text-center w-fit px-3 rounded-full text-white'>{transaction.category}</div>
            </div>
                <div>
                    {transaction.type === "Income" ? (
                        <p className='text-xl font-bold text-blue-500'>+{formattedAmount}</p>
                    ): (
                        <p className='text-xl font-bold text-red-500'>-{formattedAmount}</p>
                    )}
                </div>
        </div>
    </Link>
  )
}
