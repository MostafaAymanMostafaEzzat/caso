'use client'
import Link from "next/link";
import MaxWidthWithWrapper from "./MaxwidthWithWrapper";
import { ArrowRight } from "lucide-react";
import { LogoutButton } from "./logout/client";
import AuthButton from "./authButton";
import useAuthOnClient from "./customHooks/authenticateOnClient";
import { buttonVariants } from "./button";
import axios from "axios";
import { useEffect, useRef, useState } from "react";


export default  function Navbar() {

  console.log("start")
const [auth,setAuth] = useState<null | { userId: string; role: string;}>(null);
const x = useRef(true)
console.log(x)

//   useEffect(()=>{

//   async function authenticate (){
//     try {
//       const user = await axios.get(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/authenticateUser`);
//         console.log("user")
  
//         console.log(user.data.user)
//         if (JSON.stringify(user.data.user) !== JSON.stringify(auth)) {
//           setAuth(user.data.user);
//           x.current = false;
//           console.log("Authenticated user:", user);
//         }
//     } catch (error) {
//       console.error("Authentication error");
//       if (auth !== null) {
//         setAuth(null); // Clear state if there's an error
//         x.current = false;

//       }
//     }
//   }
//   if(x.current){
//     console.log("if(x){}"); console.log(x)
//   authenticate();
// }else{ console.log("x.current"); console.log(x);x.current= true}
//   })



  return (
    <div className="sticky top-0 select-none inset-x-0 w-full bg-slate-100/30 border-b border-zinc-950/20 border-solid py-5 backdrop-blur-lg z-[9999999999999999]">
      <MaxWidthWithWrapper>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl text-zinc-950/85">
            case
            <span className="text-green-600">cobra</span>
          </h1>

          <div className="flex gap-5 items-center">
            {auth ? (
              <div className="flex items-center gap-2">
              <LogoutButton user={auth} />
                {auth?.role ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {" "}
                
                <AuthButton to='Register' />


                  <AuthButton to='Login'/>
              </div>
            )}
            <div className="text-center  relative ml-4">
              <Link
                className={buttonVariants({
                  size: "sm",
                  className: "mx-auto  ",
                })}
                href="/configure/upload"
              >
                Create case <ArrowRight className="h-4 w-4 ml-1.5 " />
              </Link>
              <span className="absolute inset-y-0 w-[1px] bg-zinc-200 -left-6 hidden sm:block" />
            </div>
          </div>
        </div>
      </MaxWidthWithWrapper>
    </div>
  );
}
