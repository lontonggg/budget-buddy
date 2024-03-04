import React, { useEffect } from 'react'
import { useState } from 'react';

export default function SearchTransaction({getSearchResults, searchFound}) {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('');
    const [incomeActive, setIncomeActive] = useState(false);
    const [expenseActive, setExpenseActive] = useState(false);


    const getFilterTransaction = async (e) => {
        const response = await fetch(`http://localhost:3000/api/transactions?id=847f4959-cdab-419a-ae00-e7bcb675eee1&type=${filter}`)
        const filteredData = await response.json();
        getSearchResults(filteredData.data);
        if(filteredData.data.length == 0){
            searchFound(false);
        } else{
            searchFound(true);
        }
    }

    const handleIncomeFilter = async (e) => {
        e.preventDefault();
        setExpenseActive(false);
        setIncomeActive(!incomeActive);
        await getFilterTransaction();

        if(incomeActive){
            handleSubmit(e);
        }
    }

    const handleExpenseFilter = async (e) => {
        e.preventDefault();
        setIncomeActive(false);
        setExpenseActive(!expenseActive);
        const response = await fetch(`http://localhost:3000/api/transactions?id=847f4959-cdab-419a-ae00-e7bcb675eee1&type=Expense`)
        const filteredData = await response.json();
        getSearchResults(filteredData.data);
        if(filteredData.data.length == 0){
            searchFound(false);
        } else{
            searchFound(true);
        }

        if(expenseActive){
            handleSubmit(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/transactions?id=847f4959-cdab-419a-ae00-e7bcb675eee1&title=${query}`)
        const filteredData = await response.json();
        getSearchResults(filteredData.data);
        if(filteredData.data.length == 0){
            searchFound(false);
        } else{
            searchFound(true);
        }
    }   
  return (
    <div className='flex gap-3'>
        <form onSubmit={handleIncomeFilter} className='flex gap-3'>
            <button type="submit" name="income" onClick={(e) => setFilter("Income")} className={`text-sm font-semibold ${incomeActive ? 'bg-indigo-800' : 'bg-indigo-400'} p-2 rounded-lg hover:opacity-90`}>Income</button>
        
        </form>
        <form onSubmit={handleExpenseFilter}>
              <button type="submit" name="expense" className={`text-sm font-semibold ${expenseActive ? 'bg-indigo-800' : 'bg-indigo-400'} p-2 rounded-lg hover:opacity-90`}>Expense</button>
        </form>
        <form onSubmit={handleSubmit} className='flex gap-3'>
            <input id="searchbar" name="searchbar" placeholder="Search Transactions" value={query} onChange={(e) => setQuery(e.target.value)} className='bg-indigo-200 rounded-md font-normal text-sm p-2 text-black' ></input>
            <button type="submit" className='text-sm font-semibold bg-indigo-400 p-2 rounded-lg hover:opacity-90' onClick={(handleSubmit)}>Search</button>
        </form>
    </div>
    )
}
