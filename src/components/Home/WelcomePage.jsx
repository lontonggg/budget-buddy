"use client"

import React from 'react'
import Link from 'next/link'
import Typewriter from 'typewriter-effect';

export const WelcomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen bg-indigo-900'>
        <div className='flex flex-col gap-10 xs:gap-5 justify-center bg-white lg:w-[800px] md:w-[600px] sm:w-[400px] xs:w-[350px] h-fit lg:p-20 md:p-16 sm:p-10 xs:p-8 rounded-3xl shadow-xl'> 
            <div className='flex flex-col gap-3 xs:gap-0 lg:mb-5 md:mb-5'>              
              <div className='lg:text-4xl md:text-3xl sm:text-xl font-bold text-left'>Welcome to </div>
              <div className='lg:text-6xl md:text-5xl sm:text-3xl xs:text-2xl font-bold text-indigo-500'>
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter.typeString('BudgetBuddy!')
                      .start();
                  }}
                  options={{
                    autoStart: true,
                    cursor: "_",
                    delay: 200,
                  }}
                />
              </div>
            </div>
            <div className='flex flex-col gap-10 justify-center items-center'>
                <p className='lg:text-2xl md:text-xl sm:text-base xs:text-sm text-justify text-gray-700'>Introducing BudgetBuddy, your ultimate money management companion!<br /><br />Say goodbye to financial stress and hello to smart, intuitive tracking of your income, expenses, and overall balance.</p>
                <Link href="/login" className='bg-indigo-500 text-white w-fit font-semibold rounded-full lg:text-2xl lg:p-5 md:text-2xl md:p-5 sm:text-lg sm:p-4 xs:text-sm xs:p-3 hover:opacity-90 disabled:opacity-80'>Click Here to Continue</Link>
            </div>
        </div>
    </div>
  )
}
