import React from 'react'
import { useAtom } from 'jotai'
import { userBalanceAtom } from './atoms/UserBalance'

export const Balance = () => {
    const [balance] = useAtom(userBalanceAtom)
    return (
        <div className='flex gap-20 justify-center items-center border-black border-2 px-20 py-10'>
            <div>
                <div className='text-xl'>Income</div>
                <div className='font-bold text-blue-500 text-2xl'>Rp {balance}</div>
            </div>  
            <div>
                <div className='text-xl'>Expenses</div>
                <div className='font-bold text-red-500 text-2xl'>Rp {balance}</div>
            </div>
            <div>
                <div className='text-xl'>Total</div>
                <div className='font-bold text-2xl'>Rp {balance}</div>
            </div>
        </div>
  )
}
