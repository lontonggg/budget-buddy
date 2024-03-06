"use client"

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <nav className='w-screen flex justify-between items-center bg-indigo-500 text-white px-5'>
        <Link href="/">
          <div className='p-5 font-bold text-3xl hover:scale-105 transition-transform duration-300'>BudgetBuddy</div>
        </Link>
        <div className='flex justify-center items-center'>
          <Link href={"/create-transaction"}>
              <button className='p-5 text-2xl hover:scale-105 hover:font-bold transition-transform duration-300'>Create Transaction</button>
          </Link>
          <Link href={"/"}>
            <button onClick={() => signOut()} className='p-5 text-2xl hover:scale-105 hover:font-bold transition-transform duration-300' >Logout</button>
          </Link>
        </div>
    </nav>
  )
}
