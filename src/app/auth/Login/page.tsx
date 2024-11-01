"use client";

import { Button } from "@/components/button";
import MaxWidthWithWrapper from "@/components/MaxwidthWithWrapper";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

// import { cookies } from "next/headers";
export default function () {
  const { toast } = useToast();
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  async function login(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const user = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,user
      );
      
      router.push( localStorage.getItem('returnedURL') || `${process.env.NEXT_PUBLIC_SERVER_URL}`)
      router.refresh()
    } catch (error : any) {
      console.log(error);


      toast({
        title: error.response?.data?.message,
        variant: "destructive",
      });
    }

  }

  return (
    <MaxWidthWithWrapper className="flex-1 flex justify-center items-center mt-10">
    <div className=" bg-slate-200/50 ">
    <h1 className="text-center font-bold text-green-600 pt-12 text-4xl" >Login</h1>
      <form className="flex flex-col gap-4 p-10  shadow-lg shadow-slate-300/50 sm:w-52 md:w-96">
        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" required ref={emailRef}  />
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          name="password"
          required
          ref={passwordRef}
        />

        <Button
          onClick={(e) => {
            login(e);
          }}
        >
          {" "}
          Login
        </Button>
        <Link href="/auth/forgotPassword" className="text-gray-500 hover:text-gray-700"> Forgot Your Password ?</Link>
      </form>
    </div>
    </MaxWidthWithWrapper>
  );
}
