'use client'

import { Dispatch, SetStateAction } from "react";
import { Button, buttonVariants } from "../button"
import { SignOut } from "./action"
import { useRouter } from "next/router";



export function LogoutButton ({user}:{user:{userId:string,role:string}}){
    const router = useRouter
    return(
    <Button
        variant='ghost'
    onClick={()=>{SignOut(user); localStorage.removeItem("returnedURL") }}
  >
    Sign out
  </Button>
    )
}