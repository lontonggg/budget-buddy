import React from 'react'
import { Header } from './Header'
import { Balance } from './Balance'

export const HomeApp = ({user}) => {
  return (
    <div>
      <Balance user={user}/>
    </div>
  )
}
