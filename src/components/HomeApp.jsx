import React from 'react'
import { TransactionsLayout } from './TransactionsContainer'
import { Balance } from './Balance'
import { Reset } from './Reset'

export const HomeApp = ({user}) => {
  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <Balance user={user} />
      <TransactionsLayout user={user} />
      <Reset user={user} />
    </div>
  )
}
