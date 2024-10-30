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
  console.log('NextResponse')
  const{verificationToken,email,password}=request
  if (!email || !verificationToken || !password) {
    throw new Error('Please provide all values ');
  }
  const user = await db.user.findUnique({where:{ email} });
  if (user) {
    if( user.passwordTokenExpirationDate === null){
      return  Response.error()
    }
    if(verificationToken === user.passwordToken &&new Date( Date.now()) < user.passwordTokenExpirationDate){
      const salt = await bcrypt.genSalt(10);
      const passwordHashed = await bcrypt.hash(password, salt);
      await db.user.update({where:{ email} ,data:{passwordToken:'',password:passwordHashed,passwordTokenExpirationDate:null}})
    }

  }
  
  return Response.json({msg:'reset Password'},{status:200})
  }