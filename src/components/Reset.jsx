"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export const Reset = ({user}) => {
    const router = useRouter();
    const userData = {
        name: "",
        balance: 0,
        income: 0,
        expense: 0,
        transactions: []
    }


    const handleClick = async (e) => {
        e.preventDefault();
      
        const response = await fetch(`/api/users/${user._id}`, {
            method: "PUT",
            body: JSON.stringify({userData}),
            'content-type' : 'application/json'
        })

        if(!response.ok){
            throw new Error("Reset Failed");
        }
        router.refresh();
    }
  return (
    <div>
        <button onClick={handleClick} className='fixed bottom-10 right-10 w-[80px] h-[80px] rounded-full bg-indigo-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-300'>
            Reset
        </button>
    </div>
  )
}
