    'use client'
  
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"

export function ToastFun(message : string){
    const { toast } = useToast()
return     toast({
    title:message,
    variant: 'destructive',
  })
}