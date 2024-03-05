"use client"

import React, { useState } from 'react'
import { TransactionsContainer } from './TransactionsContainer'
import { Balance } from './Balance'
import { useEffect } from 'react'

export const HomeApp = ({userId}) => {
  return (
    <div className='flex flex-col justify-center items-center p-5'>
      <Balance userId={userId} />
      <TransactionsContainer userId={userId}/>
    </div>
  )
}
