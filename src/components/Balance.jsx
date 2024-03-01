"use client"

import React from 'react'

export const Balance = ({user}) => {
    return (
        <div className='flex bg-white gap-20 justify-center items-center px-20 py-10 w-fit rounded-xl shadow-xl'>
            <div>
                <div className='text-xl'>Income</div>
                <div className='font-bold text-blue-500 text-2xl'>Rp {user.income}</div>
            </div>  
            <div>
                <div className='text-xl'>Expenses</div>
                <div className='font-bold text-red-500 text-2xl'>Rp {user.expense}</div>
            </div>
            <div>
                <div className='text-xl'>Total Balance</div>
                <div className='font-bold text-2xl'>Rp {user.balance}</div>
            </div>
        </div>
  )
}
