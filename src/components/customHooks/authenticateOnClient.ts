import { authenticateUser } from "@/middleware/authenticateUser";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useAuthOnClient(){
    console.log("start")
const [auth,setAuth] = useState<null | { userId: string; role: string;}>(null);
const x = useRef(true)
console.log(x)

  useEffect(()=>{

  async function authenticate (){
    try {
      const user = await authenticateUser()
        console.log("user")
  
        console.log(user)
        if (JSON.stringify(user) !== JSON.stringify(auth)) {
          setAuth(user);
          x.current = false;
          console.log("Authenticated user:", user);
        }
    } catch (error) {
      console.error("Authentication error");
      if (auth !== null) {
        setAuth(null); // Clear state if there's an error
        x.current = false;

      }
    }
  }
  if(x.current){
    console.log("if(x){}"); console.log(x)
  authenticate();
}else{ console.log("x.current"); console.log(x);x.current= true}
  })

  return auth ;
}