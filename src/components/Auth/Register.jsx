"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const Register = () => {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const name = e.target.name.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmpassword.value;

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                name,
                password,
                confirmPassword
            })
        });
        const data = await res.json();
        if(res.message === "Register Failed"){
            toast.error("Register Failed");
        } else{
            router.push("/")
            router.refresh();
            toast.success("Register success!")
        }
       
    }

    return (  
        <div className='flex justify-center align-center'>
        <div className='bg-white h-max-screen w-[400px] rounded-2xl shadow-xl'>
        <div className='flex justify-between items-center bg-indigo-500 p-5 rounded-t-xl text-xl text-white font-bold '>
            <div>Register</div>
        </div>
            <form className='flex flex-col w-full gap-3 p-10' method='post' onSubmit={handleSubmit}>
                <label>Username</label>
                <input id="name" name="name" required={true} className='rounded-lg p-3 border-slate-300 border-2'/>

                <label>Password</label>
                <input id="password" name="password" type="password" required={true} className='rounded-lg p-3 border-slate-300 border-2' />

                <label>Confirm Password</label>
                <input id="confirmpassword" name="confirmpassword" type="password" required={true} className='rounded-lg p-3 border-slate-300 border-2' />
                
                <Link href="./login">
                <div className='hover:font-semibold mt-5'>{"Already have an account?"}</div>
                </Link>
                <input type="submit" value="Register" className='bg-indigo-500 text-white font-semibold rounded-lg p-3 hover:opacity-90 disabled:opacity-80'/>
            </form>
        </div>
        </div>
    )
}
