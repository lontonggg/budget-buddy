"use client"

import React from 'react'

export const Balance = ({user}) => {
    const formattedIncome = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
        user.income,
      );
    const formattedExpense = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    user.expense,
    );
    const formattedBalance= new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    user.balance,
    );
    return (
        <div className='flex bg-white gap-20 justify-center items-center px-20 py-10 w-fit rounded-xl shadow-xl'>
            <div className='hover:scale-105 transition-transform duration-300'>
                <div className='text-xl'>Income</div>
                <div className='font-bold text-blue-500 text-2xl'>{formattedIncome}</div>
            </div>  
            <div className='hover:scale-105 transition-transform duration-300'>
                <div className='text-xl'>Expenses</div>
                <div className='font-bold text-red-500 text-2xl'>{formattedExpense}</div>
            </div>
            <div className='hover:scale-105 transition-transform duration-300'>
                <div className='text-xl'>Total Balance</div>
                <div className='font-bold text-2xl'>{formattedBalance}</div>
            </div>
        </div>
  )
}
