"use client"

import React, { useState } from 'react'
import { TransactionsContainer } from '@/components/Transactions/TransactionsContainer'
import { Balance } from './Balance'

export const HomeApp = ({userId}) => {
  return (
    <div className='flex justify-center items-center h-screen w-screen gap-5 px-20 '>
      <Balance userId={userId} />
      <TransactionsContainer userId={userId}/>
    </div>
  )
}
