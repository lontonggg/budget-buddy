"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState } from 'react';
import {signIn} from 'next-auth/react'

export const Login = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const loginData = await signIn('credentials', {
        name: e.target.name.value,
        password: e.target.password.value,
        redirect: false,
      });

      if(loginData?.error){
        console.log(loginData.error);
      } else {
        router.refresh()
        router.push('/')
        router.refresh()
      }
  }

  return (
    <div className='flex justify-center align-center'>
      <div className='bg-white h-max-screen w-[400px] rounded-2xl shadow-xl'>
      <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
          <div>Login</div>
      </div>
        <form className='flex flex-col w-full gap-3 p-10' method='post' onSubmit={handleSubmit}>
            <label>Username</label>
            <input id="name" name="name" required={true} className='rounded-lg p-3 border-slate-300 border-2'/>

            <label>Password</label>
            <input id="password" name="password" type="password" required={true} className='rounded-lg p-3 border-slate-300 border-2' />
            
            <Link href="./register">
              <div className='hover:font-semibold mt-5'>{"Don't have an account?"}</div>
            </Link>
            <input type="submit" value="Login" className='bg-indigo-500 text-white font-semibold rounded-lg p-3 hover:opacity-90 disabled:opacity-80' disabled={clicked} />
        </form>
      </div>
    </div>
  )
}
