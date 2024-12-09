'use client'


import { Button } from "./button";
import { returnAndStartFromTheEnd } from "./returnAndStartFromTheEnd";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation"

export default function AuthButton({to,searchParams}:{to :string,searchParams:ReadonlyURLSearchParams}){
    const router = useRouter()
    const cuurentRoute = usePathname()



return(

        <Button
    variant='ghost'
size='sm'
onClick={()=>{
  returnAndStartFromTheEnd(cuurentRoute + "?"+searchParams.toString() );
  router.push(`/auth/${to}`)
}}
>
{to}
</Button>

)
}