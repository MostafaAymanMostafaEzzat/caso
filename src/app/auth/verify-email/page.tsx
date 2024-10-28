import { error } from "console"
import Link from "next/link"
import { Suspense } from "react"


export default async function ({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }){

    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-email`,{
            method:'post',
            body:JSON.stringify(searchParams),
            headers:{
                'Content-Type':'application/json'
            }
        })
        return(
            <div className="m-auto bg-slate-200">
                
                <h2>Account Confirmed</h2>
      <Link href='/auth/Login' >
        Please login
      </Link>
                
            </div>
        )
        
    }catch(error){
        console.log(error)
        return(
            <div className="m-auto bg-slate-200">
                
                    errrrrrrrrrrrror
                
            </div>
        )
    }


}