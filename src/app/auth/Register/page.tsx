"use client";

import { buttonVariants } from "@/components/button";

import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
export default function () {
  const { toast } = useToast();
  const [isRigisterd, setIsRigisterd] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const Register = async (Formdata: FormData) => {
    console.log(Formdata);
    const user = {
      name: nameRef.current?.value,
      password: passwordRef.current?.value,
      email: emailRef.current?.value,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
        user
      );
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(res);
    } catch (error: any) {
      console.log(error);
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <MaxWidthWithWrapper>
        <div className="m-auto bg-slate-200 ">
      {isRigisterd ? (
        <p className="bg-green-500/20 ">Success! Please check your email to verify account</p>
      ) : (
        
          <form action={Register}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required ref={nameRef} />
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              ref={emailRef}
            />
            <label htmlFor="password">password</label>
            <input
              type="text"
              id="password"
              name="password"
              required
              ref={passwordRef}
            />

            <input className={buttonVariants()} type="submit" value="Submit" />
          </form>
       
      )}
       </div>
   </MaxWidthWithWrapper>
  );
}
