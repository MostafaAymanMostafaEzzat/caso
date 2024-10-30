import { db } from "@/db";
import { notFound } from "next/navigation";

import { sendVerificationEmail } from '@/utils/sendVerficationEmail';
import crypto from 'crypto'
import { Resend } from "resend";
import comparePassword from "@/utils/comparePassword";
import { NextRequest, NextResponse } from "next/server";
import { attachCookiesToResponse } from "@/utils/jwt";
const bcrypt = require('bcrypt');
export async function POST(req:Request) {
  const request = await req.json() 
  console.log('resetPassword')
  const{verificationToken,email,password}=request
  if (!email || !verificationToken || !password) {
    throw new Error('Please provide all values ');
  }
  const user = await db.user.findUnique({where:{ email} });
  console.log('resetPassworddddddddddddddddddddddddddddddddddd')

  if (user) {
  console.log('resetPasswordaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    if( user.passwordTokenExpirationDate === null){
      console.log("passwordTokenExpirationDate")
      return Response.json({msg:'false Password'},{status:500})
    }
    if(verificationToken === user.passwordToken && new Date( Date.now()) < user.passwordTokenExpirationDate){
      console.log("passwordTokenExpirationDate1")

      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      console.log("passwordTokenExpirationDate2")

      await db.user.update({where:{ email} ,data:{passwordToken:'',password:passwordHashed,passwordTokenExpirationDate:null}})
      console.log("passwordTokenExpirationDate3")
      console.log(passwordHashed)
      console.log(password)
      return Response.json({msg:'reset Password'},{status:200})
    }

  }
  console.log(verificationToken)
  console.log( user?.passwordToken)
  console.log(new Date( Date.now()))
  console.log(user?.passwordTokenExpirationDate)
  console.log(new Date( Date.now()) < user?.passwordTokenExpirationDate!)

  return Response.json({msg:'false Password'},{status:500})

  
  }