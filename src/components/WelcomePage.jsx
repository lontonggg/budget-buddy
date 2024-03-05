import React from 'react'
import Link from 'next/link'

export const WelcomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen text-center p-20 bg-indigo-900'>
        <div className='flex flex-col gap-20 justify-center items-center bg-white p-20 py-40 rounded-3xl shadow-xl'> 
            <div className='flex flex-col justify-center gap-3'>
                <div className='text-5xl font-bold'>Welcome to </div>
                <div className='text-7xl font-bold text-indigo-500 hover:scale-105 transition-transform duration-500'>BudgetBuddy!</div>
            </div>
            <div className='flex flex-col gap-10 justify-center items-center'>
                <p className='text-2xl text-center text-balance text-gray-700'>Introducing BudgetBuddy, your ultimate money management companion! Say goodbye to financial stress and hello to smart, intuitive tracking of your income, expenses, and overall balance.</p>
                <Link href="/login" className='bg-indigo-500 text-white w-fit font-semibold rounded-full p-5 text-2xl hover:opacity-90 disabled:opacity-80'>Click Here to Continue</Link>
            </div>
        </div>
    </div>
  )
}
