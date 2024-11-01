'use client'

import { Button } from "@/components/button";
import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react"

// import { cookies } from "next/headers";
export default  function (){
    const [isOK , setISOK]=useState(false)
    const { toast } = useToast();

   const emailRef = useRef<HTMLInputElement | null>(null)
    async function enterEmailForResetPassword(e:FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        const user = {
            email : emailRef.current?.value,
        }
try {
 
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/forgotPassword`,user)
    setISOK(true)
} catch (error:any) {
    console.log(error)
    toast({
        title: error.response.data.message,
        variant: "destructive",
      });
}

    }

    return(
        <MaxWidthWithWrapper className="flex-1 flex justify-center items-center flex-col">
<div className=" bg-slate-200/50 ">
        <h1 className="text-center font-bold text-green-600 pt-12 text-4xl" >Forgot Password</h1>

            <form className="flex flex-col gap-4 p-10 w-96 ">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required ref={emailRef}/> 
                <Button onClick={(e)=>{enterEmailForResetPassword(e)}}> Login</Button>
            </form>
            </div>
            {isOK? <div className=" text-right bg-green-400/20 mt-6 font-semibold text-lg mx-auto text-slate-500 p-6"> Please check your email to complete the reset Password process</div>    :null}
        </MaxWidthWithWrapper>
    )


}