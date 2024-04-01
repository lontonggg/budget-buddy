import { useState } from 'react';
import Select from 'react-select';


export default function SearchTransaction({getSearchResults, searchFound, userId}) {
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');
    const [incomeActive, setIncomeActive] = useState(false);
    const [expenseActive, setExpenseActive] = useState(false);


    const getFilterTransaction = async (e) => {
        const response = await fetch(`https://budget-buddy-website.vercel.app/api/transactions?id=${userId}&type=${filter}`)
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
        await getFilterTransaction();

        if(expenseActive){
            handleSubmit(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://budget-buddy-website.vercel.app/api/transactions?id=${userId}&title=${query}`)
        const filteredData = await response.json();
        getSearchResults(filteredData.data);
        if(filteredData.data.length == 0){
            searchFound(false);
        } else{
            searchFound(true);
        }
    }   

    const handleCategoryFilter = async (e) => {

        const response = await fetch(`https://budget-buddy-website.vercel.app/api/transactions?id=${userId}&category=${category}`)
        const filteredData = await response.json();
        const data = filteredData.data

        return data;
       
    }

    const handleSelected = async (e) => {
        if(e){
            setCategory(e.value);
            const data = await handleCategoryFilter();
            getSearchResults(data);

            if(data.length == 0){
                searchFound(false);
            } else{
                searchFound(true);
            }
        }
    }

    const selection = ["Allowance", "Salary", "Bonus", "Food", "Transportation", "Education", "Apparel", "Social Life", "Other"]
    const selectOptions = selection.map((selection) => ({
        value: selection,
        label: selection
    }))
    
  return (
    <div className='flex gap-3 items-center'>
        <form onSubmit={handleIncomeFilter} className='flex gap-3'>
            <button type="submit" name="income" onClick={(e) => setFilter("Income")} className={`text-sm font-semibold ${incomeActive ? 'bg-indigo-800' : 'bg-indigo-400'} p-2 rounded-lg hover:opacity-90`}>Income</button>
        </form>
        <form onSubmit={handleExpenseFilter}>
              <button type="submit" name="expense" onClick={(e) => setFilter("Expense")} className={`text-sm font-semibold ${expenseActive ? 'bg-indigo-800' : 'bg-indigo-400'} p-2 rounded-lg hover:opacity-90`}>Expense</button>
        </form>

        <Select 
            className='text-sm font-semibold text-black'
            options={selectOptions}
            placeholder={"Category"}
            onChange={handleSelected}
            maxMenuHeight={true}
            isClearable={true}
        />

        <form onSubmit={handleSubmit} className='flex gap-3'>
            <input id="searchbar" name="searchbar" placeholder="Search Transactions" value={query} onChange={(e) => setQuery(e.target.value)} className='bg-indigo-200 rounded-md font-normal text-sm p-2 text-black' ></input>
            <button type="submit" className='text-sm font-semibold bg-indigo-400 p-2 rounded-lg hover:opacity-90' onClick={(handleSubmit)}>Search</button>
        </form>
    </div>
    )
}
