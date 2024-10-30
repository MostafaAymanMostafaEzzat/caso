import { Button } from "@/components/button"
import { error } from "console"
import Link from "next/link"
import { FormEvent, Suspense } from "react"


export default async function ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }){

    async function resetPassword(FormData:FormData) {
        'use server'
        const password= FormData.get('password') 
        const ConfirmPassword= FormData.get('ConfirmPassword') 
        if(password !== ConfirmPassword){
            console.log('errrr ')
            return
        }
        
        const user = {
            password ,...searchParams
        }
try {
 console.log('llllllllllllllllllllllol')
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/resetPassword`,{
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
        <form action={resetPassword}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input type="password" id="ConfirmPassword" name="ConfirmPassword" required />
            
            <input type="submit"  value='Continue'/>
                
        </form>

    </div>
    )
}