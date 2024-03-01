"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

export const TransactionForm = ({user}) => {
    const router = useRouter();
    const userData = {
        name: "",
        balance: 0,
        income: 0,
        expense: 0,
        transactions: []
    }

    if(user != null){
        userData['name'] = user.name
        userData['balance'] = user.balance 
        userData['income'] = user.income
        userData['expense'] = user.expense 
        userData['transactions'] = user.transactions 
    }
   

    const initialTransaction = {
        title: "",
        description: "",
        type: "",
        amount: 0,
    }

    const [transaction, setTransaction] = useState(initialTransaction);


    const handleSubmit = async (e) => {

        e.preventDefault();

        userData['transactions'].push(transaction);
       

        if(transaction.type === "Income"){
            userData['balance'] = user.balance + parseInt(transaction.amount);
            userData['income'] = user.income + parseInt(transaction.amount);
        } else{ 
            userData['balance'] = user.balance - parseInt(transaction.amount);
            userData['expense'] = user.expense + parseInt(transaction.amount);
        }

        const response = await fetch(`/api/users/${user._id}`, {
            method: "PUT",
            body: JSON.stringify({userData}),
            'content-type' : 'application/json'
        })

        if(!response.ok){
            throw new Error("Transaction Failed");
        }
        router.refresh();
        router.push("/");
        router.refresh();
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setTransaction((prevState) => ({
            ...prevState, [name]: value
        }))

        console.log(transaction)
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
            <input type="submit" value="Create Transaction" className='bg-indigo-500 text-white font-semibold rounded-lg p-3 mt-5' />
        </form>
    </div>
  )
}
