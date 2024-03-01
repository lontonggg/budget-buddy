import React from 'react'
import { Header } from './Header'
import { Balance } from './Balance'

export const HomeApp = ({user}) => {
  return (
    <div>
      <Header/>
      <Balance user={user}/>
    </div>
  )
}
