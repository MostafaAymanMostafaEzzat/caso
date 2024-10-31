'use client'

import { Button, buttonVariants } from "../button"
import { SignOut } from "./action"



export function LogoutButton ({user}:{user:{userId:string,role:string}}){
    return(
    <Button
        variant='ghost'
    onClick={()=>{SignOut(user)}}
  >
    Sign out
  </Button>
    )
}