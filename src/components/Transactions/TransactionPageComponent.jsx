"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react'
import toast from 'react-hot-toast';

export const TransactionPageComponent = ({transaction}) => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    transaction.amount,
  );

  const deleteTransaction = async () => {
    const res = await fetch(`https://budget-buddy-website.vercel.app/api/transactions/${transaction.id}`, {
      method: "DELETE",
    });
    if(!res.ok){
      toast.error("Failed to delete transaction!")
    }
  }

  const getUser = async () => {
    try{
    const res = await fetch(`https://budget-buddy-website.vercel.app/api/users/${transaction.user_id}`, {
        cache: "no-store"
    })
    
    const data = await res.json();
    const user = data.data
    setUser(user);
    }catch (error){
      console.log("Failed to get user", error)
    }

  }

  getUser();

  const updateUser = async(userData) => {
    const res = await fetch(`/api/users/${transaction.user_id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      'content-type': 'application/json'
    })
  

    if(!res.ok){
        throw new Error("Failed to update user's balance");
    }
  }

  const [clicked, setClicked] = useState(false);

  const handleDelete = async (e) =>  {
    setClicked(true);

    e.preventDefault()

    const userData = {
      income: user.income,
      expense: user.expense,
      balance: user.balance
    }

    if(transaction.type === "Income"){
      userData["income"] = user.income - transaction.amount;
      userData["balance"] = user.balance - transaction.amount;
    } else{
      userData["expense"] = user.expense - transaction.amount;
      userData["balance"] = user.balance + transaction.amount;
    }

    deleteTransaction();
    updateUser(userData);

    
    router.refresh();
    router.push("/");
    router.refresh();

    toast.success("Delete success!")
  }
  return (
    <div className='grid grid-col justify-center h-screen'>
      <div className='flex justify-center h-fit w-screen'>
          <div className='bg-white h-max-screen w-10/12 rounded-2xl m-10 shadow-xl'>
              <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
                  <div>Your Transaction</div>
              </div>
              <div className='flex flex-col gap-5 p-10'>
                  {transaction.type === "Income" ? (
                        <div>
                          <div className='flex flex-col gap-3'>
                            <div className='font-bold text-3xl'>{transaction.title}</div>   
                            <p className='text-4xl font-bold text-blue-500 mt-3'>+{formattedAmount}</p>
                            <div className='flex gap-2'>
                              <div className='text-lg bg-blue-500 w-fit rounded-full text-white px-3 my-3'>{transaction.type}</div>
                              <p className='text-lg bg-indigo-500 w-fit rounded-full text-white px-3 my-3'>{transaction.category}</p>
                            </div>
                          </div>
                        </div>
                    ): (
                        <div>
                          <div className='flex flex-col gap-3'>
                            <div className='font-bold text-3xl'>{transaction.title}</div>   
                            <p className='text-4xl font-bold text-red-500 mt-3'>-{formattedAmount}</p>
                            <div className='flex gap-2'>
                              <div className='text-lg bg-red-500 w-fit rounded-full text-white px-3 my-3'>{transaction.type}</div>
                              <p className='text-lg bg-indigo-500 w-fit rounded-full text-white px-3 my-3'>{transaction.category}</p>
                            </div>
                          </div>
                        </div>
                  )}
                <div className='text-xl font-semibold'>Description :</div>
                <div className='text-xl text-gray-500 mb-5'>{transaction.description}</div>
                <button onClick={handleDelete} disabled={clicked} className='bg-indigo-500 p-3 rounded-xl font-semibold text-white text-xl hover:opacity-90 disabled:opacity-80'>Delete Transaction</button>
              </div>
            </div>
      </div>
    </div>
  )
}
