'use client'

import { useQuery } from "@tanstack/react-query"
import { FormEvent, useEffect, useRef, useState } from "react"

// import { cookies } from "next/headers";
export default  function (){

   const emailRef = useRef<HTMLInputElement | null>(null)
    async function enterEmailForResetPassword(e:FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        const user = {
            email : emailRef.current?.value,
        }
try {
 
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/forgotPassword`,{
        method:'post',
        body:JSON.stringify(user),
        headers:{
            'Content-Type':'application/json',
        }
    })
} catch (error) {
    
    console.log(error)
}
   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
   console.log('login')
    }

    return(
        <div className="m-auto bg-slate-200 ">
            <form >
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" required ref={emailRef}/> 
                <button onClick={(e)=>{enterEmailForResetPassword(e)}}> Login</button>
            </form>

        </div>
    )


}