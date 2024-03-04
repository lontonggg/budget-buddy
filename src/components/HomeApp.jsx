import React from 'react'
import { TransactionsContainer } from './TransactionsContainer'
import { Balance } from './Balance'

export const HomeApp = ({user, transactions}) => {
  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <Balance user={user} />
      <TransactionsContainer/>
    </div>
  )
}
