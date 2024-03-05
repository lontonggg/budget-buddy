"use client"

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export const Balance = ({userId}) => {
    const [user, setUser] = useState(null);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const getUser = async () => {
            try{
            const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
                cache: "no-store"
            })
            
            const data = await res.json();
            const user = data.data
            setUser(user);
            setIncome(user.income);
            setExpense(user.expense);
            setBalance(user.balance);
            }catch (error){
            console.log("Failed to get user", error)
            }
        }

        getUser();
        
    
        }, []);
    return (
        <div className='flex bg-white gap-20 justify-center items-center px-20 py-10 w-fit rounded-xl shadow-xl'>
            <div className='hover:scale-105 transition-transform duration-300'>
                <div className='text-xl'>Income</div>
                <div className='font-bold text-blue-500 text-2xl'>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                income,
              ))}</div>
            </div>  
            <div className='hover:scale-105 transition-transform duration-300'>
                <div className='text-xl'>Expenses</div>
                <div className='font-bold text-red-500 text-2xl'>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                expense,
              ))}</div>
            </div>
            <div className='hover:scale-105 transition-transform duration-300'>
                <div className='text-xl'>Total Balance</div>
                <div className='font-bold text-2xl'>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                balance,
              ))}</div>
            </div>
        </div>
  )
}
