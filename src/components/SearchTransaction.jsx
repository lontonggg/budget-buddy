import React from 'react'
import { useState } from 'react';

export default function SearchTransaction({getSearchResults, searchFound}) {
    const [query, setQuery] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(query)
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
    <div>
        <form onSubmit={handleSubmit} className='flex gap-3'>
            <input id="searchbar" name="searchbar" placeholder="Search Transactions" value={query} onChange={(e) => setQuery(e.target.value)} className='bg-indigo-200 rounded-md font-normal text-sm p-2' ></input>
            <button type="submit" className='text-sm font-normal bg-indigo-800 p-2 rounded-lg' onClick={(handleSubmit)}>Search</button>
        </form>
    </div>
    )
}
