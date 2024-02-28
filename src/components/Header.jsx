import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <div className='flex justify-between bg-indigo-500 text-white px-5'>
        <div className='p-5 font-bold text-3xl'>BudgetBuddy</div>
        <Link href={"/create-transaction"}>
            <button className='p-5 hover:font-bold text-2xl'>Create Transaction</button>
        </Link>
    </div>
  )
}
