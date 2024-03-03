"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

const getUser = async () => {
    try{
      const res = await fetch(`http://localhost:3000/api/users/847f4959-cdab-419a-ae00-e7bcb675eee1`, {
        cache: "no-store"
      })
      return res.json();
    }catch (error){
      console.log("Failed to get user", error)
    }
}
    
 
  
export const TransactionForm = ({user}) => {
    const router = useRouter();

    const initialTransaction = {
        title: "",
        description: "",
        type: "",
        amount: 0,
        user_id: "",
    }

    const [transactionData, setTransaction] = useState(initialTransaction);

    const createTransaction = async () => {
        transactionData['amount'] = parseInt(transactionData.amount)

        const res = await fetch("/api/transactions", {
            method: "POST",
            body: JSON.stringify(transactionData),
            'content-type': 'application/json'
        })

        console.log(res);

        if(!res.ok){
            throw new Error("Failed to create transaction");
        }
    }

    const updateUserBalance = async (userData) => {
        const res = await fetch(`/api/users/${userData.id}`, {
            method: "PATCH",
            body: JSON.stringify(userData),
            'content-type': 'application/json'
        })

        console.log(res);

        if(!res.ok){
            throw new Error("Failed to update user's balance");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDataGet = await getUser();
        const user = userDataGet.data;

        const userData = {
            balance: user.balance,
            income: user.income,
            expense: user.expense,
            id: user.id
        }

        console.log(userData)

        try {
           
            if(transactionData.type === "Income"){
                userData['balance'] = user.balance + parseInt(transactionData.amount);
                userData['income'] = user.income + parseInt(transactionData.amount);
            } else{ 
                userData['balance'] = user.balance - parseInt(transactionData.amount);
                userData['expense'] = user.expense + parseInt(transactionData.amount);
            }
            
            transactionData["user_id"] = user.id;
            createTransaction()
            updateUserBalance(userData)
    
            router.refresh();
            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error)
        }
       
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setTransaction((prevState) => ({
            ...prevState, [name]: value
        }))
    }

  
    return (
    <div className='flex justify-center align-center pt-7'>
        <form className='flex flex-col w-1/2 gap-3' method='post' onSubmit={handleSubmit}>
            <h2 className='text-2xl font-bold text-center'>Create Transaction</h2>
            <label className='font-semibold'>Title</label>
            <input id="title" name="title" required={true} className='rounded-lg p-3' onChange={handleChange} />

            <label className='font-semibold'>Type</label>
            <select id="type" name="type" className='rounded-lg p-3' onChange={handleChange}>
                <option selected={true} disabled={true}>Please select type</option>
                <option>Income</option>
                <option>Expense</option>
            </select>

            <label className='font-semibold'>Amount</label>
            <input type="number" id='amount' name='amount' required={true} defaultValue={0} min={0} onChange={handleChange} className='rounded-lg p-3'/>

            <label className='font-semibold'>Description</label>
            <textarea id="description" name="description" onChange={handleChange} className='rounded-lg p-3'></textarea>
            <input type="submit" value="Create Transaction" className='bg-indigo-500 text-white font-semibold rounded-lg p-3 mt-5 hover:opacity-90' />
        </form>
    </div>
  )
}
