'use client'

import { Button } from "./button";
import { returnAndStartFromTheEnd } from "./returnAndStartFromTheEnd";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation"

export default function AuthButton({to}:{to :string}){
    const router = useRouter()
    const cuurentRoute = usePathname()
    // const searchParams = useSearchParams()

    // console.log(searchParams.values())

return(
    <Button
    variant='ghost'
size='sm'
onClick={()=>{
  // returnAndStartFromTheEnd(cuurentRoute + "?"+searchParams.toString() );
  router.push(`/auth/${to}`)
}}
>
{to}
</Button>
)
}