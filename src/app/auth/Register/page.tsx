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
      setIsRigisterd(true)
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
    <MaxWidthWithWrapper className="flex-1 flex justify-center items-center mt-10">
        
      {isRigisterd ? (
        <p className="bg-green-400/20 mt-20 font-semibold text-lg mx-auto text-slate-500 p-6">Success! Please check your email to verify account</p>
      ) : (
        <div className=" bg-slate-200/50 ">
            <h1 className="text-center font-bold text-green-600 pt-12 text-4xl" >Register</h1>
          <form action={Register} className="flex flex-col gap-4 p-10 sm:w-52 md:w-96 shadow-lg shadow-slate-300/50">

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
          </div>
       
      )}
       
   </MaxWidthWithWrapper>
  );
}
