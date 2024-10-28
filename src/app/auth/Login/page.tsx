// 'use server'
// import axios from 'axios'
import { json } from 'stream/consumers'

export default  function (){
    const Login =async (Formdata:FormData)=>{
        'use server'
        console.log(Formdata)
        const user = {
            password:Formdata.get('password'),
            email:Formdata.get('email'),
        }
try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,{
        method:'post',
        body:JSON.stringify(user),
        headers:{
            'Content-Type':'application/json'
        }
    })
   console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
   console.log('login')
       console.log(res)
} catch (error) {
    console.log(error)
}


    }
    return(
        <div className="m-auto bg-slate-200 ">
            <form action={Login}>
                <label htmlFor="email">email</label>
                <input type="email" id="email" name="email" required/>
                <label htmlFor="password">password</label>
                <input type="text" id="password" name="password" required/>
                
                <input type="submit" value='Login'/>
            </form>

        </div>
    )


}