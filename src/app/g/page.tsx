'use client'
import { useEffect } from "react";

import axios, { AxiosError } from 'axios'
export default function () {
 
useEffect(()=>{
  async function g(){

      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cookie`)
      if(!res){
     console.log('sucsesss')

      }
     console.log('sucsesss')
        //  console.log(res)
        //  return('res')
  }
   g()
})

,[]}
