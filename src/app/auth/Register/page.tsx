// 'use server'
// import axios from 'axios'
import { buttonVariants } from '@/components/button'
import { Toast } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { json } from 'stream/consumers'

export default  function (){
    const Register =async (Formdata:FormData)=>{
        'use server'
        console.log(Formdata)
        const user = {
            name:Formdata.get('name'),
            password:Formdata.get('password'),
            email:Formdata.get('email'),
        }
try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,user)
   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
       console.log(res)
} catch (error : any) {
    console.log(error)
    toast({
        title: error.response.data.message,
        variant: 'destructive',
      })
}


    }
    return(
        <div className="m-auto bg-slate-200 ">
            <form action={Register}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required/>
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" required/>
                <label htmlFor="password">password</label>
                <input type="text" id="password" name="password" required/>
                
                <input className={buttonVariants()} type="submit" value='Submit'/>
            </form>

        </div>
    )


}