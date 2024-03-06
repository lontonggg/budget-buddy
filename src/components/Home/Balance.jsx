"use client"

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { DoughnutChart} from './DoughnutChart';

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
        }, [userId]);
    return (
        <div className='flex flex-col justify-center items-center gap-5 h-max-screen h-5/6'>
            <div className='flex flex-col bg-white gap-10 justify-between items-center p-10 py-10 rounded-xl shadow-xl w-[425px]'>
            <div className='hover:scale-105 transition-transform duration-300'>
                    <div className='text-3xl text-left'>Total Balance</div>
                    <div className='font-bold text-4xl text-left'>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                    balance,
                ))}</div>
                <div className='flex gap-10 mt-10'>
                    <div className='hover:scale-105 transition-transform duration-300'>
                        <div className='text-lg'>Income</div>
                        <div className='font-bold text-blue-500 text-lg'>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                        income,
                    ))}</div>
                    </div>  
                    <div className='hover:scale-105 transition-transform duration-300'>
                        <div className='text-lg'>Expenses</div>
                        <div className='font-bold text-red-500 text-lg'>{(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
                        expense,
                    ))}</div>
                    </div>
                </div>
                </div>
            </div>
            <div className='flex flex-col bg-white gap-10 justify-between items-center p-10 py-16 rounded-xl shadow-xl'>
                <DoughnutChart income={(income)} expense={(expense)}/>
            </div>
        </div>
  )
}
