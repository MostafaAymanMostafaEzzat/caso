'use client'

import { Button } from "@/components/button"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { FormEvent, useEffect, useRef, useState } from "react"

// import { cookies } from "next/headers";
export default  function (){

   const emailRef = useRef<HTMLInputElement | null>(null)
   const passwordRef = useRef<HTMLInputElement | null>(null)



    async function login(e:FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        const user = {
            email : emailRef.current?.value,
            password : passwordRef.current?.value
        }
try {
 
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,{
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
            <form className="flex flex-col gap-2">
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" required ref={emailRef}/>
                <label htmlFor="password">password</label>
                <input type="text" id="password" name="password" required ref={passwordRef}/>
                
                <Button onClick={(e)=>{login(e)}}> Login</Button>
                <Link href='/auth/forgotPassword'> Forgot Your Password ?</Link>
            </form>

        </div>
    )


}