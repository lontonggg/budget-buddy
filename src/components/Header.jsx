import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <nav className='flex justify-between bg-indigo-500 text-white px-5'>
        <Link href="/">
          <div className='p-5 font-bold text-3xl hover:scale-105 transition-transform duration-300'>BudgetBuddy</div>
        </Link>
        <Link href={"/create-transaction"}>
            <button className='p-5 text-2xl hover:scale-105 hover:font-bold transition-transform duration-300'>Create Transaction</button>
        </Link>
    </nav>
  )
}
