'use client'
import { Button } from "@/components/button"
import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { error } from "console"
import Link from "next/link"
import { FormEvent, Suspense, useState } from "react"


export default async function ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }){
    const [isReset, setIsReset] = useState(false);
    const { toast } = useToast();

    async function resetPassword(FormData:FormData) {
        const password= FormData.get('password') 
        const ConfirmPassword= FormData.get('ConfirmPassword') 
        if(password !== ConfirmPassword){
            toast({
                title: 'the password and Confirmed password does not match ',
                variant: "destructive",
              });
        
            return
        }
        
        const user = {
            password ,...searchParams
        }
try {

    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/resetPassword`,user)
    setIsReset(true)
} catch (error : any) {
    toast({
        title: error.response.data.message,
        variant: "destructive",
      });

}

    }
    return(
        <MaxWidthWithWrapper className="flex-1 flex justify-center items-center">
{isReset ? 
            <div className="mx-auto mt-20 bg-green-400/20 font-semibold text-lg p-6 text-slate-500">
            The password has been reset successfully , Please{' '}
            <Link href="/auth/Login" className="cursor-pointer text-slate-600"> login</Link>
          </div>:
(<div className=" bg-slate-200/50 ">
<h1 className="text-center font-bold text-green-600 pt-12 text-4xl" >Reset Password</h1>

        <form action={resetPassword} className="flex flex-col gap-4 p-10 w-96 ">
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input type="password" id="ConfirmPassword" name="ConfirmPassword" required />
            
            <input type="submit"  value='Continue'/>
                
        </form>

    </div>)}

    </MaxWidthWithWrapper>)
}