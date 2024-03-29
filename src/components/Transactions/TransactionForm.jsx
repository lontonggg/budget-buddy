"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const getUser = async (id) => {
    try{
      const res = await fetch(`${process.env.WEB_URL}/api/users/${id}`, {
        cache: "no-store"
      })
      return res.json();
    }catch (error){
      console.log("Failed to get user", error)
    }
}
    
export const TransactionForm = ({userId}) => {
    const router = useRouter();

    const initialTransaction = {
        title: "",
        description: "",
        type: "",
        amount: 0,
        category: "",
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

        if(!res.ok){
            throw new Error("Failed to update user's balance");
        }
    }

    const handleSubmit = async (e) => {
        setClicked(true)
        e.preventDefault();

        const userDataGet = await getUser(userId);
        const user = userDataGet.data;

        const userData = {
            balance: user.balance,
            income: user.income,
            expense: user.expense,
            id: user.id
        }

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
            toast.success("Successfully added your transaction!")
        } catch (error) {
            setClicked(false)
            toast.error("Failed to add transaction!")
        }
       
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setTransaction((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const [selected, setSelected] = useState("");

    const handleSelect = (event) => {
        setSelected(event.target.value);
        setTransaction((prevState) => ({
            ...prevState, ["type"]: event.target.value
        }))
    };

    const incomeSelection = ["Allowance", "Salary", "Bonus", "Other"]
    const expenseSelection = ["Food", "Transportation", "Education", "Apparel", "Social Life", "Other"]

    let type = null;
    let options = null;
    if(selected === "Income"){
        type = incomeSelection;
    } else if(selected === "Expense"){
        type = expenseSelection;
    }

    if(type) {
        options = type.map((el) => <option key={el}>{el}</option>)
    }

    const [clicked, setClicked] = useState(false);

    return (
        <div className='flex justify-center align-center'>
            <div className='bg-white h-max-screen w-max-screen w-1/2 rounded-2xl shadow-xl'>
            <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
                <div>Create Transactions</div>
            </div>
            <form className='flex flex-col w-full gap-3 p-6' method='post' onSubmit={handleSubmit}>
                <label className='font-semibold'>Title</label>
                <input id="title" name="title" required={true} className='rounded-lg p-3 border-slate-300 border-2' onChange={handleChange} />

                <label className='font-semibold'>Type</label>
                <select id="type" name="type" className='rounded-lg p-3 border-slate-300 border-2' onChange={handleSelect}>
                    <option selected={true} disabled={true}>Please select type</option>
                    <option>Income</option>
                    <option>Expense</option>
                </select>

                <label className='font-semibold'>Amount</label>
                <input type="number" id='amount' name='amount' required={true} defaultValue={0} min={0} onChange={handleChange} className='rounded-lg p-3 border-slate-300 border-2'/>

                <label className='font-semibold'>Category</label>
                
                <select id="category" name="category" className='rounded-lg p-3 border-slate-300 border-2' onChange={handleChange}>
                    <option selected={true} disabled={true}>Please select category</option>
                    {options}
                </select>
                <label className='font-semibold'>Description</label>
                <textarea id="description" name="description" onChange={handleChange} className='rounded-lg p-3 border-slate-300 border-2 resize-none h-[125px]'></textarea>
                <input type="submit" value="Create Transaction" className='bg-indigo-500 text-white font-semibold rounded-lg p-3 mt-5 hover:opacity-90 disabled:opacity-80' disabled={clicked} />
            </form>
            </div>

        </div>
        
  )
}
