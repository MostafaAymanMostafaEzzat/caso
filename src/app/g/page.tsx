'use client'
  
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { useEffect } from "react"

export default function ToastFun(){
    const { toast } = useToast()
    let s =true
    console.log('popopoooooooo')

   //  useEffect(()=>{  
   //    toast({
   //    title:"message",
   //    variant: 'destructive',
   //    description: 'There was an error on our end. Please try again.',
   //  })},[s])

  return(<>
      <button onClick={()=>{    toast({
      title:"message",
      variant: 'destructive',
      description: 'There was an error on our end. Please try again.',
    })}}> kkkkkkkkkkk</button>
  </>)
}
